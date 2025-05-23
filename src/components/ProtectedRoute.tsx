
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "./AuthDialog";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="bg-gradient-verification p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to DIVS
            </h1>
            <p className="text-lg text-muted-foreground">
              Decentralized Identity Verification System
            </p>
            <p className="text-sm text-muted-foreground">
              Please sign in or create an account to access the platform
            </p>
          </div>
          
          <div className="space-y-4">
            <Button onClick={() => setAuthDialogOpen(true)} className="w-full" size="lg">
              Get Started
            </Button>
            <p className="text-xs text-muted-foreground">
              Secure • Decentralized • Verified
            </p>
          </div>
        </div>
        
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </div>
    );
  }

  return <>{children}</>;
}
