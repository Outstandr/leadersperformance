DROP POLICY IF EXISTS "Allow anonymous inserts on applications" ON public.applications;
CREATE POLICY "Allow anonymous inserts on applications"
  ON public.applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on business_consultations" ON public.business_consultations;
CREATE POLICY "Allow anonymous inserts on business_consultations"
  ON public.business_consultations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on capital_protection_assessments" ON public.capital_protection_assessments;
CREATE POLICY "Allow anonymous inserts on capital_protection_assessments"
  ON public.capital_protection_assessments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on corporate audits" ON public.corporate_discipline_audits;
CREATE POLICY "Allow anonymous inserts on corporate_discipline_audits"
  ON public.corporate_discipline_audits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit assessment" ON public.discipline_assessments;
CREATE POLICY "Anyone can submit assessment"
  ON public.discipline_assessments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on founder_burnout_scans" ON public.founder_burnout_scans;
CREATE POLICY "Allow anonymous inserts on founder_burnout_scans"
  ON public.founder_burnout_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on founders_pressure_scans" ON public.founders_pressure_scans;
CREATE POLICY "Allow anonymous inserts on founders_pressure_scans"
  ON public.founders_pressure_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on voice leads" ON public.voice_leads;
CREATE POLICY "Allow anonymous inserts on voice leads"
  ON public.voice_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);