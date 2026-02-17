import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fullText =
  "At Leaders Performance, we don't rush change — we help it unfold with intention. Through structured environments, strategic accountability, and a steady pace, we support growth that lasts.";

const words = fullText.split(" ");

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  return (
    <section id="about" className="py-28 md:py-40 bg-background">
      <div className="container mx-auto px-6 max-w-4xl text-center" ref={containerRef}>
        <p className="text-xs tracking-[0.3em] uppercase text-lioner-gold font-medium mb-8">
          Our Philosophy
        </p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight">
          {words.map((word, i) => (
            <Word key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
          ))}
        </h2>
        <div className="mt-12">
          <a
            href="#about"
            className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors"
          >
            About Leaders Performance
            <span className="w-2 h-2 rounded-full bg-lioner-gold" />
          </a>
        </div>
      </div>
    </section>
  );
};
