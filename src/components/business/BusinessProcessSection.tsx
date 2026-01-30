import { Phone, ClipboardList, Rocket, BarChart3 } from "lucide-react";

export const BusinessProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: Phone,
      title: "Discovery Call",
      description: "We start with a free 30-minute consultation to understand your organization's challenges, goals, and culture."
    },
    {
      number: "02",
      icon: ClipboardList,
      title: "Custom Proposal",
      description: "Based on our conversation, we design a tailored program with clear objectives, timelines, and success metrics."
    },
    {
      number: "03",
      icon: Rocket,
      title: "Implementation",
      description: "Our team delivers world-class coaching and training, with ongoing support and adjustment as needed."
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Measure & Optimize",
      description: "We track progress against your KPIs and continuously refine our approach to maximize results."
    }
  ];

  return (
    <section id="process" className="py-8 lg:py-12 bg-gradient-to-b from-muted/60 to-muted/80">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Our Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            How We Work Together
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            A structured approach to ensure maximum impact for your organization.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative"
            >
              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-lioner-gold/30"></div>
              )}
              
              <div className="bg-white p-6 border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-lioner-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <step.icon className="w-6 h-6 text-lioner-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
