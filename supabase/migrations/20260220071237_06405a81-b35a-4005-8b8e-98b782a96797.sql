
-- Table for mid-ticket business consultation applications
CREATE TABLE public.business_consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  q1_morning_standard INTEGER NOT NULL DEFAULT 0,
  q2_silence_test INTEGER NOT NULL DEFAULT 0,
  q3_deadline_protocol INTEGER NOT NULL DEFAULT 0,
  q4_confrontation INTEGER NOT NULL DEFAULT 0,
  q5_meeting_tax INTEGER NOT NULL DEFAULT 0,
  q6_problem_solver INTEGER NOT NULL DEFAULT 0,
  q7_mirror INTEGER NOT NULL DEFAULT 0,
  raw_score INTEGER NOT NULL DEFAULT 0,
  discipline_score INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'unknown',
  booking_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_consultations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts on business_consultations"
ON public.business_consultations
FOR INSERT
WITH CHECK (true);

-- Allow reading
CREATE POLICY "Allow reading business_consultations"
ON public.business_consultations
FOR SELECT
USING (true);
