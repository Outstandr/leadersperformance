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
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-12">
          Understanding the Process.
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-1">
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
