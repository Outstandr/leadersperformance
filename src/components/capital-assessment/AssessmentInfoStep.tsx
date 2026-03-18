import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface AssessmentUserInfo {
  fullName: string;
  companyName: string;
  role: string;
  country: string;
  email: string;
  phone: string;
}

interface AssessmentInfoStepProps {
  onSubmit: (info: AssessmentUserInfo) => void;
}

const schema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  companyName: z.string().trim().min(1, "Required").max(100),
  role: z.string().trim().min(1, "Required"),
  country: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
});

const roleOptions = [
  { value: "founder", label: { en: "Founder", nl: "Oprichter" } },
  { value: "ceo", label: { en: "CEO", nl: "CEO" } },
  { value: "shareholder", label: { en: "Shareholder", nl: "Aandeelhouder" } },
  { value: "investor", label: { en: "Investor", nl: "Investeerder" } },
];

const ui = {
  en: {
    eyebrow: "Capital Protection",
    heading: "Capital Protection Assessment",
    description: "If you are a founder dealing with fraud, partner disputes, misappropriation of funds, or lost capital, this assessment helps determine whether strategic recovery or intervention may be possible.",
    note: "Once submitted, your answers will generate an initial report outlining the possible strategic paths forward.",
    fullName: "Full Name",
    companyName: "Company Name",
    role: "Your Role",
    country: "Country",
    email: "Email",
    phone: "Phone",
    continue: "Continue to Assessment",
    disclaimer: "All information is treated confidentially.",
  },
  nl: {
    eyebrow: "Kapitaalbescherming",
    heading: "Kapitaalbescherming Assessment",
    description: "Als u een founder bent die te maken heeft met fraude, partnergeschillen, verduistering van fondsen of verloren kapitaal, helpt deze beoordeling te bepalen of strategisch herstel of interventie mogelijk is.",
    note: "Na indiening genereren uw antwoorden een eerste rapport met mogelijke strategische paden.",
    fullName: "Volledige Naam",
    companyName: "Bedrijfsnaam",
    role: "Uw Rol",
    country: "Land",
    email: "E-mail",
    phone: "Telefoonnummer",
    continue: "Ga verder met de beoordeling",
    disclaimer: "Alle informatie wordt vertrouwelijk behandeld.",
  },
};

export function AssessmentInfoStep({ onSubmit }: AssessmentInfoStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const [formData, setFormData] = useState<AssessmentUserInfo>({
    fullName: "",
    companyName: "",
    role: "",
    country: "",
    email: "",
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
    onSubmit(result.data as AssessmentUserInfo);
  };

  const inputClass = (field: string) =>
    `bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors[field] ? "border-red-500" : ""}`;

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <FileText className="w-7 h-7 text-lioner-gold" />
        </div>
        <span className="block text-xs uppercase tracking-widest text-lioner-gold/70 font-semibold mb-3">
          {t.eyebrow}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-sans">
          {t.heading}
        </h2>
        <p className="text-foreground/60 max-w-md mx-auto text-sm mb-2">
          {t.description}
        </p>
        <p className="text-foreground/40 max-w-md mx-auto text-xs italic">
          {t.note}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.fullName}</Label>
          <Input
            value={formData.fullName}
            onChange={(e) => { setFormData((p) => ({ ...p, fullName: e.target.value })); clearError("fullName"); }}
            placeholder={language === "nl" ? "Uw volledige naam" : "Your full name"}
            className={inputClass("fullName")}
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.companyName}</Label>
          <Input
            value={formData.companyName}
            onChange={(e) => { setFormData((p) => ({ ...p, companyName: e.target.value })); clearError("companyName"); }}
            placeholder={language === "nl" ? "Bedrijfsnaam" : "Company name"}
            className={inputClass("companyName")}
          />
          {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.role}</Label>
          <div className="grid grid-cols-2 gap-2">
            {roleOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { setFormData((p) => ({ ...p, role: opt.value })); clearError("role"); }}
                className={`p-3 text-sm border-2 rounded-none transition-all ${
                  formData.role === opt.value
                    ? "border-lioner-gold bg-lioner-gold/10 text-foreground font-semibold"
                    : "border-foreground/10 text-foreground/60 hover:border-lioner-gold/40"
                }`}
              >
                {opt.label[language]}
              </button>
            ))}
          </div>
          {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.country}</Label>
          <Input
            value={formData.country}
            onChange={(e) => { setFormData((p) => ({ ...p, country: e.target.value })); clearError("country"); }}
            placeholder={language === "nl" ? "Uw land" : "Your country"}
            className={inputClass("country")}
          />
          {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.email}</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); clearError("email"); }}
            placeholder={language === "nl" ? "uw@email.com" : "your@email.com"}
            className={inputClass("email")}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.phone}</Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => { setFormData((p) => ({ ...p, phone: e.target.value })); clearError("phone"); }}
            placeholder="+31 6 1234 5678"
            className={inputClass("phone")}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
        >
          {t.continue}
        </Button>

        <p className="text-xs text-center text-foreground/30">{t.disclaimer}</p>
      </form>
    </div>
  );
}
