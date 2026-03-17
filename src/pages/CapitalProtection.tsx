import { useState, useCallback } from "react";
import { CapitalProtectionDialog } from "@/components/capital-protection/CapitalProtectionDialog";
import { CPResultsStep } from "@/components/capital-protection/CPResultsStep";
import { CPResult } from "@/lib/capitalProtectionScoring";
import { CPUserInfo } from "@/components/capital-protection/CPUserInfoStep";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";

interface AIReport {
  situation_summary: string;
  risk_level: string;
  risk_indicators: string[];
  strategic_paths: string[];
  recommended_next_step: string;
  recovery_potential: string;
}

interface ResultsData {
  userInfo: CPUserInfo;
  result: CPResult;
  aiReport: AIReport | null;
  isLoadingAI: boolean;
}

const CapitalProtection = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const { isSpeaking } = useVoiceAgent();

  const handleResultsReady = useCallback((data: ResultsData) => {
    setResultsData(data);
  }, []);

  const handleAIReportUpdate = useCallback((report: AIReport) => {
    setResultsData((prev) => prev ? { ...prev, aiReport: report } : null);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setResultsData((prev) => prev ? { ...prev, isLoadingAI: false } : null);
  }, []);

  const handleClose = () => {
    window.location.href = "https://leadersperformance.ae";
  };

  return (
    <div className="min-h-screen bg-background">
      <CapitalProtectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onResultsReady={handleResultsReady}
        onAIReportUpdate={handleAIReportUpdate}
        onLoadingComplete={handleLoadingComplete}
      />

      {/* Results shown directly on page (no dialog blocking VoiceAgent) */}
      {resultsData && (
        <div className="min-h-screen flex items-start justify-center py-6 sm:py-10 px-4">
          <div className={`w-full max-w-2xl bg-white border rounded-lg shadow-xl transition-all duration-300 ${
            isSpeaking
              ? "border-2 border-lioner-gold/60 animate-border-pulse shadow-[0_0_30px_hsl(var(--lioner-gold)/0.2)]"
              : "border-foreground/10"
          }`}>
            <CPResultsStep
              userInfo={resultsData.userInfo}
              result={resultsData.result}
              aiReport={resultsData.aiReport}
              isLoadingAI={resultsData.isLoadingAI}
              onClose={handleClose}
            />
          </div>
        </div>
      )}

      {/* Fallback when no dialog and no results */}
      {!dialogOpen && !resultsData && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Capital Protection Assessment</h1>
            <button
              onClick={() => setDialogOpen(true)}
              className="px-8 py-3 bg-lioner-gold text-white font-bold uppercase tracking-wider hover:bg-lioner-gold/90 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapitalProtection;
