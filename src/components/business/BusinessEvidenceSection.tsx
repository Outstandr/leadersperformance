export const BusinessEvidenceSection = () => {
  const testimonials = [
    {
      quote: "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to be a CEO instead of a manager.",
      author: "James K.",
      role: "Logistics Founder, Dubai",
    },
    {
      quote: "Lionel didn't motivate my team. He scared them straight. Best investment we made.",
      author: "Sarah T.",
      role: "Real Estate Director",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">
            The Evidence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans mt-4 mb-4 text-lioner-gold uppercase">
            Results or Nothing.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-muted/50 border border-lioner-gold/20"
            >
              <div className="text-4xl text-lioner-gold mb-4">"</div>
              <p className="text-lg text-foreground mb-6 leading-relaxed italic">
                {testimonial.quote}
              </p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
