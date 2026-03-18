import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CapitalAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CapitalAssessmentDialog({ open, onOpenChange }: CapitalAssessmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 rounded-none border-none">
        <div className="p-10 text-center">
          <p className="text-muted-foreground">Capital Assessment coming soon.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
