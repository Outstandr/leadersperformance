import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import resetSeriesImage from "@/assets/reset-series.jpg";
import eliteMasterclassImage from "@/assets/the-masterclass.jpg";
import eliteAcademyImage from "@/assets/the-elite-academy-2.jpg";
import academyImage from "@/assets/the-academy-2.jpg";
export const EcosystemSection = () => {
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
  return <section id="programs" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-lg font-medium uppercase text-muted-foreground">Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold mb-4">
              Your Path to Elite Leadership
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">Choose your entry point into the Leaders Performance ecosystem.</p>
            <Button size="lg" className="font-medium rounded-none px-7 py-3.5 h-auto mt-6 group transition-all border-2 bg-[hsl(var(--lioner-gold))] text-white hover:bg-white hover:text-[hsl(var(--lioner-gold))] border-[hsl(var(--lioner-gold))]">
              Take Free Assessment
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
                {steps.map((step, index) => <CarouselItem key={index} className="pl-4 md:basis-2/3 lg:basis-5/12">
                    <div className="flex flex-col h-full shadow-2xl">
                      {/* Image */}
                      <div className="aspect-[4/3] bg-muted overflow-hidden">
                        {step.number === "1" && <img src={resetSeriesImage} alt="RESET Book Series - Reset by Discipline and Reset Your Addiction" className="w-full h-full object-cover object-center brightness-125" />}
                        {step.number === "2" && <img src={eliteMasterclassImage} alt="Elite Masterclass Series - High Performance Leadership Training" className="w-full h-full object-cover object-center brightness-125" />}
                        {step.number === "3" && <img src={academyImage} alt="Leaders Performance Academy - Complete Transformation System" className="w-full h-full object-cover object-center brightness-125" />}
                        {step.number === "4" && <img src={eliteAcademyImage} alt="Leaders Performance Elite - Exclusive Executive Mentorship" className="w-full h-full object-cover object-center brightness-125" />}
                      </div>
                      
                      {/* Gold Header Section with Number and Title */}
                      <div className="bg-[hsl(var(--lioner-gold))] p-6">
                        <h3 className="text-xl font-sans font-medium text-white text-left px-[5px]">
                          <span className="font-normal">{step.number.padStart(2, '0')}</span>
                          <span className="mx-2">•</span>
                          {step.title === "Elite Masterclass Series" ? <>Elite Masterclass<br />Series</> : step.title === "RESET Book Series" ? <>RESET Book<br />Series</> : step.title === "Leaders Performance Elite" ? <>Leaders Performance<br />Elite</> : step.title}
                        </h3>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col bg-white">
                        <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                          {step.description}
                        </p>
                        <p className="text-xs font-medium text-lioner-gold mb-4">
                          {step.action}
                        </p>
                        
                        {/* CTA Button */}
                        <Button className="rounded-none mt-auto transition-all duration-300 px-6 py-2 text-sm border-2 bg-[hsl(var(--lioner-gold))] text-white hover:bg-white hover:text-[hsl(var(--lioner-gold))] border-[hsl(var(--lioner-gold))]">
                          Discover More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              {/* All viewports: centered at bottom */}
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 bg-lioner-gold border-0 h-12 w-12 text-white hover:text-lioner-gold hover:border-2 hover:border-lioner-gold hover:bg-black transition-colors duration-300" />
                <CarouselNext className="static translate-y-0 bg-lioner-gold border-0 h-12 w-12 text-white hover:text-lioner-gold hover:border-2 hover:border-lioner-gold hover:bg-black transition-colors duration-300" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>;
};