import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BusinessVideoSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
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
