import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Word = ({ word, index, total, scrollYProgress }: { word: string; index: number; total: number; scrollYProgress: any }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(scrollYProgress, [start, end], ["hsl(var(--muted-foreground) / 0.25)", "hsl(var(--foreground))"]);

  return (
    <motion.span style={{ color }} className="font-serif">
      {word}{" "}
    </motion.span>
  );
};

export const HomeIntroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const text = t("home.intro.text");
  const words = text.split(" ");

  return (
    <section id="about" className="py-28 md:py-40 bg-background">
      <div className="container mx-auto px-6 max-w-4xl text-center" ref={containerRef}>
        <p className="text-xs tracking-[0.3em] uppercase text-lioner-gold font-medium mb-8">
          {t("home.intro.philosophy")}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight">
          {words.map((word, i) => (
            <Word key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
          ))}
        </h2>
      </div>
    </section>
  );
};
