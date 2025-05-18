
import { useState, useRef, useEffect } from "react";
import { 
  Scan, 
  Fingerprint, 
  CheckCircle, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BiometricVerificationFlow() {
  const [selectedTab, setSelectedTab] = useState("capture");
  const [captureActive, setCaptureActive] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "failure" | "processing" | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCapture = () => {
    setCaptureActive(true);
    
    // Mock video feed with animation
    const timer = setTimeout(() => {
      setCaptureActive(false);
      setFaceCaptured(true);
      setSelectedTab("verify");
      startVerification();
    }, 3000);
    
    return () => clearTimeout(timer);
  };

  const startVerification = () => {
    setVerificationStatus("processing");
    setProcessingStage(0);
    
    // Simulate face detection
    const timer1 = setTimeout(() => {
      setProcessingStage(25);
    }, 1200);
    
    // Simulate liveness check
    const timer2 = setTimeout(() => {
      setProcessingStage(50);
    }, 2500);
    
    // Simulate biometric matching
    const timer3 = setTimeout(() => {
      setProcessingStage(75);
    }, 3800);
    
    // Simulate blockchain verification
    const timer4 = setTimeout(() => {
      setProcessingStage(100);
      // 80% chance of success
      setVerificationStatus(Math.random() > 0.2 ? "success" : "failure");
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const resetVerification = () => {
    setFaceCaptured(false);
    setVerificationStatus(null);
    setProcessingStage(0);
    setSelectedTab("capture");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fade-in">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="capture" disabled={verificationStatus === "processing"}>Capture</TabsTrigger>
          <TabsTrigger value="verify" disabled={!faceCaptured || verificationStatus === "processing"}>Verify</TabsTrigger>
          <TabsTrigger value="result" disabled={verificationStatus !== "success" && verificationStatus !== "failure"}>Result</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="capture">
            <Card>
              <CardHeader>
                <CardTitle>Biometric Capture</CardTitle>
                <CardDescription>
                  Align your face in the camera frame for biometric verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                  {captureActive ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="w-full h-full border-4 border-primary/60 rounded-full absolute animate-pulse-slow"></div>
                        <div className="w-full h-full">
                          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="#3B82F6"
                              strokeWidth="4"
                              strokeDasharray="60, 250"
                              strokeLinecap="round"
                              fill="transparent"
                            />
                          </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Scan className="h-10 w-10 text-primary" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                    </div>
                  )}
                  <video ref={videoRef} className="w-full h-full object-cover hidden" />
                  <canvas ref={canvasRef} className="hidden" width="640" height="480" />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Instructions:</h4>
                    <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>Ensure your face is clearly visible</li>
                      <li>Remove glasses and face coverings</li>
                      <li>Find a well-lit environment</li>
                      <li>Look directly at the camera</li>
                    </ol>
                  </div>
                  
                  <Button onClick={startCapture} className="w-full">
                    {captureActive ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>Start Facial Scan</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>Verifying Biometrics</CardTitle>
                <CardDescription>
                  Analyzing and processing your biometric data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress value={processingStage} className="h-2" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 25 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      )}
                      <span>Face detection</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 25 ? "Complete" : "In progress..."}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 50 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : processingStage >= 25 ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      <span>Liveness check</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 50 ? "Complete" : processingStage >= 25 ? "In progress..." : "Waiting"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 75 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : processingStage >= 50 ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      <span>Biometric matching</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 75 ? "Complete" : processingStage >= 50 ? "In progress..." : "Waiting"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 100 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : processingStage >= 75 ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      <span>Blockchain verification</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 100 ? "Complete" : processingStage >= 75 ? "In progress..." : "Waiting"}
                    </span>
                  </div>
                </div>
                
                {processingStage === 100 && (
                  <div className="pt-2">
                    <Button onClick={() => setSelectedTab("result")} className="w-full">
                      View Results
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result">
            <Card>
              <CardHeader>
                <CardTitle>Verification Results</CardTitle>
                <CardDescription>
                  {verificationStatus === "success" 
                    ? "Your biometric verification was successful" 
                    : "There was an issue with your biometric verification"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-4">
                  {verificationStatus === "success" ? (
                    <>
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
                        <Fingerprint className="h-12 w-12 text-identity-green" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">Identity Confirmed</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        Your biometric identity has been verified and securely stored. 
                        Your digital identity is now ready for secure authentication.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">Verification Failed</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        We couldn't verify your biometric data. This could be due to lighting conditions,
                        camera quality, or other factors.
                      </p>
                    </>
                  )}
                </div>
                
                {verificationStatus === "success" && (
                  <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Verification details:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Confidence level:</div>
                      <div>97.4%</div>
                      <div className="text-muted-foreground">Verified on:</div>
                      <div>May 18, 2025</div>
                      <div className="text-muted-foreground">Blockchain TX:</div>
                      <div className="truncate">0x83F...12BD</div>
                    </div>
                  </div>
                )}
                
                <div className="pt-2 flex gap-4">
                  <Button onClick={resetVerification} variant={verificationStatus === "success" ? "outline" : "default"} className="flex-1">
                    {verificationStatus === "success" ? "New Verification" : "Try Again"}
                  </Button>
                  {verificationStatus === "success" && (
                    <Button className="flex-1">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      View Identity
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
