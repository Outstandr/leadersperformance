import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import testimonialWillem from "@/assets/testimonial-willem.png";
import testimonialHans from "@/assets/testimonial-hans.png";
import testimonialRene from "@/assets/testimonial-rene.png";
import testimonialJitteke from "@/assets/testimonial-jitteke.png";

const testimonials = [
  {
    name: "Willem V.",
    image: testimonialWillem,
    quote: "The UNMASKED experience forced me to confront decisions I'd been avoiding for months. Within two weeks of returning, I restructured my entire leadership team.",
  },
  {
    name: "Hans R.",
    image: testimonialHans,
    quote: "Lionel's advisory gave me the accountability framework I was missing. My execution discipline has completely transformed since we started working together.",
  },
  {
    name: "René K.",
    image: testimonialRene,
    quote: "I went in skeptical and came out with absolute clarity. The desert environment strips everything away — you're left with only what matters.",
  },
  {
    name: "Jitteke M.",
    image: testimonialJitteke,
    quote: "The structured approach to decision-making has been invaluable. I no longer feel paralyzed by the complexity of scaling my business.",
  },
];

export const HomeTestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
              Client <span className="text-lioner-gold">Success</span> Stories
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Hear directly from founders and executives who have experienced clarity through our programs.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[hsl(0,0%,96%)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[hsl(0,0%,96%)] transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-[hsl(0,0%,96%)] rounded-2xl p-8 min-w-[340px] max-w-[400px] shrink-0 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-base font-semibold text-foreground">{t.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.quote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
