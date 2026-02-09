import { Clock, VolumeX, Binary, Filter } from "lucide-react";

export const BusinessServicesSection = () => {
  const protocols = [
    {
      icon: Clock,
      number: "01",
      title: "The 09:00 Standard",
      description: "No drift. No flexibility. The day starts on the second."
    },
    {
      icon: VolumeX,
      number: "02",
      title: "The Silence Protocol",
      description: "Execution without explanation."
    },
    {
      icon: Binary,
      number: "03",
      title: "Binary Accountability",
      description: "It is done, or it is not. No \"almost.\""
    },
    {
      icon: Filter,
      number: "04",
      title: "The Problem Filter",
      description: "No one brings a problem to your desk without a solution attached."
    }
  ];

  return (
    <section id="services" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">The Protocol</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            We Don't Train. We Install Code.
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
            Motivation is temporary. Systems are permanent. The Business Reset Blueprint is not a "workshop." It is an installation of the Vanguard Operating System. We strip away the "soft" corporate habits and replace them with the protocols of high-performance units.
          </p>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wider">What We Install</h3>
        </div>

        {/* Protocols Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {protocols.map((protocol, index) => (
            <div 
              key={index} 
              className="relative p-8 bg-white border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="absolute top-4 right-6 text-6xl font-bold text-lioner-gold/10 select-none">{protocol.number}</span>
              <div className="bg-lioner-gold/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-lioner-gold/20 transition-colors">
                <protocol.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{protocol.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{protocol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
