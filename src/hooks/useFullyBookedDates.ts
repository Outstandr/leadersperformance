import { useState, useEffect, useRef } from "react";

const TIME_SLOTS_24H = ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00"];

/**
 * Fetches availability for each weekday of the given month and returns a Set
 * of date-strings (YYYY-MM-DD) that are fully booked (all time slots taken).
 */
export function useFullyBookedDates(visibleMonth: Date | undefined, calendarId?: string): {
  fullyBookedDates: Set<string>;
  isLoading: boolean;
} {
  const [fullyBookedDates, setFullyBookedDates] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const year = visibleMonth?.getFullYear();
  const month = visibleMonth?.getMonth();

  useEffect(() => {
    if (year == null || month == null) return;

    // Cancel previous batch
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchMonth = async () => {
      setIsLoading(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Collect weekdays in this month (skip past dates and weekends)
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const datesToCheck: string[] = [];

      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        if (date < today) continue; // skip past
        const dow = date.getDay();
        if (dow === 0 || dow === 6) continue; // skip weekends
        const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        datesToCheck.push(ds);
      }

      if (datesToCheck.length === 0) {
        setFullyBookedDates(new Set());
        setIsLoading(false);
        return;
      }

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const booked = new Set<string>();

      // Fetch availability for each date (parallel, max 6 concurrent)
      const batchSize = 6;
      for (let i = 0; i < datesToCheck.length; i += batchSize) {
        if (controller.signal.aborted) return;
        const batch = datesToCheck.slice(i, i + batchSize);
        const results = await Promise.allSettled(
          batch.map(async (dateStr) => {
            const calParam = calendarId ? `&calendarId=${calendarId}` : "";
            const res = await fetch(
              `https://${projectId}.supabase.co/functions/v1/ghl-booking?date=${dateStr}${calParam}`,
              {
                headers: {
                  Authorization: `Bearer ${anonKey}`,
                  apikey: anonKey,
                },
                signal: controller.signal,
              }
            );
            if (!res.ok) return null;
            const data = await res.json();
            const blocked = new Set<string>(data.blocked24h || []);
            const allBlocked = TIME_SLOTS_24H.every((s) => blocked.has(s));
            if (allBlocked) booked.add(dateStr);
          })
        );
      }

      if (!controller.signal.aborted) {
        setFullyBookedDates(new Set(booked));
        setIsLoading(false);
      }
    };

    fetchMonth();

    return () => {
      controller.abort();
    };
  }, [year, month]);

  return { fullyBookedDates, isLoading };
}
