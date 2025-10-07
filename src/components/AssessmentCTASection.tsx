import { Button } from "@/components/ui/button";
import { Target, BarChart3, Rocket, ArrowRight } from "lucide-react";

export const AssessmentCTASection = () => {
  const benefits = [
    { icon: Target, text: "Identify your leadership strengths & growth areas" },
    { icon: BarChart3, text: "Get your personalized RESET Blueprint report" },
    { icon: Rocket, text: "Receive elite strategies for your profile" }
  ];

  return (
    <section id="assessment" className="py-20 lg:py-32 bg-background">
      {/* This section is merged with the testimonial section now */}
    </section>
  );
};
