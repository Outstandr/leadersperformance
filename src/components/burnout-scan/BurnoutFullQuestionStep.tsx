import { Progress } from "@/components/ui/progress";
import { burnoutFullQuestions } from "@/lib/burnoutFullQuestions";
import { burnoutScaleLabels } from "@/lib/burnoutFreeQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface BurnoutFullQuestionStepProps {
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
}

export function BurnoutFullQuestionStep({ currentIndex, onAnswer }: BurnoutFullQuestionStepProps) {
  const { language } = useLanguage();
  const question = burnoutFullQuestions[currentIndex];
  const total = burnoutFullQuestions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const labels = burnoutScaleLabels[language];

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
            {language === "nl" ? "Volledige Diagnostiek" : "Full Diagnostic"} — {language === "nl" ? "Vraag" : "Question"} {currentIndex + 1} / {total}
          </span>
          <span className="text-xs font-medium text-foreground/50">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1 bg-foreground/10" />
      </div>

      <div className="mb-2">
        <span className="text-xs uppercase tracking-[0.2em] text-red-500/70 font-semibold">
          {question.domainLabel[language]}
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
            className="w-full text-left p-5 rounded-none border-2 border-foreground/10 hover:border-red-500/60 hover:bg-red-500/5 transition-all group"
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

      <p className="text-center text-xs text-foreground/30 mt-8 uppercase tracking-wide">
        {language === "nl" ? "Neem de tijd. Wees eerlijk." : "Take your time. Be honest."}
      </p>
    </div>
  );
}
