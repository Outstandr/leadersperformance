import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Check, Users } from "lucide-react";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const EliteBookingSection = () => {
  const includes = [
    "12 weeks of intensive 1-to-1 coaching",
    "Weekly 60-minute private sessions",
    "Unlimited voice/text support between sessions",
    "Personalized action plans and exercises",
    "Access to exclusive resources and tools",
    "Lifetime access to session recordings"
  ];

  return (
    <section id="apply" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-[hsl(var(--lioner-gold))] p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">Limited Availability</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mb-6">
                Ready to Transform Your Life?
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-white/90">
                This program is for ambitious individuals who are ready to invest in themselves and commit to real change. If that's you, apply for your discovery call today.
              </p>
              
              <Button 
                size="lg" 
                asChild
                className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-white/90 font-medium rounded-none px-8 py-4 h-auto group"
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Apply for Elite Coaching
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <p className="text-sm text-white/70 mt-4">
                <Users className="w-4 h-4 inline mr-1" />
                Only 5 spots available per month
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-white">
              <h3 className="text-2xl font-semibold mb-6">What's Included</h3>
              <ul className="space-y-4">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
