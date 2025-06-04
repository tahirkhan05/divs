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
import { documentService } from "@/services/documentService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function DocumentVerificationFlow() {
  const [selectedTab, setSelectedTab] = useState("upload");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "failure" | "processing" | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

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

  const handleFile = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    try {
      // Upload file to Supabase Storage
      const uploadResult = await documentService.uploadDocument(file, 'passport');
      if (!uploadResult) {
        throw new Error('Failed to upload document');
      }

      // Create verification record
      const verification = await documentService.createVerification({
        document_type: 'passport',
        file_url: uploadResult.fileUrl,
        file_name: uploadResult.fileName,
        status: 'pending'
      });

      if (!verification) {
        throw new Error('Failed to create verification record');
      }

      setSelectedTab("verify");
      
      // Start real verification process
      setVerificationStatus("processing");
      await startVerification(verification.id, uploadResult.fileUrl, 'passport');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const startVerification = async (documentId: string, fileUrl: string, documentType: string) => {
    try {
      setProcessingStage(0);
      
      // Call the verify-document edge function
      const { data, error } = await supabase.functions.invoke('verify-document', {
        body: {
          documentId,
          fileUrl,
          documentType
        }
      });

      if (error) {
        throw error;
      }

      // Simulate processing stages for UI
      const stages = [25, 50, 75, 100];
      for (let i = 0; i < stages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
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
        description: "Document verification failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetVerification = () => {
    setUploadedFile(null);
    setVerificationStatus(null);
    setVerificationResult(null);
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
                  Upload a government-issued ID document for ML-powered verification
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
                      {isUploading ? (
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      ) : (
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {isUploading ? "Uploading..." : "Drag & drop your document here"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Support formats: PDF, JPEG, PNG (max 10MB)
                      </p>
                    </div>
                    {!isUploading && (
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
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">ML Processing Pipeline:</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                    <div>• Document Detection & Segmentation (U-Net)</div>
                    <div>• OCR Text Extraction (TensorFlow/Tesseract)</div>
                    <div>• Authenticity Verification (ML Models)</div>
                    <div>• Quality Assessment & Scoring</div>
                    <div>• Blockchain Hash Generation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Verification</CardTitle>
                <CardDescription>
                  {uploadedFile ? `Processing: ${uploadedFile.name}` : "Analyzing your document with ML models"}
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
                      <span>Document segmentation (U-Net)</span>
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
                      <span>OCR & text extraction</span>
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
                      <span>Authenticity verification</span>
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
                      <span>Blockchain registration</span>
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
                <CardTitle>ML Verification Results</CardTitle>
                <CardDescription>
                  {verificationStatus === "success" 
                    ? "Your document has been successfully verified using AI" 
                    : "There was an issue with your document verification"}
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
                        Your document has been verified using advanced ML models and securely stored on the blockchain.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">Verification Failed</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        AI verification could not confirm document authenticity. Please ensure image quality and try again.
                      </p>
                    </>
                  )}
                </div>
                
                {verificationStatus === "success" && verificationResult && (
                  <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">ML Analysis Results:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Confidence Score:</div>
                      <div>{(verificationResult.confidence_score * 100).toFixed(1)}%</div>
                      <div className="text-muted-foreground">Extracted Name:</div>
                      <div>{verificationResult.extracted_data?.full_name || 'N/A'}</div>
                      <div className="text-muted-foreground">Document Number:</div>
                      <div>{verificationResult.extracted_data?.document_number || 'N/A'}</div>
                      <div className="text-muted-foreground">Blockchain TX:</div>
                      <div className="truncate">{verificationResult.blockchain_hash?.substring(0, 10)}...</div>
                    </div>
                    {verificationResult.verification_metadata && (
                      <div className="mt-3 text-xs text-muted-foreground">
                        ML Models Used: {verificationResult.verification_metadata.ml_models_used?.join(', ') || 'Standard ML Pipeline'}
                      </div>
                    )}
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
