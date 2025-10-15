import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export const ComparisonSection = () => {
  const values = [{
    title: "Relentless Discipline",
    description: "The foundation of all achievement"
  }, {
    title: "Leadership by Example",
    description: "Leading from the front in all areas"
  }, {
    title: "Vitality as Strategy",
    description: "Physical health drives mental clarity"
  }, {
    title: "Impact Beyond Boardroom",
    description: "Creating lasting change in all spheres"
  }, {
    title: "Integrity in All Dealings",
    description: "Unwavering ethical standards"
  }, {
    title: "Continuous Evolution",
    description: "Never-ending growth and adaptation"
  }];
  return <section 
    id="comparison" 
    className="py-10 lg:py-16 bg-white"
  >
      <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              
              <span className="text-lg font-medium uppercase text-muted-foreground">Why choose us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold max-w-4xl mx-auto leading-tight">
              Leadership by Design
            </h2>
            <p className="text-lg max-w-3xl mx-auto mt-6 text-muted-foreground">
              Peak performance is achieved through the alignment of mind, body, and wealth. We set a new standard for leadership where excellence, alignment, and resilience are the defining characteristics.
            </p>
          </div>

          {/* Comparison Card */}
          <div className="p-8 md:p-12 shadow-sm -mt-8 bg-lioner-gold border border-border">
            <div className="space-y-6">
              <h3 className="text-2xl font-normal text-white font-sans text-center">
                Core Values
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {values.map((item, index) => <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full p-1 shrink-0 bg-white">
                      <Check className="w-4 h-4 text-lioner-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">{item.title}</p>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
    </section>;
};