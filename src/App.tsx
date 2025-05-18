
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DocumentVerification from "./pages/DocumentVerification";
import BiometricVerification from "./pages/BiometricVerification";
import BusinessVerification from "./pages/BusinessVerification";
import QrVerify from "./pages/QrVerify";
import SecurityScore from "./pages/SecurityScore";
import MyIdentity from "./pages/MyIdentity";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/document-verification" element={<DocumentVerification />} />
          <Route path="/biometric-verification" element={<BiometricVerification />} />
          <Route path="/business-verification" element={<BusinessVerification />} />
          <Route path="/qr-verify" element={<QrVerify />} />
          <Route path="/security-score" element={<SecurityScore />} />
          <Route path="/my-identity" element={<MyIdentity />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
