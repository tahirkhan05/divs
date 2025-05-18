
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SecurityScoreCard } from "@/components/dashboard/SecurityScoreCard";
import { VerificationStatusCard } from "@/components/dashboard/VerificationStatusCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { cn } from "@/lib/utils";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarOpen ? "lg:ml-72" : ""
      )}>
        <AppHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Jane</h1>
            <p className="text-muted-foreground">
              Here's an overview of your decentralized identity verification status.
            </p>
          </div>
          
          <StatsCards />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecurityScoreCard />
            <VerificationStatusCard />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <RecentActivityCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
