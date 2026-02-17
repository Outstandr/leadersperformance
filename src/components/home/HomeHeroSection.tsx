import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeHeroSection = () => {
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-[hsl(0,0%,96%)] rounded-3xl p-10 md:p-16 lg:p-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.08]">
              Clarity Under{" "}
              <span className="text-lioner-gold">Pressure.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              A controlled decision environment and strategic advisory for founders scaling complexity.
            </p>

            <p className="mt-4 text-xs text-muted-foreground/60 uppercase tracking-widest font-medium">
              Based in Dubai · Built for global executives
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3 h-auto text-sm font-medium">
                Explore UNMASKED
              </Button>
              <a
                href="#advisory"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                Learn about Advisory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
