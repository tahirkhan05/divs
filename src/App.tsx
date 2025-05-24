
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
      <AuthProvider>
        <SearchProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/document-verification" element={
                <ProtectedRoute>
                  <DocumentVerification />
                </ProtectedRoute>
              } />
              <Route path="/biometric-verification" element={
                <ProtectedRoute>
                  <BiometricVerification />
                </ProtectedRoute>
              } />
              <Route path="/business-verification" element={
                <ProtectedRoute>
                  <BusinessVerification />
                </ProtectedRoute>
              } />
              <Route path="/qr-verify" element={
                <ProtectedRoute>
                  <QrVerify />
                </ProtectedRoute>
              } />
              <Route path="/security-score" element={
                <ProtectedRoute>
                  <SecurityScore />
                </ProtectedRoute>
              } />
              <Route path="/my-identity" element={<MyIdentity />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={
                <ProtectedRoute>
                  <HelpSupport />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
