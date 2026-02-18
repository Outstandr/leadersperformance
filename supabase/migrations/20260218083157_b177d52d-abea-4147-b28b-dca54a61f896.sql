
CREATE TABLE public.voice_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT,
  email TEXT,
  phone TEXT,
  recommended_path TEXT,
  conversation_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.voice_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on voice leads"
ON public.voice_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow reading voice leads"
ON public.voice_leads
FOR SELECT
USING (true);
