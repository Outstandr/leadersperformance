import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { VoiceAgentProvider, useVoiceAgent } from "@/components/voice/VoiceAgentContext";
import { VoiceAgentDialog } from "@/components/voice/VoiceAgentDialog";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Business from "./pages/Business";
import Elite from "./pages/Elite";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

// Inner component so it has access to VoiceAgentContext
const AppRoutes = () => {
  const { isOpen, closeVoiceAgent } = useVoiceAgent();
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/business" element={<Business />} />
        <Route path="/elite" element={<Elite />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <VoiceAgentDialog isOpen={isOpen} onClose={closeVoiceAgent} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <VoiceAgentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </VoiceAgentProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
