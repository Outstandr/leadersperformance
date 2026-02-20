import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import logo from "@/assets/logo.png";

export default function MentalSovereignty() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-foreground/10">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-16">
          <Link to="/">
            <img src={logo} alt="Leaders Performance" className="h-8 w-auto" />
          </Link>
          <Link
            to="/#articles"
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
              Mental Performance
            </span>
            <span className="flex items-center gap-1.5 text-xs text-background/40">
              <Clock className="w-3 h-3" />
              6 min read
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-background mb-6">
            The Power of Mental Sovereignty
          </h1>
          <p className="text-lg text-background/60 leading-relaxed max-w-2xl">
            Most leaders outsource their thinking to urgency, notifications, and other people's agendas. Reclaiming mental sovereignty means deciding — consciously — what gets your attention, energy, and time.
          </p>
        </div>
      </div>

      {/* Article Body */}
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-3xl prose prose-lg">
          <div className="space-y-8 text-foreground/80 leading-relaxed text-base md:text-lg">

            <p>
              Every morning, before you've even made a decision of your own, your attention has already been claimed. By notifications. By emails. By someone else's urgency framed as your problem. This is the invisible tax most high-performing leaders pay without realising it — and it quietly erodes the quality of every decision that follows.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">What Is Mental Sovereignty?</h2>
            <p>
              Mental sovereignty is the practice of owning the first and most important resource you have as a leader: your attention. It is not about being unreachable or anti-social. It is about being intentional. About choosing where your cognitive energy goes before the world makes that choice for you.
            </p>
            <p>
              The most effective leaders we work with — founders, CEOs, executives — share a common trait: they decide what matters before they engage with anything else. They have a protocol for the first 60–90 minutes of their day that belongs entirely to them. No phone. No inbox. No external demands.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Attention Economy Is Working Against You</h2>
            <p>
              Technology has been engineered, at an extraordinary level of sophistication, to capture and hold your attention. Every platform, every app, every notification is designed by teams of engineers and psychologists whose singular objective is to make you look. Again. And again.
            </p>
            <p>
              This isn't a moral judgement. It is an operating reality that every serious leader must account for. If you haven't deliberately designed the architecture of your attention, someone else has — and they have done so in their interest, not yours.
            </p>
            <p>
              The result is a leadership style that is reactive by default. You move from input to input, from urgency to urgency, never gaining the elevation required to see the board clearly. You end the day exhausted, certain you were busy, uncertain whether you made progress.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Three Pillars of Mental Reclamation</h2>
            <p>
              Reclaiming mental sovereignty is a practice, not a single decision. It requires three consistent shifts:
            </p>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">1. Design Your First Hour</p>
              <p className="mt-2">
                Before your phone. Before your email. Before anyone else's agenda. Use the first hour to clarify your three most important outputs for the day. Not tasks — outputs. What specifically will be different at the end of today because of what you chose to do?
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">2. Create Structured Disconnection Windows</p>
              <p className="mt-2">
                Deep thinking requires cognitive environments free from interruption. Block 90-minute windows in your calendar — not for meetings, but for thinking. Protect them. The quality of your strategy is a direct function of the quality of your thinking environment.
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">3. Audit Your Information Diet</p>
              <p className="mt-2">
                Most of what you consume daily does not inform better decisions — it creates the illusion of being informed while adding cognitive noise. Be ruthless about what sources you allow into your operating environment. If it doesn't sharpen your thinking or serve your strategy, it's costing you.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Leadership Consequence</h2>
            <p>
              When a leader operates without mental sovereignty, the effects compound through their entire organisation. Reactive leadership creates reactive cultures. When the person at the top is fragmented, so is the team beneath them. People mirror the operating system of the leader — consciously and unconsciously.
            </p>
            <p>
              Conversely, when a leader operates from a position of clarity — when they enter every meeting, every decision, and every conversation with full presence — the quality of the entire organisation elevates. Clarity is contagious. So is fragmentation.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Practice Starts Now</h2>
            <p>
              You do not need a week in the desert to reclaim your attention. You need a decision, made now, and a protocol, implemented tomorrow morning.
            </p>
            <p>
              Decide what the first 60 minutes of your day belong to. Write it down. Follow it for five days. Observe what changes — in your decision quality, in your energy, in your sense of command.
            </p>
            <p>
              Mental sovereignty is not a luxury for leaders with more time. It is the foundational practice that creates leaders who have the clarity to lead at the level they're capable of.
            </p>

            <blockquote className="border-l-4 border-lioner-gold pl-6 italic text-foreground/70 my-10 text-xl">
              "The quality of your leadership is determined by the quality of your attention. Protect it accordingly."
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
            Ready to reclaim your mental clarity?
          </h2>
          <p className="text-background/60 mb-8 max-w-xl mx-auto">
            The RESET Blueprint® is a structured system for leaders who are done operating on autopilot.
          </p>
          <Link
            to="/#articles"
            className="inline-flex items-center gap-2 border border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white px-8 py-3 text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
