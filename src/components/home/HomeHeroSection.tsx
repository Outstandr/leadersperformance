import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeHeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.08]">
          Clarity Under Pressure.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          A controlled decision environment and strategic advisory for founders scaling complexity.
        </p>

        <p className="mt-4 text-xs text-muted-foreground/60 uppercase tracking-widest font-medium">
          Based in Dubai · Built for global executives
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3 h-auto text-sm font-medium">
            Explore UNMASKED
          </Button>
          <a
            href="#advisory"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-lioner-gold transition-colors group"
          >
            Learn about Advisory
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
