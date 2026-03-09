
-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  pillar TEXT NOT NULL,
  pillar_color TEXT DEFAULT 'hsl(122,31%,42%)',
  keywords TEXT[] DEFAULT '{}',
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  publish_date DATE DEFAULT CURRENT_DATE,
  reading_time INTEGER DEFAULT 5,
  author TEXT DEFAULT 'Lionel Eersteling',
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public SELECT for published articles
CREATE POLICY "Public can read published articles"
ON public.articles
FOR SELECT
TO anon, authenticated
USING (published = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_articles_updated_at();
