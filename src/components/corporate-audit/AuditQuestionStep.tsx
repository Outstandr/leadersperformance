import { Progress } from "@/components/ui/progress";
import { AuditQuestion } from "@/lib/corporateAuditQuestions";

interface AuditQuestionStepProps {
  question: AuditQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: string, value: number) => void;
}

export function AuditQuestionStep({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: AuditQuestionStepProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-medium text-white/50">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1 bg-white/10" />
      </div>

      {/* Question Title */}
      <div className="mb-2">
        <span className="text-xs uppercase tracking-[0.2em] text-lioner-gold/70 font-semibold">
          {question.title}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8 font-sans">
        "{question.question}"
      </h3>

      {/* Binary Options */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => onAnswer(question.id, question.optionA.points)}
          className="w-full text-left p-5 rounded-none border-2 border-white/10 hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
        >
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-white/20 text-white/50 text-sm font-bold shrink-0 group-hover:border-red-500/50 group-hover:text-red-400">
              A
            </span>
            <span className="text-white/80 group-hover:text-white transition-colors">
              {question.optionA.label}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onAnswer(question.id, question.optionB.points)}
          className="w-full text-left p-5 rounded-none border-2 border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
        >
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-white/20 text-white/50 text-sm font-bold shrink-0 group-hover:border-green-500/50 group-hover:text-green-400">
              B
            </span>
            <span className="text-white/80 group-hover:text-white transition-colors">
              {question.optionB.label}
            </span>
          </div>
        </button>
      </div>

      {/* No back button - by design */}
      <p className="text-center text-xs text-white/30 mt-8 uppercase tracking-wide">
        Choose. No going back.
      </p>
    </div>
  );
}
