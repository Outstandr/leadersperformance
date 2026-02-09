import { Clock, VolumeX, Binary, Filter } from "lucide-react";

export const BusinessSolutionSection = () => {
  const protocols = [
    {
      icon: Clock,
      title: "THE 09:00 STANDARD",
      description: "No drift. No flexibility. The day starts on the second.",
    },
    {
      icon: VolumeX,
      title: "THE SILENCE PROTOCOL",
      description: "Execution without explanation.",
    },
    {
      icon: Binary,
      title: "BINARY ACCOUNTABILITY",
      description: 'It is done, or it is not. No "almost."',
    },
    {
      icon: Filter,
      title: "THE PROBLEM FILTER",
      description: "No one brings a problem to your desk without a solution attached.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">
            The Protocol
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans mt-4 mb-4 text-lioner-gold uppercase">
            We Don't Train. We Install Code.
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Motivation is temporary. Systems are permanent. The Business Reset Blueprint is not a "workshop." It is an installation of the Vanguard Operating System. We strip away the "soft" corporate habits and replace them with the protocols of high-performance units.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-lioner-gold mb-8 text-center">
            What We Install
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {protocols.map((protocol, index) => (
              <div
                key={index}
                className="p-8 border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-lioner-gold/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:bg-lioner-gold/20 transition-colors">
                    <protocol.icon className="w-6 h-6 text-lioner-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide">
                      {protocol.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {protocol.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
