import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoWhite from "@/assets/logo-white.png";

// ─── Types ─────────────────────────────────────────────────────────────

type FormData = {
  // Section 1 — Context
  roleAndCompany: string;
  strategicResponsibility: string;
  // Section 2 — Current Pressure
  biggestPressure: string;
  decisionDelay: string;
  absenceImpact: string;
  // Section 3 — Behavior Under Pressure
  problemResponse: string;
  resistanceResponse: string;
  energyLevel: string;
  // Section 4 — Self-Awareness
  blindSpot: string;
  whyFit: string;
  // Section 5 — Decision Question
  unactedTruth: string;
  // Contact
  fullName: string;
  email: string;
  phone: string;
};

const initialForm: FormData = {
  roleAndCompany: "",
  strategicResponsibility: "",
  biggestPressure: "",
  decisionDelay: "",
  absenceImpact: "",
  problemResponse: "",
  resistanceResponse: "",
  energyLevel: "",
  blindSpot: "",
  whyFit: "",
  unactedTruth: "",
  fullName: "",
  email: "",
  phone: "",
};

const STEP_TITLES = [
  "Context",
  "Current Pressure",
  "Behavior Under Pressure",
  "Self-Awareness",
  "The Decision Question",
  "Your Details",
];

const STRATEGIC_OPTIONS = ["Yes", "Partially", "No"];

const PRESSURE_OPTIONS = [
  "Growth vs structure",
  "Team / leadership",
  "Cashflow / financial pressure",
  "Focus / direction",
  "Personal (energy / mental load)",
];

const DELAY_OPTIONS = ["Never", "Sometimes", "Regularly", "Often"];

const ABSENCE_OPTIONS = [
  "It runs as usual",
  "Minor slowdown",
  "Major slowdown",
  "It stops functioning",
];

const PROBLEM_OPTIONS = [
  "I analyze thoroughly before acting",
  "I decide quickly and adjust",
  "I involve others first",
  "I delay until clarity improves",
];

const RESISTANCE_OPTIONS = [
  "Direct confrontation",
  "Dialogue and investigation",
  "Temporary avoidance",
  "I delegate it",
];

const ENERGY_OPTIONS = [
  "High and stable",
  "Fluctuating",
  "Low but functional",
  "Structurally depleted",
];

// ─── Radio Group ───────────────────────────────────────────────────────

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground/90">{label}</Label>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-full text-left px-4 py-3 border rounded-lg transition-all text-sm ${
              value === opt
                ? "border-lioner-gold bg-lioner-gold/10 text-foreground"
                : "border-border/30 text-foreground/70 hover:border-lioner-gold/40"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  value === opt ? "border-lioner-gold" : "border-foreground/30"
                }`}
              >
                {value === opt && (
                  <span className="w-2 h-2 rounded-full bg-lioner-gold" />
                )}
              </span>
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────

export function RoundTableApplicationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep(0);
        setForm({ ...initialForm });
        setSubmitted(false);
        setDirection(1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return !!(form.roleAndCompany && form.strategicResponsibility);
      case 1:
        return !!(form.biggestPressure && form.decisionDelay && form.absenceImpact);
      case 2:
        return !!(form.problemResponse && form.resistanceResponse && form.energyLevel);
      case 3:
        return !!(form.blindSpot.trim() && form.whyFit.trim());
      case 4:
        return !!form.unactedTruth.trim();
      case 5:
        return !!(form.fullName && form.email && emailValid);
      default:
        return false;
    }
  };

  const next = () => {
    if (!canAdvance()) return;
    if (step < 5) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canAdvance()) return;
    setSubmitting(true);

    try {
      // Split name for GHL
      const nameParts = form.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Send to GHL via edge function
      await supabase.functions.invoke("send-to-ghl", {
        body: {
          first_name: firstName,
          last_name: lastName,
          email: form.email,
          phone: form.phone || "",
          source: "round_table_application",
          tags: ["round-table-application"],
          custom_fields: {
            role_and_company: form.roleAndCompany,
            strategic_responsibility: form.strategicResponsibility,
            biggest_pressure: form.biggestPressure,
            decision_delay: form.decisionDelay,
            absence_impact: form.absenceImpact,
            problem_response: form.problemResponse,
            resistance_response: form.resistanceResponse,
            energy_level: form.energyLevel,
            blind_spot: form.blindSpot,
            why_fit: form.whyFit,
            unacted_truth: form.unactedTruth,
          },
        },
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Round Table submission error:", err);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEP_TITLES.length) * 100;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  // ─── Step renderers ────────────────────────────────────────────────

  const renderStep0 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-foreground/90">
          What is your current role and company size (team + revenue range)?
        </Label>
        <Textarea
          value={form.roleAndCompany}
          onChange={(e) => update("roleAndCompany", e.target.value)}
          placeholder="e.g. CEO, 45 employees, €8M annual revenue"
          className="mt-2 bg-background/50 border-border/30"
          rows={3}
        />
      </div>
      <RadioGroup
        label="Are you ultimately responsible for strategic decisions?"
        options={STRATEGIC_OPTIONS}
        value={form.strategicResponsibility}
        onChange={(v) => update("strategicResponsibility", v)}
      />
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <RadioGroup
        label="Where is the biggest pressure in your company right now?"
        options={PRESSURE_OPTIONS}
        value={form.biggestPressure}
        onChange={(v) => update("biggestPressure", v)}
      />
      <RadioGroup
        label="How often do you delay decisions you know you should make?"
        options={DELAY_OPTIONS}
        value={form.decisionDelay}
        onChange={(v) => update("decisionDelay", v)}
      />
      <RadioGroup
        label="What happens to your company if you are absent for 30 days?"
        options={ABSENCE_OPTIONS}
        value={form.absenceImpact}
        onChange={(v) => update("absenceImpact", v)}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <RadioGroup
        label="When a serious problem occurs, what is your default response?"
        options={PROBLEM_OPTIONS}
        value={form.problemResponse}
        onChange={(v) => update("problemResponse", v)}
      />
      <RadioGroup
        label="How do you respond to resistance within your team?"
        options={RESISTANCE_OPTIONS}
        value={form.resistanceResponse}
        onChange={(v) => update("resistanceResponse", v)}
      />
      <RadioGroup
        label="How would you describe your current energy level?"
        options={ENERGY_OPTIONS}
        value={form.energyLevel}
        onChange={(v) => update("energyLevel", v)}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-foreground/90">
          What is your biggest blind spot right now?
        </Label>
        <Textarea
          value={form.blindSpot}
          onChange={(e) => update("blindSpot", e.target.value)}
          placeholder="Be honest. This is for you."
          className="mt-2 bg-background/50 border-border/30"
          rows={4}
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground/90">
          Why do you believe you are a fit for this Round Table?
        </Label>
        <Textarea
          value={form.whyFit}
          onChange={(e) => update("whyFit", e.target.value)}
          placeholder="What do you bring to the table?"
          className="mt-2 bg-background/50 border-border/30"
          rows={4}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="p-4 border border-lioner-gold/30 rounded-lg bg-lioner-gold/5">
        <p className="text-sm text-foreground/60 italic mb-2">
          This table is not for everyone.
        </p>
        <p className="text-sm font-medium text-foreground/90">
          Why should you be invited?
        </p>
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground/90">
          What is a truth about your company or yourself that you know, but have not acted on yet?
        </Label>
        <Textarea
          value={form.unactedTruth}
          onChange={(e) => update("unactedTruth", e.target.value)}
          placeholder="The answer you've been avoiding."
          className="mt-2 bg-background/50 border-border/30"
          rows={5}
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium text-foreground/90">Full Name</Label>
        <Input
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Your full name"
          className="mt-1 bg-background/50 border-border/30"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground/90">Email</Label>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
          className="mt-1 bg-background/50 border-border/30"
        />
        {form.email && !emailValid && (
          <p className="text-xs text-destructive mt-1">Please enter a valid email</p>
        )}
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground/90">Phone (optional)</Label>
        <Input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+31 6 1234 5678"
          className="mt-1 bg-background/50 border-border/30"
        />
      </div>
    </div>
  );

  const renderSubmitted = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 space-y-6"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-lioner-gold/20 flex items-center justify-center">
        <Check className="w-8 h-8 text-lioner-gold" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        Application Received
      </h3>
      <div className="space-y-3 text-sm text-foreground/70 max-w-sm mx-auto">
        <p>
          Thank you for your application.
        </p>
        <p>
          Each request is reviewed manually to ensure the right composition at the table.
        </p>
        <p>
          If selected, you will receive a personal invitation with details.
        </p>
        <p className="text-foreground/50 italic">
          If not, we will not proceed further at this stage.
        </p>
      </div>
      <button
        onClick={() => onOpenChange(false)}
        className="mt-4 px-8 py-3 bg-lioner-gold text-white text-sm font-semibold uppercase tracking-widest hover:bg-lioner-gold/90 transition-colors"
      >
        Close
      </button>
    </motion.div>
  );

  const steps = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] p-0 bg-card border-border/30 rounded-2xl overflow-hidden max-h-[90vh]">
        <DialogTitle className="sr-only">Round Table Application</DialogTitle>

        {/* Header */}
        <div className="relative bg-gradient-to-b from-background to-card px-6 pt-6 pb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoWhite} alt="Leaders Performance" className="h-6 opacity-80" />
          </div>
          {!submitted && (
            <>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                The Round Table — Application
              </h2>
              <p className="text-xs text-foreground/50 mb-3">
                {STEP_TITLES[step]} · Step {step + 1} of {STEP_TITLES.length}
              </p>
              <Progress value={progress} className="h-1 bg-border/20" />
            </>
          )}
        </div>

        {/* Body */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[60vh]">
          {submitted ? (
            renderSubmitted()
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                {steps[step]()}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer navigation */}
        {!submitted && (
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 5 ? (
              <button
                onClick={next}
                disabled={!canAdvance()}
                className="flex items-center gap-1 px-6 py-2.5 bg-lioner-gold text-white text-sm font-semibold uppercase tracking-wider hover:bg-lioner-gold/90 disabled:opacity-40 transition-colors"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance() || submitting}
                className="flex items-center gap-1 px-6 py-2.5 bg-lioner-gold text-white text-sm font-semibold uppercase tracking-wider hover:bg-lioner-gold/90 disabled:opacity-40 transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
