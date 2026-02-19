import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserInfoStep } from "./UserInfoStep";
import { QuestionStep } from "./QuestionStep";
import { ResultsStep } from "./ResultsStep";
import { questions, countries } from "@/lib/assessmentQuestions";
import { getFullResults } from "@/lib/assessmentScoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export interface AssessmentInsights {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  insights: string[];
  personalizedMessage: string;
}

type Step = 'userInfo' | 'questions' | 'results';

export function AssessmentDialog({ open, onOpenChange }: AssessmentDialogProps) {
  const [step, setStep] = useState<Step>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    country: ''
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ReturnType<typeof getFullResults> | null>(null);
  const [insights, setInsights] = useState<AssessmentInsights | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const language = countries.find(c => c.code === userInfo.country)?.lang || 'en';

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setStep('questions');
  };

  const handleAnswer = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep('userInfo');
    }
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    try {
      const fullResults = getFullResults(responses);
      setResults(fullResults);

      // Save to database
      const { error: dbError } = await supabase
        .from('discipline_assessments')
        .insert({
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email,
          country: userInfo.country,
          language: language,
          q1_follow_through: responses.q1,
          q2_maintain_focus: responses.q2,
          q3_give_up: responses.q3,
          q4_resist_pleasure: responses.q4,
          q8_act_impulse: responses.q8,
          q9_control_stress: responses.q9,
          q10_regret_purchases: responses.q10,
          q15_daily_routines: responses.q15,
          q16_productivity_varies: responses.q16,
          q17_bounce_back: responses.q17,
          self_discipline_score: fullResults.scores.selfDiscipline,
          impulse_control_score: fullResults.scores.impulseControl,
          consistency_score: fullResults.scores.consistency,
          overall_score: fullResults.scores.overall,
          discipline_type: fullResults.disciplineType
        });

      if (dbError) {
        console.error('Database error:', dbError);
      }

      // Send to GHL webhook (fire-and-forget)
      supabase.functions.invoke('send-to-ghl', {
        body: {
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email,
          country: userInfo.country,
          language: language,
          self_discipline_score: fullResults.scores.selfDiscipline,
          impulse_control_score: fullResults.scores.impulseControl,
          consistency_score: fullResults.scores.consistency,
          overall_score: fullResults.scores.overall,
          discipline_type: fullResults.disciplineType,
          q1_follow_through: responses.q1,
          q2_maintain_focus: responses.q2,
          q3_give_up: responses.q3,
          q4_resist_pleasure: responses.q4,
          q8_act_impulse: responses.q8,
          q9_control_stress: responses.q9,
          q10_regret_purchases: responses.q10,
          q15_daily_routines: responses.q15,
          q16_productivity_varies: responses.q16,
          q17_bounce_back: responses.q17,
        }
      }).then(({ error }) => {
        if (error) console.error('GHL webhook error:', error);
        else console.log('GHL webhook sent successfully');
      });

      // Get AI insights
      const { data: aiData, error: aiError } = await supabase.functions.invoke('generate-assessment-insights', {
        body: {
          assessmentData: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            responses,
            scores: fullResults.scores,
            disciplineType: fullResults.disciplineType,
            language
          }
        }
      });

      if (aiError) {
        console.error('AI insights error:', aiError);
        toast({
          title: "Insights generation failed",
          description: "Your results are saved, but personalized insights couldn't be generated.",
          variant: "destructive"
        });
      } else if (aiData?.insights) {
        setInsights(aiData.insights);
      }

      setStep('results');
    } catch (error) {
      console.error('Assessment submission error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAssessment = () => {
    setStep('userInfo');
    setUserInfo({ firstName: '', lastName: '', email: '', country: '' });
    setCurrentQuestionIndex(0);
    setResponses({});
    setResults(null);
    setInsights(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {step === 'userInfo' && (
          <UserInfoStep
            userInfo={userInfo}
            onSubmit={handleUserInfoSubmit}
            language={language}
          />
        )}
        {step === 'questions' && (
          <QuestionStep
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedValue={responses[questions[currentQuestionIndex].id]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            isSubmitting={isSubmitting}
            language={language as 'en' | 'nl'}
          />
        )}
        {step === 'results' && results && (
          <ResultsStep
            userInfo={userInfo}
            results={results}
            insights={insights}
            onClose={resetAssessment}
            language={language as 'en' | 'nl'}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
