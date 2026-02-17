import { useEffect, useState } from "react";
import logoWhite from "@/assets/logo-white.png";

export const HomeHeroSection = () => {
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - windowH * 0.1) / (windowH * 0.4), 0), 1);
      setFadeOpacity(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed dark blue background */}
      <div className="fixed inset-0 z-0 bg-[hsl(220,70%,12%)]">
        {/* White fade overlay */}
        <div
          className="absolute inset-0 bg-background transition-none"
          style={{ opacity: fadeOpacity }}
        />
      </div>

      {/* Hero content */}
      <section className="relative z-10 h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center gap-10">
          <img
            src={logoWhite}
            alt="Leaders Performance"
            className="w-[320px] md:w-[480px] lg:w-[600px] h-auto"
          />
          <p className="text-background/70 text-base md:text-lg leading-relaxed max-w-lg text-center">
            Strategic advisory and controlled reset environments for founders
            navigating complexity with confidence.
          </p>
          <a
            href="#start-here"
            className="inline-flex items-center gap-3 bg-lioner-gold text-foreground rounded-full px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-lioner-gold/90 transition-colors"
          >
            Start Your Journey
            <span className="w-2 h-2 rounded-full bg-foreground/40" />
          </a>
        </div>
      </section>

      {/* Bottom gradient fade */}
      <div className="relative z-10 h-32 md:h-48 -mt-32 md:-mt-48 bg-gradient-to-b from-transparent to-background" />
    </>
  );
};
