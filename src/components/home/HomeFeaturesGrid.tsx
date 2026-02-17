import { ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Decision Clarity",
    description: "Strip away operational noise and rebuild your decision-making framework from the ground up.",
  },
  {
    title: "Execution Discipline",
    description: "Move beyond planning into structured, accountable action with measurable outcomes.",
  },
  {
    title: "Strategic Recalibration",
    description: "Realign your personal operating rhythm with your business growth trajectory.",
  },
  {
    title: "Sustainable Performance",
    description: "Build systems that protect vitality while scaling complexity and responsibility.",
  },
];

export const HomeFeaturesGrid = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight max-w-2xl">
            Transforming Complexity into{" "}
            <span className="text-lioner-gold">Clarity.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
            We build controlled environments for founders to eliminate decision backlog, restore strategic focus, and scale without sacrificing vitality.
          </p>
        </div>

        {/* Top row — tall cards */}
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-5">
          {features.slice(0, 2).map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-[hsl(0,0%,96%)] rounded-2xl p-8 md:p-10 min-h-[340px] flex flex-col justify-between hover:bg-[hsl(0,0%,93%)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {feature.description}
                </p>
                <div className="w-10 h-10 rounded-full bg-lioner-gold flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-background" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-auto pt-8">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom row — shorter cards */}
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-5 mt-5">
          {features.slice(2, 4).map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-[hsl(0,0%,96%)] rounded-2xl p-8 md:p-10 min-h-[340px] flex flex-col justify-between hover:bg-[hsl(0,0%,93%)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {feature.description}
                </p>
                <div className="w-10 h-10 rounded-full bg-lioner-gold flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-background" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-auto pt-8">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
