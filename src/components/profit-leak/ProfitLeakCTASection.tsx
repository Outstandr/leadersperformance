import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const ProfitLeakCTASection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = language === "nl"
    ? {
        badge: "Winstlek Diagnose",
        heading: "Waar lekt uw bedrijf geld?",
        body1: "De meeste bedrijven stoppen niet met groeien door de markt. Ze vertragen omdat de structuur achter het bedrijf de groei niet meer kan dragen.",
        body2: "Ontvang een Growth Barrier Report dat laat zien waar uw bedrijf geld lekt en wat de volgende groeifase blokkeert.",
        body3: "15 vragen · 5 minuten · Vertrouwelijk",
        cta: "Start Profit Leak Scan",
        disclaimer: "Uw data wordt vertrouwelijk verwerkt.",
      }
    : {
        badge: "Profit Leak Diagnosis",
        heading: "Where is your company leaking money?",
        body1: "Most companies don't stop growing because of the market. They slow down because the structure behind the company can no longer support the growth.",
        body2: "Receive a Growth Barrier Report showing where your company is leaking money and what is blocking the next growth phase.",
        body3: "15 questions · 5 minutes · Confidential",
        cta: "Start Profit Leak Scan",
        disclaimer: "Your data is processed confidentially.",
      };

  return (
    <section id="profit-leak" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-lioner-gold/30 rounded-none">
          <TrendingDown className="w-5 h-5 text-lioner-gold" />
          <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
            {t.badge}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans leading-tight">
          {t.heading}
        </h2>

        <p className="text-lg md:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto">
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
          onClick={() => navigate("/profit-leak-scan")}
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
  );
};
