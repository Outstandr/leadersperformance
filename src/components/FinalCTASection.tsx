import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import portraitImage from "@/assets/lionel-portrait.jpg";

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
          <div className="grid md:grid-cols-2 gap-x-32 gap-y-8 mt-16 max-w-4xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary rounded-full">
                  <span className="text-white font-semibold">$7M+</span>
                </div>
                <span className="text-muted-foreground text-lg">Revenue</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary rounded-full">
                  <span className="text-white font-semibold">72%</span>
                </div>
                <span className="text-muted-foreground text-lg">Growth</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary rounded-full">
                  <span className="text-white font-semibold">65%</span>
                </div>
                <span className="text-muted-foreground text-lg">Skills</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary rounded-full">
                  <span className="text-white font-semibold">78%</span>
                </div>
                <span className="text-muted-foreground text-lg">Impact</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary rounded-full">
                  <span className="text-white font-semibold">1%</span>
                </div>
                <span className="text-muted-foreground text-lg">Designers</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary rounded-full">
                  <span className="text-white font-semibold">10+</span>
                </div>
                <span className="text-muted-foreground text-lg">Consultants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
