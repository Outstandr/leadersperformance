import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CorporateAuditDialog } from "@/components/corporate-audit/CorporateAuditDialog";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const BusinessDecisionSection = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-24 bg-[hsl(var(--lioner-charcoal))]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-sans leading-tight uppercase">
            You Have Two Choices.
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            {/* Option A */}
            <div className="p-8 border border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-white/50 mb-4 uppercase tracking-wide">
                Option A
              </h3>
              <p className="text-white/70 leading-relaxed">
                Keep tolerating the excuses. Keep working weekends to fix their mess. Keep the "Passenger Culture."
              </p>
            </div>

            {/* Option B */}
            <div className="p-8 border border-lioner-gold/40 bg-lioner-gold/10">
              <h3 className="text-lg font-bold text-lioner-gold mb-4 uppercase tracking-wide">
                Option B
              </h3>
              <p className="text-white/90 leading-relaxed">
                Install the Blueprint. Set the Standard. Reclaim your time.
              </p>
            </div>
          </div>

          <p className="text-lg text-white/60 italic mb-10">
            "The standard you walk past is the standard you accept."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all"
            >
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                I Choose The Standard – €4,997
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              size="lg"
              onClick={() => setIsAuditOpen(true)}
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all"
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
