DROP POLICY IF EXISTS "Allow anonymous inserts on founders_pressure_scans" ON public.founders_pressure_scans;
CREATE POLICY "Allow anonymous inserts on founders_pressure_scans"
  ON public.founders_pressure_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);