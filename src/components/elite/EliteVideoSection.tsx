import { AspectRatio } from "@/components/ui/aspect-ratio";

export const EliteVideoSection = () => {
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
              src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl//High ticket Choice 02.mov"
              type="video/quicktime"
            />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>
    </section>
  );
};
