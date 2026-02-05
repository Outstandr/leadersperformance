import { Check, X } from "lucide-react";

export const EliteTransformationSection = () => {
  const beforeItems = [
    "Poor sleep, low recovery",
    "Weight goes up and down",
    "Inconsistent results",
    "Lack of discipline",
    "Self-doubt",
    "No structure or overview",
    "Not living at your full potential"
  ];

  const afterItems = [
    "Better sleep and recovery",
    "Leaner, fitter body",
    "Stable, lasting results",
    "Strong discipline",
    "Self-confidence",
    "Clear structure and focus",
    "Living as your best self"
  ];

  return (
    <section id="transformation" className="py-8 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">The Transformation</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            From Where You Are to Where You Want to Be
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This isn't about small improvements. It's about a complete transformation in how you think, feel, and perform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Before */}
          <div className="bg-white p-8 md:p-10 border border-border">
            <h3 className="text-2xl font-semibold mb-6 text-foreground/80">Before Elite Coaching</h3>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-destructive/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-[hsl(var(--lioner-gold))] p-8 md:p-10 text-white">
            <h3 className="text-2xl font-semibold mb-6">After Elite Coaching</h3>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
