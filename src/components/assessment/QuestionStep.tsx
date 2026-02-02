import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

  const handleValueChange = (value: string) => {
    onAnswer(question.id, parseInt(value));
  };

  return (
    <div className="p-6 md:p-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-lioner-gold">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
          {question.text[language]}
        </h3>
      </div>

      {/* Rating Scale */}
      <RadioGroup
        value={selectedValue?.toString()}
        onValueChange={handleValueChange}
        className="space-y-3 mb-8"
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="flex items-center">
            <RadioGroupItem
              value={value.toString()}
              id={`rating-${value}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`rating-${value}`}
              className="flex items-center w-full p-4 rounded-lg border-2 cursor-pointer transition-all
                border-muted hover:border-lioner-gold/50
                peer-data-[state=checked]:border-lioner-gold peer-data-[state=checked]:bg-lioner-gold/5"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mr-4">
                {value}
              </span>
              <span className="text-foreground">{labels[value - 1]}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-none py-6"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedValue || isSubmitting}
          className="flex-1 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : isLastQuestion ? (
            "See Results"
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
