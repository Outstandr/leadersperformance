import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoWhite from "@/assets/logo-white.png";

type FormData = {
  roleAndCompany: string;
  strategicResponsibility: string;
  biggestPressure: string;
  decisionDelay: string;
  absenceImpact: string;
  problemResponse: string;
  resistanceResponse: string;
  energyLevel: string;
  blindSpot: string;
  whyFit: string;
  unactedTruth: string;
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

const RoundTable = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      await supabase.functions.invoke("roundtable-followup", {
        body: {
          action: "submit",
          formData: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone || "",
            roleAndCompany: form.roleAndCompany,
            strategicResponsibility: form.strategicResponsibility,
            biggestPressure: form.biggestPressure,
            decisionDelay: form.decisionDelay,
            absenceImpact: form.absenceImpact,
            problemResponse: form.problemResponse,
            resistanceResponse: form.resistanceResponse,
            energyLevel: form.energyLevel,
            blindSpot: form.blindSpot,
            whyFit: form.whyFit,
            unactedTruth: form.unactedTruth,
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

  const steps = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border/20 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img
            src={logoWhite}
            alt="Leaders Performance"
            className="h-6 opacity-80 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-lg">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-lioner-gold/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-lioner-gold" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Application Received
              </h3>
              <div className="space-y-3 text-sm text-foreground/70 max-w-sm mx-auto">
                <p>Thank you for your application.</p>
                <p>Each request is reviewed manually to ensure the right composition at the table.</p>
                <p>If selected, you will receive a personal invitation with details.</p>
                <p className="text-foreground/50 italic">
                  If not, we will not proceed further at this stage.
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-8 py-3 bg-lioner-gold text-white text-sm font-semibold uppercase tracking-widest hover:bg-lioner-gold/90 transition-colors"
              >
                Return Home
              </button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                  The Round Table — Application
                </h1>
                <p className="text-sm text-foreground/50 mb-4">
                  {STEP_TITLES[step]} — Step {step + 1} of {STEP_TITLES.length}
                </p>
                <Progress value={progress} className="h-1 bg-border/20" />
              </div>

              {/* Form steps */}
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

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-3">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundTable;
