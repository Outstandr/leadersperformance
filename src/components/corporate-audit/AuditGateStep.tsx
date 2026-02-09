import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { AuditUserInfo } from "./CorporateAuditDialog";
import { z } from "zod";

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

export function AuditGateStep({ userInfo, onSubmit, isSubmitting }: AuditGateStepProps) {
  const [formData, setFormData] = useState<AuditUserInfo>(userInfo);
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
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <Lock className="w-7 h-7 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-sans">
          Your Audit Is Complete.
        </h2>
        <p className="text-foreground/60">
          Enter your details to see the verdict.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="audit-firstName" className="text-foreground/70 text-xs uppercase tracking-wider">
              First Name
            </Label>
            <Input
              id="audit-firstName"
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                clearError("firstName");
              }}
              placeholder="First name"
              className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="audit-lastName" className="text-foreground/70 text-xs uppercase tracking-wider">
              Last Name
            </Label>
            <Input
              id="audit-lastName"
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                clearError("lastName");
              }}
              placeholder="Last name"
              className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audit-email" className="text-foreground/70 text-xs uppercase tracking-wider">
            Email
          </Label>
          <Input
            id="audit-email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              clearError("email");
            }}
            placeholder="your@email.com"
            className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="audit-phone" className="text-foreground/70 text-xs uppercase tracking-wider">
            Phone
          </Label>
          <Input
            id="audit-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, phone: e.target.value }));
              clearError("phone");
            }}
            placeholder="+31 6 1234 5678"
            className={`bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/30 rounded-none ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Show Me The Verdict"
          )}
        </Button>

        <p className="text-xs text-center text-foreground/30">
          Your data is processed securely. We don't share your information.
        </p>
      </form>
    </div>
  );
}
