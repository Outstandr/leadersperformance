import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Users, TrendingUp } from "lucide-react";

const STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/websiteimages`;

const showcases = [
  {
    title: "Private Desert Reset",
    description: "A 4-day controlled recalibration experience in the desert. Strip away noise, confront deferred decisions, and rebuild your execution strategy from the ground up.",
    cta: "Explore UNMASKED",
    link: "#",
    icon: Shield,
    image: `${STORAGE_URL}/Unmasked.png`,
    reverse: false,
  },
  {
    title: "Strategic Advisory",
    description: "Ongoing strategic performance audits, execution discipline, and accountability for business owners navigating critical inflection points.",
    cta: "Learn about Advisory",
    link: "#advisory",
    icon: Users,
    image: `${STORAGE_URL}/Leadersperformance`,
    reverse: true,
  },
  {
    title: "Measurable Performance",
    description: "Track your leadership discipline with our proprietary scorecard. Identify where performance is drifting and course-correct before it compounds.",
    cta: "Take the Assessment",
    link: "#start-here",
    icon: TrendingUp,
    image: `${STORAGE_URL}/le`,
    reverse: false,
  },
];

const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-3xl border border-lioner-gold/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover absolute inset-0"
      />
    </div>
  );
};

export const HomeShowcaseSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl space-y-20 md:space-y-32">
        {showcases.map((item) => (
          <div
            key={item.title}
            className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center border-2 border-lioner-gold/30 rounded-3xl p-8 md:p-12 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] ${item.reverse ? "md:[direction:rtl]" : ""}`}
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

            {/* Visual with parallax */}
            <div className={item.reverse ? "md:[direction:ltr]" : ""}>
              <ParallaxImage src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
