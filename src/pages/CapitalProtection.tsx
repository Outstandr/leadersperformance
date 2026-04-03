import { useState, useCallback } from "react";
import { CapitalProtectionDialog } from "@/components/capital-protection/CapitalProtectionDialog";
import { CPResultsStep } from "@/components/capital-protection/CPResultsStep";
import { CPBookingCalendar } from "@/components/capital-protection/CPBookingCalendar";
import { CPResult } from "@/lib/capitalProtectionScoring";
import { CPUserInfo } from "@/components/capital-protection/CPUserInfoStep";

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
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleResultsReady = useCallback((data: ResultsData) => {
    setResultsData(data);
    window.scrollTo({ top: 0, behavior: "instant" });
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

      {resultsData && (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex items-start justify-center py-6 sm:py-10 px-4">
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

          {/* Embedded Daisy voice widget — always visible below report */}
          {!resultsData.isLoadingAI && (
            <div className="sticky bottom-0 z-50">
              <ScanVoiceWidget
                mode="capital_protection"
                userInfo={{
                  fullName: resultsData.userInfo.fullName,
                  email: resultsData.userInfo.email,
                  phone: resultsData.userInfo.phone,
                }}
                contextPayload={{
                  fullName: resultsData.userInfo.fullName,
                  company: resultsData.userInfo.company,
                  role: resultsData.userInfo.role,
                  country: resultsData.userInfo.country,
                  overallScore: resultsData.result.overallScore,
                  overallColor: resultsData.result.overallColor,
                  recoveryPotential: resultsData.result.recoveryPotential,
                  headline: resultsData.result.headline.en,
                  summary: resultsData.aiReport?.situation_summary || resultsData.result.body.en,
                  nextStep: resultsData.aiReport?.recommended_next_step || resultsData.result.nextStep.en,
                  sections: resultsData.result.sections.map((section) => ({
                    label: section.label.en,
                    score: section.score,
                    color: section.color,
                  })),
                  aiReport: resultsData.aiReport,
                }}
                bookingType="Capital Protection Session"
                calendarId="dxDvJ7TY6uSjcl1loyov"
                webhookPayload={{
                  first_name: resultsData.userInfo.fullName.trim().split(/\s+/)[0] || "",
                  last_name: resultsData.userInfo.fullName.trim().split(/\s+/).slice(1).join(" ") || "",
                  email: resultsData.userInfo.email,
                  phone: resultsData.userInfo.phone,
                  company: resultsData.userInfo.company,
                  audit_type: "capital_protection",
                  recovery_potential: resultsData.result.recoveryPotential,
                  risk_level: resultsData.result.headline.en,
                  overall_score: resultsData.result.overallScore,
                  overall_color: resultsData.result.overallColor,
                }}
              />
            </div>
          )}
        </div>
      )}

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
