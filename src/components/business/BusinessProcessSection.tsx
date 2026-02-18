import { GraduationCap, FileText, ClipboardCheck, Rocket } from "lucide-react";

export const BusinessProcessSection = () => {
  const items = [
    {
      number: "01",
      icon: GraduationCap,
      title: "The Academy Access",
      description: "Lifetime access to the core doctrine for your entire team."
    },
    {
      number: "02",
      icon: FileText,
      title: "The Company Culture Report",
      description: "Copy-paste our specific protocols for Meetings, Reporting, and Daily Planning."
    },
    {
      number: "03",
      icon: ClipboardCheck,
      title: "The Audit",
      description: "Increase your team's effectiveness. Ultimately, it's all about the team achieving the results it was created to achieve. The proprietary \"Discipline Scorecard\" to grade every employee."
    },
    {
      number: "04",
      icon: Rocket,
      title: "The Kickoff",
      description: "A 90-Minute \"Hard Reset\" Strategy Call to deploy the system."
    }
  ];

  return (
    <section id="process" className="py-8 lg:py-12 bg-gradient-to-b from-muted/60 to-muted/80">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">The Arsenal</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            The Toolkit.
          </h2>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="absolute top-4 right-4 text-5xl font-bold text-lioner-gold/10 select-none">{item.number}</span>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-lioner-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {item.number}
                </div>
                <item.icon className="w-6 h-6 text-lioner-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
