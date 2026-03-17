

## Plan: Move "About Leaders Performance" pill and tagline down by 50px

In `src/pages/Index.tsx`, increase the top padding on the flex container holding the pill and tagline. Currently it has `py-4`. I'll change it to add `pt-[50px]` (or adjust the existing padding) to push it down by 50px.

**File:** `src/pages/Index.tsx`
- Change the `div` wrapping the pill and tagline from `py-4` to `pt-[54px] pb-4` (adding ~50px to the top).

