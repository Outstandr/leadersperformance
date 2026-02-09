
-- Create table for corporate discipline audits
CREATE TABLE public.corporate_discipline_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  q1_morning_standard INTEGER NOT NULL CHECK (q1_morning_standard IN (0, 10)),
  q2_silence_test INTEGER NOT NULL CHECK (q2_silence_test IN (0, 10)),
  q3_deadline_protocol INTEGER NOT NULL CHECK (q3_deadline_protocol IN (0, 10)),
  q4_confrontation INTEGER NOT NULL CHECK (q4_confrontation IN (0, 10)),
  q5_meeting_tax INTEGER NOT NULL CHECK (q5_meeting_tax IN (0, 10)),
  q6_problem_solver INTEGER NOT NULL CHECK (q6_problem_solver IN (0, 10)),
  q7_mirror INTEGER NOT NULL CHECK (q7_mirror IN (0, 10)),
  raw_score INTEGER NOT NULL,
  discipline_score INTEGER NOT NULL,
  tier TEXT NOT NULL,
  ai_insights JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.corporate_discipline_audits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (lead gen form, no auth required)
CREATE POLICY "Allow anonymous inserts on corporate audits"
  ON public.corporate_discipline_audits
  FOR INSERT
  WITH CHECK (true);

-- Allow reading own record by id (for results page)
CREATE POLICY "Allow reading corporate audits by id"
  ON public.corporate_discipline_audits
  FOR SELECT
  USING (true);
