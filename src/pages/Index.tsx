
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SecurityScoreCard } from "@/components/dashboard/SecurityScoreCard";
import { VerificationStatusCard } from "@/components/dashboard/VerificationStatusCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { AuthDialog } from "@/components/AuthDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { documentService } from "@/services/documentService";
import { biometricService } from "@/services/biometricService";
import { securityScoreService } from "@/services/securityScoreService";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    documents: [],
    biometrics: [],
    securityScore: null,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboardData();
    }
  }, [isAuthenticated, user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load real data from services
      const [documents, biometrics, securityScore, activityLogs] = await Promise.all([
        documentService.getUserDocuments(),
        biometricService.getUserBiometrics(),
        securityScoreService.getUserSecurityScore(),
        loadRecentActivity()
      ]);

      setDashboardData({
        documents,
        biometrics,
        securityScore,
        recentActivity: activityLogs
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error loading activity logs:', error);
      return [];
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="bg-gradient-verification p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to DIVS
            </h1>
            <p className="text-lg text-muted-foreground">
              Decentralized Identity Verification System
            </p>
            <p className="text-sm text-muted-foreground">
              Please sign in or create an account to access the platform
            </p>
          </div>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AI-Powered Document Verification</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>DeepFace Biometric Authentication</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Blockchain Identity Storage</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>ML-Powered Security Scoring</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button onClick={() => setAuthDialogOpen(true)} className="w-full" size="lg">
              Get Started
            </Button>
            <p className="text-xs text-muted-foreground">
              Secure • Decentralized • Verified
            </p>
          </div>
        </div>
        
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </div>
    );
  }

  const verifiedDocuments = dashboardData.documents.filter(doc => doc.status === 'verified').length;
  const verifiedBiometrics = dashboardData.biometrics.filter(bio => bio.status === 'verified').length;
  const overallScore = dashboardData.securityScore?.overall_score || 0;

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-72">
        <AppHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI-Powered Identity Dashboard
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your decentralized identity with advanced ML verification
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-8">
                <StatsCards 
                  verifiedDocuments={verifiedDocuments}
                  verifiedBiometrics={verifiedBiometrics}
                  overallScore={overallScore}
                  totalVerifications={dashboardData.documents.length + dashboardData.biometrics.length}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SecurityScoreCard 
                    score={overallScore}
                    documentScore={dashboardData.securityScore?.document_score || 0}
                    biometricScore={dashboardData.securityScore?.biometric_score || 0}
                    businessScore={dashboardData.securityScore?.business_score || 0}
                  />
                  <VerificationStatusCard 
                    documents={dashboardData.documents}
                    biometrics={dashboardData.biometrics}
                  />
                </div>
                
                <RecentActivityCard activities={dashboardData.recentActivity} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
