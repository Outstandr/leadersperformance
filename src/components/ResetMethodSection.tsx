export const ResetMethodSection = () => {
  const resetComponents = [{
    letter: "R",
    title: "Rhythm",
    description: "Daily structure & discipline that creates unstoppable momentum",
    color: "bg-lioner-gold"
  }, {
    letter: "E",
    title: "Energy",
    description: "Vitality optimization through strategic health and performance protocols",
    color: "bg-secondary-blue"
  }, {
    letter: "S",
    title: "Systems",
    description: "Environment design, belief restructuring, and strategic relationship mastery",
    color: "bg-secondary-purple"
  }, {
    letter: "E",
    title: "Execution",
    description: "Turning strategy into measurable results through leadership in practice",
    color: "bg-lioner-gold"
  }, {
    letter: "T",
    title: "Tracking",
    description: "Measuring progress and maintaining accountability for sustainable excellence",
    color: "bg-secondary-blue"
  }];
  return <section className="py-20 lg:py-32 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-lioner-blue">
            The RESET Blueprint®
          </h2>
          <p className="text-xl text-secondary-purple">
            The proven 5-step system for High Performance leadership mastery
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {resetComponents.map((component, index) => <div key={index} className="space-y-4 text-center">
              <div className={`${component.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto`}>
                <span className="text-white text-3xl font-bold">{component.letter}</span>
              </div>
              <h4 className="text-xl font-semibold text-lioner-blue">{component.title}</h4>
              <p className="text-secondary-purple leading-relaxed">
                {component.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};