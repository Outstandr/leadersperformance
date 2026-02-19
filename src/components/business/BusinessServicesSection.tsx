import { Heart, BookOpen, Crown, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BusinessServicesSection = () => {
  const { t } = useLanguage();

  const protocols = [
    {
      icon: Heart,
      number: "01",
      title: t("business.services.item1.title"),
      description: t("business.services.item1.desc"),
    },
    {
      icon: BookOpen,
      number: "02",
      title: t("business.services.item2.title"),
      description: t("business.services.item2.desc"),
    },
    {
      icon: Crown,
      number: "03",
      title: t("business.services.item3.title"),
      description: t("business.services.item3.desc"),
    },
    {
      icon: Briefcase,
      number: "04",
      title: t("business.services.item4.title"),
      description: t("business.services.item4.desc"),
    },
  ];

  return (
    <section id="services" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">{t("business.services.eyebrow")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            {t("business.services.heading")}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground whitespace-pre-line text-center">
            {t("business.services.subheading")}
          </p>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wider">{t("business.services.installHeading")}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {protocols.map((protocol, index) => (
            <div
              key={index}
              className="relative p-8 bg-white border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="absolute top-4 right-6 text-6xl font-bold text-lioner-gold/10 select-none">{protocol.number}</span>
              <div className="bg-lioner-gold/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-lioner-gold/20 transition-colors">
                <protocol.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{protocol.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{protocol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
