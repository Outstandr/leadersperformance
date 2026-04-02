import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cpSections as protectionQuestions } from "@/lib/capitalProtectionQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

interface ProtectionQuestionStepProps {
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
  onBack?: () => void;
}

export function ProtectionQuestionStep({ currentIndex, onAnswer, onBack }: ProtectionQuestionStepProps) {
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const question = protectionQuestions[currentIndex];
  const total = protectionQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIdx(null);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex]);

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

      {/* Animated question container */}
      <div
        key={currentIndex}
        style={{ animation: "fadeSlideIn 0.35s ease-out" }}
      >
        <div className="mb-2 mt-4">
          <span className="text-xs uppercase tracking-[0.2em] text-lioner-gold/70 font-semibold">
            {question.title[language]}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 font-sans">
          "{question.question[language]}"
        </h3>

        <div className="space-y-3">
          {(question.options?.[language] ?? []).map((option, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-5 rounded-none border-2 transition-all group flex items-center justify-between active:scale-[0.98] ${
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
                    {option}
                  </span>
                </div>
                {isSelected && <Check className="w-5 h-5 text-lioner-gold" />}
              </button>
            );
          })}
          {selectedIdx !== null && (
            <Button
              onClick={() => onAnswer(question.id, selectedIdx)}
              className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider mt-4"
            >
              {language === "nl" ? "Doorgaan" : "Continue"}
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          )}
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
    </div>
  );
}
