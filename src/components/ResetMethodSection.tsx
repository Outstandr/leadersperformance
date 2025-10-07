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
    <section id="reset" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-4">
              Our Methodology
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-lioner-blue">
              The RESET Blueprint®
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The proven 5-step system for High Performance leadership mastery
            </p>
          </div>

          {/* RESET Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {resetComponents.map((component, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className={`${component.color} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center`}>
                    <span className="text-white text-2xl md:text-3xl font-bold">{component.letter}</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-lioner-blue">{component.title}</h4>

                  <p className="text-muted-foreground leading-relaxed">
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