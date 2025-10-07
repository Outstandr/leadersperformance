import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-4">
              Your Journey
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-lioner-blue">
              Your Path to Elite Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your entry point into the Leaders Performance ecosystem
            </p>
          </div>
          
          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-2 hover:shadow-lg transition-all h-full">
                  <CardContent className="p-8 space-y-4">
                    <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                      {step.number}
                    </div>
                    <h4 className="text-xl font-bold text-lioner-blue">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-sm font-semibold text-lioner-gold pt-2">
                      {step.action}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow between cards on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-lioner-gold" />
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