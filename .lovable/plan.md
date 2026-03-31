

## Generate Email Templates for All Scans

Create 3 nurture emails (Day 0, Day 2, Day 5) for each of the remaining 4 scans, following the exact same HTML structure and design system as the existing Founder Pressure Scan emails. The Founder Pressure Scan emails already exist — this covers the other scans only.

### Template Design System (Consistent Across All)
- Cream background `#F5F0EB`, white card, gold accent `#8B7355`
- Georgia serif, Outlook compatibility fixes
- Header: `LEADERS PERFORMANCE` + scan subtitle
- Footer: `Leaders Performance — [Scan Name]`
- Merge fields: `{{contact.first_name}}`, `{{contact.overall_score}}`, `{{unsubscribe_url}}`
- Signed: `— Lionel Eersteling`

### Emails to Generate (12 files)

**Profit Leak Scan (3 emails)**
- `profit-leak-email-1-the-number.html` — Day 0: Delivers score, frames leakage as structural not operational
- `profit-leak-email-2-the-structure.html` — Day 2: Shows 5 dimensions (Founder Dependency, Structure & Leadership, Decision Speed, Profitability, Scalability), connects bottleneck to margin compression
- `profit-leak-email-3-the-cost.html` — Day 5: Calculates cost of inaction using leakage estimate (5-18% of potential profit), final CTA

**Corporate Discipline Audit (3 emails)**
- `corporate-audit-email-1-the-mirror.html` — Day 0: Delivers discipline score, frames organizational discipline as founder reflection
- `corporate-audit-email-2-the-7-dimensions.html` — Day 2: Walks through 7 dimensions (Morning Standard, Operational Independence, Deadline Protocol, Team Self-Regulation, Meeting Discipline, Problem Ownership, Team Quality)
- `corporate-audit-email-3-the-standard.html` — Day 5: Cost of tolerating low standards, final push

**Capital Protection Assessment (3 emails)**
- `capital-protection-email-1-the-position.html` — Day 0: Delivers risk score, frames protection as strategic positioning not legal panic
- `capital-protection-email-2-the-window.html` — Day 2: Outlines the 4 scoring dimensions (Evidence Strength, Timeline Advantage, Jurisdictional Simplicity, Legal Positioning), shows time-sensitivity
- `capital-protection-email-3-the-clock.html` — Day 5: Emphasizes what deteriorates with delay (evidence, jurisdiction, leverage), final CTA

**Founder Pressure Scan — Full Diagnostic (3 emails)**
- `full-diagnostic-email-1-the-depth.html` — Day 0: Delivers full diagnostic score across 4 domains (Pressure Load, Nervous System Depletion, Recovery Capacity, Business Dependency)
- `full-diagnostic-email-2-the-pattern.html` — Day 2: Connects domains to show systemic pattern, explains why surface-level fixes fail
- `full-diagnostic-email-3-the-intervention.html` — Day 5: Cost of operating in pressure phase, 4-day desert intervention overview, final CTA

### Narrative Arc per Scan (Same Structure)
1. **Email 1** — Score delivery + decision framing ("This is not information, it's a mirror")
2. **Email 2** — Program/dimension overview + urgency ("You already know, will you act?")
3. **Email 3** — Cost of inaction + final push ("Delay is a decision")

### Output
15 total HTML files in `/mnt/documents/email-templates/`:
- 3 existing Founder Pressure Scan emails (already done)
- 12 new emails across 4 scans
- All using identical HTML structure, styling, and Outlook fixes
- Ready for direct GHL import

### Technical Approach
- Generated via script to `/mnt/documents/email-templates/`
- Each file is standalone HTML — no dependencies
- All GHL merge fields preserved
- Content tailored to each scan's specific dimensions, scoring, and intervention path

