import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProfitLeakIntroStep } from "@/components/profit-leak/ProfitLeakIntroStep";
import { ProfitLeakRevenueStep } from "@/components/profit-leak/ProfitLeakRevenueStep";
import { ProfitLeakQuestionStep } from "@/components/profit-leak/ProfitLeakQuestionStep";
import { ProfitLeakResultsStep } from "@/components/profit-leak/ProfitLeakResultsStep";
import { ScanGateStep, ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { AnalyzingTransition } from "@/components/shared/AnalyzingTransition";
import { profitLeakQuestions } from "@/lib/profitLeakQuestions";
import { calculateProfitLeakScore, ProfitLeakResult } from "@/lib/profitLeakScoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Step = "intro" | "revenue" | "questions" | "gate" | "analyzing" | "results";

const ProfitLeakScan = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(true);
  const [step, setStep] = useState<Step>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [revenue, setRevenue] = useState("");
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [userInfo, setUserInfo] = useState<ScanUserInfo | null>(null);
  const [result, setResult] = useState<ProfitLeakResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRevenueSelect = (value: string) => {
    setRevenue(value);
    setStep("questions");
  };

  const handleAnswer = (questionId: string, value: number) => {
    const updated = { ...responses, [questionId]: value };
    setResponses(updated);
    if (qIndex < profitLeakQuestions.length - 1) {
      setQIndex((prev) => prev + 1);
    } else {
      setStep("gate");
    }
  };

  const handleBack = () => {
    if (qIndex > 0) {
      setQIndex((prev) => prev - 1);
    } else {
      setStep("revenue");
    }
  };

  const handleGateSubmit = async (info: ScanUserInfo) => {
    setUserInfo(info);
    setIsSubmitting(true);
    try {
      const scanResult = calculateProfitLeakScore(responses, revenue, language);
      setResult(scanResult);

      const nameParts = info.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Save to DB
      await supabase.from("profit_leak_scans" as any).insert({
        full_name: info.fullName,
        email: info.email,
        company: info.company,
        phone: info.phone,
        language,
        revenue_tier: revenue,
        overall_score: scanResult.overallScore,
        overall_color: scanResult.overallColor,
        growth_phase: scanResult.growthPhase.en,
        primary_bottleneck: scanResult.primaryBottleneck.en,
        founder_dependency_score: scanResult.sectionScores.find(s => s.key === "founder_dependency")?.score || 0,
        structure_leadership_score: scanResult.sectionScores.find(s => s.key === "structure_leadership")?.score || 0,
        decision_speed_score: scanResult.sectionScores.find(s => s.key === "decision_speed")?.score || 0,
        profitability_score: scanResult.sectionScores.find(s => s.key === "profitability")?.score || 0,
        scalability_score: scanResult.sectionScores.find(s => s.key === "scalability")?.score || 0,
        ...Object.fromEntries(Object.entries(responses).map(([k, v]) => [k, v])),
      } as any);

      // GHL webhook is now delayed — handled by ScanVoiceWidget

      setDialogOpen(false);
      setStep("analyzing");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (error) {
      console.error("Submission error:", error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  // Analyzing transition
  if (step === "analyzing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AnalyzingTransition scanType="profit_leak" onComplete={() => setStep("results")} />
      </div>
    );
  }

  // Results page (outside dialog)
  if (step === "results" && result && userInfo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8">
          <ProfitLeakResultsStep result={result} userInfo={userInfo} onClose={handleClose} responses={responses} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white border-lioner-gold/20">
          {step === "intro" && <ProfitLeakIntroStep onStart={() => setStep("revenue")} />}
          {step === "revenue" && <ProfitLeakRevenueStep onSelect={handleRevenueSelect} />}
          {step === "questions" && (
            <ProfitLeakQuestionStep currentIndex={qIndex} onAnswer={handleAnswer} />
          )}
          {step === "gate" && (
            <ScanGateStep onSubmit={handleGateSubmit} isSubmitting={isSubmitting} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfitLeakScan;
