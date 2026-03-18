import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { useBookedSlots } from "@/hooks/useBookedSlots";
import { useFullyBookedDates } from "@/hooks/useFullyBookedDates";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CPUserInfo } from "./CPUserInfoStep";
import { cn } from "@/lib/utils";

interface CPBookingCalendarProps {
  userInfo: CPUserInfo;
  onBookingComplete: () => void;
  onCancel: () => void;
}

const TIME_SLOTS = [
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "4:00 PM", value: "16:00" },
  { label: "5:00 PM", value: "17:00" },
];

export function CPBookingCalendar({ userInfo, onBookingComplete, onCancel }: CPBookingCalendarProps) {
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());

  const { bookedSlots24h, isLoading: slotsLoading } = useBookedSlots(selectedDate ?? null);
  const { fullyBookedDates } = useFullyBookedDates(visibleMonth);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) return;
    setIsBooking(true);
    setError(null);

    try {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateTime = `${year}-${month}-${day}T${selectedSlot}:00`;

      const nameParts = userInfo.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || userInfo.fullName;
      const lastName = nameParts.slice(1).join(" ") || "-";

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/ghl-booking`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email: userInfo.email,
            phone: userInfo.phone,
            dateTime,
            bookingType: "Capital Protection",
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      onBookingComplete();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="border border-lioner-gold/30 rounded-lg p-4 bg-lioner-gold/5 space-y-4">
      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
        {language === "nl" ? "Plan een casebeoordeling" : "Schedule a Case Review"}
      </h4>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(d) => {
          setSelectedDate(d);
          setSelectedSlot(null);
        }}
        onMonthChange={(m) => setVisibleMonth(m)}
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today || isWeekend(date)) return true;
          // Disable fully booked dates
          const y = date.getFullYear();
          const mo = String(date.getMonth() + 1).padStart(2, "0");
          const da = String(date.getDate()).padStart(2, "0");
          const dateStr = `${y}-${mo}-${da}`;
          return fullyBookedDates.has(dateStr);
        }}
        className={cn("p-3 pointer-events-auto mx-auto")}
      />

      {selectedDate && (
        <div className="space-y-2">
          <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider">
            {language === "nl" ? "Beschikbare tijden" : "Available times"} (Dubai, GMT+4)
          </p>
          {slotsLoading ? (
            <div className="flex items-center gap-2 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
              <span className="text-xs text-foreground/40">
                {language === "nl" ? "Beschikbaarheid laden..." : "Loading availability..."}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedSlots24h.has(slot.value);
                const isSelected = selectedSlot === slot.value;
                return (
                  <button
                    key={slot.value}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot.value)}
                    className={cn(
                      "py-2 px-3 text-xs font-medium border rounded transition-colors",
                      isBooked
                        ? "bg-foreground/5 border-foreground/10 text-foreground/30 cursor-not-allowed"
                        : isSelected
                        ? "bg-lioner-gold text-white border-lioner-gold"
                        : "bg-background border-foreground/20 text-foreground hover:border-lioner-gold/50"
                    )}
                  >
                    {slot.label}
                    {isBooked && (
                      <span className="block text-[10px] text-foreground/20">
                        {language === "nl" ? "Bezet" : "Taken"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-foreground/50"
        >
          {language === "nl" ? "Annuleren" : "Cancel"}
        </Button>
        <Button
          size="sm"
          disabled={!selectedDate || !selectedSlot || isBooking}
          onClick={handleBook}
          className="flex-1 bg-lioner-gold hover:bg-lioner-gold/90 text-white"
        >
          {isBooking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Check className="w-4 h-4 mr-1" />
              {language === "nl" ? "Bevestigen" : "Confirm Booking"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
