import portraitImage from "@/assets/lionel-portrait.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const achievements = ["20+ years elite leadership expertise", "Founder of BodyMentors Institute", "Global High-Performance Strategist", "Trusted by Fortune 500 executives", "Pioneer in mind-body-wealth integration", "Author of RESET Blueprint® methodology"];
  return <section id="about" className="py-20 lg:py-32 bg-zinc-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-4">
              Your Expert Guide
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-lioner-blue">
              Meet Lionel Eersteling
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto md:max-w-none">

                <img src={portraitImage} alt="Lionel Eersteling" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-lioner-gold/20 rounded-full blur-3xl -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-6 md:space-y-8 order-1 md:order-2">
              <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">

                Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. 
                Lionel empowers leaders by integrating <strong className="text-lioner-blue">physical vitality, 
                mental clarity, and strategic leadership</strong> for sustainable success.
              </p>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-lioner-gold/10 p-1">
                      <Check className="w-4 h-4 text-lioner-gold" />
                    </div>
                    <span className="text-lg text-muted-foreground">{achievement}</span>
                  </div>)}
              </div>

              <p className="text-lg text-muted-foreground pt-4 border-t">
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