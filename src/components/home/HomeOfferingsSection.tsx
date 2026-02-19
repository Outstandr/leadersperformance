import { useState } from "react";
import { ArrowRight, Compass, Target, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UnmaskedBookingDialog } from "./UnmaskedBookingDialog";

export const HomeOfferingsSection = () => {
  const { t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);

  const offerings = [
    {
      icon: Compass,
      eyebrow: t("home.offerings.eyebrow1"),
      title: t("home.offerings.title1"),
      body: t("home.offerings.body1"),
      specs: t("home.offerings.specs1"),
      isUnmasked: true,
      link: "#",
      linkText: t("home.offerings.link1"),
    },
    {
      icon: Target,
      eyebrow: t("home.offerings.eyebrow2"),
      title: t("home.offerings.title2"),
      body: t("home.offerings.body2"),
      isUnmasked: false,
      link: "#advisory",
      linkText: t("home.offerings.link2"),
    },
    {
      icon: BarChart3,
      eyebrow: t("home.offerings.eyebrow3"),
      title: t("home.offerings.title3"),
      body: t("home.offerings.body3"),
      isUnmasked: false,
      link: "#start-here",
      linkText: t("home.offerings.link3"),
    },
  ];

  return (
    <section id="start-here" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          {offerings.map((item) => (
            <div
              key={item.title}
              className="group bg-[hsl(0,0%,96%)] rounded-2xl p-8 md:p-10 flex flex-col justify-between hover:bg-[hsl(0,0%,93%)] transition-all duration-300 border-2 border-lioner-gold/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-lioner-gold/10 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-lioner-gold" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-lioner-gold">
                  {item.eyebrow}
                </span>
                <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className={`mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-line${item.isUnmasked ? " max-h-64 overflow-y-auto pr-1" : ""}`}
                  style={item.isUnmasked ? { scrollbarWidth: "thin" } : {}}>
                  {item.body}
                </p>
                {item.specs && (
                  <p className="mt-3 text-xs text-muted-foreground/60">
                    {item.specs}
                  </p>
                )}
              </div>
              {item.isUnmasked ? (
                <button
                  onClick={() => setBookingOpen(true)}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-lioner-gold transition-colors"
                >
                  {item.linkText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <a
                  href={item.link}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-lioner-gold transition-colors"
                >
                  {item.linkText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <UnmaskedBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
