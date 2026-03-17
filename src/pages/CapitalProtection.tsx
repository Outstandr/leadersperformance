import { useState, useEffect } from "react";
import { CapitalProtectionDialog } from "@/components/capital-protection/CapitalProtectionDialog";

const CapitalProtection = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Auto-open on mount
    setOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <CapitalProtectionDialog open={open} onOpenChange={setOpen} />
      {!open && (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Capital Protection Assessment</h1>
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-3 bg-lioner-gold text-white font-bold uppercase tracking-wider hover:bg-lioner-gold/90 transition-colors"
          >
            Start Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default CapitalProtection;
