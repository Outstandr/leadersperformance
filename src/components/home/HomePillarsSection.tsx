import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const pillars = [
  {
    title: "Clarity",
    description:
      "We help you cut through the noise and identify what truly matters. Through structured reflection and strategic questioning, you gain the clarity needed to make decisions with confidence — not hesitation.",
  },
  {
    title: "Discipline",
    description:
      "Sustainable success isn't built on motivation — it's built on discipline. We install daily systems, rituals, and accountability structures that keep you performing at your highest level, consistently.",
  },
  {
    title: "Resilience",
    description:
      "Pressure doesn't break strong leaders — it reveals them. We train you to recover faster, stay composed under stress, and turn setbacks into stepping stones for growth.",
  },
  {
    title: "Execution",
    description:
      "Strategy without execution is just theory. We bridge the gap between knowing and doing, ensuring your vision translates into measurable results — week after week.",
  },
];

export const HomePillarsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * pillars.length), pillars.length - 1);
    setActiveIndex(idx);
  });

  const formattedNumber = String(activeIndex + 1).padStart(2, "0");

  return (
    <section ref={containerRef} className="relative bg-background" style={{ height: `${pillars.length * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: scrolling text */}
            <div className="relative">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-8">
                The Four Pillars
              </p>
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 30,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute top-12"
                  style={{ pointerEvents: activeIndex === i ? "auto" : "none" }}
                >
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground mb-6">
                    {pillar.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: large sticky number */}
            <div className="flex items-center justify-center md:justify-end">
              <motion.span
                key={formattedNumber}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.08, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none text-foreground select-none"
              >
                {formattedNumber}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
