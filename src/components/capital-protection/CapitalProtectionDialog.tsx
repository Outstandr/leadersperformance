import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CPIntroStep } from "./CPIntroStep";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";
import { CPUserInfoStep, CPUserInfo } from "./CPUserInfoStep";
import { CPQuestionStep } from "./CPQuestionStep";
import { CPResultsStep } from "./CPResultsStep";
import { AnalyzingTransition } from "@/components/shared/AnalyzingTransition";
import { cpSections } from "@/lib/capitalProtectionQuestions";
import { calculateCPResult, CPResult, CPAssessmentData } from "@/lib/capitalProtectionScoring";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AIReport {
  situation_summary: string;
  risk_level: string;
  risk_indicators: string[];
  strategic_paths: string[];
  recommended_next_step: string;
  recovery_potential: string;
}

interface CapitalProtectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, results are rendered externally (outside dialog). Dialog closes on completion. */
  onResultsReady?: (data: {
    userInfo: CPUserInfo;
    result: CPResult;
    aiReport: AIReport | null;
    isLoadingAI: boolean;
  }) => void;
  onAIReportUpdate?: (report: AIReport) => void;
  onLoadingComplete?: () => void;
}

type Step = "intro" | "userInfo" | "questions" | "analyzing" | "results";

export function CapitalProtectionDialog({ open, onOpenChange, onResultsReady, onAIReportUpdate, onLoadingComplete }: CapitalProtectionDialogProps) {
  const { language } = useLanguage();
  const { isSpeaking } = useVoiceAgent();
  const [step, setStep] = useState<Step>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[] | boolean>>({});
  const [userInfo, setUserInfo] = useState<CPUserInfo | null>(null);
  const [result, setResult] = useState<CPResult | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const externalResults = !!onResultsReady;

  const handleUserInfoSubmit = (info: CPUserInfo) => {
    setUserInfo(info);
    setStep("questions");
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
    } else {
      setStep("userInfo");
    }
  };

  const handleAnswer = (sectionId: string, value: string | string[] | boolean) => {
    const updated = { ...responses, [sectionId]: value };
    setResponses(updated);

    if (currentQ < cpSections.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      finishAssessment(updated);
    }
  };

  const finishAssessment = async (allResponses: Record<string, string | string[] | boolean>) => {
    if (!userInfo) return;

    const assessmentData: CPAssessmentData = {
      situation_types: (allResponses.situation_types as string[]) ?? [],
      capital_exposure: (allResponses.capital_exposure as string) ?? "",
      timeline: (allResponses.timeline as string) ?? "",
      evidence_types: (allResponses.evidence_types as string[]) ?? [],
      jurisdictions: (allResponses.jurisdictions as string[]) ?? [],
      legal_status: (allResponses.legal_status as string) ?? "",
      objective: (allResponses.objective as string) ?? "",
      situation_summary: (allResponses.situation_summary as string) ?? "",
      consent_review: (allResponses.consent_review as boolean) ?? false,
    };

    const cpResult = calculateCPResult(assessmentData);

    if (externalResults) {
      // Close dialog and let parent render results
      onOpenChange(false);
      onResultsReady({
        userInfo,
        result: cpResult,
        aiReport: null,
        isLoadingAI: true,
      });
    } else {
      // Render results inside the dialog
      setResult(cpResult);
      setStep("results");
      setIsLoadingAI(true);
    }

    // Save to DB
    supabase
      .from("capital_protection_assessments" as any)
      .insert({
        full_name: userInfo.fullName,
        company: userInfo.company,
        role: userInfo.role,
        country: userInfo.country,
        email: userInfo.email,
        phone: userInfo.phone,
        situation_types: assessmentData.situation_types,
        capital_exposure: assessmentData.capital_exposure,
        timeline: assessmentData.timeline,
        evidence_types: assessmentData.evidence_types,
        jurisdictions: assessmentData.jurisdictions,
        legal_status: assessmentData.legal_status,
        objective: assessmentData.objective,
        situation_summary: assessmentData.situation_summary,
        consent_review: assessmentData.consent_review,
        recovery_potential: cpResult.recoveryPotential,
        risk_level: cpResult.headline.en,
      } as any)
      .then(({ error }) => {
        if (error) console.error("DB save error:", error);
      });

    // Send to GHL
    const nameParts = userInfo.fullName.trim().split(/\s+/);
    supabase.functions
      .invoke("send-to-ghl", {
        body: {
          first_name: nameParts[0] || "",
          last_name: nameParts.slice(1).join(" ") || "",
          email: userInfo.email,
          phone: userInfo.phone,
          company: userInfo.company,
          country: userInfo.country,
          role: userInfo.role,
          audit_type: "capital_protection",
          recovery_potential: cpResult.recoveryPotential,
          risk_level: cpResult.headline.en,
          overall_score: cpResult.overallScore,
          overall_color: cpResult.overallColor,
          evidence_strength_score: cpResult.sections[0]?.score ?? 0,
          timeline_advantage_score: cpResult.sections[1]?.score ?? 0,
          jurisdictional_simplicity_score: cpResult.sections[2]?.score ?? 0,
          legal_positioning_score: cpResult.sections[3]?.score ?? 0,
          capital_exposure_score: cpResult.sections[4]?.score ?? 0,
          situation_types: assessmentData.situation_types.join(", "),
          capital_exposure: assessmentData.capital_exposure,
          timeline: assessmentData.timeline,
          legal_status: assessmentData.legal_status,
          objective: assessmentData.objective,
          situation_summary: assessmentData.situation_summary,
          language,
        },
      })
      .then(({ error }) => {
        if (error) console.error("GHL webhook error:", error);
      });

    // Generate AI report
    try {
      const { data, error } = await supabase.functions.invoke("generate-capital-protection-report", {
        body: { assessmentData, userInfo: { fullName: userInfo.fullName }, language },
      });

      if (error) throw error;
      if (data?.report) {
        if (externalResults) {
          onAIReportUpdate?.(data.report);
        } else {
          setAiReport(data.report);
        }

        supabase
          .from("capital_protection_assessments" as any)
          .update({ ai_report: data.report } as any)
          .eq("email", userInfo.email)
          .order("created_at", { ascending: false })
          .limit(1)
          .then(({ error }) => {
            if (error) console.error("AI report DB update error:", error);
          });
      }
    } catch (err) {
      console.error("AI report generation error:", err);
    } finally {
      if (externalResults) {
        onLoadingComplete?.();
      } else {
        setIsLoadingAI(false);
      }
    }
  };

  const resetAssessment = () => {
    setStep("intro");
    setCurrentQ(0);
    setResponses({});
    setResult(null);
    setAiReport(null);
    setUserInfo(null);
    onOpenChange(false);
  };

  const showResults = !externalResults && step === "results";
  const showAnalyzing = step === "analyzing";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={!showResults}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white transition-all duration-300 ${
        showResults && isSpeaking
          ? "border-2 border-lioner-gold/60 animate-border-pulse shadow-[0_0_30px_hsl(var(--lioner-gold)/0.2)]"
          : "border-lioner-gold/20"
      }`}>
        {step === "intro" && <CPIntroStep onStart={() => setStep("userInfo")} />}
        {step === "userInfo" && <CPUserInfoStep onSubmit={handleUserInfoSubmit} />}
        {step === "questions" && (
          <CPQuestionStep
            currentIndex={currentQ}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}
        {showAnalyzing && (
          <AnalyzingTransition scanType="capital" onComplete={() => setStep("results")} />
        )}
        {showResults && result && userInfo && (
          <CPResultsStep
            userInfo={userInfo}
            result={result}
            aiReport={aiReport}
            isLoadingAI={isLoadingAI}
            onClose={resetAssessment}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
