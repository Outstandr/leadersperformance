import { Button } from "@/components/ui/button";
import { Shield, Users, TrendingUp } from "lucide-react";

const showcases = [
  {
    title: "Private Desert Reset",
    description: "A 4-day controlled recalibration experience in the desert. Strip away noise, confront deferred decisions, and rebuild your execution strategy from the ground up.",
    cta: "Explore UNMASKED",
    link: "#",
    icon: Shield,
    reverse: false,
  },
  {
    title: "Strategic Advisory",
    description: "Ongoing strategic performance audits, execution discipline, and accountability for business owners navigating critical inflection points.",
    cta: "Learn about Advisory",
    link: "#advisory",
    icon: Users,
    reverse: true,
  },
  {
    title: "Measurable Performance",
    description: "Track your leadership discipline with our proprietary scorecard. Identify where performance is drifting and course-correct before it compounds.",
    cta: "Take the Assessment",
    link: "#start-here",
    icon: TrendingUp,
    reverse: false,
  },
];

export const HomeShowcaseSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl space-y-20 md:space-y-32">
        {showcases.map((item) => (
          <div
            key={item.title}
            className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${item.reverse ? "md:[direction:rtl]" : ""}`}
          >
            {/* Text */}
            <div className={item.reverse ? "md:[direction:ltr]" : ""}>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                {item.title}
              </h3>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">
                {item.description}
              </p>
              <div className="mt-8">
                <Button className="bg-lioner-gold hover:bg-lioner-gold/90 text-background rounded-full px-8 py-3 h-auto text-sm font-medium">
                  {item.cta}
                </Button>
              </div>
            </div>

            {/* Visual placeholder */}
            <div className={item.reverse ? "md:[direction:ltr]" : ""}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-lioner-gold/20 via-lioner-gold/5 to-transparent rounded-3xl" />
                <div className="absolute inset-4 bg-background rounded-2xl shadow-lg flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-lioner-gold/30" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
