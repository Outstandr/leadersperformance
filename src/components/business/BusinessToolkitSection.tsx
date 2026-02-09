import { useState } from "react";
import { GraduationCap, FileText, ClipboardCheck, PhoneCall, ArrowRight } from "lucide-react";

export const BusinessToolkitSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    {
      icon: GraduationCap,
      title: "The Academy Access",
      description: "Lifetime access to the core doctrine for your entire team.",
      tag: "TRAINING",
    },
    {
      icon: FileText,
      title: "The SOP Library",
      description: "Copy-paste our specific protocols for Meetings, Reporting, and Daily Planning.",
      tag: "SYSTEMS",
    },
    {
      icon: ClipboardCheck,
      title: "The Audit",
      description: 'The proprietary "Discipline Scorecard" to grade every employee.',
      tag: "MEASUREMENT",
    },
    {
      icon: PhoneCall,
      title: "The Kickoff",
      description: 'A 90-Minute "Hard Reset" Strategy Call to deploy the system.',
      tag: "EXECUTION",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[hsl(var(--lioner-charcoal))] overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-lioner-gold mb-4 px-4 py-1.5 border border-lioner-gold/30 bg-lioner-gold/5">
            The Arsenal
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-2 font-sans uppercase">
            The Toolkit.
          </h2>
          <p className="text-white/50 text-lg mt-4">Everything you need to deploy discipline at scale.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative p-8 transition-all duration-500 cursor-default overflow-hidden group
                ${hoveredIndex === index
                  ? "border border-lioner-gold/50 bg-lioner-gold/10 -translate-y-1 shadow-[0_20px_50px_-20px_rgba(179,151,88,0.3)]"
                  : "border border-white/10 bg-white/5 hover:border-white/20"
                }`}
            >
              {/* Tag */}
              <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-3 py-1 transition-all duration-300
                ${hoveredIndex === index
                  ? "bg-lioner-gold/20 text-lioner-gold"
                  : "bg-white/5 text-white/30"
                }`}>
                {item.tag}
              </span>

              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 flex items-center justify-center shrink-0 transition-all duration-500
                  ${hoveredIndex === index
                    ? "bg-lioner-gold text-white shadow-lg shadow-lioner-gold/30 scale-110"
                    : "bg-white/10 text-white/50"
                  }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
                    {item.title}
                    <ArrowRight className={`w-4 h-4 transition-all duration-500
                      ${hoveredIndex === index ? "opacity-100 translate-x-0 text-lioner-gold" : "opacity-0 -translate-x-2"}`} />
                  </h4>
                  <p className={`leading-relaxed transition-colors duration-300
                    ${hoveredIndex === index ? "text-white/80" : "text-white/50"}`}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom line */}
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lioner-gold to-lioner-gold/0 transition-all duration-700
                ${hoveredIndex === index ? "w-full" : "w-0"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
