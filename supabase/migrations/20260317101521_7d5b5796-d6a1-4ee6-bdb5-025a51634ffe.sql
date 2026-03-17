CREATE TABLE public.capital_protection_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  country text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  situation_types text[] NOT NULL DEFAULT '{}',
  capital_exposure text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  evidence_types text[] NOT NULL DEFAULT '{}',
  jurisdictions text[] NOT NULL DEFAULT '{}',
  legal_status text NOT NULL DEFAULT '',
  objective text NOT NULL DEFAULT '',
  situation_summary text NOT NULL DEFAULT '',
  consent_review boolean NOT NULL DEFAULT false,
  recovery_potential text,
  risk_level text,
  ai_report jsonb
);

ALTER TABLE public.capital_protection_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on capital_protection_assessments"
  ON public.capital_protection_assessments
  FOR INSERT
  TO public
  WITH CHECK (true);