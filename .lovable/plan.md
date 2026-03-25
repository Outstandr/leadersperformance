

# Generate PDF: All Scans & Assessments with Questions

## What will be created

A comprehensive PDF document listing all 7 active scans/assessments on the Leaders Performance website, with every question included. The document will be professionally formatted with the brand's dark/gold aesthetic.

## Contents

### 1. Discipline Assessment (10 questions)
- Domains: Self-Discipline, Impulse Control, Consistency
- Rating scale: 1-5

### 2. Founders Pressure Scan (12 questions)
- Sections: Decision Pressure, Founder Dependency, Leadership Alignment, Execution Momentum
- Scale: Strongly Disagree to Strongly Agree

### 3. Founder Burnout Risk Scan — Free Test (10 questions)
- Sections: Workload Intensity, Sleep Quality, Mental Fatigue, Decision Pressure, Stress Tolerance

### 4. Founder Burnout Risk Scan — Full Diagnostic (32 questions, paid $195)
- Domains: Founder Pressure Load (8), Nervous System Depletion (8), Business Dependency (8), Recovery Capacity (8)

### 5. Capital Protection Assessment (9 sections)
- Sections: Situation Type, Capital Exposure, Timeline, Evidence, Jurisdictions, Legal Status, Objective, Situation Summary, Consent
- Mix of single-choice, multi-choice, text, and boolean questions

### 6. Capital Assessment (9 questions)
- Weighted scoring across situation type, capital exposure, timeline, evidence, jurisdictions, legal status, objective, summary, consent

### 7. Corporate Discipline Audit (7 questions)
- Each question has a title (e.g., "THE MORNING STANDARD") and 4 options with point values

## Technical approach

- Generate PDF using ReportLab (Python) with dark background (#1a1a2a), gold accents (#d4af37), and white text
- Each scan gets its own section with a header, description, and numbered questions with answer options
- Output to `/mnt/documents/Leaders_Performance_All_Scans.pdf`
- Visual QA via pdftoppm before delivery

