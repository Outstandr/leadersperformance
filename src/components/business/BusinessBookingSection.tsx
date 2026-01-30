import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Video } from "lucide-react";

interface BusinessBookingSectionProps {
  calendlyUrl?: string;
}

export const BusinessBookingSection = ({ 
  calendlyUrl = "https://calendly.com" // Replace with actual Calendly link
}: BusinessBookingSectionProps) => {
  const benefits = [
    { icon: Clock, text: "30-minute free strategy session" },
    { icon: Video, text: "Virtual or in-person meeting" },
    { icon: Calendar, text: "Choose a time that works for you" }
  ];

  return (
    <section id="book-call" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-[hsl(var(--lioner-gold))] p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <span className="text-sm font-medium uppercase tracking-wider text-white/80">Ready to Transform?</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
                Book Your Free Consultation
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-white/90">
                Let's discuss how we can help your organization achieve elite performance. In our call, we'll explore your challenges, goals, and how our methodology can drive measurable results.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <span>{benefit.text}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                asChild
                className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-white/90 font-medium rounded-none px-8 py-4 h-auto group"
              >
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Schedule Your Call Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-white text-center max-w-sm">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-semibold mb-2">What to Expect</h3>
                <ul className="text-left space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-white/60">1.</span>
                    <span>Discuss your current leadership challenges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/60">2.</span>
                    <span>Explore potential solutions and approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/60">3.</span>
                    <span>Get actionable insights you can use immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/60">4.</span>
                    <span>Receive a custom proposal if we're a fit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
