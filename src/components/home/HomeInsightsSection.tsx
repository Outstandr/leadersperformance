import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "The Cost of Decision Fatigue at the Executive Level",
    category: "Strategy",
    date: "Apr 8, 2025",
    readTime: "6 min read",
  },
  {
    title: "Building Structure in Chaos: The 90-Day Execution Rule",
    category: "Execution",
    date: "Mar 15, 2025",
    readTime: "5 min read",
  },
  {
    title: "Why Most Founders Plateau — And What to Do About It",
    category: "Performance",
    date: "Feb 28, 2025",
    readTime: "7 min read",
  },
];

export const HomeInsightsSection = () => {
  return (
    <section id="insights" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
            Open-Source{" "}
            <span className="text-lioner-gold">Strategy.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
            Educational insights on founder pressure, decision fatigue, and executive discipline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.title}
              href="#"
              className="group bg-[hsl(0,0%,96%)] rounded-2xl overflow-hidden hover:bg-[hsl(0,0%,93%)] transition-all duration-300 border-2 border-lioner-gold/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
            >
              <div className="aspect-[16/10] bg-[hsl(0,0%,90%)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-lioner-gold/20 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground leading-snug group-hover:text-lioner-gold transition-colors">
                  {article.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-auto py-3 text-sm font-medium">
            Read all Insights
          </Button>
        </div>
      </div>
    </section>
  );
};
