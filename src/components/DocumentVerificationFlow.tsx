
import { useState } from "react";
import { 
  Upload, 
  FileCheck, 
  FileX, 
  Loader2, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DocumentVerificationFlow() {
  const [selectedTab, setSelectedTab] = useState("upload");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "failure" | "processing" | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setSelectedTab("verify");
    
    // Mock verification process
    setVerificationStatus("processing");
    simulateProcessing();
  };

  const simulateProcessing = () => {
    setProcessingStage(0);
    
    // Simulate document analysis
    const timer1 = setTimeout(() => {
      setProcessingStage(33);
    }, 1500);
    
    // Simulate authenticity verification
    const timer2 = setTimeout(() => {
      setProcessingStage(66);
    }, 3000);
    
    // Simulate blockchain registration
    const timer3 = setTimeout(() => {
      setProcessingStage(100);
      // 80% chance of success, 20% chance of failure
      setVerificationStatus(Math.random() > 0.2 ? "success" : "failure");
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const resetVerification = () => {
    setUploadedFile(null);
    setVerificationStatus(null);
    setProcessingStage(0);
    setSelectedTab("upload");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fade-in">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" disabled={verificationStatus === "processing"}>Upload</TabsTrigger>
          <TabsTrigger value="verify" disabled={!uploadedFile || verificationStatus === "processing"}>Verify</TabsTrigger>
          <TabsTrigger value="result" disabled={verificationStatus !== "success" && verificationStatus !== "failure"}>Result</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>
                  Upload a government-issued ID document for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="rounded-full bg-muted p-3">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Drag & drop your document here
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Support formats: PDF, JPEG, PNG (max 10MB)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <label htmlFor="file-upload">
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Button variant="secondary" size="sm" className="mt-2" onClick={() => document.getElementById("file-upload")?.click()}>
                          Select file
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Accepted documents:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-identity-green" />
                      <span className="text-sm">Passport</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-identity-green" />
                      <span className="text-sm">Driver's License</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-identity-green" />
                      <span className="text-sm">National ID Card</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileX className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">Student ID</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>Verifying Document</CardTitle>
                <CardDescription>
                  {uploadedFile ? `Processing: ${uploadedFile.name}` : "Analyzing your document"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress value={processingStage} className="h-2" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 33 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      )}
                      <span>Document analysis</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 33 ? "Complete" : "In progress..."}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 66 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : processingStage >= 33 ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      <span>Authenticity verification</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 66 ? "Complete" : processingStage >= 33 ? "In progress..." : "Waiting"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {processingStage >= 100 ? (
                        <CheckCircle className="h-5 w-5 text-identity-green" />
                      ) : processingStage >= 66 ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      <span>Blockchain registration</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {processingStage >= 100 ? "Complete" : processingStage >= 66 ? "In progress..." : "Waiting"}
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
                    ? "Your document has been successfully verified" 
                    : "There was an issue with your document"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-4">
                  {verificationStatus === "success" ? (
                    <>
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
                        <CheckCircle className="h-12 w-12 text-identity-green" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">Verification Successful</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        Your document has been verified and securely stored on the blockchain. 
                        It's now part of your decentralized identity.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">Verification Failed</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        We couldn't verify your document. This could be due to image quality, 
                        document validity, or other factors.
                      </p>
                    </>
                  )}
                </div>
                
                {verificationStatus === "success" && (
                  <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Verification details:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Document type:</div>
                      <div>Passport</div>
                      <div className="text-muted-foreground">Verified on:</div>
                      <div>May 18, 2025</div>
                      <div className="text-muted-foreground">Blockchain TX:</div>
                      <div className="truncate">0x71C...9E3F</div>
                    </div>
                  </div>
                )}
                
                <div className="pt-2 flex gap-4">
                  <Button onClick={resetVerification} variant={verificationStatus === "success" ? "outline" : "default"} className="flex-1">
                    {verificationStatus === "success" ? "Verify Another Document" : "Try Again"}
                  </Button>
                  {verificationStatus === "success" && (
                    <Button className="flex-1">View on Blockchain</Button>
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
