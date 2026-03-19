import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuditQuestionStep } from "./AuditQuestionStep";
import { AuditGateStep } from "./AuditGateStep";
import { AuditResultsStep } from "./AuditResultsStep";
import { auditQuestions } from "@/lib/corporateAuditQuestions";
import { calculateAuditScore, AuditScores } from "@/lib/corporateAuditScoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";


interface CorporateAuditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface AuditUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AuditInsights {
  headline: string;
  realityCheck: string;
  actionPlan: string[];
  closing: string;
}

type Step = "questions" | "gate" | "results";

export function CorporateAuditDialog({ open, onOpenChange }: CorporateAuditDialogProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>("questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [userInfo, setUserInfo] = useState<AuditUserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [scores, setScores] = useState<AuditScores | null>(null);
  const [insights, setInsights] = useState<AuditInsights | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    // Auto-advance, no back button
    if (currentQuestionIndex < auditQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All questions answered, go to gate
      setStep("gate");
    }
  };

  const handleGateSubmit = async (info: AuditUserInfo) => {
    setUserInfo(info);
    setIsSubmitting(true);

    try {
      const auditScores = calculateAuditScore(responses);
      setScores(auditScores);

      // Save to database
      const { error: dbError } = await supabase
        .from("corporate_discipline_audits")
        .insert({
          first_name: info.firstName,
          last_name: info.lastName,
          email: info.email,
          phone: info.phone,
          q1_morning_standard: responses.q1 ?? 0,
          q2_silence_test: responses.q2 ?? 0,
          q3_deadline_protocol: responses.q3 ?? 0,
          q4_confrontation: responses.q4 ?? 0,
          q5_meeting_tax: responses.q5 ?? 0,
          q6_problem_solver: responses.q6 ?? 0,
          q7_mirror: responses.q7 ?? 0,
          raw_score: auditScores.rawScore,
          discipline_score: auditScores.disciplineScore,
          tier: auditScores.tier,
        });

      if (dbError) {
        console.error("Database error:", dbError);
      }

      // Send to GHL webhook (fire-and-forget)
      supabase.functions
        .invoke("send-to-ghl", {
          body: {
            first_name: info.firstName,
            last_name: info.lastName,
            email: info.email,
            phone: info.phone,
            discipline_score: auditScores.disciplineScore,
            tier: auditScores.tier,
            audit_type: "corporate",
            language: t("audit.question") === "Vraag" ? "nl" : "en",
            audit_q1: responses.q1 ?? 0,
            audit_q2: responses.q2 ?? 0,
            audit_q3: responses.q3 ?? 0,
            audit_q4: responses.q4 ?? 0,
            audit_q5: responses.q5 ?? 0,
            audit_q6: responses.q6 ?? 0,
            audit_q7: responses.q7 ?? 0,
          },
        })
        .then(({ error }) => {
          if (error) console.error("GHL webhook error:", error);
        });

      // Get AI insights
      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        "generate-corporate-audit-insights",
        {
          body: {
            score: auditScores.disciplineScore,
            tier: auditScores.tier,
            answers: responses,
            firstName: info.firstName,
            language: t("audit.question") === "Vraag" ? "nl" : "en",
          },
        }
      );

      if (aiError) {
        console.error("AI insights error:", aiError);
        toast({
          title: "Insights generation failed",
          description: "Your results are saved, but the AI analysis couldn't be generated.",
          variant: "destructive",
        });
      } else if (aiData?.insights) {
        setInsights(aiData.insights);
      }

      setStep("results");
    } catch (error) {
      console.error("Audit submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAudit = () => {
    setStep("questions");
    setCurrentQuestionIndex(0);
    setResponses({});
    setUserInfo({ firstName: "", lastName: "", email: "", phone: "" });
    setScores(null);
    setInsights(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white border-lioner-gold/20">
        {step === "questions" && (
          <AuditQuestionStep
            question={{
              ...auditQuestions[currentQuestionIndex],
              title: t(`audit.q${currentQuestionIndex + 1}.title`),
              question: t(`audit.q${currentQuestionIndex + 1}.question`),
              options: auditQuestions[currentQuestionIndex].options.map((opt, idx) => ({
                ...opt,
                label: t(`audit.q${currentQuestionIndex + 1}.option${idx + 1}`) || opt.label,
              })),
            }}
            currentIndex={currentQuestionIndex}
            totalQuestions={auditQuestions.length}
            onAnswer={handleAnswer}
          />
        )}
        {step === "gate" && (
          <AuditGateStep
            userInfo={userInfo}
            onSubmit={handleGateSubmit}
            isSubmitting={isSubmitting}
          />
        )}
        {step === "results" && scores && (
          <AuditResultsStep
            userInfo={userInfo}
            scores={scores}
            insights={insights}
            onClose={resetAudit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
