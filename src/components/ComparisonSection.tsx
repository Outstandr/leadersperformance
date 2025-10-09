import { X, Check } from "lucide-react";
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
  return <section id="comparison" className="py-14 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              
              <span className="text-sm text-primary font-medium">Why choose us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground max-w-4xl mx-auto leading-tight">
              Leadership by Design
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              Peak performance is achieved through the alignment of mind, body, and wealth. We set a new standard for leadership where excellence, alignment, and resilience are the defining characteristics.
            </p>
          </div>

          {/* Comparison Card */}
          <div className="bg-white border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Core Values */}
              <div className="space-y-6">
                <h3 className="text-2xl font-normal text-foreground">
                  Core Values
                </h3>
                {values.slice(0, 3).map((item, index) => <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary p-1 shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>)}
              </div>

              {/* Second Column */}
              <div className="space-y-6">
                <h3 className="text-2xl font-normal text-foreground opacity-0">
                  Core Values
                </h3>
                {values.slice(3).map((item, index) => <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary p-1 shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};