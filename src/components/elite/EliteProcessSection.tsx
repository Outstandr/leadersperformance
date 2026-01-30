import { MessageSquare, ClipboardCheck, Rocket, Trophy } from "lucide-react";

export const EliteProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Discovery Call",
      description: "We start with a deep-dive conversation to understand your goals, challenges, and what's truly holding you back from the life you want."
    },
    {
      number: "02",
      icon: ClipboardCheck,
      title: "Personal Assessment",
      description: "Complete a comprehensive life assessment that reveals exactly where you are and creates a clear roadmap for your transformation."
    },
    {
      number: "03",
      icon: Rocket,
      title: "Weekly 1-to-1 Sessions",
      description: "Engage in powerful weekly coaching sessions designed specifically for you, with ongoing support and accountability between sessions."
    },
    {
      number: "04",
      icon: Trophy,
      title: "Lasting Transformation",
      description: "Integrate your new mindset, habits, and strategies for sustainable success that continues long after the program ends."
    }
  ];

  return (
    <section id="process" className="py-8 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">Your Journey</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            The Path to Your Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A structured yet personalized journey designed to create deep, lasting change in your life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 border border-border h-full">
                <div className="text-5xl font-bold text-lioner-gold/20 mb-4">{step.number}</div>
                <div className="bg-lioner-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-lioner-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-lioner-gold/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
