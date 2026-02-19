

## Business Page Text Updates

### Changes Overview

**English translations** (in `src/lib/i18n/LanguageContext.tsx`):

1. **"The Arsenal" -> "The Process"** (line 278)
   - `business.process.eyebrow`: `"The Arsenal"` -> `"The Process"`

2. **"doctrine" -> "Academy"** (line 281)
   - `business.process.item1.desc`: `"Lifetime access to the core doctrine for your entire team."` -> `"Lifetime access to the core Academy for your entire team."`

3. **"The Company Culture Report" -> "The Company Culture"** and **"Copy-paste" -> "Implement"** (lines 282-283)
   - `business.process.item2.title`: `"The Company Culture Report"` -> `"The Company Culture"`
   - `business.process.item2.desc`: `"Copy-paste our specific..."` -> `"Implement our specific..."`

4. **Audit last sentence** (line 285)
   - `business.process.item3.desc`: Change ending to `"Every employee will be assessed individually."`
   - New value: `"Increase your team's effectiveness. Ultimately, it's all about the team achieving the results it was created to achieve. Every employee will be assessed individually."`

5. **Kickoff description** (line 287)
   - `business.process.item4.desc`: `"A 90-Minute \"Hard Reset\" Strategy Call to deploy the system."` -> `"In a 90-minute strategy call we implement the new system."`

**Dutch translations** -- Testimonials in English (lines 613-614):

6. **Dutch testimonial quotes kept in English**
   - `business.results.quote1` (NL): Use the English version: `"We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to lead instead of manage."`
   - `business.results.quote2` (NL): Use the English version: `"Lionel didn't motivate my team. He scared them straight. Best investment we made."`

### Technical Details

All changes are string value updates in `src/lib/i18n/LanguageContext.tsx`. No structural or component changes needed.

