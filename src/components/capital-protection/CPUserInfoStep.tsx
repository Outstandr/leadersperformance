import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Lock } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cpRoles } from "@/lib/capitalProtectionQuestions";

export interface CPUserInfo {
  fullName: string;
  company: string;
  role: string;
  country: string;
  email: string;
  phone: string;
}

interface CPUserInfoStepProps {
  onSubmit: (info: CPUserInfo) => void;
  isSubmitting?: boolean;
}

const schema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(100),
  role: z.string().trim().min(1, "Required").max(50),
  country: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
});

const ui = {
  en: {
    heading: "Founder Information",
    subheading: "All information is treated as strictly confidential.",
    fullName: "Name",
    company: "Company Name",
    role: "Role",
    country: "Country",
    email: "Email",
    phone: "Phone",
    fullNamePh: "Your full name",
    companyPh: "Company name",
    countryPh: "Country",
    emailPh: "your@email.com",
    phonePh: "+31 6 1234 5678",
    selectRole: "Select your role",
    submitBtn: "Continue",
    disclaimer: "Your data is processed securely and confidentially.",
    consent: 'I agree to the <a href="/terms-of-service" target="_blank">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.',
  },
  nl: {
    heading: "Founder Informatie",
    subheading: "Alle informatie wordt strikt vertrouwelijk behandeld.",
    fullName: "Naam",
    company: "Bedrijfsnaam",
    role: "Rol",
    country: "Land",
    email: "E-mail",
    phone: "Telefoonnummer",
    fullNamePh: "Uw volledige naam",
    companyPh: "Bedrijfsnaam",
    countryPh: "Land",
    emailPh: "uw@email.com",
    phonePh: "+31 6 1234 5678",
    selectRole: "Selecteer uw rol",
    submitBtn: "Doorgaan",
    disclaimer: "Uw gegevens worden veilig en vertrouwelijk verwerkt.",
    consent: 'Ik ga akkoord met de <a href="/terms-of-service" target="_blank">Algemene Voorwaarden</a> en het <a href="/privacy-policy" target="_blank">Privacybeleid</a>.',
  },
};

export function CPUserInfoStep({ onSubmit, isSubmitting }: CPUserInfoStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const roles = cpRoles[language] ?? cpRoles.en;

  const [formData, setFormData] = useState<CPUserInfo>({
    fullName: "",
    company: "",
    role: "",
    country: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consentChecked, setConsentChecked] = useState(false);

  const clearError = (field: string) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setErrors((prev) => ({ ...prev, consent: "Required" }));
      return;
    }
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
    onSubmit(result.data as CPUserInfo);
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
          <Input value={formData.fullName} onChange={(e) => { setFormData((p) => ({ ...p, fullName: e.target.value })); clearError("fullName"); }} placeholder={t.fullNamePh} className={inputClass("fullName")} />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.company}</Label>
          <Input value={formData.company} onChange={(e) => { setFormData((p) => ({ ...p, company: e.target.value })); clearError("company"); }} placeholder={t.companyPh} className={inputClass("company")} />
          {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.role}</Label>
          <select
            value={formData.role}
            onChange={(e) => { setFormData((p) => ({ ...p, role: e.target.value })); clearError("role"); }}
            className={`w-full h-10 px-3 ${inputClass("role")} border bg-foreground/5`}
          >
            <option value="">{t.selectRole}</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.country}</Label>
          <Input value={formData.country} onChange={(e) => { setFormData((p) => ({ ...p, country: e.target.value })); clearError("country"); }} placeholder={t.countryPh} className={inputClass("country")} />
          {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.email}</Label>
          <Input type="email" value={formData.email} onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); clearError("email"); }} placeholder={t.emailPh} className={inputClass("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs uppercase tracking-wider">{t.phone}</Label>
          <Input type="tel" value={formData.phone} onChange={(e) => { setFormData((p) => ({ ...p, phone: e.target.value })); clearError("phone"); }} placeholder={t.phonePh} className={inputClass("phone")} />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="cp-consent"
            checked={consentChecked}
            onCheckedChange={(checked) => {
              setConsentChecked(checked === true);
              if (checked) clearError("consent");
            }}
            className={`mt-0.5 rounded-none ${errors.consent ? "border-red-500" : ""}`}
          />
          <label
            htmlFor="cp-consent"
            className={`text-xs leading-relaxed cursor-pointer ${errors.consent ? "text-red-500" : "text-foreground/60"}`}
            dangerouslySetInnerHTML={{ __html: t.consent }}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider">
          {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{language === "nl" ? "Laden..." : "Loading..."}</> : t.submitBtn}
        </Button>

        <p className="text-xs text-center text-foreground/30">{t.disclaimer}</p>
      </form>
    </div>
  );
}
