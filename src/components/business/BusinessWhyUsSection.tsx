import { AlertTriangle, UserX, Ghost } from "lucide-react";

export const BusinessWhyUsSection = () => {
  const symptoms = [
    {
      icon: AlertTriangle,
      title: "Zero Ownership",
      quote: "\"I thought someone else was doing it.\""
    },
    {
      icon: UserX,
      title: "The Hero Trap",
      quote: "You are the only one who can solve problems."
    },
    {
      icon: Ghost,
      title: "Quiet Quitting",
      quote: "They do the bare minimum to not get fired."
    }
  ];

  return (
    <section id="why-us" className="py-8 lg:py-12 bg-gradient-to-b from-muted/60 to-muted/80">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            No Company Culture.
          </h2>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            You hire adults, but you manage children. Every time you repeat an instruction, you lose money. Every time you accept a missed deadline with an excuse, you lower the standard.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your team is not "confused." They are comfortable. They know you will fix their mistakes. They know you will stay late to finish their work. You have built a nursery, not a business.
          </p>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wider">The Symptoms</h3>
        </div>

        {/* Symptoms Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {symptoms.map((symptom, index) => (
            <div 
              key={index} 
              className="p-6 bg-white border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-lioner-gold">
                <symptom.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{symptom.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">{symptom.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
