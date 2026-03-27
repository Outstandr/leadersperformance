import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question, ratingLabels } from "@/lib/assessmentQuestions";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface QuestionStepProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedValue: number | undefined;
  onAnswer: (questionId: string, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  language: 'en' | 'nl';
}

export function QuestionStep({
  question,
  currentIndex,
  totalQuestions,
  selectedValue,
  onAnswer,
  onNext,
  onBack,
  isSubmitting,
  language
}: QuestionStepProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const labels = ratingLabels[language];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex]);

  const handleValueChange = (value: string) => {
    onAnswer(question.id, parseInt(value));
  };

  const handlePick = (value: number) => {
    onAnswer(question.id, value);
  };

  const ui = {
    en: {
      questionOf: `Question ${currentIndex + 1} of ${totalQuestions}`,
      back: "Back",
      next: "Next",
      analyzing: "Analyzing...",
      seeResults: "See Results",
    },
    nl: {
      questionOf: `Vraag ${currentIndex + 1} van ${totalQuestions}`,
      back: "Terug",
      next: "Volgende",
      analyzing: "Analyseren...",
      seeResults: "Bekijk resultaten",
    },
  }[language];

  return (
    <div ref={containerRef} className="p-6 md:p-8">
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-10 bg-white pb-4 -mx-6 px-6 md:-mx-8 md:px-8 pt-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {ui.questionOf}
          </span>
          <span className="text-sm font-medium text-lioner-gold">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        {/* Step dots */}
        <div className="flex gap-1 mt-2 justify-center">
          {Array.from({ length: totalQuestions }).map((_, i) => (
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
        <h3 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8 mt-4">
          {question.text[language]}
        </h3>

        <RadioGroup
          value={selectedValue?.toString()}
          onValueChange={handleValueChange}
          className="space-y-3 mb-8"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handlePick(value)}
              className={
                "w-full flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all text-left active:scale-[0.98] " +
                "border-muted hover:border-lioner-gold/50 " +
                (selectedValue === value ? "border-lioner-gold bg-lioner-gold/5" : "")
              }
            >
              <RadioGroupItem
                value={value.toString()}
                className="mr-4 shrink-0"
                aria-label={`Rating ${value}`}
              />
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mr-4">
                {value}
              </span>
              <span className="text-foreground">{labels[value - 1]}</span>
            </button>
          ))}
        </RadioGroup>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 rounded-none py-6"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {ui.back}
          </Button>
          <Button
            onClick={onNext}
            disabled={!selectedValue || isSubmitting}
            className="flex-1 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {ui.analyzing}
              </>
            ) : isLastQuestion ? (
              ui.seeResults
            ) : (
              <>
                {ui.next}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
