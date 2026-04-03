import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import logo from "@/assets/logo.png";

export default function DisciplineBeatsMotivation() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-foreground/10">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-16">
          <Link to="/">
            <img src={logo} alt="Leaders Performance" className="h-8 w-auto" />
          </Link>
          <Link
            to="/articles"
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-32 pb-16 bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-lioner-gold">
              <Tag className="w-3 h-3" />
              Discipline
            </span>
            <span className="flex items-center gap-1.5 text-xs text-background/40">
              <Clock className="w-3 h-3" />
              5 min read
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-background mb-6">
            Why Discipline Beats Motivation Every Time
          </h1>
          <p className="text-lg text-background/60 leading-relaxed max-w-2xl">
            Motivation is a feeling. Discipline is a system. The leaders who consistently outperform aren't more inspired — they've built structures that make the right action the default action.
          </p>
        </div>
      </div>

      {/* Article Body */}
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-8 text-foreground/80 leading-relaxed text-base md:text-lg">

            <p>
              There is a story most people tell themselves about high performance: that the individuals who achieve the most are somehow more driven, more fired up, more motivated than everyone else. That on the days they don't feel like showing up, some inner force compels them forward.
            </p>
            <p>
              That story is almost entirely false.
            </p>
            <p>
              The leaders and performers who consistently produce results at the highest level are not more motivated. They have simply made discipline non-negotiable. And in doing so, they have removed motivation entirely from the equation.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Motivation Trap</h2>
            <p>
              Motivation is an emotional state. Like all emotional states, it is transient, context-dependent, and largely outside your control. You cannot reliably manufacture it when you need it. You cannot schedule it. You cannot guarantee its presence on the mornings when the meeting is critical, the decision is hard, or the discomfort is at its highest.
            </p>
            <p>
              And yet — most people anchor their performance to it. They wait for motivation. They curate motivational content. They seek environments and experiences designed to produce the feeling of being motivated. And on the days it doesn't arrive — which are often the days that matter most — they underperform, defer, or avoid.
            </p>
            <p>
              The fundamental error is treating motivation as a prerequisite for action, when in reality, action is the prerequisite for motivation.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">What Discipline Actually Is</h2>
            <p>
              Discipline is not willpower. Willpower is another finite resource that depletes under pressure — which is precisely when you need it most. Discipline, at its most practical level, is the architecture of your environment and commitments arranged to make the right action automatic.
            </p>
            <p>
              When your training session is scheduled at 6:00 AM and your gym kit is laid out the night before, discipline has already done its work before you wake up. The decision was made in advance, in a moment of clarity, and the environment was structured to support it. When the alarm goes off, there is no decision to make — only an action to execute.
            </p>
            <p>
              This is the difference that separates consistent performers from inconsistent ones: not the quality of their intentions, but the architecture of their defaults.
            </p>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">The Discipline Formula</p>
              <p className="mt-2">
                Decide in advance. Structure your environment. Remove friction from the right actions. Add friction to the wrong ones. Evaluate the system, not the day.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Compound Effect of Systems</h2>
            <p>
              Motivation produces bursts. Discipline produces compound growth. The person who trains three times a week for two years, regardless of how they feel each morning, will outperform the person who trains intensely for three months whenever the motivation strikes and then stops.
            </p>
            <p>
              This applies equally to leadership. The CEO who reviews their strategic priorities each week — even briefly, even imperfectly — accumulates a clarity advantage over twelve months that cannot be matched by someone who thinks deeply about strategy only when they feel like it.
            </p>
            <p>
              Consistency, over time, is the most powerful force in performance. And consistency is a product of discipline, not motivation.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">How to Build Discipline Without Relying on Willpower</h2>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">1. Reduce decision fatigue at critical moments</p>
              <p className="mt-2">
                Every decision depletes cognitive resources. Pre-decide as many recurring choices as possible. What time do you train? What do you eat for breakfast? When do you process email? Lock these in as protocols, not preferences.
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">2. Design your environment before your day</p>
              <p className="mt-2">
                Your environment is a constant influence on your behaviour. If the phone is on your desk, you will look at it. If the gym bag is packed, you are more likely to go. Structure your physical and digital environment to support the behaviours you've committed to.
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">3. Track behaviour, not outcomes</p>
              <p className="mt-2">
                Outcomes are lagging indicators — they reflect past inputs, not current ones. Track whether you showed up. Whether you executed the protocol. Behaviour is within your control; outcomes are not always. Discipline means measuring what you can control.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Identity Shift That Changes Everything</h2>
            <p>
              Ultimately, sustained discipline is not a habit — it is an identity. The person who describes themselves as "someone who trains regardless of how I feel" has a fundamentally different relationship with action than the person who trains "when I'm motivated."
            </p>
            <p>
              The goal is not to find better techniques for being disciplined. The goal is to become the type of person for whom discipline is simply how you operate. That shift — from strategy to identity — is where lasting performance lives.
            </p>

            <blockquote className="border-l-4 border-lioner-gold pl-6 italic text-foreground/70 my-10 text-xl">
              "We don't rise to the level of our motivation. We fall to the level of our systems."
              <footer className="mt-4 text-sm font-medium text-foreground not-italic">— Lionel Eersteling</footer>
            </blockquote>

          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <div className="bg-foreground py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">Take the Next Step</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-background mb-6">
            Discover where the pressure is coming from.
          </h2>
          <p className="text-background/60 mb-8 max-w-xl mx-auto">
            Take the Founder Pressure Scan to identify the structural issues holding you back, or explore more insights from our editorial library.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pressurescan"
              className="inline-flex items-center gap-2 bg-lioner-gold text-white hover:bg-lioner-gold/90 px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all"
            >
              Take the Founder Pressure Scan <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 border border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all"
            >
              View More Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
