import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { CapitalAssessmentDialog } from "./CapitalAssessmentDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const CapitalAssessmentCTASection = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const t = language === "nl"
    ? {
        badge: "Founder Bescherming",
        heading: "Heeft u te maken met fraude, geschillen of verloren kapitaal?",
        body1: "Als u een founder bent die te maken heeft met fraude, partnergeschillen, verduistering van fondsen of verloren kapitaal, helpt deze beoordeling te bepalen of strategisch herstel of interventie mogelijk is.",
        body2: "Ontvang een vertrouwelijk rapport met strategische paden en aanbevelingen.",
        body3: "Ontworpen voor situaties met serieuze financiële blootstelling",
        cta: "Start Kapitaalbeoordeling",
        disclaimer: "Volledig vertrouwelijk · Geen juridische relatie",
      }
    : {
        badge: "Founder Protection",
        heading: "Are you dealing with fraud, disputes, or lost capital?",
        body1: "If you are a founder dealing with fraud, partner disputes, misappropriation of funds, or lost capital, this assessment helps determine whether strategic recovery or intervention may be possible.",
        body2: "Receive a confidential report with strategic paths and recommendations.",
        body3: "Designed for situations involving serious financial exposure",
        cta: "Start Capital Assessment",
        disclaimer: "Fully confidential · No legal relationship",
      };

  return (
    <>
      <section id="capital-assessment" className="py-16 lg:py-24 bg-foreground/[0.02]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-lioner-gold/30 rounded-none">
            <FileText className="w-5 h-5 text-lioner-gold" />
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

      <CapitalAssessmentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
