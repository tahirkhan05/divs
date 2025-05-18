
import { useState } from "react";
import { 
  QrCode, 
  Copy, 
  CheckCircle, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function QRVerification() {
  const [tab, setTab] = useState("generate");
  const [fullAccess, setFullAccess] = useState(false);
  const [idOnly, setIdOnly] = useState(true);
  const [addressInfo, setAddressInfo] = useState(false);
  const [financialData, setFinancialData] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);

  const handleGenerateQR = () => {
    setQrGenerated(true);
  };

  const mockCopyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartScan = () => {
    setScanProgress(0);
    setScanComplete(false);
    setAccessGranted(null);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          // 90% chance of success
          setAccessGranted(Math.random() > 0.1);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    return () => clearInterval(interval);
  };

  const resetScan = () => {
    setScanProgress(0);
    setScanComplete(false);
    setAccessGranted(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fade-in">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate QR</TabsTrigger>
          <TabsTrigger value="scan">Scan QR</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Generate Verification QR</CardTitle>
                <CardDescription>
                  Create a QR code to share your identity securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!qrGenerated ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Information to include:</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="id-only">Basic Identity</Label>
                          <p className="text-xs text-muted-foreground">Name, ID number, photo</p>
                        </div>
                        <Switch id="id-only" checked={idOnly} onCheckedChange={setIdOnly} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="address-info">Address Information</Label>
                          <p className="text-xs text-muted-foreground">Home address, contact details</p>
                        </div>
                        <Switch id="address-info" checked={addressInfo} onCheckedChange={setAddressInfo} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="financial-data">Financial Credentials</Label>
                          <p className="text-xs text-muted-foreground">Employment, income verification</p>
                        </div>
                        <Switch id="financial-data" checked={financialData} onCheckedChange={setFinancialData} />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-0.5">
                          <Label htmlFor="full-access" className="font-medium">Full Access</Label>
                          <p className="text-xs text-muted-foreground">Grant complete access to all identity data</p>
                        </div>
                        <Switch id="full-access" checked={fullAccess} onCheckedChange={checked => {
                          setFullAccess(checked);
                          if (checked) {
                            setIdOnly(true);
                            setAddressInfo(true);
                            setFinancialData(true);
                          }
                        }} />
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Access control:</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="text-muted-foreground">Expires after:</div>
                        <div>24 hours</div>
                        <div className="text-muted-foreground">Usage limit:</div>
                        <div>1 time</div>
                        <div className="text-muted-foreground">Verification method:</div>
                        <div>Blockchain confirmation</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleGenerateQR} 
                      className="w-full"
                      disabled={!idOnly && !addressInfo && !financialData}
                    >
                      Generate QR Code
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="bg-white p-4 rounded-lg">
                        <QrCode className="h-48 w-48 text-black" strokeWidth={1} />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="font-medium">Temporary Identity QR</h3>
                        <p className="text-xs text-muted-foreground mt-1">Valid for 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Shared information:</h4>
                      <div className="space-y-1 text-sm">
                        {idOnly && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-identity-green" />
                            <span>Basic Identity</span>
                          </div>
                        )}
                        {addressInfo && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-identity-green" />
                            <span>Address Information</span>
                          </div>
                        )}
                        {financialData && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-identity-green" />
                            <span>Financial Credentials</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button onClick={() => setQrGenerated(false)} variant="outline" className="flex-1">
                        Reset
                      </Button>
                      <Button onClick={mockCopyToClipboard} className="flex-1">
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scan">
            <Card>
              <CardHeader>
                <CardTitle>Scan Verification QR</CardTitle>
                <CardDescription>
                  Scan a QR code to verify someone's identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!scanComplete ? (
                  <>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                      {scanProgress > 0 && scanProgress < 100 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-48 h-48">
                            <div className="w-full h-full border-4 border-primary/60 rounded-lg absolute animate-pulse-slow"></div>
                            <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${scanProgress}%`, transition: "width 300ms ease-in-out" }}
                              ></div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                              <Loader2 className="h-10 w-10 text-primary animate-spin" />
                              <span className="text-sm mt-2">Scanning...</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">Position QR code in the frame</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Instructions:</h4>
                        <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>Hold the QR code steady in frame</li>
                          <li>Ensure good lighting conditions</li>
                          <li>Wait for blockchain verification</li>
                          <li>View secured identity information</li>
                        </ol>
                      </div>
                      
                      <Button 
                        onClick={handleStartScan} 
                        className="w-full"
                        disabled={scanProgress > 0 && scanProgress < 100}
                      >
                        {scanProgress > 0 && scanProgress < 100 ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scanning... {scanProgress}%
                          </>
                        ) : (
                          <>Start Scanning</>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-4">
                      {accessGranted ? (
                        <>
                          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
                            <ShieldCheck className="h-12 w-12 text-identity-green" />
                          </div>
                          <h3 className="mt-4 text-xl font-semibold">Access Granted</h3>
                          <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                            The identity has been verified on the blockchain. 
                            You can now view the shared information.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6">
                            <AlertCircle className="h-12 w-12 text-destructive" />
                          </div>
                          <h3 className="mt-4 text-xl font-semibold">Access Denied</h3>
                          <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                            This QR code is invalid or has expired. 
                            Please request a new verification code.
                          </p>
                        </>
                      )}
                    </div>
                    
                    {accessGranted && (
                      <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                        <h4 className="text-sm font-medium">Verified Information:</h4>
                        
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <h5 className="text-sm font-medium">Basic Identity:</h5>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <div className="text-muted-foreground">Name:</div>
                              <div>Jane Smith</div>
                              <div className="text-muted-foreground">ID Number:</div>
                              <div>•••• •••• 4321</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="text-sm font-medium">Verification Status:</h5>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <div className="text-muted-foreground">Blockchain verified:</div>
                              <div>May 18, 2025</div>
                              <div className="text-muted-foreground">Expiration:</div>
                              <div>May 19, 2025</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      <Button onClick={resetScan} variant="outline" className="flex-1">
                        Scan Again
                      </Button>
                      {accessGranted && (
                        <Button className="flex-1">
                          View Full Profile
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
