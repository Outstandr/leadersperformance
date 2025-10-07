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
  return <section id="comparison" className="py-20 lg:py-32 bg-zinc-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-4">
              Why choose us
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-lioner-blue">
              Expert leadership coaching tailored to your success
            </h2>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Other Programs */}
            <Card className="border-2">
              <CardContent className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-muted-foreground mb-6 md:mb-8">

                  Other Programs
                </h3>
                {comparisons.map((item, index) => <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-destructive/10 p-1 shrink-0">
                        <X className="w-4 h-4 text-destructive" />
                      </div>
                      <p className="text-muted-foreground">{item.other}</p>
                    </div>
                    {index < comparisons.length - 1 && <div className="border-b border-border/50 pt-6" />}
                  </div>)}
              </CardContent>
            </Card>

            {/* With Leaders Performance */}
            <Card className="border-2 border-lioner-gold bg-lioner-gold/5">
              <CardContent className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-lioner-blue mb-6 md:mb-8">

                  With Leaders Performance
                </h3>
                {comparisons.map((item, index) => <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-lioner-gold/20 p-1 shrink-0">
                        <Check className="w-4 h-4 text-lioner-gold" />
                      </div>
                      <p className="text-foreground font-medium">{item.ourApproach}</p>
                    </div>
                    {index < comparisons.length - 1 && <div className="border-b border-lioner-gold/20 pt-6" />}
                  </div>)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};