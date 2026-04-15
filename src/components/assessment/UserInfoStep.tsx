import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/assessmentQuestions";
import { UserInfo } from "./AssessmentDialog";
import { Target, Clock, FileText } from "lucide-react";
import { z } from "zod";

interface UserInfoStepProps {
  userInfo: UserInfo;
  onSubmit: (info: UserInfo) => void;
  language: string;
}

const userInfoSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  country: z.string().min(1, "Please select your country")
});

const uiTranslations = {
  en: {
    title: "Discipline Assessment",
    subtitle: "Discover your discipline type and receive personalized insights",
    takesTime: "Takes 10 minutes",
    freeReport: "Free personalized report",
    firstName: "First Name",
    firstNamePlaceholder: "Enter your first name",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter your last name",
    email: "Email Address",
    emailPlaceholder: "Enter your email address",
    country: "Country",
    countryPlaceholder: "Select your country",
    startBtn: "Start Assessment",
    disclaimer: "By starting the assessment, you agree to receive your personalized report via email.",
    consent: 'I agree to the <a href="/terms-of-service" target="_blank">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.',
    errors: {
      firstName: "First name is required",
      lastName: "Last name is required",
      email: "Please enter a valid email address",
      country: "Please select your country",
    }
  },
  nl: {
    title: "Disciplinetest",
    subtitle: "Ontdek jouw discipline type en ontvang persoonlijke inzichten",
    takesTime: "Duurt 10 minuten",
    freeReport: "Gratis persoonlijk rapport",
    firstName: "Voornaam",
    firstNamePlaceholder: "Vul je voornaam in",
    lastName: "Achternaam",
    lastNamePlaceholder: "Vul je achternaam in",
    email: "E-mailadres",
    emailPlaceholder: "Vul je e-mailadres in",
    country: "Land",
    countryPlaceholder: "Selecteer je land",
    startBtn: "Start de test",
    disclaimer: "Door de test te starten, ga je akkoord met het ontvangen van je persoonlijk rapport via e-mail.",
    consent: 'Ik ga akkoord met de <a href="/terms-of-service" target="_blank">Algemene Voorwaarden</a> en het <a href="/privacy-policy" target="_blank">Privacybeleid</a>.',
    errors: {
      firstName: "Voornaam is verplicht",
      lastName: "Achternaam is verplicht",
      email: "Vul een geldig e-mailadres in",
      country: "Selecteer je land",
    }
  }
};

export function UserInfoStep({ userInfo, onSubmit, language }: UserInfoStepProps) {
  const ui = uiTranslations[language as 'en' | 'nl'] ?? uiTranslations.en;
  const [formData, setFormData] = useState<UserInfo>(userInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consentChecked, setConsentChecked] = useState(false);

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
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
    
    const result = userInfoSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
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
      country: result.data.country
    });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lioner-gold/10 mb-4">
          <Target className="w-8 h-8 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          {ui.title}
        </h2>
        <p className="text-muted-foreground">
          {ui.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Clock className="w-5 h-5 text-lioner-gold shrink-0" />
          <span className="text-sm text-muted-foreground">{ui.takesTime}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <FileText className="w-5 h-5 text-lioner-gold shrink-0" />
          <span className="text-sm text-muted-foreground">{ui.freeReport}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{ui.firstName}</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                clearError("firstName");
              }}
              placeholder={ui.firstNamePlaceholder}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{ui.lastName}</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                clearError("lastName");
              }}
              placeholder={ui.lastNamePlaceholder}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{ui.email}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              clearError("email");
            }}
            placeholder={ui.emailPlaceholder}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">{ui.country}</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, country: value }));
              clearError("country");
            }}
          >
            <SelectTrigger className={errors.country ? "border-destructive" : ""}>
              <SelectValue placeholder={ui.countryPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="assessment-consent"
            checked={consentChecked}
            onCheckedChange={(checked) => {
              setConsentChecked(checked === true);
              if (checked) clearError("consent");
            }}
            className={`mt-0.5 rounded-none ${errors.consent ? "border-red-500" : ""}`}
          />
          <label
            htmlFor="assessment-consent"
            className={`text-xs leading-relaxed cursor-pointer ${errors.consent ? "text-red-500" : "text-foreground/60"}`}
            dangerouslySetInnerHTML={{ __html: ui.consent }}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-medium"
        >
          {ui.startBtn}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {ui.disclaimer}
        </p>
      </form>
    </div>
  );
}
