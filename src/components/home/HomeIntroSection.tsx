import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const HomeIntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 md:py-40 bg-background">
      <div className="container mx-auto px-6 max-w-4xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-lioner-gold font-medium mb-8">
            Our Philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            At Leaders Performance, we don't rush change —{" "}
            <motion.span
              className="text-muted-foreground/40"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              we help it unfold with intention. Through structured environments,
              strategic accountability, and a steady pace, we support growth
              that lasts.
            </motion.span>
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
        </motion.div>
      </div>
    </section>
  );
};
