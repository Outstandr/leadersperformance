
-- Drop the overly permissive SELECT policy
DROP POLICY "Anyone can read assessments" ON public.discipline_assessments;

-- Also fix the same issue on other tables while we're at it
DROP POLICY "Allow reading applications" ON public.applications;
DROP POLICY "Allow reading business_consultations" ON public.business_consultations;
DROP POLICY "Allow reading corporate audits by id" ON public.corporate_discipline_audits;
DROP POLICY "Allow reading voice leads" ON public.voice_leads;
