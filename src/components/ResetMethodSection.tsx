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
    <section id="reset" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block px-3 py-1.5 text-sm bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-2">
              Our Methodology
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-lioner-blue">
              The RESET Blueprint®
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              The proven 5-step system for High Performance leadership mastery
            </p>
          </div>

          {/* RESET Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {resetComponents.map((component, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-5 space-y-3">
                  <div className={`${component.color} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center`}>
                    <span className="text-white text-xl md:text-2xl font-bold">{component.letter}</span>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-lioner-blue">{component.title}</h4>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {component.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};