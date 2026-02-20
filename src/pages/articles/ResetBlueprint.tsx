import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import logo from "@/assets/logo.png";

export default function ResetBlueprint() {
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
              The RESET Method
            </span>
            <span className="flex items-center gap-1.5 text-xs text-background/40">
              <Clock className="w-3 h-3" />
              8 min read
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-background mb-6">
            The RESET Blueprint® — A Deep Dive
          </h1>
          <p className="text-lg text-background/60 leading-relaxed max-w-2xl">
            Not a framework you study. A system you install. The RESET Blueprint® is built around four non-negotiable pillars: Vitality, Personal Development, Personal Leadership, and Business — in that order.
          </p>
        </div>
      </div>

      {/* Article Body */}
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-8 text-foreground/80 leading-relaxed text-base md:text-lg">

            <p>
              Most performance frameworks start at the wrong level. They go straight to strategy, execution, and business systems — as if the person operating those systems is somehow separate from them, unaffected by their own condition.
            </p>
            <p>
              The RESET Blueprint® starts where everything actually begins: with the individual. And it builds upward from there in a specific, non-negotiable sequence.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">Why "Blueprint" and Not "Framework"?</h2>
            <p>
              Frameworks are conceptual. You can study them, understand them, agree with them, and do nothing differently. A blueprint is operational. It defines what gets built, in what order, with what specifications. It exists not to be understood — but to be executed.
            </p>
            <p>
              The RESET Blueprint® is not a set of ideas about high performance. It is a construction sequence for the person who intends to operate at their full capacity — across every dimension of their life, sustainably, without burning out or breaking down.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">Pillar One: Vitality</h2>
            <p>
              Vitality is the foundation. Before strategy, before leadership, before business — there is the body. The physical system that everything else runs on.
            </p>
            <p>
              Most leaders treat their bodies as a vehicle they maintain just enough to keep running. Sleep is negotiated. Movement is scheduled last and cancelled first. Nutrition is managed on convenience. Recovery is saved for holidays.
            </p>
            <p>
              The RESET Blueprint® treats Vitality as the first pillar because the quality of your thinking, your emotional regulation, your decision-making under pressure, and your capacity to be present in high-stakes moments — all of it is directly downstream of how you are physically operating.
            </p>
            <p>
              Vitality work in the Blueprint covers: sleep architecture and recovery protocols, nutritional frameworks calibrated to performance demands, physical training optimised for energy and longevity — not aesthetics, and biological monitoring for sustainable output.
            </p>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">The Vitality Diagnostic</p>
              <p className="mt-2">
                How many nights per week do you achieve 7+ hours of quality sleep? If the answer is fewer than four, your leadership capacity is operating at a structural deficit that no strategy will compensate for.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">Pillar Two: Personal Development</h2>
            <p>
              Once the physical foundation is in place, the second pillar addresses the internal operating system: the patterns, beliefs, and conditioned responses that drive behaviour beneath conscious awareness.
            </p>
            <p>
              Most high-achieving individuals carry patterns that were functional at an earlier stage of their development but are now actively limiting them. The drive that produced early success has become an inability to delegate. The self-reliance that built the business has become isolation. The standards that created excellence have become perfectionism that stalls execution.
            </p>
            <p>
              Personal Development in the Blueprint is not therapy. It is pattern recognition and installation. Identifying the specific ways your current programming is limiting your next level — and replacing those patterns with ones that serve where you're going.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">Pillar Three: Personal Leadership</h2>
            <p>
              Leadership of others is a direct reflection of leadership of self. This is not a philosophical position — it is an observable reality in every organisation we work with.
            </p>
            <p>
              The CEO who cannot say no to every meeting request cannot lead a team that has clear priorities. The founder who operates reactively cannot build an organisation that executes strategically. The executive who avoids difficult conversations cannot build a culture where honest feedback is the norm.
            </p>
            <p>
              Personal Leadership in the Blueprint installs the disciplines, communication frameworks, and decision-making protocols that allow you to lead from a stable, clear position — consistently, not just on good days.
            </p>

            <div className="border-l-4 border-lioner-gold pl-6 my-8">
              <p className="font-semibold text-foreground">The Personal Leadership Standard</p>
              <p className="mt-2">
                If your team described your leadership consistency on your best day versus your most pressured day, how large would the gap be? The Blueprint narrows that gap until the standard becomes constant.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">Pillar Four: Business</h2>
            <p>
              By the time we reach the Business pillar, the previous three have created the conditions for strategy to actually land. Not just be understood — but be executed. Consistently. With the full capacity of the individual behind it.
            </p>
            <p>
              This is where we install the operational infrastructure, execution systems, and accountability frameworks that translate personal clarity into organisational performance. Strategic planning that is grounded in reality rather than aspiration. Communication systems that reduce noise and amplify signal. Growth structures that scale without the leader becoming the bottleneck.
            </p>
            <p>
              The Business pillar works only because the first three have been built. Leaders who skip to this pillar without the foundation consistently report the same experience: they understand the strategy, they implement the systems, and six months later they are back where they started — because the person operating those systems hasn't changed.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-12 mb-4">The RESET in Practice</h2>
            <p>
              The RESET Blueprint® is delivered through a combination of the UNMASKED experience — a controlled, 4-day reset environment — and the ongoing Elite Coaching program, which installs each pillar sequentially over a 12-week engagement.
            </p>
            <p>
              What distinguishes this approach from conventional performance coaching is the sequencing. We do not attempt to install business strategy in an individual who is sleeping four hours per night and running on chronic stress. We do not address leadership communication in someone who hasn't yet confronted the internal patterns driving their behaviour. We build the foundation first. The rest follows with considerably less effort and considerably more permanence.
            </p>

            <blockquote className="border-l-4 border-lioner-gold pl-6 italic text-foreground/70 my-10 text-xl">
              "You don't need a new strategy. You need to become the person who can execute one. Build that person first."
              <footer className="mt-4 text-sm font-medium text-foreground not-italic">— Lionel Eersteling</footer>
            </blockquote>

          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <div className="bg-foreground py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">Ready to Install the Blueprint?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-background mb-6">
            The RESET Blueprint® begins with an honest assessment.
          </h2>
          <p className="text-background/60 mb-8 max-w-xl mx-auto">
            Take our Discipline Assessment to identify exactly where your current operating system is limiting your performance.
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
