import portraitImage from "@/assets/lionel-portrait.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const bio = "Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. Founder of BodyMentors, the Netherlands' first High-Performance & Health Institute. Lionel empowers leaders by integrating physical vitality, mental clarity, and strategic leadership for sustainable success.";
  const achievements = ["Global High-Performance Strategist", "20+ Years Elite Leadership", "BodyMentors Institute Founder", "Trusted by Fortune 500 executives"];
  return <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">Our team</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight">
              Meet Lionel Eersteling
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              {bio}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[3/4] bg-muted rounded-3xl overflow-hidden mb-4">
                  {index === 0 && (
                    <img src={portraitImage} alt="Lionel Eersteling" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-normal mb-1">
                      {index === 0 ? "Lionel Eersteling" : `Team Member ${index + 1}`}
                    </h3>
                    <p className="text-sm text-white/80">{achievement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>;
};