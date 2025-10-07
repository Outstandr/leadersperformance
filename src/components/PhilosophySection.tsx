export const PhilosophySection = () => {
  const values = [
    { title: "Relentless Discipline", description: "The foundation of all achievement" },
    { title: "Leadership by Example", description: "Leading from the front in all areas" },
    { title: "Vitality as Strategy", description: "Physical health drives mental clarity" },
    { title: "Impact Beyond Boardroom", description: "Creating lasting change in all spheres" },
    { title: "Integrity in All Dealings", description: "Unwavering ethical standards" },
    { title: "Continuous Evolution", description: "Never-ending growth and adaptation" }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lioner-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-lioner-gold">
            Leadership by Design
          </h2>
          <p className="text-2xl lg:text-3xl text-neutral-gray leading-relaxed font-medium">
            "Peak performance is achieved through the alignment of mind, body, and wealth. 
            We set a new standard for leadership where excellence, alignment, and resilience 
            are the defining characteristics."
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {values.map((value, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-xl font-semibold text-lioner-gold">
                  {value.title}
                </h4>
                <p className="text-neutral-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
