import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface ScanUserInfo {
  fullName: string;
  email: string;
  company: string;
  phone: string;
}

interface ScanGateStepProps {
  onSubmit: (info: ScanUserInfo) => void;
  isSubmitting: boolean;
  onBack?: () => void;
}

const schema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
});

const ui = {
  en: {
    heading: "Your Scan Is Complete.",
    subheading: "Enter your details to see the results.",
    fullName: "Full Name",
    email: "Email",
    company: "Company Name",
    phone: "Phone Number",
    fullNamePh: "Your full name",
    emailPh: "your@email.com",
    companyPh: "Company name",
    phonePh: "+31 6 1234 5678",
    submitBtn: "Show My Results",
    analyzing: "Analyzing...",
    disclaimer: "Your data is processed securely. We don't share your information.",
    back: "Back",
  },
  nl: {
    heading: "Jouw scan is voltooid.",
    subheading: "Vul je gegevens in om de resultaten te zien.",
    fullName: "Volledige naam",
    email: "E-mail",
    company: "Bedrijfsnaam",
    phone: "Telefoonnummer",
    fullNamePh: "Je volledige naam",
    emailPh: "jouw@email.com",
    companyPh: "Bedrijfsnaam",
    phonePh: "+31 6 1234 5678",
    submitBtn: "Toon mijn resultaten",
    analyzing: "Analyseren...",
    disclaimer: "Je gegevens worden veilig verwerkt. We delen je informatie niet.",
    back: "Vorige",
  },
};

export function ScanGateStep({ onSubmit, isSubmitting, onBack }: ScanGateStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const [formData, setFormData] = useState<ScanUserInfo>({
    fullName: "",
    email: "",
    company: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] !== undefined) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data as ScanUserInfo);
  };

  const inputClass = (field: string) =>
    `bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors[field] ? "border-red-500" : ""}`;

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <Lock className="w-7 h-7 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-sans">{t.heading}</h2>
        <p className="text-foreground/60">{t.subheading}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.fullName}</Label>
          <Input
            value={formData.fullName}
            onChange={(e) => { setFormData((p) => ({ ...p, fullName: e.target.value })); clearError("fullName"); }}
            placeholder={t.fullNamePh}
            className={inputClass("fullName")}
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.email}</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); clearError("email"); }}
            placeholder={t.emailPh}
            className={inputClass("email")}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.company}</Label>
          <Input
            value={formData.company}
            onChange={(e) => { setFormData((p) => ({ ...p, company: e.target.value })); clearError("company"); }}
            placeholder={t.companyPh}
            className={inputClass("company")}
          />
          {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.phone}</Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => { setFormData((p) => ({ ...p, phone: e.target.value })); clearError("phone"); }}
            placeholder={t.phonePh}
            className={inputClass("phone")}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full rounded-none py-6 text-base font-bold uppercase tracking-wider border-foreground/20 text-foreground hover:bg-foreground/5"
          >
            ← {t.back}
          </Button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t.analyzing}
            </>
          ) : (
            t.submitBtn
          )}
        </Button>

        <p className="text-xs text-center text-foreground/30">{t.disclaimer}</p>
      </form>
    </div>
  );
