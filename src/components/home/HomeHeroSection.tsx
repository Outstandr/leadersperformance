import heroImage from "@/assets/hero-executive.jpg";

export const HomeHeroSection = () => {
  return (
    <>
      {/* Fixed background image that stays in place */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt="Executive leadership"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
      </div>

      {/* Hero section — scrolls normally, content visible over fixed bg */}
      <section className="relative z-10 h-screen flex items-end pb-24 md:pb-32">
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
      </section>

      {/* Curved transition — this scrolls up over the fixed image */}
      <div className="relative z-10 -mt-1">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[80px] block"
        >
          <path
            d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </>
  );
};
