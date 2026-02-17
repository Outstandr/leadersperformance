import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-executive.jpg";

export const HomeHeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Content fades out as user scrolls
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background image — fixed, no movement */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Executive leadership"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
      </div>

      {/* Bottom curved gradient fade into white */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full h-[120px] md:h-[180px]"
        >
          <defs>
            <linearGradient id="heroFadeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <ellipse
            cx="720"
            cy="180"
            rx="900"
            ry="180"
            fill="url(#heroFadeGrad)"
          />
        </svg>
      </div>

      {/* Hero content — positioned near bottom */}
      <motion.div
        className="relative z-[5] h-full flex items-end pb-24 md:pb-32"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
            {/* Left — Headline */}
            <div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-background leading-[1.05] tracking-tight">
                A Path That
                <br />
                Shapes Your
                <br />
                <span className="text-lioner-gold italic">Future.</span>
              </h1>
            </div>

            {/* Right — Description + CTA */}
            <div className="flex flex-col items-start md:items-end gap-6">
              <p className="text-background/80 text-base md:text-lg leading-relaxed max-w-md md:text-right">
                We offer strategic advisory and controlled reset environments to help
                founders navigate complexity with confidence. Together, we'll build
                clarity, execution discipline, and lasting performance.
              </p>
              <a
                href="#start-here"
                className="inline-flex items-center gap-3 bg-lioner-gold text-foreground rounded-full px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-lioner-gold/90 transition-colors"
              >
                Start Your Journey
                <span className="w-2 h-2 rounded-full bg-foreground/40" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
