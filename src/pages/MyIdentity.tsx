import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Fingerprint, FileCheck, CheckCircle, Clock, AlertTriangle, QrCode, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getUserDisplayInfo } from "@/types/auth";

const MyIdentity = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const userInfo = getUserDisplayInfo(user);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          "lg:ml-72"
        )}>
          <AppHeader setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">My Digital Identity</h1>
              <p className="text-muted-foreground">
                Manage your secure, blockchain-verified identity and control your personal data.
              </p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="verifications">Verifications</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle>Personal Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                          <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold">{userInfo.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: DIVS-{user?.id?.slice(-8)}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Email</span>
                          <span className="text-sm font-medium">{userInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Phone</span>
                          <span className="text-sm font-medium">{userInfo.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Created</span>
                          <span className="text-sm font-medium">
                            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Updated</span>
                          <span className="text-sm font-medium">
                            {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Unknown'}
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Shield className="mr-2 h-4 w-4" />
                        Update Profile
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle>Verification Status</CardTitle>
                      <CardDescription>
                        Overall verification progress
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-2">
                              <FileCheck className="h-6 w-6 text-identity-green" />
                            </div>
                            <span className="text-sm font-medium">Document</span>
                            <Badge className="mt-1 bg-identity-green">Verified</Badge>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-2">
                              <Fingerprint className="h-6 w-6 text-identity-green" />
                            </div>
                            <span className="text-sm font-medium">Biometric</span>
                            <Badge className="mt-1 bg-identity-green">Verified</Badge>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3 mb-2">
                              <Briefcase className="h-6 w-6 text-identity-orange" />
                            </div>
                            <span className="text-sm font-medium">Business</span>
                            <Badge className="mt-1 bg-identity-orange">Pending</Badge>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Overall Verification</h4>
                            <span className="text-sm font-medium">80% Complete</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-identity-purple h-2.5 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Complete business verification to reach 100% verified status.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1">
                          <QrCode className="mr-2 h-4 w-4" />
                          Generate ID QR Code
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Briefcase className="mr-2 h-4 w-4" />
                          Schedule Business Verification
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="verifications">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification History</CardTitle>
                      <CardDescription>Recent verification activities and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 border rounded-md">
                          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                            <FileCheck className="h-5 w-5 text-identity-green" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Passport Verification</h4>
                              <Badge className="bg-identity-green">Completed</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">May 15, 2025 • TX: 0x71C...9E3F</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-3 border rounded-md">
                          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                            <Fingerprint className="h-5 w-5 text-identity-green" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Biometric Authentication</h4>
                              <Badge className="bg-identity-green">Completed</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">May 16, 2025 • TX: 0x83F...12BD</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-3 border rounded-md">
                          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-2">
                            <Clock className="h-5 w-5 text-identity-orange" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Business Verification</h4>
                              <Badge className="bg-identity-orange">Scheduled</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">May 21, 2025 • Awaiting appointment</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-3 border rounded-md">
                          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Address Verification</h4>
                              <Badge variant="destructive">Failed</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">May 14, 2025 • Document needs renewal</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Identity Activities</CardTitle>
                      <CardDescription>Recent activity with your digital identity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-2 border-identity-purple pl-4 py-1">
                          <p className="text-sm font-medium">Identity shared with Example Bank Ltd.</p>
                          <p className="text-xs text-muted-foreground">May 17, 2025 • 14:32</p>
                        </div>
                        
                        <div className="border-l-2 border-identity-purple pl-4 py-1">
                          <p className="text-sm font-medium">New verification method added: Fingerprint</p>
                          <p className="text-xs text-muted-foreground">May 16, 2025 • 10:15</p>
                        </div>
                        
                        <div className="border-l-2 border-identity-purple pl-4 py-1">
                          <p className="text-sm font-medium">Document uploaded: Passport</p>
                          <p className="text-xs text-muted-foreground">May 15, 2025 • 09:41</p>
                        </div>
                        
                        <div className="border-l-2 border-identity-purple pl-4 py-1">
                          <p className="text-sm font-medium">Profile created</p>
                          <p className="text-xs text-muted-foreground">May 12, 2025 • 16:20</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyIdentity;
