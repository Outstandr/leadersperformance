import { motion } from "framer-motion";

export const HomeTransitionSection = () => {
  return (
    <section className="sticky top-0 z-0 py-24 md:py-32 bg-background text-center flex items-center min-h-[70vh]">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-8"
        >
          Balance
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] font-medium leading-[1.15] tracking-tight text-foreground"
        >
          There may not be a single switch,
          <br />
          <span className="text-lioner-gold">but there are clear steps forward.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
        >
          Every path is different. These are the ways we help people move forward with confidence.
        </motion.p>
      </div>
    </section>
  );
};
