import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Check } from "lucide-react";
import { CorporateAuditDialog } from "@/components/corporate-audit/CorporateAuditDialog";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const BusinessDecisionSection = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<"a" | "b" | null>(null);

  return (
    <>
      <section className="py-16 lg:py-24 bg-[hsl(var(--lioner-charcoal))] overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-sans leading-tight uppercase">
            You Have <span className="text-lioner-gold">Two Choices.</span>
          </h2>
          <p className="text-white/40 mb-12 text-lg">One keeps you stuck. The other sets you free.</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            {/* Option A */}
            <div
              onMouseEnter={() => setHoveredOption("a")}
              onMouseLeave={() => setHoveredOption(null)}
              className={`relative p-8 transition-all duration-500 cursor-default overflow-hidden
                ${hoveredOption === "a"
                  ? "border-2 border-destructive/50 bg-destructive/10 scale-[0.98]"
                  : "border-2 border-white/10 bg-white/5"
                }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300
                  ${hoveredOption === "a" ? "bg-destructive/20" : "bg-white/10"}`}>
                  <X className={`w-5 h-5 transition-colors duration-300
                    ${hoveredOption === "a" ? "text-destructive" : "text-white/30"}`} />
                </div>
                <h3 className={`text-lg font-bold uppercase tracking-wide transition-colors duration-300
                  ${hoveredOption === "a" ? "text-destructive" : "text-white/50"}`}>
                  Option A
                </h3>
              </div>
              <p className={`leading-relaxed transition-colors duration-300
                ${hoveredOption === "a" ? "text-white/80" : "text-white/50"}`}>
                Keep tolerating the excuses. Keep working weekends to fix their mess. Keep the "Passenger Culture."
              </p>
              {/* Strikethrough effect on hover */}
              <div className={`absolute top-1/2 left-0 h-[2px] bg-destructive/40 transition-all duration-700
                ${hoveredOption === "a" ? "w-full" : "w-0"}`} />
            </div>

            {/* Option B */}
            <div
              onMouseEnter={() => setHoveredOption("b")}
              onMouseLeave={() => setHoveredOption(null)}
              className={`relative p-8 transition-all duration-500 cursor-default overflow-hidden
                ${hoveredOption === "b"
                  ? "border-2 border-lioner-gold bg-lioner-gold/15 -translate-y-2 shadow-[0_20px_50px_-15px_rgba(179,151,88,0.4)]"
                  : "border-2 border-lioner-gold/30 bg-lioner-gold/5"
                }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300
                  ${hoveredOption === "b" ? "bg-lioner-gold text-white" : "bg-lioner-gold/20"}`}>
                  <Check className={`w-5 h-5 transition-colors duration-300
                    ${hoveredOption === "b" ? "text-white" : "text-lioner-gold"}`} />
                </div>
                <h3 className="text-lg font-bold text-lioner-gold uppercase tracking-wide">
                  Option B
                </h3>
              </div>
              <p className={`leading-relaxed transition-colors duration-300
                ${hoveredOption === "b" ? "text-white" : "text-white/80"}`}>
                Install the Blueprint. Set the Standard. Reclaim your time.
              </p>

              {/* Gold glow on hover */}
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-lioner-gold/10 blur-3xl transition-all duration-700
                ${hoveredOption === "b" ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>

          <p className="text-lg text-white/60 italic mb-10">
            "The standard you walk past is the standard you accept."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all hover:shadow-[0_10px_30px_-10px_rgba(179,151,88,0.5)] hover:-translate-y-0.5"
            >
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                I Choose The Standard – €4,997
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              size="lg"
              onClick={() => setIsAuditOpen(true)}
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all hover:-translate-y-0.5"
            >
              Audit My Team First
            </Button>
          </div>
        </div>
      </section>

      <CorporateAuditDialog open={isAuditOpen} onOpenChange={setIsAuditOpen} />
    </>
  );
};
