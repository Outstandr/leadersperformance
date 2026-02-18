import { AspectRatio } from "@/components/ui/aspect-ratio";
import videoThumbnail from "@/assets/lioneltwo.png";

export const BusinessVideoSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <AspectRatio ratio={16 / 9}>
          <video
            className="w-full h-full rounded-lg shadow-lg"
            controls
            preload="none"
            poster={videoThumbnail}
          >
            <source
              src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl/01.What%20you%20see%20is%20what%20you%20get..mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>
    </section>
  );
};
