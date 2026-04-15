DROP POLICY IF EXISTS "Allow anonymous inserts on applications" ON public.applications;
CREATE POLICY "Allow anonymous inserts on applications"
  ON public.applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);