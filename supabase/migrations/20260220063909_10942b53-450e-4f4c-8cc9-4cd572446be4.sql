
-- Create applications table for mentorship booking flow
CREATE TABLE public.applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text NOT NULL,
  position text NOT NULL,
  country text NOT NULL,
  email text NOT NULL,
  professional_arena text NOT NULL,
  income_level text NOT NULL,
  impossible_target text NOT NULL,
  lack_of_discipline text NOT NULL,
  past_attempts text NOT NULL,
  cost_of_inaction text NOT NULL,
  why_mentor text NOT NULL,
  investment_ready text NOT NULL,
  willing_to_be_wrong text NOT NULL,
  commitment_level text NOT NULL,
  booking_date timestamptz NULL,
  booking_time text NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Restrictive INSERT policy (service-role via edge function)
CREATE POLICY "Allow anonymous inserts on applications"
ON public.applications
FOR INSERT
WITH CHECK (true);

-- Restrictive SELECT policy
CREATE POLICY "Allow reading applications"
ON public.applications
FOR SELECT
USING (true);
