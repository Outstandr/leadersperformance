import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";


const SCROLL_SPEED = 1.2; // pixels per frame

export const HomeMissionSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop += SCROLL_SPEED;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
      setIsPlaying(false);
      setAtEnd(true);
      return;
    }
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animRef.current = requestAnimationFrame(step);
    } else if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, step]);

  const toggle = () => {
    if (atEnd) {
      scrollRef.current?.scrollTo({ top: 0 });
      setAtEnd(false);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold">
            Our Purpose
          </p>
          <button
            onClick={toggle}
            className="flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors"
          >
            {atEnd ? (
              <>
                <RotateCcw className="w-4 h-4" />
                Restart
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Read
              </>
            )}
          </button>
        </div>

      {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: Teleprompter */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              className="max-h-[70vh] overflow-y-auto scroll-smooth"
              style={{ scrollbarWidth: "none" }}
              onScroll={() => {
                const el = scrollRef.current;
                if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
                  setAtEnd(true);
                  setIsPlaying(false);
                } else {
                  setAtEnd(false);
                }
              }}
            >
              <div className="py-16 space-y-20">
                {/* MISSION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    Our Mission
                  </h2>
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold">
                    Leaders Performance
                  </p>

                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                    To develop leaders who become the foundation of their own success.
                  </p>

                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>At Leaders Performance, we build the human first.</p>
                    <p>Then the leader.</p>
                    <p>Then the business.</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      Through the RESET Blueprint, we integrate four core dimensions:
                    </p>
                    <ol className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>
                        <span className="text-lioner-gold font-medium">1. Vitality</span> — Physical strength and energy as the base of capacity.
                      </li>
                      <li>
                        <span className="text-lioner-gold font-medium">2. Personal Development</span> — Self-awareness, responsibility, and autonomy beyond conditioning.
                      </li>
                      <li>
                        <span className="text-lioner-gold font-medium">3. Leadership</span> — The ability to empower others from stability and integrity.
                      </li>
                      <li>
                        <span className="text-lioner-gold font-medium">4. AI Integration</span> — Leveraging technology as an amplifier without losing human sovereignty.
                      </li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      Our mission is to create leaders who:
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>• act from conscious choice rather than unconscious programming</li>
                      <li>• use technology without becoming dependent on it</li>
                      <li>• build from alignment instead of ego or validation</li>
                      <li>• produce measurable business growth as a result of internal congruence</li>
                    </ul>
                  </div>

                  <div className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>We do not optimize businesses first.</p>
                    <p className="text-foreground font-medium">We strengthen the individual who leads them.</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-lioner-gold" />

                {/* VISION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    Our Vision
                  </h2>
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold">
                    Leaders Performance
                  </p>

                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                    To shape a new generation of leaders who master the balance between human consciousness and technological acceleration.
                  </p>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    As AI reshapes industries and amplifies speed, human awareness becomes the true competitive advantage.
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      The future belongs to leaders who are:
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>• physically strong</li>
                      <li>• mentally clear</li>
                      <li>• emotionally mature</li>
                      <li>• technologically capable</li>
                      <li>• strategically disciplined</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      Leaders Performance builds an ecosystem where:
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>• high performance becomes a lifestyle</li>
                      <li>• AI becomes a strategic multiplier</li>
                      <li>• human depth remains the differentiator</li>
                      <li>• companies grow from a solid internal foundation</li>
                    </ul>
                  </div>

                  <div className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>We are not building followers.</p>
                    <p className="text-foreground font-medium">
                      We are building autonomous leaders who create the companies of the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative aspect-[3/4] overflow-hidden sticky top-24">
            <img
              src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/websiteimages/Unmasked.png`}
              alt="Leadership vision"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
