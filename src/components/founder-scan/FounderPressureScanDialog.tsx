import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScanIntroStep } from "./ScanIntroStep";
import { ScanQuestionStep } from "./ScanQuestionStep";
import { ScanGateStep, ScanUserInfo } from "./ScanGateStep";
import { ScanResultsStep } from "./ScanResultsStep";
import { AnalyzingTransition } from "@/components/shared/AnalyzingTransition";
import { pressureQuestions } from "@/lib/founderPressureQuestions";
import { calculatePressureScores, PressureScores } from "@/lib/founderPressureScoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FounderPressureScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "intro" | "questions" | "gate" | "results";

export function FounderPressureScanDialog({ open, onOpenChange }: FounderPressureScanDialogProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState<Step>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [userInfo, setUserInfo] = useState<ScanUserInfo | null>(null);
  const [scores, setScores] = useState<PressureScores | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    if (currentQ < pressureQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setStep("gate");
    }
  };

  const handleGateSubmit = async (info: ScanUserInfo) => {
    setUserInfo(info);
    setIsSubmitting(true);
    try {
      const result = calculatePressureScores(responses, language);
      setScores(result);

      // Save to DB (fire-and-forget, table may not exist yet)
      const nameParts = info.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      supabase
        .from("founders_pressure_scans" as any)
        .insert({
          full_name: info.fullName,
          email: info.email,
          company: info.company,
          phone: info.phone,
          q1: responses.q1 ?? 1,
          q2: responses.q2 ?? 1,
          q3: responses.q3 ?? 1,
          q4: responses.q4 ?? 1,
          q5: responses.q5 ?? 1,
          q6: responses.q6 ?? 1,
          q7: responses.q7 ?? 1,
          q8: responses.q8 ?? 1,
          q9: responses.q9 ?? 1,
          q10: responses.q10 ?? 1,
          q11: responses.q11 ?? 1,
          q12: responses.q12 ?? 1,
          decision_pressure_score: result.sections[0].score,
          founder_dependency_score: result.sections[1].score,
          leadership_alignment_score: result.sections[2].score,
          execution_momentum_score: result.sections[3].score,
          overall_score: result.overall,
          overall_color: result.overallColor,
          language,
        } as any)
        .then(({ error }) => {
          if (error) console.error("DB save error:", error);
        });

      // Send to GHL webhook (fire-and-forget)
      supabase.functions
        .invoke("send-to-ghl", {
          body: {
            first_name: firstName,
            last_name: lastName,
            email: info.email,
            phone: info.phone,
            company: info.company,
            discipline_score: result.overall,
            tier: result.title,
            audit_type: "founder_pressure_scan",
            language,
            decision_pressure_score: result.sections[0].score,
            founder_dependency_score: result.sections[1].score,
            leadership_alignment_score: result.sections[2].score,
            execution_momentum_score: result.sections[3].score,
            diagnosis: result.diagnosis,
            recommendation: result.recommendation,
          },
        })
        .then(({ error }) => {
          if (error) console.error("GHL webhook error:", error);
        });

      setStep("results");
    } catch (error) {
      console.error("Scan submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetScan = () => {
    setStep("intro");
    setCurrentQ(0);
    setResponses({});
    setScores(null);
    setUserInfo(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white border-lioner-gold/20">
        {step === "intro" && <ScanIntroStep onStart={() => setStep("questions")} />}
        {step === "questions" && (
          <ScanQuestionStep currentIndex={currentQ} onAnswer={handleAnswer} />
        )}
        {step === "gate" && (
          <ScanGateStep onSubmit={handleGateSubmit} isSubmitting={isSubmitting} />
        )}
        {step === "results" && scores && userInfo && (
          <ScanResultsStep userInfo={userInfo} scores={scores} onClose={resetScan} />
        )}
      </DialogContent>
    </Dialog>
  );
}
