import { Quote } from "lucide-react";

export const EliteQuoteSection2 = () => {
  return (
    <section className="py-12 bg-[hsl(var(--lioner-charcoal))]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Quote className="w-10 h-10 text-[hsl(var(--lioner-gold))] mx-auto mb-6 opacity-80" />
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed italic">
          "If you keep starting over, you don't need a new plan — you need a stronger frame."
        </blockquote>
        <p className="mt-6 text-lg text-[hsl(var(--lioner-gold))] font-medium">- Lionel -</p>
      </div>
    </section>
  );
};
