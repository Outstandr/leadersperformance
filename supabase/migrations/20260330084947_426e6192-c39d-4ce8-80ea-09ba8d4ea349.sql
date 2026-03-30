CREATE TABLE public.profit_leak_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'en',
  revenue_tier TEXT NOT NULL DEFAULT '5m_15m',
  overall_score INTEGER NOT NULL DEFAULT 0,
  overall_color TEXT NOT NULL DEFAULT 'green',
  growth_phase TEXT NOT NULL DEFAULT '',
  primary_bottleneck TEXT NOT NULL DEFAULT '',
  founder_dependency_score INTEGER NOT NULL DEFAULT 0,
  structure_leadership_score INTEGER NOT NULL DEFAULT 0,
  decision_speed_score INTEGER NOT NULL DEFAULT 0,
  profitability_score INTEGER NOT NULL DEFAULT 0,
  scalability_score INTEGER NOT NULL DEFAULT 0,
  pl1 INTEGER, pl2 INTEGER, pl3 INTEGER, pl4 INTEGER, pl5 INTEGER,
  pl6 INTEGER, pl7 INTEGER, pl8 INTEGER, pl9 INTEGER, pl10 INTEGER,
  pl11 INTEGER, pl12 INTEGER, pl13 INTEGER, pl14 INTEGER, pl15 INTEGER,
  ai_report JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profit_leak_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on profit_leak_scans"
  ON public.profit_leak_scans FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous selects on profit_leak_scans"
  ON public.profit_leak_scans FOR SELECT
  TO anon USING (true);