import { Card, CardContent } from "@/components/ui/card";

export const ResetMethodSection = () => {
  const resetComponents = [
    {
      letter: "R",
      title: "Rhythm",
      description: "Daily structure & discipline that creates unstoppable momentum",
      color: "bg-lioner-gold"
    },
    {
      letter: "E",
      title: "Energy",
      description: "Vitality optimization through strategic health and performance protocols",
      color: "bg-secondary-blue"
    },
    {
      letter: "S",
      title: "Systems",
      description: "Environment design, belief restructuring, and strategic relationship mastery",
      color: "bg-secondary-purple"
    },
    {
      letter: "E",
      title: "Execution",
      description: "Turning strategy into measurable results through leadership in practice",
      color: "bg-lioner-gold"
    },
    {
      letter: "T",
      title: "Tracking",
      description: "Measuring progress and maintaining accountability for sustainable excellence",
      color: "bg-secondary-blue"
    }
  ];

  return (
    <section id="reset" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight">
              Reliable expertise to drive your greatest success
            </h2>
          </div>

          {/* Carousel placeholder */}
          <div className="relative">
            <div className="aspect-[16/9] bg-muted rounded-3xl overflow-hidden">
              {/* Placeholder for carousel */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};