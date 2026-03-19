import { Progress } from "@/components/ui/progress";
import { AuditQuestion } from "@/lib/corporateAuditQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AuditQuestionStepProps {
  question: AuditQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: string, value: number) => void;
}

const optionLetters = ["A", "B", "C", "D"];

export function AuditQuestionStep({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: AuditQuestionStepProps) {
  const { t } = useLanguage();
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">
            {t("audit.question")} {currentIndex + 1} {t("audit.of")} {totalQuestions}
          </span>
          <span className="text-xs font-medium text-foreground/50">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1 bg-foreground/10" />
      </div>

      {/* Question Title */}
      <div className="mb-2">
        <span className="text-xs uppercase tracking-[0.2em] text-lioner-gold/70 font-semibold">
          {question.title}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 font-sans">
        "{question.question}"
      </h3>

      {/* 4-point scale options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onAnswer(question.id, option.points)}
            className="w-full text-left p-4 rounded-none border-2 border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5 transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-foreground/20 text-foreground/50 text-sm font-bold shrink-0 group-hover:border-lioner-gold/60 group-hover:text-lioner-gold">
                {optionLetters[idx]}
              </span>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-foreground/30 mt-8 uppercase tracking-wide">
        {t("audit.chooseNoBack")}
      </p>
    </div>
  );
}
