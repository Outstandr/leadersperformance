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
  return <section id="comparison" className="py-16 lg:py-24 bg-zinc-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 text-sm bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-3">
              Why choose us
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-lioner-blue">
              Expert leadership coaching tailored to your success
            </h2>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Other Programs */}
            <Card className="border-2">
              <CardContent className="p-5 md:p-6 space-y-5">
                <h3 className="text-lg md:text-xl font-bold text-muted-foreground mb-5">

                  Other Programs
                </h3>
                {comparisons.map((item, index) => <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full bg-destructive/10 p-1 shrink-0">
                        <X className="w-3.5 h-3.5 text-destructive" />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.other}</p>
                    </div>
                    {index < comparisons.length - 1 && <div className="border-b border-border/50 pt-5" />}
                  </div>)}
              </CardContent>
            </Card>

            {/* With Leaders Performance */}
            <Card className="border-2 border-lioner-gold bg-lioner-gold/5">
              <CardContent className="p-5 md:p-6 space-y-5">
                <h3 className="text-lg md:text-xl font-bold text-lioner-blue mb-5">

                  With Leaders Performance
                </h3>
                {comparisons.map((item, index) => <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full bg-lioner-gold/20 p-1 shrink-0">
                        <Check className="w-3.5 h-3.5 text-lioner-gold" />
                      </div>
                      <p className="text-sm text-foreground font-medium">{item.ourApproach}</p>
                    </div>
                    {index < comparisons.length - 1 && <div className="border-b border-lioner-gold/20 pt-5" />}
                  </div>)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};