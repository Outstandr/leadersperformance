import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const FinalCTASection = () => {
  const benefits = [
    "Instant results",
    "Personalized roadmap",
    "Elite strategies",
    "100% complimentary"
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight">
              Real results that drive lasting impact for everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We deliver tailored strategies, innovative solutions, and dedicated support to drive lasting growth
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-5 gap-8 mt-16 items-center">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary rounded-full">
                  <span className="text-white font-medium">$7M+</span>
                </div>
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary rounded-full">
                  <span className="text-white font-medium">72%</span>
                </div>
                <span className="text-muted-foreground">Growth</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary rounded-full">
                  <span className="text-white font-medium">65%</span>
                </div>
                <span className="text-muted-foreground">Skills</span>
              </div>
            </div>

            <div className="md:col-span-1 flex justify-center">
              <div className="aspect-square w-full max-w-xs bg-muted rounded-3xl overflow-hidden">
                {/* Placeholder for image */}
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary rounded-full">
                  <span className="text-white font-medium">78%</span>
                </div>
                <span className="text-muted-foreground">Impact</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary rounded-full">
                  <span className="text-white font-medium">1%</span>
                </div>
                <span className="text-muted-foreground">Designers</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary rounded-full">
                  <span className="text-white font-medium">10+</span>
                </div>
                <span className="text-muted-foreground">Consultants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
