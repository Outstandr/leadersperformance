import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { CapitalProtectionDialog } from "./CapitalProtectionDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const CapitalProtectionCTASection = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const t = language === "nl"
    ? {
        badge: "Kapitaalbescherming",
        heading: "Is uw bedrijfsstructuur beschermd tegen kapitaalverlies?",
        body1: "Veel founders verliezen kapitaal door partners, investeerders of slechte structuren.\n\nDeze scan beoordeelt of uw bedrijfsstructuur u beschermt tegen financiële geschillen, fraude of kapitaalverlies.",
        body2: "Ontvang direct een Capital Risk Score met strategische aanbevelingen.",
        body3: "16 vragen · 4 minuten · Vertrouwelijk",
        cta: "Start Kapitaalbeschermingsscan",
        disclaimer: "Uw data wordt vertrouwelijk verwerkt.",
      }
    : {
        badge: "Capital Protection",
        heading: "Is your company structure protected against capital loss?",
        body1: "Many founders lose capital through partners, investors, or poor structures.\n\nThis scan assesses whether your company structure protects you against financial disputes, fraud or capital loss.",
        body2: "Receive an instant Capital Risk Score with strategic recommendations.",
        body3: "16 questions · 4 minutes · Confidential",
        cta: "Start Capital Protection Scan",
        disclaimer: "Your data is processed confidentially.",
      };

  return (
    <>
      <section id="capital-protection" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-lioner-gold/30 rounded-none">
            <Shield className="w-5 h-5 text-lioner-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
              {t.badge}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans leading-tight">
            {t.heading}
          </h2>

          <p className="text-lg md:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto whitespace-pre-line text-center">
            {t.body1}
          </p>

          <p className="text-lg md:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto">
            {t.body2}
          </p>

          <p className="text-sm text-foreground/50 mb-10">
            {t.body3}
          </p>

          <Button
            size="lg"
            onClick={() => setIsDialogOpen(true)}
            className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all"
          >
            {t.cta}
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-xs mt-4 text-foreground/40 uppercase tracking-wide">
            {t.disclaimer}
          </p>
        </div>
      </section>

      <CapitalProtectionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
