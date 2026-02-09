import { GraduationCap, FileText, ClipboardCheck, PhoneCall } from "lucide-react";

export const BusinessToolkitSection = () => {
  const items = [
    {
      icon: GraduationCap,
      title: "The Academy Access",
      description: "Lifetime access to the core doctrine for your entire team.",
    },
    {
      icon: FileText,
      title: "The SOP Library",
      description: "Copy-paste our specific protocols for Meetings, Reporting, and Daily Planning.",
    },
    {
      icon: ClipboardCheck,
      title: "The Audit",
      description: 'The proprietary "Discipline Scorecard" to grade every employee.',
    },
    {
      icon: PhoneCall,
      title: "The Kickoff",
      description: 'A 90-Minute "Hard Reset" Strategy Call to deploy the system.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[hsl(var(--lioner-charcoal))]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
            The Arsenal
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4 font-sans uppercase">
            The Toolkit.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-lioner-gold/20 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-lioner-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
