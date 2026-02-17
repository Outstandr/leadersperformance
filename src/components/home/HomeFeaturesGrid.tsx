import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import serviceUnmasked from "@/assets/service-unmasked-desert.jpg";
import serviceCoaching from "@/assets/service-coaching.jpg";
import serviceAcademy from "@/assets/service-academy.jpg";
import serviceBusiness from "@/assets/service-business.jpg";

const services = [
  {
    title: "UNMASKED\nDesert Intervention",
    description:
      "A 4-day controlled recalibration in the desert to strip away noise, confront deferred decisions, and rebuild your strategy.",
    image: serviceUnmasked,
    details: {
      headline: "UNMASKED — Desert Intervention",
      body: "A private 4-day immersive experience designed for leaders who have hit a ceiling they can't think their way through. Removed from your environment, stripped of distractions, you confront the decisions you've been deferring — the ones silently eroding your performance, your relationships, and your clarity.",
      bullets: [
        "4 days in a controlled desert environment",
        "One-on-one sessions with Lionel Eersteling",
        "Complete digital detox and environmental reset",
        "Strategic recalibration of your execution blueprint",
        "Post-intervention follow-up and accountability structure",
      ],
      closing: "This is not a retreat. It's an intervention on the patterns keeping you stuck.",
    },
  },
  {
    title: "High Performance\nCoaching",
    description:
      "One-on-one strategic sessions for execution clarity, accountability, and deeper self-leadership.",
    image: serviceCoaching,
    details: {
      headline: "High Performance Coaching",
      body: "Ongoing strategic partnership for high-performers who refuse to plateau. These are not therapy sessions — they are structured, results-driven conversations designed to sharpen your decision-making, hold you accountable to your own standards, and systematically eliminate the blind spots slowing you down.",
      bullets: [
        "Private one-on-one sessions (in-person or virtual)",
        "Customised performance and leadership framework",
        "Execution tracking and accountability protocols",
        "Strategic decision-making support",
        "Direct access between sessions for critical moments",
      ],
      closing: "For leaders who want a strategic mirror, not a motivational speaker.",
    },
  },
  {
    title: "Leaders Performance\nAcademy",
    description:
      "A short-term space to gain insight, assess your needs, or reset your strategic course.",
    image: serviceAcademy,
    details: {
      headline: "Leaders Performance Academy",
      body: "A focused, short-term engagement for leaders at an inflection point. Whether you're navigating a transition, evaluating your next move, or simply need an honest external perspective — the Leaders Performance Academy gives you the space and structure to see clearly again.",
      bullets: [
        "Single or multi-session format",
        "Rapid diagnostic of your current situation",
        "Identification of blind spots and leverage points",
        "Actionable strategic recommendations",
        "Option to transition into ongoing Advisory",
      ],
      closing: "Sometimes the most powerful move is to stop and see the board clearly.",
    },
  },
  {
    title: "Business\nCoaching",
    description:
      "Goal-focused sessions to build direction, sustainable performance, and executive confidence.",
    image: serviceBusiness,
    details: {
      headline: "Business Coaching",
      body: "Structured coaching engagements for leaders ready to build the discipline, presence, and strategic thinking required to lead at the highest level. This is where ambition meets execution — where you stop managing and start commanding your trajectory.",
      bullets: [
        "Goal-oriented coaching trajectory",
        "Leadership identity and presence development",
        "Sustainable high-performance systems",
        "Stress mastery and energy management",
        "Quarterly progress reviews and recalibration",
      ],
      closing: "Leadership isn't a title. It's a daily practice of showing up at your standard.",
    },
  },
];

export const HomeFeaturesGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <section className="relative z-10 py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  height: i % 2 === 0 ? "520px" : "580px",
                  marginTop: i % 2 === 1 ? "60px" : "0px",
                }}
                onClick={() => setSelected(i)}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/30 to-foreground/80" />
                <div className="relative h-full flex flex-col justify-between p-7">
                  <h3 className="font-serif text-2xl md:text-3xl text-background leading-tight whitespace-pre-line">
                    {service.title}
                  </h3>
                  <div>
                    <p className="text-sm text-background/70 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="w-3 h-3 rounded-full border-2 border-lioner-gold group-hover:bg-lioner-gold transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background border-2 border-lioner-gold/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={services[selected].image}
                  alt={services[selected].details.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/80" />
                <h2 className="absolute bottom-6 left-8 right-16 font-serif text-3xl md:text-4xl text-background leading-tight">
                  {services[selected].details.headline}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-foreground/50 hover:bg-foreground/70 text-background rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {services[selected].details.body}
                </p>

                <div className="space-y-3">
                  {services[selected].details.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-lioner-gold mt-2 shrink-0" />
                      <span className="text-sm text-foreground/80">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-lioner-gold/20">
                  <p className="text-sm font-medium text-lioner-gold italic">
                    {services[selected].details.closing}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
