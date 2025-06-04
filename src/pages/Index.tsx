
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SecurityScoreCard } from "@/components/dashboard/SecurityScoreCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { VerificationStatusList } from "@/components/VerificationStatusList";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { documentService } from "@/services/documentService";
import { biometricService } from "@/services/biometricService";
import { securityScoreService } from "@/services/securityScoreService";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const [verificationItems, setVerificationItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const [documents, biometrics] = await Promise.all([
          documentService.getUserDocuments(),
          biometricService.getUserBiometrics()
        ]);

        const items = [
          ...documents.map(doc => ({
            title: `${doc.document_type.replace('_', ' ')} Verification`,
            date: new Date(doc.created_at!).toLocaleDateString(),
            status: doc.status === 'verified' ? 'finished' : 
                   doc.status === 'processing' ? 'in-process' : 
                   doc.status === 'pending' ? 'initiated' : 'finished'
          })),
          ...biometrics.map(bio => ({
            title: `${bio.biometric_type} Authentication`,
            date: new Date(bio.created_at!).toLocaleDateString(),
            status: bio.status === 'verified' ? 'finished' : 
                   bio.status === 'processing' ? 'in-process' : 
                   bio.status === 'pending' ? 'initiated' : 'finished'
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setVerificationItems(items);
      } catch (error) {
        console.error('Error fetching verifications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchVerifications();
    }
  }, [user]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your verification data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          "lg:ml-72"
        )}>
          <AppHeader setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.user_metadata?.name || user?.email || 'User'}
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your decentralized identity verification status.
              </p>
            </div>
            
            <div className="bg-muted/30 border border-muted rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Complete your verification</h2>
                <p className="text-sm text-muted-foreground">
                  Continue building your verified digital identity by completing additional verification steps.
                </p>
              </div>
              <Link to="/business-verification">
                <Button>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Schedule Business Verification
                </Button>
              </Link>
            </div>
            
            <StatsCards />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SecurityScoreCard />
              {verificationItems.length > 0 && (
                <VerificationStatusList items={verificationItems} />
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <RecentActivityCard />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
