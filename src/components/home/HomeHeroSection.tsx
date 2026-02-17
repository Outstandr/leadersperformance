import { useEffect, useState } from "react";
import heroImage from "@/assets/lionel-hero-new-6.png";

export const HomeHeroSection = () => {
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      // Start fading at 30% of viewport, fully white at 100%
      const progress = Math.min(Math.max((scrollY - windowH * 0.1) / (windowH * 0.4), 0), 1);
      setFadeOpacity(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt="Executive leadership"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
        {/* White fade overlay */}
        <div
          className="absolute inset-0 bg-background transition-none"
          style={{ opacity: fadeOpacity }}
        />
      </div>

      {/* Hero content */}
      <section className="relative z-10 h-screen flex items-end pb-24 md:pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
            <div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-background leading-[1.05] tracking-tight">
                A Path That
                <br />
                Shapes Your
                <br />
                <span className="text-lioner-gold italic">Future.</span>
              </h1>
            </div>
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
      </section>

      {/* Bottom gradient fade */}
      <div className="relative z-10 h-32 md:h-48 -mt-32 md:-mt-48 bg-gradient-to-b from-transparent to-background" />
    </>
  );
};
