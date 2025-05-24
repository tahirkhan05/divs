
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [loginPhone, setLoginPhone] = useState("");
  const [loginOTP, setLoginOTP] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupOTP, setSignupOTP] = useState("");
  const [loginOTPSent, setLoginOTPSent] = useState(false);
  const [signupOTPSent, setSignupOTPSent] = useState(false);
  
  const { login, signup, sendOTP } = useAuth();
  const { toast } = useToast();

  const handleSendLoginOTP = () => {
    if (sendOTP(loginPhone)) {
      setLoginOTPSent(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${loginPhone}. Use 123456 for demo.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
    }
  };

  const handleSendSignupOTP = () => {
    if (sendOTP(signupPhone)) {
      setSignupOTPSent(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${signupPhone}. Use 123456 for demo.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginPhone, loginOTP)) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      onOpenChange(false);
      resetLoginForm();
    } else {
      toast({
        title: "Login failed",
        description: "Invalid phone number or OTP. Make sure you're registered and use OTP: 123456",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(signupName, signupEmail, signupPhone, signupOTP)) {
      toast({
        title: "Account created",
        description: "Welcome to DIVS!",
      });
      onOpenChange(false);
      resetSignupForm();
    } else {
      toast({
        title: "Signup failed",
        description: "Please check your information and use OTP: 123456",
        variant: "destructive",
      });
    }
  };

  const resetLoginForm = () => {
    setLoginPhone("");
    setLoginOTP("");
    setLoginOTPSent(false);
  };

  const resetSignupForm = () => {
    setSignupName("");
    setSignupEmail("");
    setSignupPhone("");
    setSignupOTP("");
    setSignupOTPSent(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleSendLoginOTP}
                    disabled={!loginPhone || loginOTPSent}
                    variant="outline"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {loginOTPSent ? "Sent" : "Send OTP"}
                  </Button>
                </div>
              </div>
              {loginOTPSent && (
                <div className="space-y-2">
                  <Label htmlFor="login-otp">Enter OTP</Label>
                  <Input
                    id="login-otp"
                    type="text"
                    placeholder="123456"
                    value={loginOTP}
                    onChange={(e) => setLoginOTP(e.target.value)}
                    required
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Demo OTP: 123456</p>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={!loginOTPSent || !loginOTP}>
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email Address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="john@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleSendSignupOTP}
                    disabled={!signupPhone || signupOTPSent}
                    variant="outline"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {signupOTPSent ? "Sent" : "Send OTP"}
                  </Button>
                </div>
              </div>
              {signupOTPSent && (
                <div className="space-y-2">
                  <Label htmlFor="signup-otp">Enter OTP</Label>
                  <Input
                    id="signup-otp"
                    type="text"
                    placeholder="123456"
                    value={signupOTP}
                    onChange={(e) => setSignupOTP(e.target.value)}
                    required
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Demo OTP: 123456</p>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={!signupOTPSent || !signupOTP}>
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
