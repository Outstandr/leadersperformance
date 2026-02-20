import { MessageSquare, ClipboardCheck, Rocket, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const EliteProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    { number: "01", icon: MessageSquare, title: t("elite.process.step1"), description: t("elite.process.step1Desc") },
    { number: "02", icon: ClipboardCheck, title: t("elite.process.step2"), description: t("elite.process.step2Desc") },
    { number: "03", icon: Rocket, title: t("elite.process.step3"), description: t("elite.process.step3Desc") },
    { number: "04", icon: Trophy, title: t("elite.process.step4"), description: t("elite.process.step4Desc") },
  ];

  return (
    <section id="process" className="py-8 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">{t("elite.process.eyebrow")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            {t("elite.process.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("elite.process.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 border border-border h-full">
                <div className="text-5xl font-bold text-lioner-gold/20 mb-4">{step.number}</div>
                <div className="bg-lioner-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-lioner-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-lioner-gold/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
