import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CorporateAuditDialog } from "@/components/corporate-audit/CorporateAuditDialog";

interface BusinessBookingSectionProps {
  calendlyUrl?: string;
}

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const BusinessBookingSection = ({ 
  calendlyUrl = bookingUrl
}: BusinessBookingSectionProps) => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <section id="book-call" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-[hsl(var(--lioner-charcoal))] p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-sm font-medium uppercase tracking-wider text-white/80">The Decision</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-8">
              You Have Two Choices.
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-10 text-left">
              {/* Option A */}
              <div className="p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3 text-white/60">Option A</h3>
                <p className="text-white/70 leading-relaxed">
                  Keep tolerating the excuses. Keep working weekends to fix their mess. Keep the "Passenger Culture."
                </p>
              </div>

              {/* Option B */}
              <div className="p-6 border-2 border-[hsl(var(--lioner-gold))]">
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--lioner-gold))]">Option B</h3>
                <p className="text-white/90 leading-relaxed">
                  Install the Blueprint. Set the Standard. Reclaim your time.
                </p>
              </div>
            </div>

            <p className="text-lg text-white/70 italic mb-8">
              The standard you walk past is the standard you accept.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))]/90 text-white font-bold rounded-none px-8 py-5 h-auto group text-base uppercase tracking-wider"
              >
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book A Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                size="lg" 
                onClick={() => setIsAuditOpen(true)}
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[hsl(var(--lioner-charcoal))] font-medium rounded-none px-7 py-5 h-auto group transition-all"
              >
                Audit My Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CorporateAuditDialog open={isAuditOpen} onOpenChange={setIsAuditOpen} />
    </section>
  );
};
