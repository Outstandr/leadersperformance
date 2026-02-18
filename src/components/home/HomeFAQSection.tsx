import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const HomeFAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t("home.faq.q1"), answer: t("home.faq.a1") },
    { question: t("home.faq.q2"), answer: t("home.faq.a2") },
    { question: t("home.faq.q3"), answer: t("home.faq.a3") },
    { question: t("home.faq.q4"), answer: t("home.faq.a4") },
  ];

  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: "hsl(0 0% 12%)" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="rounded-3xl p-10 md:p-16 border-2 border-lioner-gold/30" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight" style={{ color: "white" }}>
                {t("home.faq.heading")}{" "}
                <span className="text-lioner-gold">{t("home.faq.headingGold")}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t("home.faq.subheading")}
              </p>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 py-1">
                    <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline py-5" style={{ color: "white" }}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed pb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
