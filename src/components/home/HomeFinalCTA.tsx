import { Button } from "@/components/ui/button";

export const HomeFinalCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
          Clarity is a decision.
        </h2>
        <p className="mt-6 text-base text-background/60 max-w-xl mx-auto">
          Applications are currently open for upcoming UNMASKED editions and Advisory partnerships.
        </p>
        <div className="mt-10">
          <Button className="bg-lioner-gold hover:bg-lioner-gold/90 text-background rounded-full px-10 py-3 h-auto text-sm font-medium">
            Begin the Application
          </Button>
        </div>
      </div>
    </section>
  );
};
