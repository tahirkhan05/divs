
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldCheck, ShieldAlert, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SecurityScore = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const securityScore = 78; // Mocked security score

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarOpen ? "lg:ml-72" : ""
      )}>
        <AppHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Security Score</h1>
            <p className="text-muted-foreground">
              An analysis of your identity verification security and recommendations for improvement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Your Security Score</CardTitle>
                <CardDescription>
                  Based on your verification methods and activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-background flex items-center justify-center">
                        <div className="text-4xl font-bold">
                          {securityScore}%
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                        <ShieldCheck className="h-6 w-6 text-identity-green" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Your identity security is good. Complete business verification to achieve a higher score.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Components</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-identity-green" />
                          <span>Document Verification</span>
                        </div>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-identity-green" />
                          <span>Biometric Verification</span>
                        </div>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-1" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-identity-orange" />
                          <span>Business Verification</span>
                        </div>
                        <span className="font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-1" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-identity-green" />
                          <span>Two-Factor Authentication</span>
                        </div>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Recommendations</h3>
                  <div className="grid gap-2">
                    <div className="flex gap-2 items-start rounded-md border p-3">
                      <ShieldAlert className="h-5 w-5 text-identity-orange mt-0.5" />
                      <div>
                        <h4 className="font-medium">Complete Business Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Schedule an in-person verification appointment with one of our partner businesses to reach 100% security score.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start rounded-md border p-3">
                      <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">Set up Recovery Options</h4>
                        <p className="text-sm text-muted-foreground">
                          Add backup recovery methods to ensure you never lose access to your digital identity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecurityScore;
