import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { capitalAssessmentQuestions } from "@/lib/capitalAssessmentQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface AssessmentQuestionStepProps {
  currentIndex: number;
  responses: Record<string, string | string[]>;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
  isSubmitting: boolean;
}

export function AssessmentQuestionStep({
  currentIndex,
  responses,
  onAnswer,
  onNext,
  onBack,
  isLast,
  isSubmitting,
}: AssessmentQuestionStepProps) {
  const { language } = useLanguage();
  const question = capitalAssessmentQuestions[currentIndex];
  const total = capitalAssessmentQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;

  const currentValue = responses[question.id];

  const handleMultiToggle = (val: string) => {
    const current = Array.isArray(currentValue) ? currentValue : [];
    if (val === "none") {
      // "None" clears everything else
      onAnswer(question.id, ["none"]);
      return;
    }
    const withoutNone = current.filter((v) => v !== "none");
    if (withoutNone.includes(val)) {
      onAnswer(question.id, withoutNone.filter((v) => v !== val));
    } else {
      onAnswer(question.id, [...withoutNone, val]);
    }
  };

  const isAnswered = question.type === "text"
    ? typeof currentValue === "string" && currentValue.trim().length > 0
    : question.type === "multi"
    ? Array.isArray(currentValue) && currentValue.length > 0
    : !!currentValue;

  return (
    <div className="p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">
            {language === "nl" ? "Vraag" : "Question"} {currentIndex + 1} {language === "nl" ? "van" : "of"} {total}
          </span>
          <span className="text-xs font-medium text-foreground/50">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1 bg-foreground/10" />
      </div>

      {/* Section Label */}
      <div className="mb-2">
        <span className="text-xs uppercase tracking-[0.2em] text-lioner-gold/70 font-semibold">
          {question.sectionLabel[language]}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 font-sans">
        {question.question[language]}
      </h3>

      {/* Answer Area */}
      {question.type === "text" ? (
        <Textarea
          value={(currentValue as string) || ""}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder={language === "nl" ? "Beschrijf de situatie kort..." : "Describe the situation briefly..."}
          className="min-h-[120px] bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none resize-none"
        />
      ) : question.type === "multi" ? (
        <div className="space-y-3">
          {question.options?.map((option, idx) => {
            const selected = Array.isArray(currentValue) && currentValue.includes(option.value);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleMultiToggle(option.value)}
                className={`w-full text-left p-5 rounded-none border-2 transition-all group ${
                  selected
                    ? "border-lioner-gold bg-lioner-gold/10"
                    : "border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-none border-2 text-sm font-bold shrink-0 ${
                    selected
                      ? "border-lioner-gold text-lioner-gold bg-lioner-gold/20"
                      : "border-foreground/20 text-foreground/50 group-hover:border-lioner-gold/60 group-hover:text-lioner-gold"
                  }`}>
                    {selected ? "✓" : String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`${selected ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground"} transition-colors`}>
                    {option.label[language]}
                  </span>
                </div>
              </button>
            );
          })}
          <p className="text-xs text-foreground/40 text-center mt-2">
            {language === "nl" ? "Selecteer alle toepasselijke opties" : "Select all that apply"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {question.options?.map((option, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onAnswer(question.id, option.value)}
              className={`w-full text-left p-5 rounded-none border-2 transition-all group ${
                currentValue === option.value
                  ? "border-lioner-gold bg-lioner-gold/10"
                  : "border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-none border-2 text-sm font-bold shrink-0 ${
                  currentValue === option.value
                    ? "border-lioner-gold text-lioner-gold bg-lioner-gold/20"
                    : "border-foreground/20 text-foreground/50 group-hover:border-lioner-gold/60 group-hover:text-lioner-gold"
                }`}>
                  {currentValue === option.value ? "✓" : String.fromCharCode(65 + idx)}
                </span>
                <span className={`${currentValue === option.value ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground"} transition-colors`}>
                  {option.label[language]}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-none py-5 border-foreground/20 text-foreground/60"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === "nl" ? "Vorige" : "Back"}
        </Button>
        <Button
          onClick={onNext}
          disabled={!isAnswered || isSubmitting}
          className="flex-1 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-5 font-bold uppercase tracking-wider"
        >
          {isLast
            ? (isSubmitting ? (language === "nl" ? "Analyseren..." : "Analyzing...") : (language === "nl" ? "Rapport genereren" : "Generate Report"))
            : (language === "nl" ? "Volgende" : "Next")}
          {!isLast && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
