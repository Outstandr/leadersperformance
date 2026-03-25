CREATE POLICY "Allow select own burnout scan by id"
ON public.founder_burnout_scans
FOR SELECT
TO public
USING (true);