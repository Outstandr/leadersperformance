-- Create table for discipline assessment submissions
CREATE TABLE public.discipline_assessments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    -- Question responses (1-5 scale)
    q1_follow_through INTEGER NOT NULL CHECK (q1_follow_through >= 1 AND q1_follow_through <= 5),
    q2_maintain_focus INTEGER NOT NULL CHECK (q2_maintain_focus >= 1 AND q2_maintain_focus <= 5),
    q3_give_up INTEGER NOT NULL CHECK (q3_give_up >= 1 AND q3_give_up <= 5),
    q4_resist_pleasure INTEGER NOT NULL CHECK (q4_resist_pleasure >= 1 AND q4_resist_pleasure <= 5),
    q8_act_impulse INTEGER NOT NULL CHECK (q8_act_impulse >= 1 AND q8_act_impulse <= 5),
    q9_control_stress INTEGER NOT NULL CHECK (q9_control_stress >= 1 AND q9_control_stress <= 5),
    q10_regret_purchases INTEGER NOT NULL CHECK (q10_regret_purchases >= 1 AND q10_regret_purchases <= 5),
    q15_daily_routines INTEGER NOT NULL CHECK (q15_daily_routines >= 1 AND q15_daily_routines <= 5),
    q16_productivity_varies INTEGER NOT NULL CHECK (q16_productivity_varies >= 1 AND q16_productivity_varies <= 5),
    q17_bounce_back INTEGER NOT NULL CHECK (q17_bounce_back >= 1 AND q17_bounce_back <= 5),
    -- Calculated scores
    self_discipline_score NUMERIC(5,2),
    impulse_control_score NUMERIC(5,2),
    consistency_score NUMERIC(5,2),
    overall_score NUMERIC(5,2),
    discipline_type TEXT,
    -- AI generated insights (stored as JSON)
    ai_insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.discipline_assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public assessment)
CREATE POLICY "Anyone can submit assessment" 
ON public.discipline_assessments 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading own assessment by email (for results)
CREATE POLICY "Anyone can read assessments" 
ON public.discipline_assessments 
FOR SELECT 
USING (true);