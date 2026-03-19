import { useState, useEffect, useRef } from "react";

interface BookedSlotsResult {
  bookedSlots12h: Set<string>;
  bookedSlots24h: Set<string>;
  isLoading: boolean;
}

export function useBookedSlots(date: Date | null | undefined, calendarId?: string): BookedSlotsResult {
  const [bookedSlots12h, setBookedSlots12h] = useState<Set<string>>(new Set());
  const [bookedSlots24h, setBookedSlots24h] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!date) {
      setBookedSlots12h(new Set());
      setBookedSlots24h(new Set());
      return;
    }

    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    // Abort previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        // Use ghl-booking for availability (GHL calendar is source of truth)
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

        if (!res.ok) {
          console.error("check-availability error:", res.status);
          return;
        }

        const result = await res.json();
        setBookedSlots12h(new Set(result.blocked12h || []));
        setBookedSlots24h(new Set(result.blocked24h || []));
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch booked slots:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Small debounce
    const timer = setTimeout(fetchSlots, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [date?.getFullYear(), date?.getMonth(), date?.getDate(), calendarId]);

  return { bookedSlots12h, bookedSlots24h, isLoading };
}
