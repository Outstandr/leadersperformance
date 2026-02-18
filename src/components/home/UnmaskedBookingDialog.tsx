import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface UnmaskedBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TIME_SLOTS = [
  { label: "10:00 AM", value: "10:00", period: "Morning" },
  { label: "11:00 AM", value: "11:00", period: "Morning" },
  { label: "12:00 PM", value: "12:00", period: "Morning" },
  { label: "3:00 PM", value: "15:00", period: "Afternoon" },
  { label: "4:00 PM", value: "16:00", period: "Afternoon" },
  { label: "5:00 PM", value: "17:00", period: "Afternoon" },
];

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(50),
  lastName: z.string().trim().min(1, "Required").max(50),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
});

const ui = {
  en: {
    title: "Reserve Your UNMASKED Session",
    subtitle: "4-day private desert reset — limited to 2–4 participants",
    step1: "Your Details",
    step2: "Select Date & Time",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    firstNamePh: "John",
    lastNamePh: "Doe",
    emailPh: "you@example.com",
    phonePh: "+971 50 123 4567",
    pickDate: "Pick a date",
    morning: "Morning",
    afternoon: "Afternoon",
    timezone: "All times in Dubai time (UTC+4)",
    next: "Continue",
    confirm: "Confirm Booking",
    confirming: "Confirming...",
    successTitle: "You're booked in.",
    successBody: "We'll reach out within 24 hours to confirm your UNMASKED session and share preparation details.",
    successCta: "Close",
    notice: "Application subject to availability. We'll confirm within 24 hours.",
  },
  nl: {
    title: "Reserveer jouw UNMASKED sessie",
    subtitle: "4-daagse privé woestijn reset — beperkt tot 2–4 deelnemers",
    step1: "Jouw gegevens",
    step2: "Selecteer datum & tijd",
    firstName: "Voornaam",
    lastName: "Achternaam",
    email: "E-mail",
    phone: "Telefoon",
    firstNamePh: "Jan",
    lastNamePh: "Jansen",
    emailPh: "jij@voorbeeld.com",
    phonePh: "+31 6 1234 5678",
    pickDate: "Kies een datum",
    morning: "Ochtend",
    afternoon: "Middag",
    timezone: "Alle tijden in Dubai-tijd (UTC+4)",
    next: "Verder",
    confirm: "Bevestig boeking",
    confirming: "Bevestigen...",
    successTitle: "Je bent ingepland.",
    successBody: "We nemen binnen 24 uur contact op om je UNMASKED sessie te bevestigen en voorbereidingsdetails te delen.",
    successCta: "Sluiten",
    notice: "Aanmelding onder voorbehoud van beschikbaarheid. We bevestigen binnen 24 uur.",
  },
};

export function UnmaskedBookingDialog({ open, onOpenChange }: UnmaskedBookingDialogProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const { toast } = useToast();

  const [step, setStep] = useState<"details" | "datetime" | "success">("details");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = (field: string) => {
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleDetailsNext = () => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.errors.forEach((e) => { if (e.path[0]) errs[e.path[0] as string] = e.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("datetime");
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) {
      toast({ title: "Please select a date and time slot", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const dateTime = `${dateStr}T${selectedSlot}:00`;

      const { error } = await supabase.functions.invoke("unmasked-booking", {
        body: {
          ...formData,
          dateTime,
          timeSlot: selectedSlot,
        },
      });

      if (error) throw error;
      setStep("success");
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("details");
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      setSelectedDate(undefined);
      setSelectedSlot("");
      setErrors({});
    }, 300);
  };

  const tomorrow = addDays(startOfDay(new Date()), 1);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-background border border-lioner-gold/20">
        {/* Header */}
        <div className="bg-foreground text-background px-8 py-7">
          <div className="text-xs uppercase tracking-[0.2em] text-lioner-gold font-semibold mb-2">
            UNMASKED · Private Desert Reset
          </div>
          <h2 className="text-2xl font-bold leading-tight">{t.title}</h2>
          <p className="mt-1 text-background/60 text-sm">{t.subtitle}</p>
        </div>

        <div className="px-8 py-7">
          {/* Step: Details */}
          {step === "details" && (
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{t.step1}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-foreground/60">{t.firstName}</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => { setFormData(p => ({ ...p, firstName: e.target.value })); clearError("firstName"); }}
                    placeholder={t.firstNamePh}
                    className={cn("rounded-none", errors.firstName && "border-destructive")}
                  />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-foreground/60">{t.lastName}</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => { setFormData(p => ({ ...p, lastName: e.target.value })); clearError("lastName"); }}
                    placeholder={t.lastNamePh}
                    className={cn("rounded-none", errors.lastName && "border-destructive")}
                  />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-foreground/60">{t.email}</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => { setFormData(p => ({ ...p, email: e.target.value })); clearError("email"); }}
                  placeholder={t.emailPh}
                  className={cn("rounded-none", errors.email && "border-destructive")}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-foreground/60">{t.phone}</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => { setFormData(p => ({ ...p, phone: e.target.value })); clearError("phone"); }}
                  placeholder={t.phonePh}
                  className={cn("rounded-none", errors.phone && "border-destructive")}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
              <Button
                onClick={handleDetailsNext}
                className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 font-semibold uppercase tracking-wider"
              >
                {t.next}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step: Date & Time */}
          {step === "datetime" && (
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{t.step2}</p>

              {/* Date picker */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-foreground/60">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left rounded-none font-normal", !selectedDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : t.pickDate}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => isBefore(date, tomorrow)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time slots */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-lioner-gold" />
                  <Label className="text-xs uppercase tracking-wider text-foreground/60">Time Slot</Label>
                </div>
                <div className="space-y-3">
                  {["Morning", "Afternoon"].map((period) => (
                    <div key={period}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        {period === "Morning" ? t.morning : t.afternoon}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.filter(s => s.period === period).map((slot) => (
                          <button
                            key={slot.value}
                            onClick={() => setSelectedSlot(slot.value)}
                            className={cn(
                              "py-2.5 text-sm font-medium border-2 transition-all",
                              selectedSlot === slot.value
                                ? "border-lioner-gold bg-lioner-gold/10 text-foreground"
                                : "border-border hover:border-lioner-gold/50 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground/60 italic">{t.timezone}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="flex-1 rounded-none py-5"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedSlot || isSubmitting}
                  className="flex-1 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-5 font-semibold uppercase tracking-wide"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t.confirming}</>
                  ) : t.confirm}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground/50">{t.notice}</p>
            </div>
          )}

          {/* Step: Success */}
          {step === "success" && (
            <div className="text-center py-6 space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{t.successTitle}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t.successBody}</p>
              </div>
              {selectedDate && selectedSlot && (
                <div className="bg-muted/50 p-4 text-sm text-left space-y-1">
                  <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-medium">Date:</span> {format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                  <p><span className="font-medium">Time:</span> {TIME_SLOTS.find(s => s.value === selectedSlot)?.label} (Dubai)</p>
                </div>
              )}
              <Button
                onClick={handleClose}
                className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-5 font-semibold uppercase tracking-wider"
              >
                {t.successCta}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
