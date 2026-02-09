import { AlertTriangle, UserX, ShieldAlert, BatteryLow } from "lucide-react";

export const BusinessProblemSection = () => {
  const symptoms = [
    {
      icon: UserX,
      title: "Zero Ownership",
      quote: '"I thought someone else was doing it."',
    },
    {
      icon: ShieldAlert,
      title: "The Hero Trap",
      quote: "You are the only one who can solve problems.",
    },
    {
      icon: BatteryLow,
      title: "Quiet Quitting",
      quote: "They do the bare minimum to not get fired.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[hsl(var(--lioner-charcoal))]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-lioner-gold/30">
            <AlertTriangle className="w-5 h-5 text-lioner-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
              The Problem
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-sans leading-tight uppercase">
            The Cost of Silence.
          </h2>

          <div className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-6 text-left md:text-center">
            <p>
              You hire adults, but you manage children. Every time you repeat an instruction, you lose money. Every time you accept a missed deadline with an excuse, you lower the standard.
            </p>
            <p>
              Your team is not "confused." They are <span className="text-white font-semibold">comfortable</span>. They know you will fix their mistakes. They know you will stay late to finish their work. You have built a nursery, not a business.
            </p>
          </div>
        </div>

        {/* Symptoms */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-lioner-gold mb-8 text-center">
            The Symptoms
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className="p-6 border border-white/10 bg-white/5 text-center"
              >
                <symptom.icon className="w-8 h-8 text-lioner-gold mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                  {symptom.title}
                </h4>
                <p className="text-white/60 italic">{symptom.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
