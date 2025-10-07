import portraitImage from "@/assets/lionel-portrait.jpg";
import { Badge } from "@/components/ui/badge";
export const AuthoritySection = () => {
  return <section className="py-20 lg:py-32 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Portrait */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl w-full max-w-md">
                <img src={portraitImage} alt="Lionel Eersteling" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-lioner-gold/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-6">
            <h3 className="text-4xl lg:text-5xl font-bold text-lioner-blue">
              Meet Lionel Eersteling
            </h3>
            <p className="text-lg text-secondary-purple leading-relaxed">
              Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. 
              Founder of BodyMentors, the Netherlands' first High-Performance & Health Institute. 
              <strong className="text-lioner-blue block mt-4">
                Lionel empowers leaders by integrating physical vitality, 
                mental clarity, and strategic leadership for sustainable success.
              </strong>
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <Badge className="bg-lioner-gold text-white px-4 py-2 text-sm font-medium hover:bg-lioner-gold/90">
                Global High-Performance Strategist
              </Badge>
              <Badge className="bg-secondary-blue text-white px-4 py-2 text-sm font-medium hover:bg-secondary-blue/90">
                20+ Years Elite Leadership
              </Badge>
              <Badge className="bg-secondary-purple text-white px-4 py-2 text-sm font-medium hover:bg-secondary-purple/90">
                BodyMentors Institute Founder
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>;
};