import { Quote } from "lucide-react";

export const BusinessQuoteSection = () => {
  return (
    <section className="py-12 bg-[hsl(var(--lioner-charcoal))]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Quote className="w-10 h-10 text-[hsl(var(--lioner-gold))] mx-auto mb-6 opacity-80" />
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed italic">
          "Entrepreneurship is living a few years of your life like most people won't, so you can spend the rest of your life like most people can't."
        </blockquote>
        <p className="mt-6 text-2xl md:text-3xl text-[hsl(var(--lioner-gold))] font-semibold">- Lionel -</p>
      </div>
    </section>
  );
};
