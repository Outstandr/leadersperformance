import { useState } from "react";
import { ArrowRight, Compass, Target, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UnmaskedBookingDialog } from "./UnmaskedBookingDialog";

export const HomeOfferingsSection = () => {
  const { t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section id="start-here" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6 items-start">

          {/* UNMASKED card — fixed height with internal scroll */}
          <div className="group bg-[hsl(0,0%,96%)] rounded-2xl p-8 md:p-10 flex flex-col border-2 border-lioner-gold/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] hover:bg-[hsl(0,0%,93%)] transition-all duration-300" style={{ height: "480px" }}>
            <div className="w-12 h-12 rounded-xl bg-lioner-gold/10 flex items-center justify-center mb-6 shrink-0">
              <Compass className="w-5 h-5 text-lioner-gold" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-lioner-gold shrink-0">
              {t("home.offerings.eyebrow1")}
            </span>
            <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-foreground shrink-0">
              {t("home.offerings.title1")}
            </h3>

            {/* Scrollable body */}
            <div className="mt-4 overflow-y-scroll flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(var(--lioner-gold) / 0.4) transparent" }}>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {t("home.offerings.body1")}
              </p>
              <p className="mt-3 text-xs text-muted-foreground/60">
                {t("home.offerings.specs1")}
              </p>
            </div>

            <button
              onClick={() => setBookingOpen(true)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-lioner-gold transition-colors shrink-0"
            >
              {t("home.offerings.link1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Boardroom Advisory */}
          <div className="group bg-[hsl(0,0%,96%)] rounded-2xl p-8 md:p-10 flex flex-col border-2 border-lioner-gold/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] hover:bg-[hsl(0,0%,93%)] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-lioner-gold/10 flex items-center justify-center mb-6">
              <Target className="w-5 h-5 text-lioner-gold" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-lioner-gold">
              {t("home.offerings.eyebrow2")}
            </span>
            <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              {t("home.offerings.title2")}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-line flex-1">
              {t("home.offerings.body2")}
            </p>
            <a
              href="#advisory"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-lioner-gold transition-colors"
            >
              {t("home.offerings.link2")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* The RESET Method */}
          <div className="group bg-[hsl(0,0%,96%)] rounded-2xl p-8 md:p-10 flex flex-col border-2 border-lioner-gold/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] hover:bg-[hsl(0,0%,93%)] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-lioner-gold/10 flex items-center justify-center mb-6">
              <BarChart3 className="w-5 h-5 text-lioner-gold" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-lioner-gold">
              {t("home.offerings.eyebrow3")}
            </span>
            <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              {t("home.offerings.title3")}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-line flex-1">
              {t("home.offerings.body3")}
            </p>
            <a
              href="#start-here"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-lioner-gold transition-colors"
            >
              {t("home.offerings.link3")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      <UnmaskedBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
