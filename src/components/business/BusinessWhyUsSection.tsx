import { AlertTriangle, UserX, Ghost } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BusinessWhyUsSection = () => {
  const { t } = useLanguage();

  const symptoms = [
    {
      icon: AlertTriangle,
      title: t("business.whyUs.symptom1.title"),
      quote: t("business.whyUs.symptom1.quote"),
    },
    {
      icon: UserX,
      title: t("business.whyUs.symptom2.title"),
      quote: t("business.whyUs.symptom2.quote"),
    },
    {
      icon: Ghost,
      title: t("business.whyUs.symptom3.title"),
      quote: t("business.whyUs.symptom3.quote"),
    },
  ];

  return (
    <section id="why-us" className="py-8 lg:py-12 bg-gradient-to-b from-muted/60 to-muted/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-6">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">{t("business.whyUs.eyebrow")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            {t("business.whyUs.heading")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {t("business.whyUs.body1")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {t("business.whyUs.body2")}
          </p>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wider">{t("business.whyUs.symptomsHeading")}</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {symptoms.map((symptom, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-lioner-gold">
                <symptom.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{symptom.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">{symptom.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
