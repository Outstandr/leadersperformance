import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cpSections as protectionQuestions } from "@/lib/capitalProtectionQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, Check } from "lucide-react";

interface ProtectionQuestionStepProps {
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
}

export function ProtectionQuestionStep({ currentIndex, onAnswer }: ProtectionQuestionStepProps) {
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const question = protectionQuestions[currentIndex];
  const total = protectionQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;

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
          {question.title[language]}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 font-sans">
        "{question.question[language]}"
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`w-full text-left p-5 rounded-none border-2 transition-all group flex items-center justify-between ${
                isSelected ? "border-lioner-gold bg-lioner-gold/10" : "border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-none border-2 text-sm font-bold shrink-0 ${
                  isSelected ? "border-lioner-gold text-lioner-gold" : "border-foreground/20 text-foreground/50 group-hover:border-lioner-gold/60 group-hover:text-lioner-gold"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={isSelected ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground transition-colors"}>
                  {option.label[language]}
                </span>
              </div>
              {isSelected && <Check className="w-5 h-5 text-lioner-gold" />}
            </button>
          );
        })}
        {selectedIdx !== null && (
          <Button
            onClick={() => onAnswer(question.id, question.options[selectedIdx].value)}
            className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider mt-4"
          >
            {language === "nl" ? "Doorgaan" : "Continue"}
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-foreground/30 mt-8 uppercase tracking-wide">
        {language === "nl" ? "Kies. Geen weg terug." : "Choose. No going back."}
      </p>
    </div>
  );
}
