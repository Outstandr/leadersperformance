import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import heroImage from "@/assets/lionel-business-hero.jpg";
import { CorporateAuditDialog } from "@/components/corporate-audit/CorporateAuditDialog";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const BusinessHeroSection = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <section id="hero" className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="overflow-hidden p-8 md:p-12 lg:p-16 bg-[hsl(var(--lioner-gold))]">
          <div className="grid md:grid-cols-1 lg:grid-cols-[1fr_40%] gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-4 md:space-y-6 text-white flex flex-col justify-center items-center md:items-start px-4 md:px-0 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">For Teams of 5 – 50</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans leading-tight tracking-tight">
                Stop Managing People. Start Leading Performers.
              </h1>

              {/* Description */}
              <p className="text-lg text-white leading-relaxed tracking-normal max-w-xl">
                Your business is not scaling because you are tolerating mediocrity. The Business Reset Blueprint is the operational system to eliminate "Passenger Culture" and install military-grade discipline in 30 days.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto group transition-all border-2 border-transparent shadow-lg shadow-black/10"
                >
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Deploy The System
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => setIsAuditOpen(true)}
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[hsl(var(--lioner-gold))] font-medium rounded-none px-7 py-3.5 h-auto group transition-all"
                >
                  Audit My Team First
                </Button>
              </div>
              <p className="text-sm text-white/90 pt-2">For teams of 5 – 50</p>
            </div>

            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl mx-auto md:mx-auto md:w-full md:max-w-full lg:max-w-none lg:mx-0">
              <img 
                src={heroImage} 
                alt="Lionel Eersteling - Executive Leadership Coach" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
          </div>
        </div>
      </div>

      <CorporateAuditDialog open={isAuditOpen} onOpenChange={setIsAuditOpen} />
    </section>
  );
};
