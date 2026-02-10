import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { CorporateAuditDialog } from "./CorporateAuditDialog";

export const CorporateAuditCTASection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section id="audit" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-lioner-gold/30 rounded-none">
            <AlertTriangle className="w-5 h-5 text-lioner-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
              Corporate Discipline Audit
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans leading-tight">
            Is your team an asset<br className="hidden md:block" /> or a liability?
          </h2>

          <p className="text-lg md:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto">
            Audit them in 2 minutes. Get a score. Get the truth.
          </p>

          <p className="text-sm text-foreground/50 mb-10">
            7 questions. No fluff. Immediate verdict.
          </p>

          <Button
            size="lg"
            onClick={() => setIsDialogOpen(true)}
            className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all"
          >
            Start The Audit
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-xs mt-4 text-foreground/40 uppercase tracking-wide">
            Warning: The truth doesn't care about your feelings.
          </p>
        </div>
      </section>

      <CorporateAuditDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
