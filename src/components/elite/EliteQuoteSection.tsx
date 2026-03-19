import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const EliteQuoteSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-[hsl(var(--lioner-charcoal))]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Quote className="w-10 h-10 text-[hsl(var(--lioner-gold))] mx-auto mb-6 opacity-80" />
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed italic">
          "{t("elite.quote1")}"
        </blockquote>
        <p className="mt-6 text-2xl text-[hsl(var(--lioner-gold))] font-semibold font-serif md:text-4xl">- Lionel -</p>
      </div>
    </section>);

};