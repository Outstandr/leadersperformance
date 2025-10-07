import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
export const EcosystemSection = () => {
  const steps = [{
    number: "1",
    title: "RESET Book Series",
    description: "Foundation knowledge for High Performance leadership mastery",
    action: 'Start with "Reset by Discipline"',
    color: "bg-lioner-gold"
  }, {
    number: "2",
    title: "Elite Masterclass Series",
    description: "Deep-dive training for each pillar with practical implementation",
    action: "25-30 minute intensive sessions",
    color: "bg-secondary-blue"
  }, {
    number: "3",
    title: "Leaders Performance Academy",
    description: "Complete system with community and ongoing support",
    action: "Full transformation program",
    color: "bg-secondary-purple"
  }, {
    number: "4",
    title: "Leaders Performance Elite",
    description: "Private mentorship with Lionel for executive excellence",
    action: "Exclusive access • Limited availability",
    color: "bg-lioner-gold"
  }];
  return <section id="programs" className="py-16 lg:py-24 bg-zinc-200">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block px-3 py-1.5 text-sm bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-2">
              Your Journey
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-lioner-blue">
              Your Path to Elite Leadership
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Choose your entry point into the Leaders Performance ecosystem
            </p>
          </div>
          
          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => <div key={index} className="relative">
                <Card className="border-2 hover:shadow-lg transition-all h-full">
                  <CardContent className="p-5 md:p-6 space-y-3">
                    <div className={`${step.color} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white text-lg md:text-xl font-bold`}>

                      {step.number}
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-lioner-blue">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-xs font-semibold text-lioner-gold pt-1">
                      {step.action}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow between cards on desktop */}
                {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-lioner-gold" />
                  </div>}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};