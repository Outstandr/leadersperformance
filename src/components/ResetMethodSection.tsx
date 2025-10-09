import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import rhythmImage from "@/assets/rhythm-card.jpg";
import energyImage from "@/assets/energy-card.jpg";
import systemsImage from "@/assets/systems-card.jpg";
import executionImage from "@/assets/execution-card.jpg";
import trackingImage from "@/assets/tracking-card.jpg";
export const ResetMethodSection = () => {
  const resetComponents = [{
    letter: "R",
    title: "Rhythm",
    description: "Daily structure & discipline that creates unstoppable momentum",
    image: rhythmImage
  }, {
    letter: "E",
    title: "Energy",
    description: "Vitality optimization through strategic health and performance protocols",
    image: energyImage
  }, {
    letter: "S",
    title: "Systems",
    description: "Environment design, belief restructuring, and strategic relationship mastery",
    image: systemsImage
  }, {
    letter: "E",
    title: "Execution",
    description: "Turning strategy into measurable results through leadership in practice",
    image: executionImage
  }, {
    letter: "T",
    title: "Tracking",
    description: "Measuring progress and maintaining accountability for sustainable excellence",
    image: trackingImage
  }];
  return <section id="reset" className="py-10 lg:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              
              <span className="text-lg text-[#404473] font-medium uppercase">Educational Tools</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold max-w-4xl mx-auto leading-tight">
              Reliable expertise to drive your greatest success
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative px-8 md:px-16">
            <Carousel opts={{
            align: "center",
            loop: true
          }} className="w-full">
              <CarouselContent className="-ml-4">
                {resetComponents.map((component, index) => <CarouselItem key={index} className="pl-4 md:basis-3/4 lg:basis-2/3">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl">
                      <img src={component.image} alt={component.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3">
                          {component.title}
                        </h3>
                        <p className="text-base md:text-lg text-white/90 max-w-xl">
                          {component.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-6 bg-[#404473] hover:bg-[#b39758] text-white border-0 h-12 w-12" />
              <CarouselNext className="-right-4 md:-right-6 bg-[#404473] hover:bg-[#b39758] text-white border-0 h-12 w-12" />
            </Carousel>
          </div>
        </div>
    </section>;
};