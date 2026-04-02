import { useState, useCallback } from "react";
import { CapitalProtectionDialog } from "@/components/capital-protection/CapitalProtectionDialog";
import { CPResultsStep } from "@/components/capital-protection/CPResultsStep";
import { CPResult } from "@/lib/capitalProtectionScoring";
import { CPUserInfo } from "@/components/capital-protection/CPUserInfoStep";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { language } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

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

  const firstName = resultsData?.userInfo.fullName.split(" ")[0] || "";
  const lastName = resultsData?.userInfo.fullName.trim().split(/\s+/).slice(1).join(" ") || "";

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
        <div className="min-h-screen">
          <div className="flex items-start justify-center py-6 sm:py-10 px-4">
            <div className="w-full max-w-2xl bg-white border border-foreground/10 rounded-lg shadow-xl">
              <CPResultsStep
                userInfo={resultsData.userInfo}
                result={resultsData.result}
                aiReport={resultsData.aiReport}
                isLoadingAI={resultsData.isLoadingAI}
                onClose={handleClose}
              />
            </div>
          </div>

          {/* Daisy voice widget using unified ScanVoiceWidget */}
          {!resultsData.isLoadingAI && (
            <div className="max-w-2xl mx-auto px-4 pb-8">
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
                  email: resultsData.userInfo.email,
                  phone: resultsData.userInfo.phone,
                  overallScore: resultsData.result.overallScore,
                  overallColor: resultsData.result.overallColor,
                  recoveryPotential: resultsData.result.recoveryPotential,
                  headline: resultsData.result.headline[language] ?? resultsData.result.headline.en,
                  sections: resultsData.result.sections.map(s => ({
                    label: s.label[language] ?? s.label.en,
                    score: s.score,
                    color: s.color,
                  })),
                }}
                bookingType="Capital Protection Session"
                calendarId="dxDvJ7TY6uSjcl1loyov"
                webhookPayload={{
                  first_name: firstName,
                  last_name: lastName,
                  email: resultsData.userInfo.email,
                  phone: resultsData.userInfo.phone,
                  audit_type: "capital_protection",
                  recovery_potential: resultsData.result.recoveryPotential,
                  risk_level: resultsData.result.headline.en,
                  overall_score: resultsData.result.overallScore,
                  overall_color: resultsData.result.overallColor,
                  evidence_strength_score: resultsData.result.sections[0]?.score ?? 0,
                  timeline_advantage_score: resultsData.result.sections[1]?.score ?? 0,
                  jurisdictional_simplicity_score: resultsData.result.sections[2]?.score ?? 0,
                  legal_positioning_score: resultsData.result.sections[3]?.score ?? 0,
                  capital_exposure_score: resultsData.result.sections[4]?.score ?? 0,
                  language,
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
