
CREATE TABLE public.founders_pressure_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  phone text NOT NULL,
  q1 integer NOT NULL DEFAULT 1,
  q2 integer NOT NULL DEFAULT 1,
  q3 integer NOT NULL DEFAULT 1,
  q4 integer NOT NULL DEFAULT 1,
  q5 integer NOT NULL DEFAULT 1,
  q6 integer NOT NULL DEFAULT 1,
  q7 integer NOT NULL DEFAULT 1,
  q8 integer NOT NULL DEFAULT 1,
  q9 integer NOT NULL DEFAULT 1,
  q10 integer NOT NULL DEFAULT 1,
  q11 integer NOT NULL DEFAULT 1,
  q12 integer NOT NULL DEFAULT 1,
  decision_pressure_score integer NOT NULL DEFAULT 0,
  founder_dependency_score integer NOT NULL DEFAULT 0,
  leadership_alignment_score integer NOT NULL DEFAULT 0,
  execution_momentum_score integer NOT NULL DEFAULT 0,
  overall_score integer NOT NULL DEFAULT 0,
  overall_color text NOT NULL DEFAULT 'green',
  language text NOT NULL DEFAULT 'en',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.founders_pressure_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on founders_pressure_scans"
  ON public.founders_pressure_scans
  FOR INSERT
  TO public
  WITH CHECK (true);
