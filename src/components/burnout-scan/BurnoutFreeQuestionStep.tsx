import { useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { burnoutFreeQuestions, burnoutScaleLabels } from "@/lib/burnoutFreeQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface BurnoutFreeQuestionStepProps {
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
  onBack?: () => void;
}

export function BurnoutFreeQuestionStep({ currentIndex, onAnswer, onBack }: BurnoutFreeQuestionStepProps) {
  const { language } = useLanguage();
  const question = burnoutFreeQuestions[currentIndex];
  const total = burnoutFreeQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const labels = burnoutScaleLabels[language];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="p-6 md:p-10">
      {/* Sticky progress bar for mobile clarity */}
      <div className="sticky top-0 z-10 bg-white pb-4 -mx-6 px-6 md:-mx-10 md:px-10 pt-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
            {language === "nl" ? "Vraag" : "Question"} {currentIndex + 1} {language === "nl" ? "van" : "of"} {total}
          </span>
          <span className="text-xs font-medium text-foreground/50">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-foreground/10" />
        {/* Step dots for visual clarity */}
        <div className="flex gap-1 mt-2 justify-center">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? "w-3 bg-red-500"
                  : i === currentIndex
                  ? "w-6 bg-red-500"
                  : "w-3 bg-foreground/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated question container */}
      <div
        key={currentIndex}
        className="animate-fade-in"
        style={{ animation: "fadeSlideIn 0.35s ease-out" }}
      >
        <div className="mb-2 mt-4">
          <span className="text-xs uppercase tracking-[0.2em] text-red-500/70 font-semibold">
            {question.sectionLabel[language]}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 font-sans">
          "{question.question[language]}"
        </h3>

        <div className="space-y-3">
          {labels.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(question.id, option.value)}
              className="w-full text-left p-5 rounded-none border-2 border-foreground/10 hover:border-red-500/60 hover:bg-red-500/5 transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-foreground/20 text-foreground/50 text-sm font-bold shrink-0 group-hover:border-red-500/60 group-hover:text-red-500">
                  {option.value}
                </span>
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {currentIndex > 0 && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-foreground/40 hover:text-foreground/70 transition-colors uppercase tracking-widest"
          >
            ← {language === "nl" ? "Vorige" : "Back"}
          </button>
        )}

        <p className="text-center text-xs text-foreground/30 mt-4 uppercase tracking-wide">
          {language === "nl" ? "Kies. Geen weg terug." : "Choose. No going back."}
        </p>
      </div>
    </div>
  );
}
