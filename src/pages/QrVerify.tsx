
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { IdentityShare } from "@/components/IdentityShare";
import { cn } from "@/lib/utils";

const QrVerify = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        "lg:ml-72"
      )}>
        <AppHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Identity Share</h1>
            <p className="text-muted-foreground">
              Generate QR codes or access codes for secure identity verification.
            </p>
          </div>
          
          <IdentityShare />
        </main>
      </div>
    </div>
  );
};

export default QrVerify;
