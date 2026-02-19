

## Corporate Audit CTA Section Updates

### Changes

**1. Center-align the paragraph text**
- In `CorporateAuditCTASection.tsx` (line 26): Change `text-left` to `text-center` on the body1 paragraph.

**2. English text updates** (in `LanguageContext.tsx`, line 318-320):
- Remove "No theory. No explanation. Just clarity." from `body1` (last line of the block)
- Replace `body3` value `"7 questions. No fluff. Immediate verdict."` with `"No theory. No explanation. Just clarity."`

**3. Dutch text updates** (in `LanguageContext.tsx`, line 639-641):
- Remove "Geen theorie. Geen uitleg eromheen. Gewoon duidelijkheid." from Dutch `body1` (last line)
- Replace Dutch `body3` value `"7 vragen. Geen opvulling. Onmiddellijk oordeel."` with `"Geen theorie. Geen uitleg eromheen. Gewoon duidelijkheid."`

### Technical Details

Two files modified:
- `src/components/corporate-audit/CorporateAuditCTASection.tsx` -- alignment class change
- `src/lib/i18n/LanguageContext.tsx` -- four string value swaps (EN body1, EN body3, NL body1, NL body3)

