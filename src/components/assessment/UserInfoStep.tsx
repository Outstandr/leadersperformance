import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function UserInfoStep({ userInfo, onSubmit, language }: UserInfoStepProps) {
  const [formData, setFormData] = useState<UserInfo>(userInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      // remove the key entirely so we don't render empty messages
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lioner-gold/10 mb-4">
          <Target className="w-8 h-8 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          Discipline Assessment
        </h2>
        <p className="text-muted-foreground">
          Discover your discipline type and receive personalized insights
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Clock className="w-5 h-5 text-lioner-gold shrink-0" />
          <span className="text-sm text-muted-foreground">Takes 10 minutes</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <FileText className="w-5 h-5 text-lioner-gold shrink-0" />
          <span className="text-sm text-muted-foreground">Free personalized report</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                clearError("firstName");
              }}
              placeholder="Enter your first name"
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                clearError("lastName");
              }}
              placeholder="Enter your last name"
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              clearError("email");
            }}
            placeholder="Enter your email address"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, country: value }));
              clearError("country");
            }}
          >
            <SelectTrigger className={errors.country ? "border-destructive" : ""}>
              <SelectValue placeholder="Select your country" />
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

        <Button
          type="submit"
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-medium"
        >
          Start Assessment
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By starting the assessment, you agree to receive your personalized report via email.
        </p>
      </form>
    </div>
  );
}
