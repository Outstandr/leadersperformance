import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cpSections, type CPSection } from "@/lib/capitalProtectionQuestions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CPQuestionStepProps {
  currentIndex: number;
  onAnswer: (sectionId: string, value: string | string[] | boolean) => void;
  onBack?: () => void;
}

export function CPQuestionStep({ currentIndex, onAnswer, onBack }: CPQuestionStepProps) {
  const { language } = useLanguage();
  const section = cpSections[currentIndex];
  const total = cpSections.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="p-6 md:p-10">
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-10 bg-white pb-4 -mx-6 px-6 md:-mx-10 md:px-10 pt-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">
            {language === "nl" ? "Sectie" : "Section"} {currentIndex + 1} {language === "nl" ? "van" : "of"} {total}
          </span>
          <span className="text-xs font-medium text-foreground/50">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-foreground/10" />
        {/* Step dots */}
        <div className="flex gap-0.5 mt-2 justify-center flex-wrap">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? "w-2 bg-lioner-gold"
                  : i === currentIndex
                  ? "w-4 bg-lioner-gold"
                  : "w-2 bg-foreground/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Back button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 text-sm mb-6 mt-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "nl" ? "Vorige" : "Back"}
        </button>
      )}

      {/* Animated question container */}
      <div
        key={currentIndex}
        style={{ animation: "fadeSlideIn 0.35s ease-out" }}
      >
        <div className="mb-2">
          <span className="text-xs uppercase tracking-[0.2em] text-lioner-gold/70 font-semibold">
            {section.title[language]}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 font-sans">
          {section.question[language]}
        </h3>

        {section.type === "single" && <SingleSelect section={section} language={language} onAnswer={onAnswer} />}
        {section.type === "multi" && <MultiSelect section={section} language={language} onAnswer={onAnswer} />}
        {section.type === "text" && <TextInput section={section} language={language} onAnswer={onAnswer} />}
        {section.type === "multi-text" && <MultiTextInput section={section} language={language} onAnswer={onAnswer} />}
        {section.type === "boolean" && <BooleanSelect section={section} language={language} onAnswer={onAnswer} />}
      </div>
    </div>
  );
}

function SingleSelect({ section, language, onAnswer }: { section: CPSection; language: "en" | "nl"; onAnswer: CPQuestionStepProps["onAnswer"] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = section.options?.[language] ?? [];
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`w-full text-left p-5 rounded-none border-2 transition-all group flex items-center justify-between active:scale-[0.98] ${
              isSelected ? "border-lioner-gold bg-lioner-gold/10" : "border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5"
            }`}
          >
            <span className={isSelected ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground transition-colors"}>{option}</span>
            {isSelected && <Check className="w-5 h-5 text-lioner-gold" />}
          </button>
        );
      })}
      {selected && (
        <Button
          onClick={() => onAnswer(section.id, selected)}
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider mt-4"
        >
          {language === "nl" ? "Doorgaan" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      )}
    </div>
  );
}

function MultiSelect({ section, language, onAnswer }: { section: CPSection; language: "en" | "nl"; onAnswer: CPQuestionStepProps["onAnswer"] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const options = section.options?.[language] ?? [];

  const toggle = (opt: string) => {
    setSelected((prev) => prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`w-full text-left p-5 rounded-none border-2 transition-all group flex items-center justify-between active:scale-[0.98] ${
              isSelected ? "border-lioner-gold bg-lioner-gold/10" : "border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5"
            }`}
          >
            <span className={isSelected ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground"}>{option}</span>
            {isSelected && <Check className="w-5 h-5 text-lioner-gold" />}
          </button>
        );
      })}
      {selected.length > 0 && (
        <Button
          onClick={() => onAnswer(section.id, selected)}
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider mt-4"
        >
          {language === "nl" ? "Doorgaan" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      )}
    </div>
  );
}

function TextInput({ section, language, onAnswer }: { section: CPSection; language: "en" | "nl"; onAnswer: CPQuestionStepProps["onAnswer"] }) {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={section.textPlaceholder?.[language] ?? ""}
        className="min-h-[120px] bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none"
        maxLength={2000}
      />
      <Button
        onClick={() => onAnswer(section.id, value.trim())}
        disabled={!value.trim()}
        className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
      >
        {language === "nl" ? "Doorgaan" : "Continue"}
        <ArrowRight className="w-5 h-5 ml-3" />
      </Button>
    </div>
  );
}

function MultiTextInput({ section, language, onAnswer }: { section: CPSection; language: "en" | "nl"; onAnswer: CPQuestionStepProps["onAnswer"] }) {
  const count = section.textCount ?? 3;
  const [values, setValues] = useState<string[]>(Array(count).fill(""));
  const placeholder = section.textPlaceholder?.[language] ?? "";

  const update = (i: number, val: string) => {
    setValues((prev) => { const next = [...prev]; next[i] = val; return next; });
  };

  const hasAtLeastOne = values.some((v) => v.trim());

  return (
    <div className="space-y-4">
      {values.map((val, i) => (
        <Input
          key={i}
          value={val}
          onChange={(e) => update(i, e.target.value)}
          placeholder={`${placeholder} ${i + 1}`}
          className="bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none"
          maxLength={100}
        />
      ))}
      <Button
        onClick={() => onAnswer(section.id, values.filter((v) => v.trim()))}
        disabled={!hasAtLeastOne}
        className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
      >
        {language === "nl" ? "Doorgaan" : "Continue"}
        <ArrowRight className="w-5 h-5 ml-3" />
      </Button>
    </div>
  );
}

function BooleanSelect({ section, language, onAnswer }: { section: CPSection; language: "en" | "nl"; onAnswer: CPQuestionStepProps["onAnswer"] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = language === "nl" ? ["Ja", "Nee"] : ["Yes", "No"];
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`w-full text-left p-5 rounded-none border-2 transition-all group flex items-center justify-between active:scale-[0.98] ${
              isSelected ? "border-lioner-gold bg-lioner-gold/10" : "border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5"
            }`}
          >
            <span className={isSelected ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground transition-colors"}>{option}</span>
            {isSelected && <Check className="w-5 h-5 text-lioner-gold" />}
          </button>
        );
      })}
      {selected && (
        <Button
          onClick={() => onAnswer(section.id, selected === "Yes" || selected === "Ja")}
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider mt-4"
        >
          {language === "nl" ? "Doorgaan" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      )}
    </div>
  );
}
