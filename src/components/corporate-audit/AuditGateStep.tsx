import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Lock } from "lucide-react";
import { AuditUserInfo } from "./CorporateAuditDialog";
import { z } from "zod";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AuditGateStepProps {
  userInfo: AuditUserInfo;
  onSubmit: (info: AuditUserInfo) => void;
  isSubmitting: boolean;
}

const gateSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(50),
  lastName: z.string().trim().min(1, "Required").max(50),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
});

const ui = {
  en: {
    heading: "Your Audit Is Complete.",
    subheading: "Enter your details to see the verdict.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    firstNamePlaceholder: "First name",
    lastNamePlaceholder: "Last name",
    emailPlaceholder: "your@email.com",
    phonePlaceholder: "+31 6 1234 5678",
    submitBtn: "Show Me The Verdict",
    analyzing: "Analyzing...",
    disclaimer: "Your data is processed securely. We don't share your information.",
    consent: 'I agree to the <a href="/terms-of-service" target="_blank">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.',
  },
  nl: {
    heading: "Jouw audit is voltooid.",
    subheading: "Vul je gegevens in om het resultaat te zien.",
    firstName: "Voornaam",
    lastName: "Achternaam",
    email: "E-mail",
    phone: "Telefoon",
    firstNamePlaceholder: "Voornaam",
    lastNamePlaceholder: "Achternaam",
    emailPlaceholder: "jouw@email.com",
    phonePlaceholder: "+31 6 1234 5678",
    submitBtn: "Toon mij de resultaten",
    analyzing: "Analyseren...",
    disclaimer: "Je gegevens worden veilig verwerkt. We delen je informatie niet.",
    consent: 'Ik ga akkoord met de <a href="/terms-of-service" target="_blank">Algemene Voorwaarden</a> en het <a href="/privacy-policy" target="_blank">Privacybeleid</a>.',
  },
};

export function AuditGateStep({ userInfo, onSubmit, isSubmitting }: AuditGateStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const [formData, setFormData] = useState<AuditUserInfo>(userInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consentChecked, setConsentChecked] = useState(false);

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setErrors((prev) => ({ ...prev, consent: "Required" }));
      return;
    }
    const result = gateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] !== undefined) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      phone: result.data.phone,
    });
  };

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <Lock className="w-7 h-7 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-sans">
          {t.heading}
        </h2>
        <p className="text-foreground/60">
          {t.subheading}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="audit-firstName" className="text-foreground/70 text-xs uppercase tracking-wider">
              {t.firstName}
            </Label>
            <Input
              id="audit-firstName"
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                clearError("firstName");
              }}
              placeholder={t.firstNamePlaceholder}
              className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="audit-lastName" className="text-foreground/70 text-xs uppercase tracking-wider">
              {t.lastName}
            </Label>
            <Input
              id="audit-lastName"
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                clearError("lastName");
              }}
              placeholder={t.lastNamePlaceholder}
              className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audit-email" className="text-foreground/70 text-xs uppercase tracking-wider">
            {t.email}
          </Label>
          <Input
            id="audit-email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              clearError("email");
            }}
            placeholder={t.emailPlaceholder}
            className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="audit-phone" className="text-foreground/70 text-xs uppercase tracking-wider">
            {t.phone}
          </Label>
          <Input
            id="audit-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, phone: e.target.value }));
              clearError("phone");
            }}
            placeholder={t.phonePlaceholder}
            className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="audit-consent"
            checked={consentChecked}
            onCheckedChange={(checked) => {
              setConsentChecked(checked === true);
              if (checked) clearError("consent");
            }}
            className={`mt-0.5 rounded-none ${errors.consent ? "border-red-500" : ""}`}
          />
          <label
            htmlFor="audit-consent"
            className={`text-xs leading-relaxed cursor-pointer ${errors.consent ? "text-red-500" : "text-foreground/60"}`}
            dangerouslySetInnerHTML={{ __html: t.consent }}
          />
        </div>

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

        <p className="text-xs text-center text-foreground/30">
          {t.disclaimer}
        </p>
      </form>
    </div>
  );
}
