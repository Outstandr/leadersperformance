import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-executive.jpg";
import logo from "@/assets/logo-white.png";

export const HomeHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Hero content fades out in first half
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  // Toggle section fades in at midpoint
  const toggleOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const toggleScale = useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1]);

  // Toggle flips at 60%
  const toggleProgress = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  // Background transitions from dark to white
  const bgOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // Reveal text after toggle
  const revealOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.7, 0.9], [40, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0 bg-foreground" />

        {/* White overlay that fades in */}
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: bgOpacity }}
        />

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex items-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Executive leadership"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
          </div>

          <div className="relative container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-background leading-[1.05] tracking-tight">
                  A Path That
                  <br />
                  Shapes Your
                  <br />
                  <span className="text-lioner-gold italic">Future.</span>
                </h1>
              </div>
              <div className="flex flex-col items-start md:items-end gap-8">
                <p className="text-background/70 text-base md:text-lg leading-relaxed max-w-md md:text-right">
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

        {/* Balance Toggle Section */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: toggleOpacity, scale: toggleScale }}
        >
          {/* Toggle */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-background/80">
              Balance
            </span>
            <motion.div className="relative w-16 h-8 rounded-full bg-muted-foreground/30 overflow-hidden">
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-background shadow-lg"
                style={{ x: useTransform(toggleProgress, [0, 1], [0, 32]) }}
              />
            </motion.div>
          </div>

          {/* Toggle message */}
          <motion.h2
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-center leading-tight max-w-4xl"
            style={{
              color: useTransform(
                bgOpacity,
                [0, 1],
                ["hsl(0,0%,100%)", "hsl(0,0%,9%)"]
              ),
            }}
          >
            If only finding balance were
            <br />
            as simple as flipping a switch.
          </motion.h2>

          <motion.div
            className="mt-8 text-center"
            style={{
              color: useTransform(
                bgOpacity,
                [0, 1],
                ["hsl(0,0%,100%,0.6)", "hsl(0,0%,45%)"]
              ),
            }}
          >
            <p className="text-base">You're closer than you think.</p>
            <p className="text-base">And every step you take makes it clearer.</p>
          </motion.div>
        </motion.div>

        {/* Reveal section */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-lioner-gold font-medium mb-6">
            Our Philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground text-center leading-tight max-w-4xl">
            There may not be a single switch —{" "}
            <span className="text-muted-foreground/40">
              but there is a process that reshapes everything.
            </span>
          </h2>
          <a
            href="#about"
            className="mt-10 inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors"
          >
            About Leaders Performance
            <span className="w-2 h-2 rounded-full bg-lioner-gold" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};
