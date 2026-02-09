import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertTriangle } from "lucide-react";

export const BusinessVideoSection = () => {
  return (
    <section className="pt-16 pb-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2.5 border border-lioner-gold/30 bg-lioner-gold/5">
            <AlertTriangle className="w-5 h-5 text-lioner-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
              The Problem
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans leading-tight uppercase">
            The Cost of <span className="text-lioner-gold">Silence.</span>
          </h2>
        </div>

        <AspectRatio ratio={16 / 9}>
          <video
            className="w-full h-full rounded-lg shadow-lg"
            controls
            preload="metadata"
          >
            <source
              src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl//01.What you see is what you get..mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>
    </section>
  );
};
