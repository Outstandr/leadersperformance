import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, User, Linkedin, Link2, ArrowRight, Activity, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useArticleBySlug, useArticles } from "@/hooks/useArticles";
import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HomeFooter } from "@/components/home/HomeFooter";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticleBySlug(slug || "");
  const { data: allArticles } = useArticles();

  const related = allArticles
    ?.filter((a) => a.pillar === article?.pillar && a.slug !== article?.slug)
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "hsl(0 0% 8%)" }}>
        <HomeNavigation />
        <div className="container mx-auto px-6 max-w-3xl pt-40 pb-20">
          <Skeleton className="h-8 w-3/4 mb-4 bg-white/10" />
          <Skeleton className="h-4 w-1/2 mb-8 bg-white/10" />
          <Skeleton className="h-4 w-full mb-2 bg-white/10" />
          <Skeleton className="h-4 w-full mb-2 bg-white/10" />
          <Skeleton className="h-4 w-2/3 bg-white/10" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(0 0% 8%)" }}>
        <HomeNavigation />
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Article not found</h1>
          <Link to="/articles" className="text-lioner-gold hover:underline">← Back to articles</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(0 0% 8%)" }}>
      <Helmet>
        <title>{article.meta_title}</title>
        <meta name="description" content={article.meta_description} />
      </Helmet>

      <HomeNavigation />

      <article className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Back */}
          <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-lioner-gold transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="h-1 w-16 mb-6 rounded-full"
              style={{ backgroundColor: article.pillar_color }}
            />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: article.pillar_color }}>
              {article.pillar}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-medium text-white leading-tight mt-3 mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-5 text-sm text-white/40 mb-10 pb-10 border-b border-white/10">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {article.reading_time} min read
              </span>
              <span>{new Date(article.publish_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-white prose-headings:font-medium
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-strong:text-lioner-gold prose-strong:font-semibold
              prose-em:text-white/80
              prose-li:text-white/70 prose-li:marker:text-lioner-gold
              prose-hr:border-white/10 prose-hr:my-10
              prose-a:text-lioner-gold prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-lioner-gold prose-blockquote:text-white/60 prose-blockquote:italic"
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </motion.div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-14 pt-8 border-t border-white/10">
            <span className="text-xs uppercase tracking-widest text-white/30">Share</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-white/10 hover:border-lioner-gold hover:text-lioner-gold text-white/50 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={copyLink}
              className="p-2.5 border border-white/10 hover:border-lioner-gold hover:text-lioner-gold text-white/50 transition-colors"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="py-16 border-t border-white/5" style={{ background: "hsl(0 0% 10%)" }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-serif text-2xl text-white mb-8">
              More on <span className="text-lioner-gold italic">{article.pillar}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/articles/${r.slug}`}
                  className="group p-6 transition-all duration-300 hover:border-lioner-gold/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-xs uppercase tracking-widest font-medium" style={{ color: r.pillar_color }}>
                    {r.pillar}
                  </span>
                  <h3 className="font-serif text-base text-white mt-2 mb-3 group-hover:text-lioner-gold transition-colors leading-snug">
                    {r.title}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-lioner-gold">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="relative z-10 bg-background">
        <HomeFooter />
      </div>
    </div>
  );
};

export default ArticleDetail;
