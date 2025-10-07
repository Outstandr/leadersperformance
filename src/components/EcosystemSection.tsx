import { Icon } from "@/components/ui/icon";

export const EcosystemSection = () => {
  const steps = [
    {
      number: "1",
      title: "RESET Book Series",
      description: "Foundation knowledge for High Performance leadership mastery",
      action: 'Start with "Reset by Discipline"',
      color: "bg-lioner-gold"
    },
    {
      number: "2",
      title: "Elite Masterclass Series",
      description: "Deep-dive training for each pillar with practical implementation",
      action: "25-30 minute intensive sessions",
      color: "bg-secondary-blue"
    },
    {
      number: "3",
      title: "Leaders Performance Academy",
      description: "Complete system with community and ongoing support",
      action: "Full transformation program",
      color: "bg-secondary-purple"
    },
    {
      number: "4",
      title: "Leaders Performance Elite",
      description: "Private mentorship with Lionel for executive excellence",
      action: "Exclusive access • Limited availability",
      color: "bg-lioner-gold"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-lioner-blue">
            Your Path to Elite Leadership
          </h2>
          <p className="text-xl text-secondary-purple">
            Choose your entry point into the Leaders Performance ecosystem:
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="space-y-4 text-center">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold`}>
                    {step.number}
                  </div>
                  <h4 className="text-xl font-semibold text-lioner-blue px-2">
                    {step.title}
                  </h4>
                  <p className="text-secondary-purple leading-relaxed px-2">
                    {step.description}
                  </p>
                  <span className="text-sm font-medium block" style={{ color: step.color.replace('bg-', '') }}>
                    {step.action}
                  </span>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 z-10">
                    <Icon name="arrowRight" className="text-secondary-purple" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
