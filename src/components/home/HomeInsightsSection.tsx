import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "The Cost of Decision Fatigue at the Executive Level",
    category: "Strategy",
  },
  {
    title: "Building Structure in Chaos: The 90-Day Execution Rule",
    category: "Execution",
  },
  {
    title: "Why Most Founders Plateau — And What to Do About It",
    category: "Performance",
  },
];

export const HomeInsightsSection = () => {
  return (
    <section id="insights" className="py-20 md:py-28 bg-[hsl(var(--off-white))]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Open-Source Strategy.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl">
            Educational insights on founder pressure, decision fatigue, and executive discipline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.title}
              href="#"
              className="group bg-card rounded-2xl border border-border p-8 hover:border-lioner-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-lioner-gold">
                {article.category}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground leading-snug group-hover:text-lioner-gold transition-colors">
                {article.title}
              </h3>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Read
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full px-8 h-auto py-3 text-sm font-medium">
            Read all Insights
          </Button>
        </div>
      </div>
    </section>
  );
};
