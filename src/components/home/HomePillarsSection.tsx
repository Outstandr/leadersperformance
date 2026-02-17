import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

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
      {/* Decorative gold swirling lines */}
      <div className="sticky top-0 h-screen pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1400 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100,200 C200,100 300,500 600,300 S900,600 1200,200 S1500,400 1600,300"
            stroke="hsl(42 35% 53% / 0.12)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-50,500 C150,200 400,700 700,400 S1000,100 1300,500 S1500,200 1600,400"
            stroke="hsl(42 35% 53% / 0.08)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M100,100 C300,400 500,50 800,350 S1100,700 1400,150"
            stroke="hsl(42 35% 53% / 0.10)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-200,600 C100,300 350,800 650,450 S950,50 1250,600 S1450,300 1600,500"
            stroke="hsl(42 35% 53% / 0.06)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Sticky number on the right */}
      <div className="sticky top-0 h-screen pointer-events-none z-0">
        <div className="container mx-auto px-6 max-w-7xl h-full flex items-center">
          <div className="w-full flex justify-end">
            <motion.span
              key={formattedNumber}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.15, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none text-lioner-gold select-none"
            >
              {formattedNumber}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Scrolling text blocks on the left – offset both sticky layers */}
      <div className="relative z-10" style={{ marginTop: `-200vh` }}>
        {pillars.map((pillar, i) => (
          <div key={i} className="h-screen flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="max-w-lg">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-8">
                  The Four Pillars
                </p>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground mb-6">
                  {pillar.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
