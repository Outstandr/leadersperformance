import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "The Power of Mental Sovereignty",
    description:
      "Discover how reclaiming control over your thoughts and emotions can transform your leadership presence and decision-making under pressure.",
    link: "/blog",
  },
  {
    title: "Why Discipline Beats Motivation",
    description:
      "Motivation fades. Discipline endures. Learn why the most effective leaders rely on systems and structure — not fleeting inspiration.",
    link: "/blog",
  },
  {
    title: "Leading Through Uncertainty",
    description:
      "In times of crisis, your team looks to you. Build the resilience and composure needed to lead with clarity when it matters most.",
    link: "/blog",
  },
  {
    title: "The Reset Method Explained",
    description:
      "A deep dive into our proven framework for breaking old patterns, installing new habits, and achieving lasting personal transformation.",
    link: "/blog",
  },
];

export const HomeArticlesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-lioner-charcoal">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">
            Insights
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
            Latest <span className="text-lioner-gold italic">Articles</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl text-base md:text-lg leading-relaxed">
            Explore our latest thinking on leadership, discipline, and personal mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.link}
              className="group relative bg-white/[0.06] border border-white/[0.08] p-8 pb-20 flex flex-col justify-between min-h-[280px] transition-colors hover:bg-white/[0.10]"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[80%]">
                  {article.description}
                </p>
                <div className="shrink-0 w-11 h-11 rounded-full bg-lioner-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="absolute bottom-8 left-8 font-serif text-xl md:text-2xl text-white font-medium">
                {article.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
