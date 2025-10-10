import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const EcosystemSection = () => {
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsDark(rect.top <= 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const steps = [{
    number: "1",
    title: "RESET Book Series",
    description: "Begin your transformation with the foundational knowledge that has helped thousands of leaders achieve breakthrough results. The RESET methodology provides a comprehensive framework for understanding High Performance leadership, combining proven principles with practical strategies you can implement immediately. Start your journey with clarity and purpose.",
    action: 'Start with "Reset by Discipline"',
    color: "bg-lioner-gold"
  }, {
    number: "2",
    title: "Elite Masterclass Series",
    description: "Take your leadership to the next level with intensive, focused training sessions. Each 25-30 minute masterclass delivers deep-dive insights into specific pillars of High Performance, complete with actionable frameworks, real-world case studies, and step-by-step implementation guides designed for busy executives. Perfect for leaders who want focused expertise.",
    action: "25-30 minute intensive sessions",
    color: "bg-secondary-blue"
  }, {
    number: "3",
    title: "Leaders Performance Academy",
    description: "Experience the complete transformation system with comprehensive training modules, ongoing coaching support, and access to an exclusive community of high-achieving leaders. The Academy provides structured pathways, accountability systems, and continuous learning resources to ensure lasting change and measurable results. Join a community of excellence.",
    action: "Full transformation program",
    color: "bg-secondary-purple"
  }, {
    number: "4",
    title: "Leaders Performance Elite",
    description: "Gain direct access to Lionel's private mentorship program designed exclusively for C-suite executives and business owners ready for extraordinary results. This premium offering includes one-on-one strategic sessions, personalized performance protocols, and priority support for leaders committed to achieving elite status. Reserved for those who demand the best.",
    action: "Exclusive access • Limited availability",
    color: "bg-lioner-gold"
  }];
  return <section 
      ref={sectionRef}
      id="programs" 
      className={`py-10 lg:py-16 transition-colors duration-500 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className={`text-lg font-medium uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold mb-4">
              Your Path to Elite Leadership
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>
              Choose your entry point into the Leaders Performance ecosystem
            </p>
            <Button size="lg" className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto mt-6 group transition-all border-2 border-transparent">
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Carousel */}
          <div className="relative px-8 md:px-16">
            <Carousel opts={{
              align: "center",
              loop: true
            }} className="w-full">
              <CarouselContent className="-ml-4">
                {steps.map((step, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-2/3 lg:basis-5/12">
                    <div className="flex flex-col h-full shadow-2xl">
                      {/* Image Placeholder */}
                      <div className="aspect-[4/3] bg-muted overflow-hidden">
                        {/* Placeholder for image */}
                      </div>
                      
                      {/* Gold Header Section with Number and Title */}
                      <div className="bg-white border-2 border-lioner-gold p-6">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold bg-lioner-gold text-white shrink-0">
                            {step.number.padStart(2, '0')}
                          </div>
                          <h3 className="text-xl font-sans font-medium text-lioner-gold">
                            {step.title.split(/( Elite| Series)/).map((part, i) => 
                              part === ' Elite' || part === ' Series' ? <><br />{part.trim()}</> : part
                            )}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className={`p-6 flex-grow flex flex-col transition-colors duration-500 ${
                        isDark ? 'bg-black border-2 border-lioner-gold border-t-0' : 'bg-white border border-border border-t-0'
                      }`}>
                        <p className={`text-sm leading-relaxed mb-4 transition-colors duration-500 ${isDark ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {step.description}
                        </p>
                        <p className="text-xs font-medium text-lioner-gold mb-4">
                          {step.action}
                        </p>
                        
                        {/* CTA Button */}
                        <Button 
                          variant="outline" 
                          className={`rounded-none mt-auto transition-all duration-300 px-6 py-2 text-sm ${
                            isDark 
                              ? 'border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-black' 
                              : 'border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white'
                          }`}
                        >
                          Discover More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className={`-left-4 md:-left-6 bg-lioner-gold border-0 h-12 w-12 text-white hover:text-lioner-gold hover:border-2 hover:border-lioner-gold transition-colors duration-300 ${isDark ? 'hover:bg-black' : 'hover:bg-white'}`} />
              <CarouselNext className={`-right-4 md:-right-6 bg-lioner-gold border-0 h-12 w-12 text-white hover:text-lioner-gold hover:border-2 hover:border-lioner-gold transition-colors duration-300 ${isDark ? 'hover:bg-black' : 'hover:bg-white'}`} />
            </Carousel>
          </div>
        </div>
      </div>
    </section>;
};