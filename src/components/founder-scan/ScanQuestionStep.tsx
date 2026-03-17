import { Progress } from "@/components/ui/progress";
import { pressureQuestions, scaleLabels } from "@/lib/founderPressureQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ScanQuestionStepProps {
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
}

export function ScanQuestionStep({ currentIndex, onAnswer }: ScanQuestionStepProps) {
  const { language } = useLanguage();
  const question = pressureQuestions[currentIndex];
  const total = pressureQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const labels = scaleLabels[language];

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
        "{question.question[language]}"
      </h3>

      {/* 4-point scale */}
      <div className="space-y-3">
        {labels.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onAnswer(question.id, option.value)}
            className="w-full text-left p-5 rounded-none border-2 border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-foreground/20 text-foreground/50 text-sm font-bold shrink-0 group-hover:border-lioner-gold/60 group-hover:text-lioner-gold">
                {option.value}
              </span>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-foreground/30 mt-8 uppercase tracking-wide">
        {language === "nl" ? "Kies. Geen weg terug." : "Choose. No going back."}
      </p>
    </div>
  );
}
