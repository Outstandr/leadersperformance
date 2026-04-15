CREATE TABLE IF NOT EXISTS public.round_table_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  role_and_company TEXT NOT NULL,
  strategic_responsibility TEXT NOT NULL,
  biggest_pressure TEXT NOT NULL,
  decision_delay TEXT NOT NULL,
  absence_impact TEXT NOT NULL,
  problem_response TEXT NOT NULL,
  resistance_response TEXT NOT NULL,
  energy_level TEXT NOT NULL,
  blind_spot TEXT NOT NULL,
  why_fit TEXT NOT NULL,
  unacted_truth TEXT NOT NULL,
  score INTEGER,
  route TEXT,
  ghl_contact_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.round_table_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on round_table_submissions"
ON public.round_table_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(full_name)) > 0
  AND char_length(trim(email)) > 0
  AND char_length(trim(role_and_company)) > 0
  AND char_length(trim(strategic_responsibility)) > 0
  AND char_length(trim(biggest_pressure)) > 0
  AND char_length(trim(decision_delay)) > 0
  AND char_length(trim(absence_impact)) > 0
  AND char_length(trim(problem_response)) > 0
  AND char_length(trim(resistance_response)) > 0
  AND char_length(trim(energy_level)) > 0
  AND char_length(trim(blind_spot)) > 0
  AND char_length(trim(why_fit)) > 0
  AND char_length(trim(unacted_truth)) > 0
);

CREATE INDEX IF NOT EXISTS idx_round_table_submissions_created_at
  ON public.round_table_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_round_table_submissions_email
  ON public.round_table_submissions (email);