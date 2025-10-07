import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const AssessmentCTASection = () => {
  const benefits = [
    { icon: "target", text: "Identify your leadership strengths & growth areas" },
    { icon: "chart", text: "Get your personalized RESET Blueprint report" },
    { icon: "rocket", text: "Receive elite strategies for your profile" }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lioner-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-lioner-gold">
            Discover Your Leadership Excellence Profile
          </h2>
          <p className="text-xl text-neutral-gray leading-relaxed">
            Take our scientifically-backed assessment to identify your unique leadership profile 
            and receive a personalized roadmap to High Performance excellence.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 py-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 text-left">
                <Icon name={benefit.icon} className="text-lioner-gold flex-shrink-0 mt-1" />
                <span className="text-neutral-gray">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold text-xl px-12 py-8 h-auto"
          >
            <div className="flex flex-col items-center">
              <span>Start Your Free Leadership Assessment Now</span>
              <span className="text-sm font-normal opacity-90">Takes 2 minutes • Instant results</span>
            </div>
          </Button>
          
          <p className="text-sm text-neutral-gray">
            Your information is 100% secure and will never be shared.
          </p>
        </div>
      </div>
    </section>
  );
};
