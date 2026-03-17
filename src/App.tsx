import { lazy, Suspense } from "react";
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

// Lazy load non-critical routes
const Business = lazy(() => import("./pages/Business"));
const Elite = lazy(() => import("./pages/Elite"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const MentalSovereignty = lazy(() => import("./pages/articles/MentalSovereignty"));
const DisciplineBeatsMotivation = lazy(() => import("./pages/articles/DisciplineBeatsMotivation"));
const LeadingThroughUncertainty = lazy(() => import("./pages/articles/LeadingThroughUncertainty"));
const ResetBlueprint = lazy(() => import("./pages/articles/ResetBlueprint"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));

const queryClient = new QueryClient();

// Inner component so it has access to VoiceAgentContext
const AppRoutes = () => {
  const { isOpen, closeVoiceAgent, contextData } = useVoiceAgent();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/business" element={<Business />} />
          <Route path="/elite" element={<Elite />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/articles/mental-sovereignty" element={<MentalSovereignty />} />
          <Route path="/articles/discipline-beats-motivation" element={<DisciplineBeatsMotivation />} />
          <Route path="/articles/leading-through-uncertainty" element={<LeadingThroughUncertainty />} />
          <Route path="/articles/reset-blueprint" element={<ResetBlueprint />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <VoiceAgentDialog isOpen={isOpen} onClose={closeVoiceAgent} contextData={contextData} />
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
