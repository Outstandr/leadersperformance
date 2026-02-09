import { useState } from "react";
import { Clock, VolumeX, Binary, Filter } from "lucide-react";

export const BusinessSolutionSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const protocols = [
    {
      icon: Clock,
      title: "THE 09:00 STANDARD",
      description: "No drift. No flexibility. The day starts on the second.",
      number: "01",
    },
    {
      icon: VolumeX,
      title: "THE SILENCE PROTOCOL",
      description: "Execution without explanation.",
      number: "02",
    },
    {
      icon: Binary,
      title: "BINARY ACCOUNTABILITY",
      description: 'It is done, or it is not. No "almost."',
      number: "03",
    },
    {
      icon: Filter,
      title: "THE PROBLEM FILTER",
      description: "No one brings a problem to your desk without a solution attached.",
      number: "04",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold uppercase text-lioner-gold tracking-[0.2em] mb-4 px-4 py-1.5 border border-lioner-gold/30">
            The Protocol
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans mt-4 mb-6 uppercase">
            We Don't Train.{" "}
            <span className="text-lioner-gold">We Install Code.</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Motivation is temporary. Systems are permanent. The Business Reset Blueprint is not a "workshop." It is an installation of the{" "}
            <span className="font-semibold text-foreground">Vanguard Operating System</span>.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-lioner-gold mb-10 text-center">
            What We Install
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {protocols.map((protocol, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`relative p-8 transition-all duration-500 cursor-default group overflow-hidden
                  ${activeIndex === index
                    ? "border-2 border-lioner-gold bg-lioner-gold/5 -translate-y-1 shadow-[0_15px_40px_-15px_rgba(179,151,88,0.25)]"
                    : "border-2 border-border hover:border-lioner-gold/30"
                  }`}
              >
                {/* Large number watermark */}
                <span className={`absolute -top-2 -right-2 text-8xl font-black transition-all duration-700 select-none
                  ${activeIndex === index ? "text-lioner-gold/10 scale-110" : "text-muted/30"}`}>
                  {protocol.number}
                </span>

                <div className="relative flex items-start gap-5">
                  <div className={`w-14 h-14 flex items-center justify-center shrink-0 transition-all duration-500
                    ${activeIndex === index
                      ? "bg-lioner-gold text-white scale-110 shadow-lg shadow-lioner-gold/30"
                      : "bg-muted text-muted-foreground"
                    }`}>
                    <protocol.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold mb-2 uppercase tracking-wide transition-colors duration-300
                      ${activeIndex === index ? "text-lioner-gold" : "text-foreground"}`}>
                      {protocol.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {protocol.description}
                    </p>
                  </div>
                </div>

                {/* Animated left border accent */}
                <div className={`absolute top-0 left-0 w-1 bg-lioner-gold transition-all duration-500
                  ${activeIndex === index ? "h-full" : "h-0"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
