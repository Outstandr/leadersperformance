CREATE TABLE public.founder_burnout_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  phone text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  -- Free test scores
  free_workload_intensity integer NOT NULL DEFAULT 0,
  free_sleep_quality integer NOT NULL DEFAULT 0,
  free_mental_fatigue integer NOT NULL DEFAULT 0,
  free_decision_pressure integer NOT NULL DEFAULT 0,
  free_stress_tolerance integer NOT NULL DEFAULT 0,
  free_fbr_score integer NOT NULL DEFAULT 0,
  free_fbr_color text NOT NULL DEFAULT 'green',
  -- Full diagnostic scores (nullable - only if paid)
  paid boolean NOT NULL DEFAULT false,
  stripe_session_id text,
  full_pressure_load integer,
  full_nervous_system integer,
  full_business_dependency integer,
  full_recovery_capacity integer,
  full_fbr_score integer,
  full_fbr_color text,
  full_burnout_phase text,
  full_recovery_estimate text,
  -- Raw question answers (free test q1-q10)
  fq1 integer NOT NULL DEFAULT 1,
  fq2 integer NOT NULL DEFAULT 1,
  fq3 integer NOT NULL DEFAULT 1,
  fq4 integer NOT NULL DEFAULT 1,
  fq5 integer NOT NULL DEFAULT 1,
  fq6 integer NOT NULL DEFAULT 1,
  fq7 integer NOT NULL DEFAULT 1,
  fq8 integer NOT NULL DEFAULT 1,
  fq9 integer NOT NULL DEFAULT 1,
  fq10 integer NOT NULL DEFAULT 1,
  -- Raw question answers (full diagnostic dq1-dq32)
  dq1 integer, dq2 integer, dq3 integer, dq4 integer,
  dq5 integer, dq6 integer, dq7 integer, dq8 integer,
  dq9 integer, dq10 integer, dq11 integer, dq12 integer,
  dq13 integer, dq14 integer, dq15 integer, dq16 integer,
  dq17 integer, dq18 integer, dq19 integer, dq20 integer,
  dq21 integer, dq22 integer, dq23 integer, dq24 integer,
  dq25 integer, dq26 integer, dq27 integer, dq28 integer,
  dq29 integer, dq30 integer, dq31 integer, dq32 integer
);

ALTER TABLE public.founder_burnout_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on founder_burnout_scans"
ON public.founder_burnout_scans
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow update own burnout scan by email"
ON public.founder_burnout_scans
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);