import { ArrowRight } from "lucide-react";

const offerings = [
  {
    eyebrow: "Private Reset",
    title: "UNMASKED",
    body: "A 4-day controlled recalibration in the desert. Designed to strip away noise and rebuild execution strategy.",
    specs: "Limited to 2–4 participants per edition.",
    link: "#",
    linkText: "View Experience details",
  },
  {
    eyebrow: "Ongoing Strategy",
    title: "Boardroom Advisory",
    body: "Strategic performance audits, execution discipline, and accountability for business owners navigating critical inflection points.",
    link: "#advisory",
    linkText: "Explore Advisory",
  },
  {
    eyebrow: "Foundation",
    title: "The RESET Method",
    body: "Begin by mapping your current baseline. Use our foundational scorecard to identify where performance is drifting.",
    link: "#start-here",
    linkText: "Take the Assessment",
  },
];

export const HomeOfferingsSection = () => {
  return (
    <section id="start-here" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          {offerings.map((item) => (
            <div
              key={item.title}
              className="group bg-card rounded-2xl border border-border p-8 md:p-10 flex flex-col justify-between hover:border-lioner-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-lioner-gold">
                  {item.eyebrow}
                </span>
                <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
                {item.specs && (
                  <p className="mt-3 text-xs text-muted-foreground/60">
                    {item.specs}
                  </p>
                )}
              </div>
              <a
                href={item.link}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-lioner-gold transition-colors"
              >
                {item.linkText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
