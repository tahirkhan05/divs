
import { useState } from "react";
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

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const verificationItems = [
    {
      title: "Passport Verification Completed",
      date: "Today, 10:42 AM",
      status: "finished" as const,
    },
    {
      title: "Biometric Authentication",
      date: "In progress...",
      status: "in-process" as const,
    },
    {
      title: "Business Verification",
      date: "Scheduled for May 21, 2025",
      status: "initiated" as const,
    },
    {
      title: "Address Proof Document",
      date: "Awaiting review",
      status: "in-process" as const,
    },
    {
      title: "Identity Card Submission",
      date: "May 16, 2025",
      status: "finished" as const,
    },
  ];

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
                Welcome back, {user?.name || 'User'}
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your decentralized identity verification status.
              </p>
            </div>
            
            <div className="bg-muted/30 border border-muted rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Complete your verification</h2>
                <p className="text-sm text-muted-foreground">
                  You're 80% verified! Schedule a business verification to reach 100% verification status.
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
              <VerificationStatusList items={verificationItems} />
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
