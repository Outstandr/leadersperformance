import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What exactly is Leaders Performance?",
    answer:
      "We are a strategic advisory firm that builds controlled environments—both physical and operational—for founders to regain clarity and scale their businesses without sacrificing personal vitality.",
  },
  {
    question: "Who attends the UNMASKED experience?",
    answer:
      "It is strictly for founders, CEOs, and entrepreneurs who are currently carrying heavy operational pressure and facing complex decisions. It is not for beginners or those seeking lifestyle retreats.",
  },
  {
    question: "Why are UNMASKED editions limited to 2–4 people?",
    answer:
      "To protect privacy and ensure depth. This allows for direct, highly personalized strategic work with Lionel, rather than navigating group dynamics.",
  },
  {
    question: "What is the difference between UNMASKED and Advisory?",
    answer:
      "UNMASKED is a rapid, 4-day physical and mental reset to establish immediate clarity. Advisory is an ongoing, long-term strategic partnership to ensure disciplined execution over time.",
  },
];

export const HomeFAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: "hsl(0 0% 12%)" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="rounded-3xl p-10 md:p-16 border-2 border-lioner-gold/30" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Title */}
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight" style={{ color: "white" }}>
                Understanding the{" "}
                <span className="text-lioner-gold">Process.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.6)" }}>
                Have questions about our advisory and experiences? Find answers to the most common questions below.
              </p>
            </div>

            {/* Right: Accordion */}
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
