import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  FileQuestion,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Globe
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HelpSupport = () => {
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
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">
              Get assistance with your identity verification and account management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about identity verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      What is blockchain-based identity verification?
                    </AccordionTrigger>
                    <AccordionContent>
                      Blockchain-based identity verification uses distributed ledger technology to securely store and 
                      verify your identity credentials. Unlike traditional systems, blockchain ensures your data 
                      cannot be altered or tampered with once verified, providing a higher level of security and 
                      trust. Your data is encrypted and you control who can access it through secure permissions.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How secure is my personal data on this platform?
                    </AccordionTrigger>
                    <AccordionContent>
                      Your data is secured using multiple layers of protection: end-to-end encryption, 
                      distributed storage on blockchain, and advanced access controls. We follow the 
                      highest security standards and comply with data protection regulations like GDPR. 
                      Additionally, our system regularly undergoes security audits and penetration testing 
                      to ensure your information remains protected.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Why do I need to complete business verification?
                    </AccordionTrigger>
                    <AccordionContent>
                      Business verification adds an additional layer of security to your identity by 
                      confirming your identity in person at one of our partner businesses. This process 
                      helps prevent fraud and ensures the highest level of trust in the verification 
                      system. Completing this step will bring your identity verification to 100% and 
                      allow access to premium features of the platform.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      What documents are accepted for verification?
                    </AccordionTrigger>
                    <AccordionContent>
                      We accept government-issued identification documents such as passports, 
                      driver's licenses, and national ID cards. All documents must be valid (not expired), 
                      contain your photo, full name, date of birth, and a unique identification number. 
                      The document should be in good condition with all text clearly legible.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How long does the verification process take?
                    </AccordionTrigger>
                    <AccordionContent>
                      Document and biometric verification typically takes just a few minutes to complete. 
                      Once submitted, our AI system processes your verification almost instantly in most cases. 
                      For business verification, you'll need to schedule an appointment with a partner location, 
                      and the in-person verification itself usually takes about 15-20 minutes.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      What happens if my verification fails?
                    </AccordionTrigger>
                    <AccordionContent>
                      If your verification fails, you'll receive a notification explaining the reason. 
                      Common issues include poor image quality, expired documents, or mismatched information. 
                      You can attempt the verification process again after addressing these issues. 
                      If you continue to have problems, please contact our support team for assistance.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get help from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <span>support@divs-blockchain.com</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <span>+1 (800) 555-DIVS</span>
                  </div>
                  
                  <Button className="w-full mt-2">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    User Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Troubleshooting Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Knowledge Base
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>
                We'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Describe your issue in detail" rows={5} />
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default HelpSupport;
