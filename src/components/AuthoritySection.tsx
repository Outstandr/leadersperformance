import portraitImage from "@/assets/lionel-portrait.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const achievements = ["20+ years elite leadership expertise", "Founder of BodyMentors Institute", "Global High-Performance Strategist", "Trusted by Fortune 500 executives", "Pioneer in mind-body-wealth integration", "Author of RESET Blueprint® methodology"];
  return <section id="about" className="py-16 lg:py-24 bg-zinc-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 text-sm bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-3">
              Your Expert Guide
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-lioner-blue">
              Meet Lionel Eersteling
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-8 lg:gap-12 items-center">
...
            {/* Content */}
            <div className="space-y-5 md:space-y-6 order-1 md:order-2">
              <p className="text-base md:text-lg text-foreground leading-relaxed">

                Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. 
                Lionel empowers leaders by integrating <strong className="text-lioner-blue">physical vitality, 
                mental clarity, and strategic leadership</strong> for sustainable success.
              </p>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => <div key={index} className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full bg-lioner-gold/10 p-1">
                      <Check className="w-3.5 h-3.5 text-lioner-gold" />
                    </div>
                    <span className="text-sm text-muted-foreground">{achievement}</span>
                  </div>)}
              </div>

              <p className="text-sm text-muted-foreground pt-3 border-t">
                "Peak performance is achieved through the alignment of mind, body, and wealth. 
                We set a new standard for leadership where excellence, alignment, and resilience 
                are the defining characteristics."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};