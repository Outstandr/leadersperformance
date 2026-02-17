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
    <section className="relative z-10 py-20 lg:py-28" style={{ background: "hsl(0 0% 12%)" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">
            Insights
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight" style={{ color: "white" }}>
            Latest <span className="text-lioner-gold italic">Articles</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Explore our latest thinking on leadership, discipline, and personal mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.link}
              className="group relative p-8 pb-20 flex flex-col justify-between min-h-[280px] transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm md:text-base leading-relaxed max-w-[80%]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {article.description}
                </p>
                <div className="shrink-0 w-11 h-11 rounded-full bg-lioner-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" style={{ color: "white" }} />
                </div>
              </div>
              <h3 className="absolute bottom-8 left-8 font-serif text-xl md:text-2xl font-medium" style={{ color: "white" }}>
                {article.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
