import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
export const SocialProofSection = () => {
  const testimonials = [{
    content: "Lionel's RESET Blueprint transformed not just my performance, but my entire approach to leadership. The integration of mind, body, and strategic thinking is revolutionary.",
    author: "Sarah Chen",
    role: "Fortune 500 CEO",
    color: "border-lioner-gold"
  }, {
    content: "Finally, a system that addresses the whole leader. My productivity increased 300% while maintaining perfect work-life integration.",
    author: "Marcus Rodriguez",
    role: "Private Equity Partner",
    color: "border-secondary-blue"
  }, {
    content: "The leadership assessment alone was worth millions in clarity. It showed me exactly where I was limiting my potential and how to break through.",
    author: "Emma Thompson",
    role: "Global Management Consultant",
    color: "border-secondary-purple"
  }];
  return <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Rating and Testimonial */}
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-foreground text-foreground" />
              ))}
              <span className="ml-3 text-sm text-foreground">Rated 4.9/5</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight max-w-4xl mx-auto">
              {testimonials[0].content}
            </h2>

            <div className="flex flex-col items-center gap-3 pt-8">
              <div className="w-16 h-16 rounded-full bg-muted"></div>
              <div>
                <p className="font-medium text-foreground">{testimonials[0].author}</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    High conversion
                  </span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded-full text-xs font-medium">
                    2x sales
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Label */}
          <div className="text-center mt-24 mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight">
              Key benefits that set us apart from other ferms
            </h2>
          </div>
        </div>
      </div>
    </section>;
};