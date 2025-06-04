
import { useState, useRef } from "react";
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
import { biometricService } from "@/services/biometricService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function BiometricVerificationFlow() {
  const [selectedTab, setSelectedTab] = useState("capture");
  const [captureActive, setCaptureActive] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "failure" | "processing" | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCapture = async () => {
    setCaptureActive(true);
    
    try {
      // Get user media for face capture
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // Simulate capture after 3 seconds
      setTimeout(() => {
        captureImage(stream);
      }, 3000);
      
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please ensure camera permissions are granted.",
        variant: "destructive",
      });
      setCaptureActive(false);
    }
  };

  const captureImage = async (stream: MediaStream) => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0);
    
    // Convert to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      // Stop camera stream
      stream.getTracks().forEach(track => track.stop());
      setCaptureActive(false);
      setFaceCaptured(true);
      
      // Convert to base64 for display
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(blob);
      
      setSelectedTab("verify");
      
      // Upload and verify biometric data
      await uploadAndVerifyBiometric(blob);
      
    }, 'image/jpeg', 0.8);
  };

  const uploadAndVerifyBiometric = async (blob: Blob) => {
    try {
      setVerificationStatus("processing");
      
      // Create file from blob
      const file = new File([blob], 'face_capture.jpg', { type: 'image/jpeg' });
      
      // Upload biometric data
      const uploadResult = await biometricService.uploadBiometricData(file, 'face');
      if (!uploadResult) {
        throw new Error('Failed to upload biometric data');
      }

      // Create verification record
      const verification = await biometricService.createVerification({
        biometric_type: 'face',
        template_hash: uploadResult.templateHash,
        status: 'pending'
      });

      if (!verification) {
        throw new Error('Failed to create verification record');
      }

      // Start verification process
      await startVerification(verification.id, 'face', uploadResult.templateHash);
      
    } catch (error) {
      console.error('Biometric processing error:', error);
      setVerificationStatus("failure");
      toast({
        title: "Processing failed",
        description: "Failed to process biometric data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startVerification = async (biometricId: string, biometricType: string, templateHash: string) => {
    try {
      setProcessingStage(0);
      
      // Call the verify-biometric edge function
      const { data, error } = await supabase.functions.invoke('verify-biometric', {
        body: {
          biometricId,
          biometricType,
          templateHash
        }
      });

      if (error) {
        throw error;
      }

      // Simulate processing stages for UI
      const stages = [25, 50, 75, 100];
      for (let i = 0; i < stages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProcessingStage(stages[i]);
      }

      if (data.success) {
        setVerificationResult(data.result);
        setVerificationStatus(data.result.status === 'verified' ? "success" : "failure");
      } else {
        setVerificationStatus("failure");
      }
      
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus("failure");
      toast({
        title: "Verification failed",
        description: "Biometric verification failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetVerification = () => {
    setFaceCaptured(false);
    setVerificationStatus(null);
    setVerificationResult(null);
    setProcessingStage(0);
    setCapturedImage(null);
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
                <CardTitle>DeepFace Biometric Capture</CardTitle>
                <CardDescription>
                  Align your face in the camera frame for AI-powered biometric verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                  {captureActive ? (
                    <div className="relative w-full h-full">
                      <video ref={videoRef} className="w-full h-full object-cover" />
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
                        </div>
                      </div>
                    </div>
                  ) : capturedImage ? (
                    <img src={capturedImage} alt="Captured face" className="w-full h-full object-cover" />
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
                    <h4 className="text-sm font-medium mb-2">DeepFace ML Pipeline:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                      <li>Face Detection (MTCNN/RetinaFace)</li>
                      <li>Landmark Extraction & Alignment</li>
                      <li>Feature Extraction (FaceNet/ArcFace)</li>
                      <li>Liveness Detection & Anti-Spoofing</li>
                      <li>Template Matching & Scoring</li>
                    </ol>
                  </div>
                  
                  <Button onClick={startCapture} className="w-full" disabled={captureActive}>
                    {captureActive ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scanning with AI...
                      </>
                    ) : faceCaptured ? (
                      "Retake Photo"
                    ) : (
                      "Start AI Facial Scan"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>DeepFace AI Processing</CardTitle>
                <CardDescription>
                  Analyzing biometric data with advanced ML models
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
                      <span>Face detection (MTCNN)</span>
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
                      <span>Liveness & anti-spoofing</span>
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
                      <span>Feature extraction (FaceNet)</span>
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
                      View AI Results
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result">
            <Card>
              <CardHeader>
                <CardTitle>AI Verification Results</CardTitle>
                <CardDescription>
                  {verificationStatus === "success" 
                    ? "Your biometric identity has been verified using DeepFace AI" 
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
                      <h3 className="mt-4 text-xl font-semibold">AI Identity Confirmed</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        Your biometric identity has been verified using advanced DeepFace models and securely stored on blockchain.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">Verification Failed</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        AI could not verify biometric data. Please ensure good lighting and clear face visibility.
                      </p>
                    </>
                  )}
                </div>
                
                {verificationStatus === "success" && verificationResult && (
                  <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">DeepFace Analysis:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Confidence Score:</div>
                      <div>{(verificationResult.confidence_score * 100).toFixed(1)}%</div>
                      {verificationResult.liveness_score && (
                        <>
                          <div className="text-muted-foreground">Liveness Score:</div>
                          <div>{(verificationResult.liveness_score * 100).toFixed(1)}%</div>
                        </>
                      )}
                      <div className="text-muted-foreground">Blockchain TX:</div>
                      <div className="truncate">{verificationResult.blockchain_hash?.substring(0, 10)}...</div>
                    </div>
                    {verificationResult.verification_metadata && (
                      <div className="mt-3 text-xs text-muted-foreground">
                        ML Models: {verificationResult.verification_metadata.models_used?.join(', ') || 'DeepFace Pipeline'}
                      </div>
                    )}
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
