import { X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export const ComparisonSection = () => {
  const comparisons = [{
    other: "Generic one-size-fits-all programs",
    ourApproach: "Personalized RESET Blueprint® for your unique profile"
  }, {
    other: "Theory-heavy with minimal action",
    ourApproach: "Proven systems with immediate implementation"
  }, {
    other: "Focus on single area (mind OR body)",
    ourApproach: "Holistic integration of mind, body, and wealth"
  }, {
    other: "Limited support after purchase",
    ourApproach: "Ongoing guidance at every stage of your journey"
  }, {
    other: "Cookie-cutter success metrics",
    ourApproach: "Customized tracking aligned with your goals"
  }];
  return <section id="comparison" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">Why choose us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground max-w-4xl mx-auto leading-tight">
              Expert consulting tailored to your business success
            </h2>
          </div>

          {/* Comparison Card */}
          <div className="bg-white border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Other Firms */}
              <div className="space-y-6">
                <h3 className="text-2xl font-normal text-foreground">
                  Other Firms
                </h3>
                {comparisons.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-muted p-1 shrink-0">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">{item.other.split(' ')[0] + ' ' + item.other.split(' ')[1]}</p>
                      <p className="text-sm text-muted-foreground">{item.other.split(' ').slice(2).join(' ')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* With Stratex */}
              <div className="space-y-6">
                <h3 className="text-2xl font-normal text-foreground">
                  With Stratex
                </h3>
                {comparisons.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary p-1 shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">{item.ourApproach.split(' ')[0] + ' ' + item.ourApproach.split(' ')[1]}</p>
                      <p className="text-sm text-muted-foreground">{item.ourApproach.split(' ').slice(2).join(' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};