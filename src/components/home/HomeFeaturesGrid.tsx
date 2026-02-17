import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import serviceMindfulness from "@/assets/service-mindfulness.jpg";
import serviceCoaching from "@/assets/service-coaching.jpg";
import serviceClarity from "@/assets/service-clarity.jpg";
import serviceLeadership from "@/assets/service-leadership.jpg";

const services = [
  {
    title: "UNMASKED\nDesert Reset",
    description:
      "A 4-day controlled recalibration in the desert to strip away noise, confront deferred decisions, and rebuild your strategy.",
    image: serviceMindfulness,
  },
  {
    title: "Individual\nAdvisory",
    description:
      "One-on-one strategic sessions for execution clarity, accountability, and deeper self-leadership.",
    image: serviceCoaching,
  },
  {
    title: "Clarity\nConsult",
    description:
      "A short-term space to gain insight, assess your needs, or reset your strategic course.",
    image: serviceClarity,
  },
  {
    title: "Leadership\nCoaching",
    description:
      "Goal-focused sessions to build direction, sustainable performance, and executive confidence.",
    image: serviceLeadership,
  },
];

export const HomeFeaturesGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
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
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/30 to-foreground/80" />

              {/* Content */}
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
  );
};
