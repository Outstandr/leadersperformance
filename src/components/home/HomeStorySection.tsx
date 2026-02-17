import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/websiteimages`;

export const HomeStorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-8">
              Real People. Real Change.
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-foreground">
              Finding balance
              <br />
              after burnout.
            </h2>
            <p className="mt-8 text-base text-muted-foreground leading-relaxed max-w-md">
              After years of chronic stress and emotional fatigue, Maya reached
              out during a low point. Through small, consistent steps, she
              rediscovered stability and reconnected with her creative energy.
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors"
              >
                Read Full Story
                <span className="w-2 h-2 rounded-full bg-lioner-gold" />
              </a>
            </div>
          </div>

          {/* Single image with parallax, square corners */}
          <div ref={ref} className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={`${STORAGE_URL}/Unmasked.png`}
              alt="Finding balance after burnout"
              style={{ y }}
              className="w-full h-[115%] object-cover absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
