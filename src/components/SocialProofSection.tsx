import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const SocialProofSection = () => {
  const testimonials = [
    {
      content: "Lionel's RESET Blueprint transformed not just my performance, but my entire approach to leadership. The integration of mind, body, and strategic thinking is revolutionary.",
      author: "Sarah Chen",
      role: "Fortune 500 CEO",
      color: "border-lioner-gold"
    },
    {
      content: "Finally, a system that addresses the whole leader. My productivity increased 300% while maintaining perfect work-life integration.",
      author: "Marcus Rodriguez",
      role: "Private Equity Partner",
      color: "border-secondary-blue"
    },
    {
      content: "The leadership assessment alone was worth millions in clarity. It showed me exactly where I was limiting my potential and how to break through.",
      author: "Emma Thompson",
      role: "Global Management Consultant",
      color: "border-secondary-purple"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-lioner-blue">
              Elite Leaders Choose Excellence
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`border-l-4 ${testimonial.color} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-8 space-y-6">
                  <Quote className="w-10 h-10 text-lioner-gold/20" />
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {testimonial.content}
                  </p>
                  <div className="pt-4 border-t">
                    <h4 className="text-lioner-blue font-bold text-lg">
                      {testimonial.author}
                    </h4>
                    <span className="text-sm text-muted-foreground font-medium">
                      {testimonial.role}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};