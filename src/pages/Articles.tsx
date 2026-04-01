import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Clock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useArticles } from "@/hooks/useArticles";
import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HomeFooter } from "@/components/home/HomeFooter";
import { Skeleton } from "@/components/ui/skeleton";

const Articles = () => {
  const { data: articles, isLoading } = useArticles();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Articles | Leaders Performance</title>
        <meta name="description" content="Insights on leadership, discipline, and personal mastery from Lionel Eersteling." />
      </Helmet>

      <HomeNavigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: "hsl(0 0% 8%)" }}>
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4"
          >
            Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-medium text-white leading-tight"
          >
            Open-Source <span className="text-lioner-gold italic">Strategy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Educational insights on founder pressure, decision fatigue, and executive discipline.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24" style={{ background: "hsl(0 0% 12%)" }}>
        <div className="container mx-auto px-6 max-w-6xl">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Skeleton className="h-4 w-24 mb-4 bg-white/10" />
                  <Skeleton className="h-6 w-full mb-3 bg-white/10" />
                  <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                </div>
              ))}
            </div>
          ) : !articles?.length ? (
            <p className="text-center text-white/40 text-lg py-20">No articles published yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/articles/${article.slug}`}
                    className="group relative flex flex-col h-full p-7 transition-all duration-300 hover:border-lioner-gold/40"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Pillar accent */}
                    <div
                      className="h-1 w-12 mb-5 rounded-full"
                      style={{ backgroundColor: article.pillar_color }}
                    />

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-white/40">
                      <span className="uppercase tracking-widest font-medium" style={{ color: article.pillar_color }}>
                        {article.pillar}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.reading_time} min
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-lg md:text-xl font-medium text-white leading-snug mb-3 group-hover:text-lioner-gold transition-colors">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-white/50 leading-relaxed flex-1 mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Author + CTA */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-white/30">
                        <User className="w-3 h-3" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-lioner-gold group-hover:translate-x-0.5 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Hover line */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lioner-gold group-hover:w-full transition-all duration-500" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 text-center" style={{ background: "hsl(0 0% 8%)" }}>
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-serif text-2xl md:text-4xl font-medium text-white mb-4">
            Find out where <span className="text-lioner-gold italic">pressure</span> is building.
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Take the Founder Pressure Scan and identify the structural bottleneck inside your company.
          </p>
          <Link
            to="/burnout-scan"
            className="inline-flex items-center gap-2 bg-lioner-gold text-white px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-lioner-gold/90 transition-colors"
          >
            Take the Scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="relative z-10 bg-background">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Articles;
