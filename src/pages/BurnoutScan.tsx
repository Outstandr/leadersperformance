import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BurnoutIntroStep } from "@/components/burnout-scan/BurnoutIntroStep";
import { BurnoutFreeQuestionStep } from "@/components/burnout-scan/BurnoutFreeQuestionStep";
import { BurnoutFreeResultsStep } from "@/components/burnout-scan/BurnoutFreeResultsStep";
import { BurnoutFullQuestionStep } from "@/components/burnout-scan/BurnoutFullQuestionStep";
import { BurnoutFullResultsStep } from "@/components/burnout-scan/BurnoutFullResultsStep";
import { ScanGateStep, ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { AnalyzingTransition } from "@/components/shared/AnalyzingTransition";
import { burnoutFreeQuestions } from "@/lib/burnoutFreeQuestions";
import { burnoutFullQuestions } from "@/lib/burnoutFullQuestions";
import { calculateFreePressureScore, calculateFullPressureScore, PressureFreeResult, PressureFullResult } from "@/lib/burnoutScoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Step = "intro" | "free_questions" | "free_gate" | "free_analyzing" | "free_results" | "full_questions" | "full_analyzing" | "full_results";

const BurnoutScan = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [dialogOpen, setDialogOpen] = useState(true);
  const [step, setStep] = useState<Step>("intro");
  const [freeQIndex, setFreeQIndex] = useState(0);
  const [fullQIndex, setFullQIndex] = useState(0);
  const [freeResponses, setFreeResponses] = useState<Record<string, number>>({});
  const [fullResponses, setFullResponses] = useState<Record<string, number>>({});
  const [userInfo, setUserInfo] = useState<ScanUserInfo | null>(null);
  const [freeResult, setFreeResult] = useState<PressureFreeResult | null>(null);
  const [fullResult, setFullResult] = useState<PressureFullResult | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // Handle return from Stripe payment or test mode bypass
  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const returnedScanId = searchParams.get("scan_id");
    const testMode = searchParams.get("test");

    if (paymentStatus === "success" && returnedScanId) {
      setScanId(returnedScanId);
      setDialogOpen(true);
      setStep("full_questions");
    } else if (testMode === "true") {
      setUserInfo({ fullName: "Test User", email: "test@test.com", company: "Test Co", phone: "+1234567890" });
      setDialogOpen(true);
      setStep("full_questions");
    }
  }, [searchParams]);

  const handleFreeAnswer = (questionId: string, value: number) => {
    setFreeResponses((prev) => ({ ...prev, [questionId]: value }));
    if (freeQIndex < burnoutFreeQuestions.length - 1) {
      setFreeQIndex((prev) => prev + 1);
    } else {
      setStep("free_gate");
    }
  };

  const handleFreeBack = () => {
    if (freeQIndex > 0) setFreeQIndex((prev) => prev - 1);
  };

  const handleGateSubmit = async (info: ScanUserInfo) => {
    setUserInfo(info);
    setIsSubmitting(true);
    try {
      const result = calculateFreePressureScore(freeResponses, language);
      setFreeResult(result);

      const nameParts = info.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const { data: insertData } = await supabase
        .from("founder_burnout_scans" as any)
        .insert({
          full_name: info.fullName,
          email: info.email,
          company: info.company,
          phone: info.phone,
          language,
          free_workload_intensity: result.sectionScores.find(s => s.key === "workload_intensity")?.score || 0,
          free_sleep_quality: result.sectionScores.find(s => s.key === "sleep_quality")?.score || 0,
          free_mental_fatigue: result.sectionScores.find(s => s.key === "mental_fatigue")?.score || 0,
          free_decision_pressure: result.sectionScores.find(s => s.key === "decision_pressure")?.score || 0,
          free_stress_tolerance: result.sectionScores.find(s => s.key === "stress_tolerance")?.score || 0,
          free_fbr_score: result.fpsScore,
          free_fbr_color: result.fpsColor,
          fq1: freeResponses.fq1 ?? 1,
          fq2: freeResponses.fq2 ?? 1,
          fq3: freeResponses.fq3 ?? 1,
          fq4: freeResponses.fq4 ?? 1,
          fq5: freeResponses.fq5 ?? 1,
          fq6: freeResponses.fq6 ?? 1,
          fq7: freeResponses.fq7 ?? 1,
          fq8: freeResponses.fq8 ?? 1,
          fq9: freeResponses.fq9 ?? 1,
          fq10: freeResponses.fq10 ?? 1,
        } as any)
        .select("id")
        .single();

      if (insertData) {
        setScanId((insertData as any).id);
      }

      // Send to GHL followup (creates contact, sends results email, schedules nurture)
      supabase.functions.invoke("ghl-scan-followup", {
        body: {
          first_name: firstName,
          last_name: lastName,
          email: info.email,
          phone: info.phone,
          company: info.company,
          audit_type: "founder_pressure_diagnostic",
          language,
          fps_score: result.fpsScore,
          fps_color: result.fpsColor,
          overall_score: result.fpsScore,
          overall_color: result.fpsColor,
          tier: result.fpsLabel.en,
          booked: false,
          // Section scores for email dimension bars
          decision_pressure_score: result.sectionScores.find(s => s.key === "decision_pressure")?.score || 0,
          founder_dependency_score: result.sectionScores.find(s => s.key === "workload_intensity")?.score || 0,
          leadership_alignment_score: result.sectionScores.find(s => s.key === "mental_fatigue")?.score || 0,
          execution_momentum_score: result.sectionScores.find(s => s.key === "stress_tolerance")?.score || 0,
          primary_bottleneck: result.sectionScores.sort((a, b) => b.score - a.score)[0]?.label || "Not identified",
        },
      });

      setDialogOpen(false);
      setStep("free_analyzing");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (error) {
      console.error("Submission error:", error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnlockFull = async () => {
    setIsPaymentProcessing(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/create-burnout-payment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInfo?.email,
            fullName: userInfo?.fullName,
            scanId,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment setup failed");

      window.location.href = data.url;
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({ title: "Error", description: error.message || "Payment failed. Please try again.", variant: "destructive" });
      setIsPaymentProcessing(false);
    }
  };

  const handleFullAnswer = (questionId: string, value: number) => {
    const updatedResponses = { ...fullResponses, [questionId]: value };
    setFullResponses(updatedResponses);
    if (fullQIndex < burnoutFullQuestions.length - 1) {
      setFullQIndex((prev) => prev + 1);
    } else {
      console.log("Full responses collected:", Object.keys(updatedResponses).length, "answers");
      const result = calculateFullPressureScore(updatedResponses, language);
      console.log("Full result calculated:", result.fpsScore, result.fpsColor);
      setFullResult(result);

      // Update DB with full results (DB column names stay as-is)
      if (scanId) {
        supabase
          .from("founder_burnout_scans" as any)
          .update({
            paid: true,
            full_pressure_load: result.domainScores.find(d => d.key === "pressure_load")?.score || 0,
            full_nervous_system: result.domainScores.find(d => d.key === "nervous_system")?.score || 0,
            full_business_dependency: result.domainScores.find(d => d.key === "business_dependency")?.score || 0,
            full_recovery_capacity: result.domainScores.find(d => d.key === "recovery_capacity")?.score || 0,
            full_fbr_score: result.fpsScore,
            full_fbr_color: result.fpsColor,
            full_burnout_phase: result.phase,
            full_recovery_estimate: result.recoveryWith.en,
            ...Object.fromEntries(Object.entries(updatedResponses).map(([k, v]) => [k, v])),
          } as any)
          .eq("id", scanId)
          .then(({ error }) => { if (error) console.error("DB update error:", error); });

        // Send full results to GHL with updated variable names
        if (userInfo) {
          const nameParts = userInfo.fullName.trim().split(/\s+/);
          supabase.functions.invoke("send-to-ghl", {
            body: {
              first_name: nameParts[0] || "",
              last_name: nameParts.slice(1).join(" ") || "",
              email: userInfo.email,
              phone: userInfo.phone,
              company: userInfo.company,
              audit_type: "founder_pressure_full",
              language,
              fps_score: result.fpsScore,
              fps_color: result.fpsColor,
              pressure_phase: result.phaseLabel.en,
              phase_number: result.phaseNumber,
              recovery_without: result.recoveryWithout.en,
              recovery_with: result.recoveryWith.en,
              primary_risk_domain: result.primaryRiskDomain.label,
              diagnosis: result.diagnosis,
              recommendation: result.recommendation,
            },
          });
        }
      }

      setDialogOpen(false);
      setStep("full_analyzing");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  if (step === "free_analyzing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AnalyzingTransition scanType="burnout" onComplete={() => setStep("free_results")} />
      </div>
    );
  }

  if (step === "free_results" && freeResult && userInfo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8">
          <BurnoutFreeResultsStep
            result={freeResult}
            onUnlockFull={handleUnlockFull}
            isProcessing={isPaymentProcessing}
            userInfo={userInfo}
            showOutsideDialog
          />
        </div>
      </div>
    );
  }

  if (step === "full_analyzing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AnalyzingTransition scanType="burnout" onComplete={() => setStep("full_results")} />
      </div>
    );
  }

  if (step === "full_results" && fullResult && userInfo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8">
          <BurnoutFullResultsStep result={fullResult} userInfo={userInfo} onClose={handleClose} fullResponses={fullResponses} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white border-red-500/20">
          {step === "intro" && <BurnoutIntroStep onStart={() => setStep("free_questions")} />}
          {step === "free_questions" && (
            <BurnoutFreeQuestionStep currentIndex={freeQIndex} onAnswer={handleFreeAnswer} />
          )}
          {step === "free_gate" && (
            <ScanGateStep onSubmit={handleGateSubmit} isSubmitting={isSubmitting} />
          )}
          {step === "full_questions" && (
            <BurnoutFullQuestionStep currentIndex={fullQIndex} onAnswer={handleFullAnswer} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BurnoutScan;
