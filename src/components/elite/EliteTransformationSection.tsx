import { Check, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const EliteTransformationSection = () => {
  const { t } = useLanguage();

  const beforeItems = [
    t("elite.transformation.before1"),
    t("elite.transformation.before2"),
    t("elite.transformation.before3"),
    t("elite.transformation.before4"),
    t("elite.transformation.before5"),
    t("elite.transformation.before6"),
  ].filter(Boolean);

  const afterItems = [
    t("elite.transformation.after1"),
    t("elite.transformation.after2"),
    t("elite.transformation.after3"),
    t("elite.transformation.after4"),
    t("elite.transformation.after5"),
    t("elite.transformation.after6"),
  ].filter(Boolean);

  return (
    <section id="transformation" className="py-8 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">{t("elite.transformation.eyebrow")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            {t("elite.transformation.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("elite.transformation.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-8 md:p-10 border border-border">
            <h3 className="text-2xl font-semibold mb-6 text-foreground/80">{t("elite.transformation.beforeTitle")}</h3>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-destructive/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[hsl(var(--lioner-gold))] p-8 md:p-10 text-white">
            <h3 className="text-2xl font-semibold mb-6">{t("elite.transformation.afterTitle")}</h3>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
