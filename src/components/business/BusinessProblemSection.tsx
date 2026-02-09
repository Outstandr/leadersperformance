import { useState } from "react";
import { AlertTriangle, UserX, ShieldAlert, BatteryLow } from "lucide-react";

export const BusinessProblemSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const symptoms = [
    {
      icon: UserX,
      title: "Zero Ownership",
      quote: '"I thought someone else was doing it."',
      number: "01",
    },
    {
      icon: ShieldAlert,
      title: "The Hero Trap",
      quote: "You are the only one who can solve problems.",
      number: "02",
    },
    {
      icon: BatteryLow,
      title: "Quiet Quitting",
      quote: "They do the bare minimum to not get fired.",
      number: "03",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2.5 border border-lioner-gold/30 bg-lioner-gold/5 hover:bg-lioner-gold/10 transition-colors duration-300 cursor-default">
            <AlertTriangle className="w-5 h-5 text-lioner-gold animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
              The Problem
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 font-sans leading-tight uppercase">
            The Cost of <span className="text-lioner-gold">Silence.</span>
          </h2>

          <div className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto space-y-6 text-left md:text-center">
            <p>
              You hire adults, but you manage children. Every time you repeat an instruction,{" "}
              <span className="text-lioner-gold font-semibold">you lose money</span>. Every time you accept a missed deadline with an excuse, you lower the standard.
            </p>
            <p>
              Your team is not "confused." They are{" "}
              <span className="text-foreground font-semibold relative inline-block">
                comfortable
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lioner-gold/60" />
              </span>
              . They know you will fix their mistakes. They know you will stay late to finish their work.{" "}
              <span className="text-foreground font-bold">You have built a nursery, not a business.</span>
            </p>
          </div>
        </div>

        {/* Symptoms */}
        <div className="mt-16">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-lioner-gold mb-10 text-center">
            The Symptoms
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-8 border text-center transition-all duration-500 cursor-default group
                  ${hoveredIndex === index
                    ? "border-lioner-gold/60 bg-lioner-gold/10 -translate-y-2 shadow-[0_20px_40px_-15px_rgba(179,151,88,0.3)]"
                    : "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20"
                  }`}
              >
                {/* Number watermark */}
                <span className={`absolute top-4 right-4 text-5xl font-bold transition-all duration-500
                  ${hoveredIndex === index ? "text-lioner-gold/20" : "text-foreground/5"}`}>
                  {symptom.number}
                </span>

                <div className={`w-16 h-16 mx-auto mb-5 flex items-center justify-center transition-all duration-500
                  ${hoveredIndex === index
                    ? "bg-lioner-gold/20 scale-110"
                    : "bg-foreground/5"
                  }`}>
                  <symptom.icon className={`w-8 h-8 transition-all duration-500
                    ${hoveredIndex === index ? "text-lioner-gold" : "text-foreground/40"}`} />
                </div>

                <h4 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
                  {symptom.title}
                </h4>

                <p className={`italic transition-colors duration-300
                  ${hoveredIndex === index ? "text-foreground/70" : "text-foreground/50"}`}>
                  {symptom.quote}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-lioner-gold transition-all duration-500
                  ${hoveredIndex === index ? "w-full" : "w-0"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
