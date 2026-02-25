import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookedSlots } from "@/hooks/useBookedSlots";
import { X, ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoWhite from "@/assets/logo-white.png";

// ─── Country list ──────────────────────────────────────────────────────
const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia","Ethiopia",
  "Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Guatemala",
  "Guinea","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Madagascar","Malaysia","Maldives","Mali",
  "Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique",
  "Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway",
  "Oman","Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia",
  "Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const INCOME_LEVELS = [
  "€50K – €100K",
  "€100K – €250K",
  "€250K – €500K",
  "€500K – €1M",
  "€1M+",
];

const COMMITMENT_LEVELS = [
  "I'm exploring options",
  "I'm ready to commit within 30 days",
  "I'm ready to start immediately",
  "I need more information first",
];

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  email: string;
  country: string;
  professionalArena: string;
  incomeLevel: string;
  impossibleTarget: string;
  lackOfDiscipline: string;
  pastAttempts: string;
  costOfInaction: string;
  whyMentor: string;
  investmentReady: string;
  willingToBeWrong: string;
  commitmentLevel: string;
  bookingDate: Date | null;
  bookingTime: string;
};

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  company: "",
  position: "",
  email: "",
  country: "",
  professionalArena: "",
  incomeLevel: "",
  impossibleTarget: "",
  lackOfDiscipline: "",
  pastAttempts: "",
  costOfInaction: "",
  whyMentor: "",
  investmentReady: "",
  willingToBeWrong: "",
  commitmentLevel: "",
  bookingDate: null,
  bookingTime: "",
};

const STEP_TITLES = [
  "Contact Information",
  "Reality Check",
  "The Gap",
  "Commitment",
  "Book Strategy Call",
];

// Morning: 09:00–12:00, Afternoon: 03:00–05:00 (30-min slots, Dubai/GST)
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

const isWeekday = (date: Date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

export function MentorshipApplicationDialog({
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
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);
  const { bookedSlots12h, isLoading: slotsLoading } = useBookedSlots(form.bookingDate);
  const filteredCountries = useMemo(
    () => COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())),
    [countrySearch]
  );

  // Close country dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Reset on close
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

  const update = (field: keyof FormData, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return !!(form.firstName && form.lastName && form.company && form.position && form.email && form.country && emailValid);
      case 1:
        return !!(form.professionalArena && form.incomeLevel && form.impossibleTarget);
      case 2:
        return !!(form.lackOfDiscipline && form.pastAttempts && form.costOfInaction);
      case 3:
        return !!(form.whyMentor && form.investmentReady && form.willingToBeWrong && form.commitmentLevel);
      case 4:
        return !!(form.bookingDate && form.bookingTime);
      default:
        return false;
    }
  };

  const next = () => {
    if (!canAdvance()) return;

    // Auto-disqualify at step 3
    if (step === 3) {
      if (form.investmentReady === "no" || form.willingToBeWrong === "no") {
        toast({
          title: "Thank you for your honesty",
          description: "This mentorship requires full commitment and openness to change. We encourage you to revisit when you're ready.",
        });
        onOpenChange(false);
        return;
      }
    }

    if (step < 4) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const submit = async () => {
    if (!canAdvance() || submitting) return;
    setSubmitting(true);

    try {
      // Format date + time as MM-DD-YYYY HH:MM AM/PM
      const d = form.bookingDate!;
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const year = d.getFullYear();
      const bookingDateTime = `${month}-${day}-${year} ${form.bookingTime}`;

      const { data, error } = await supabase.functions.invoke("submit-application", {
        body: {
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          position: form.position,
          country: form.country,
          email: form.email,
          professionalArena: form.professionalArena,
          incomeLevel: form.incomeLevel,
          impossibleTarget: form.impossibleTarget,
          lackOfDiscipline: form.lackOfDiscipline,
          pastAttempts: form.pastAttempts,
          costOfInaction: form.costOfInaction,
          whyMentor: form.whyMentor,
          investmentReady: form.investmentReady,
          willingToBeWrong: form.willingToBeWrong,
          commitmentLevel: form.commitmentLevel,
          bookingDateTime,
        },
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Calendar generation ──────────────────────────────────────────────
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const calDays = useMemo(() => {
    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: { date: Date; disabled: boolean; outside: boolean }[] = [];

    // Padding days from previous month
    for (let i = 0; i < firstDay; i++) {
      const d = new Date(year, month, -firstDay + i + 1);
      days.push({ date: d, disabled: true, outside: true });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const disabled = date < today || !isWeekday(date);
      days.push({ date, disabled, outside: false });
    }

    // Padding days for next month
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        days.push({ date: d, disabled: true, outside: true });
      }
    }

    return days;
  }, [calMonth]);

  const isSameDay = (a: Date, b: Date | null) =>
    b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  // ─── Step renderers ───────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground/70 text-xs uppercase tracking-wider">First Name *</Label>
                <Input value={form.firstName} onChange={e => update("firstName", e.target.value)} className="mt-1 bg-foreground/5 border-foreground/10" />
              </div>
              <div>
                <Label className="text-foreground/70 text-xs uppercase tracking-wider">Last Name *</Label>
                <Input value={form.lastName} onChange={e => update("lastName", e.target.value)} className="mt-1 bg-foreground/5 border-foreground/10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground/70 text-xs uppercase tracking-wider">Company *</Label>
                <Input value={form.company} onChange={e => update("company", e.target.value)} className="mt-1 bg-foreground/5 border-foreground/10" />
              </div>
              <div>
                <Label className="text-foreground/70 text-xs uppercase tracking-wider">Position *</Label>
                <Input value={form.position} onChange={e => update("position", e.target.value)} className="mt-1 bg-foreground/5 border-foreground/10" />
              </div>
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Email *</Label>
              <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} className={`mt-1 bg-foreground/5 border-foreground/10 ${form.email && !emailValid ? "border-red-500" : ""}`} />
              {form.email && !emailValid && <p className="text-red-500 text-xs mt-1">Please enter a valid email</p>}
            </div>
            <div ref={countryRef} className="relative">
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Country *</Label>
              <Input
                value={countryOpen ? countrySearch : form.country}
                onChange={e => { setCountrySearch(e.target.value); setCountryOpen(true); }}
                onFocus={() => { setCountryOpen(true); setCountrySearch(form.country); }}
                placeholder="Search country..."
                className="mt-1 bg-foreground/5 border-foreground/10"
              />
              {countryOpen && (
                <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-background border border-foreground/10 rounded-md shadow-lg">
                  {filteredCountries.map(c => (
                    <button
                      key={c}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-foreground/5 transition-colors"
                      onClick={() => { update("country", c); setCountryOpen(false); setCountrySearch(""); }}
                    >
                      {c}
                    </button>
                  ))}
                  {filteredCountries.length === 0 && <p className="px-3 py-2 text-sm text-muted-foreground">No results</p>}
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">What is your professional arena? *</Label>
              <Input value={form.professionalArena} onChange={e => update("professionalArena", e.target.value)} className="mt-1 bg-foreground/5 border-foreground/10" placeholder="e.g., Tech, Real Estate, Finance..." />
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Current income bracket *</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {INCOME_LEVELS.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => update("incomeLevel", level)}
                    className={`text-left px-4 py-3 text-sm border transition-colors rounded ${form.incomeLevel === level ? "border-lioner-gold bg-lioner-gold/10 text-foreground" : "border-foreground/10 hover:border-foreground/30 text-foreground/70"}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">What's your impossible target? *</Label>
              <textarea
                value={form.impossibleTarget}
                onChange={e => update("impossibleTarget", e.target.value)}
                className="mt-1 w-full bg-foreground/5 border border-foreground/10 rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="The goal that feels unreachable..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Where does discipline break down? *</Label>
              <textarea
                value={form.lackOfDiscipline}
                onChange={e => update("lackOfDiscipline", e.target.value)}
                className="mt-1 w-full bg-foreground/5 border border-foreground/10 rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">What have you tried before? *</Label>
              <textarea
                value={form.pastAttempts}
                onChange={e => update("pastAttempts", e.target.value)}
                className="mt-1 w-full bg-foreground/5 border border-foreground/10 rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">What does inaction cost you? *</Label>
              <textarea
                value={form.costOfInaction}
                onChange={e => update("costOfInaction", e.target.value)}
                className="mt-1 w-full bg-foreground/5 border border-foreground/10 rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Why do you want a mentor? *</Label>
              <textarea
                value={form.whyMentor}
                onChange={e => update("whyMentor", e.target.value)}
                className="mt-1 w-full bg-foreground/5 border border-foreground/10 rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Are you ready to invest in yourself? *</Label>
              <div className="flex gap-3 mt-2">
                {["yes", "no"].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => update("investmentReady", val)}
                    className={`flex-1 px-4 py-3 text-sm border transition-colors rounded capitalize ${form.investmentReady === val ? "border-lioner-gold bg-lioner-gold/10 text-foreground" : "border-foreground/10 hover:border-foreground/30 text-foreground/70"}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Are you willing to be told you're wrong? *</Label>
              <div className="flex gap-3 mt-2">
                {["yes", "no"].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => update("willingToBeWrong", val)}
                    className={`flex-1 px-4 py-3 text-sm border transition-colors rounded capitalize ${form.willingToBeWrong === val ? "border-lioner-gold bg-lioner-gold/10 text-foreground" : "border-foreground/10 hover:border-foreground/30 text-foreground/70"}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider">Your commitment level *</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {COMMITMENT_LEVELS.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => update("commitmentLevel", level)}
                    className={`text-left px-4 py-3 text-sm border transition-colors rounded ${form.commitmentLevel === level ? "border-lioner-gold bg-lioner-gold/10 text-foreground" : "border-foreground/10 hover:border-foreground/30 text-foreground/70"}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            {/* Calendar */}
            <div>
              <Label className="text-foreground/70 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Select a Date (Weekdays Only)
              </Label>
              <div className="border border-foreground/10 rounded-md p-3 bg-foreground/5">
                <div className="flex items-center justify-between mb-3">
                  <button type="button" onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))} className="p-1 hover:bg-foreground/10 rounded">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium">
                    {calMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <button type="button" onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))} className="p-1 hover:bg-foreground/10 rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-xs text-muted-foreground py-1">{d}</div>
                  ))}
                  {calDays.map(({ date, disabled, outside }, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={disabled}
                      onClick={() => update("bookingDate", date)}
                      className={`py-1.5 text-xs rounded transition-colors ${outside ? "text-muted-foreground/30" : disabled ? "text-muted-foreground/40 cursor-not-allowed" : isSameDay(date, form.bookingDate) ? "bg-lioner-gold text-white font-semibold" : "hover:bg-foreground/10 text-foreground"}`}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time slots */}
            {form.bookingDate && (
              <div>
                <Label className="text-foreground/70 text-xs uppercase tracking-wider mb-2 block">
                  Select a Time (Dubai / GST)
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {slotsLoading ? (
                    <div className="col-span-4 text-center py-4 text-xs text-muted-foreground">Loading availability...</div>
                  ) : (
                    TIME_SLOTS.map(slot => {
                      const isBooked = bookedSlots12h.has(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => update("bookingTime", slot)}
                          className={`px-2 py-2 text-xs border rounded transition-colors ${isBooked ? "border-foreground/5 bg-foreground/5 text-muted-foreground/40 cursor-not-allowed line-through" : form.bookingTime === slot ? "border-lioner-gold bg-lioner-gold/10 text-foreground font-medium" : "border-foreground/10 hover:border-foreground/30 text-foreground/70"}`}
                        >
                          {isBooked ? "Booked" : slot}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Summary */}
            {form.bookingDate && form.bookingTime && (
              <div className="bg-lioner-gold/5 border border-lioner-gold/20 rounded-md p-4">
                <p className="text-sm font-medium text-foreground">Your Strategy Call</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {form.bookingDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at {form.bookingTime} (Dubai / GST)
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  // ─── Success screen ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-lioner-gold/20 text-center p-10">
          <DialogTitle className="sr-only">Application Received</DialogTitle>
          <div className="flex flex-col items-center gap-6">
            <img src={logoWhite} alt="Logo" className="w-20 h-auto opacity-80" />
            <div className="w-16 h-16 rounded-full border-2 border-lioner-gold flex items-center justify-center">
              <Check className="w-8 h-8 text-lioner-gold" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-white mb-2">Application Received</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Your application is under review. You will hear from us within 24–48 hours. Only qualified candidates will be contacted for the next step.
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="mt-2 px-8 py-3 bg-lioner-gold hover:bg-lioner-gold/90 text-white text-sm font-semibold uppercase tracking-widest transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-background border-lioner-gold/20 p-0">
        <DialogTitle className="sr-only">Mentorship Application</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-foreground/10">
          <p className="text-xs uppercase tracking-widest text-lioner-gold font-medium mb-1">
            Step {step + 1} of 5
          </p>
          <h2 className="font-serif text-xl text-foreground">{STEP_TITLES[step]}</h2>
          <Progress value={((step + 1) / 5) * 100} className="mt-3 h-1 bg-foreground/10" />
        </div>

        {/* Animated content */}
        <div className="px-6 py-5 min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button onClick={prev} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={next}
              disabled={!canAdvance()}
              className="flex items-center gap-1 px-6 py-2.5 bg-lioner-gold hover:bg-lioner-gold/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!canAdvance() || submitting}
              className="flex items-center gap-1 px-6 py-2.5 bg-lioner-gold hover:bg-lioner-gold/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
