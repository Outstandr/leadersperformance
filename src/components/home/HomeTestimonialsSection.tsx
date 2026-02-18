import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import testimonialWillem from "@/assets/testimonial-willem.png";
import testimonialHans from "@/assets/testimonial-hans.png";
import testimonialRene from "@/assets/testimonial-rene.png";
import testimonialJitteke from "@/assets/testimonial-jitteke.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const HomeTestimonialsSection = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    { name: "Willem V.", image: testimonialWillem, quote: t("home.testimonials.q1") },
    { name: "Hans R.", image: testimonialHans, quote: t("home.testimonials.q2") },
    { name: "René K.", image: testimonialRene, quote: t("home.testimonials.q3") },
    { name: "Jitteke M.", image: testimonialJitteke, quote: t("home.testimonials.q4") },
  ];

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
              {t("home.testimonials.heading")} <span className="text-lioner-gold">{t("home.testimonials.headingGold")}</span> {t("home.testimonials.headingSuffix")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              {t("home.testimonials.subheading")}
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
        {testimonials.map((t_item) => (
          <div
            key={t_item.name}
            className="bg-[hsl(0,0%,96%)] rounded-2xl p-8 min-w-[340px] max-w-[400px] shrink-0 flex flex-col gap-6 border-2 border-lioner-gold/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-4">
              <img src={t_item.image} alt={t_item.name} className="w-12 h-12 rounded-full object-cover" />
              <span className="text-base font-semibold text-foreground">{t_item.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t_item.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
