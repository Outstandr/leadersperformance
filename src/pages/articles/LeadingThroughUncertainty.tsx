import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import logo from "@/assets/logo.png";

export default function LeadingThroughUncertainty() {
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
              Leadership
            </span>
            <span className="flex items-center gap-1.5 text-xs text-background/40">
              <Clock className="w-3 h-3" />
              7 min read
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-background mb-6">
            Leading Through Uncertainty Without Losing Your Team
          </h1>
          <p className="text-lg text-background/60 leading-relaxed max-w-2xl">
            When the environment is volatile, your team doesn't need optimism — they need clarity. How you show up under pressure sets the standard for every person watching you.
          </p>
        </div>
      </div>

      {/* Article Body */}
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-8 text-foreground/80 leading-relaxed text-base md:text-lg">

            <p>
              In periods of genuine uncertainty — market disruption, internal crisis, structural change — leaders face a specific and underappreciated challenge: the team is watching, constantly, for signals about how serious the situation is and how competent the person leading them through it is.
            </p>
            <p>
              Most leaders respond to this pressure in one of two predictable ways: with forced optimism that insults the intelligence of their team, or with visible anxiety that amplifies the fear already present. Neither is leadership. Both erode trust.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">What People Actually Need From a Leader in a Crisis</h2>
            <p>
              It is a common misconception that teams need leaders to tell them everything is going to be fine. They don't. What they need — what actually stabilises a team under pressure — is the perception that the person at the top is in command of themselves, has a clear read of the situation, and is taking deliberate action.
            </p>
            <p>
              They need clarity, not certainty. There is an important difference. Certainty is claiming to know outcomes you cannot know. Clarity is being precise about what you do know, what you don't, and what you're doing next. The former is dishonest. The latter is leadership.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The Leader as the Signal</h2>
            <p>
              Your team reads you constantly. Your tone in meetings, the pace at which you respond to messages, whether you hold your weekly one-to-ones, whether you cancel the leadership offsite — all of these are data points that your team is unconsciously processing and interpreting.
            </p>
            <p>
              If you are anxious, they will sense it before you say a word. If you cancel commitments without explanation, they will fill the silence with fear. If you become inaccessible during a difficult period, they will assume the worst.
            </p>
            <p>
              This is why your personal state — your emotional regulation, your clarity of thinking, your physical condition — is not a personal matter during a period of organisational pressure. It is a strategic asset. Or a liability.
            </p>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">The Leader's First Job in a Crisis</p>
              <p className="mt-2">
                Stabilise yourself. Your capacity to lead the organisation is a direct function of your capacity to lead yourself. You cannot regulate a system you are not regulated within.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">Four Practices for Leading Under Pressure</h2>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">1. Increase communication frequency, decrease speculation</p>
              <p className="mt-2">
                In uncertain periods, the instinct is often to go quiet until you have more information. This is exactly wrong. Silence creates a vacuum that speculation fills. Communicate more frequently. Even if the message is "we are still assessing the situation and here is what we know so far" — say it. Explicitly.
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">2. Separate what is known from what is unknown</p>
              <p className="mt-2">
                In every briefing, every team communication, explicitly distinguish between facts and projections. "Here is what we know. Here is what we don't yet know. Here is the action we're taking based on what we have." This structure signals mature leadership and reduces the anxiety created by ambiguity.
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">3. Maintain the non-negotiable routines</p>
              <p className="mt-2">
                The weekly team meeting. The Monday operational review. The Friday debrief. These rhythms are infrastructure. In stable times, they support execution. In uncertain times, they signal that leadership is in control and operational standards are maintained regardless of external conditions.
              </p>
            </div>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">4. Model the emotional standard you expect</p>
              <p className="mt-2">
                If you need your team to stay focused under pressure, stay focused under pressure. If you need them to act with urgency without panic, demonstrate urgency without panic. Leadership is modelling, not instruction. The culture of any organisation under pressure reveals exactly who its leader is when it's hard.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">After the Crisis: The Window for Culture-Building</h2>
            <p>
              How a leader navigates a difficult period is remembered far longer than what was said in town halls or written in strategy documents. Teams that experience a leader who remains clear, accessible, and decisive during genuine adversity develop a loyalty and confidence in that leader that is extremely difficult to cultivate any other way.
            </p>
            <p>
              Adversity, led well, is one of the most powerful culture-building tools available. The leaders who understand this don't just survive difficult periods — they use them.
            </p>

            <blockquote className="border-l-4 border-lioner-gold pl-6 italic text-foreground/70 my-10 text-xl">
              "Under pressure, your team doesn't need your confidence. They need your clarity. And your clarity begins with yourself."
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
            Lead with clarity, even under pressure.
          </h2>
          <p className="text-background/60 mb-8 max-w-xl mx-auto">
            The Leaders Performance advisory program helps founders and executives build the personal foundation that sustains leadership under any conditions.
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
