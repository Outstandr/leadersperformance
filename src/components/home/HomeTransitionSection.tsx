import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const HomeTransitionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="sticky top-0 z-0 py-24 md:py-32 bg-background text-center flex items-center min-h-[70vh]">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-8"
        >
          {t("home.transition.eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] font-medium leading-[1.15] tracking-tight text-foreground"
        >
          {t("home.transition.headline1")}
          <br />
          <span className="text-lioner-gold">{t("home.transition.headline2")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
        >
          {t("home.transition.body")}
        </motion.p>
      </div>
    </section>
  );
};
