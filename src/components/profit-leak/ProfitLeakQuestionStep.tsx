import { useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { profitLeakQuestions } from "@/lib/profitLeakQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowLeft } from "lucide-react";

interface ProfitLeakQuestionStepProps {
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
  onBack?: () => void;
}

export function ProfitLeakQuestionStep({ currentIndex, onAnswer, onBack }: ProfitLeakQuestionStepProps) {
  const { language } = useLanguage();
  const question = profitLeakQuestions[currentIndex];
  const total = profitLeakQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex]);

  const currentSection = question.sectionLabel[language];

  return (
    <div ref={containerRef} className="p-6 md:p-10">
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-10 bg-white pb-4 -mx-6 px-6 md:-mx-10 md:px-10 pt-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">
            {language === "nl" ? "Vraag" : "Question"} {currentIndex + 1} {language === "nl" ? "van" : "of"} {total}
          </span>
          <span className="text-xs font-medium text-foreground/50">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-foreground/10" />
        {/* Step dots */}
        <div className="flex gap-1 mt-2 justify-center">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? "w-3 bg-lioner-gold"
                  : i === currentIndex
                  ? "w-6 bg-lioner-gold"
                  : "w-3 bg-foreground/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Section label */}
      <div className="mt-4 mb-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-lioner-gold/70 border border-lioner-gold/30 px-3 py-1">
          {currentSection}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-8 leading-snug">
        {question.question[language]}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(question.id, opt.value)}
            className="w-full p-4 border-2 border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5 transition-all text-left text-foreground font-medium"
          >
            {opt.label[language]}
          </button>
        ))}
      </div>

      {/* Back button */}
      {currentIndex > 0 && onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 mt-6 text-sm text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "nl" ? "Vorige vraag" : "Previous question"}
        </button>
      )}
    </div>
  );
}
