import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, Volume2, Loader2, Send, MessageSquare, X, MicOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanBookingCalendar, ScanBookingUserInfo, BookingDetails } from "./ScanBookingCalendar";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_CALENDAR_ID = "Se3SwkYLXfuW52O0F4GX";
const WEBHOOK_TIMEOUT_MS = 10 * 60 * 1000;

interface ScanVoiceWidgetProps {
  mode: "pressure_scan" | "corporate_audit" | "burnout_scan" | "profit_leak" | "capital_protection";
  userInfo: ScanBookingUserInfo;
  contextPayload: Record<string, unknown>;
  bookingType: string;
  webhookPayload?: Record<string, unknown>;
  calendarId?: string;
}

export function ScanVoiceWidget({ mode, userInfo, contextPayload, bookingType, webhookPayload, calendarId = DEFAULT_CALENDAR_ID }: ScanVoiceWidgetProps) {
  const { language } = useLanguage();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const bookingDetailsRef = useRef<BookingDetails | null>(null);
  const [transcript, setTranscript] = useState<Array<{ role: "user" | "agent"; text: string }>>([]);
  const [textInput, setTextInput] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const webhookFired = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const daisyEverConnected = useRef(false);
  const showCalendarRef = useRef(false);
  const bookingConfirmedRef = useRef(false);
  const waitingForBookingOutcomeRef = useRef(false);

  // Fire the GHL webhook for booking updates only
  const fireWebhook = useCallback(() => {
    if (webhookFired.current || !webhookPayload) return;
    webhookFired.current = true;
    const currentBooking = bookingDetailsRef.current;
    if (!currentBooking) {
      console.log("No booking — skipping webhook (results email already sent)");
      return;
    }
    console.log("Booking update already handled by ghl-booking", JSON.stringify({ audit_type: (webhookPayload as any).audit_type, booked: true }));
  }, [webhookPayload]);

  useEffect(() => { showCalendarRef.current = showCalendar; }, [showCalendar]);
  useEffect(() => { bookingConfirmedRef.current = bookingConfirmed; }, [bookingConfirmed]);

  useEffect(() => {
    if (!webhookPayload) return;
    const scheduleWebhookCheck = (delay: number) => {
      timeoutRef.current = setTimeout(() => {
        if (webhookFired.current) return;
        if (showCalendarRef.current && !bookingConfirmedRef.current) {
          waitingForBookingOutcomeRef.current = true;
          scheduleWebhookCheck(60 * 1000);
          return;
        }
        fireWebhook();
      }, delay);
    };
    scheduleWebhookCheck(WEBHOOK_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!webhookFired.current && webhookPayload) fireWebhook();
    };
  }, [webhookPayload, fireWebhook]);

  // -- Conversation hook --
  const conversation = useConversation({
    clientTools: {
      show_calendar: async () => {
        setShowCalendar(true);
        return "Calendar is now visible on the user's screen. Ask them to pick a date and time that works for them.";
      },
    },
    onConnect: () => {
      console.log("Daisy connected (scan widget)");
      setIsConnecting(false);
      daisyEverConnected.current = true;
    },
    onDisconnect: () => {
      console.log("Daisy disconnected (scan widget)");
      if (daisyEverConnected.current) {
        setTimeout(() => {
          if (showCalendarRef.current && !bookingConfirmedRef.current) {
            waitingForBookingOutcomeRef.current = true;
            return;
          }
          fireWebhook();
        }, 500);
      }
    },
    onMessage: (message: any) => {
      // Handle all message formats from ElevenLabs
      if (message?.message && message?.source) {
        const role = message.source === "user" ? "user" as const : "agent" as const;
        setTranscript(prev => [...prev, { role, text: message.message }]);
      } else if (message.type === "user_transcript" && message.user_transcription_event?.user_transcript) {
        setTranscript(prev => [...prev, { role: "user", text: message.user_transcription_event.user_transcript }]);
      } else if (message.type === "agent_response" && message.agent_response_event?.agent_response) {
        setTranscript(prev => [...prev, { role: "agent", text: message.agent_response_event.agent_response }]);
      }
    },
    onError: (error: any) => {
      console.error("Daisy error:", error);
      setIsConnecting(false);
    },
  });

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const startConversation = useCallback(async (textOnly: boolean) => {
    if (isConnecting || conversation.status === "connected") return;
    setIsConnecting(true);
    setIsTextMode(textOnly);
    setTranscript([]);

    try {
      // Only request mic for voice mode
      if (!textOnly) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("[Daisy] Microphone permission granted");
      }

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const bodyKey = mode === "pressure_scan" ? "scanContext" : mode === "burnout_scan" ? "burnoutContext" : mode === "profit_leak" ? "profitLeakContext" : mode === "capital_protection" ? "context" : "auditContext";

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/elevenlabs-voice-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mode, [bodyKey]: contextPayload }),
        }
      );

      if (!res.ok) throw new Error("Failed to get voice credentials");
      const data = await res.json();

      // Build session options — VOICE and TEXT are completely separate
      const sessionOpts: any = {};

      if (data.signed_url) {
        sessionOpts.signedUrl = data.signed_url;
      } else if (data.token) {
        sessionOpts.conversationToken = data.token;
        sessionOpts.connectionType = "webrtc";
      } else {
        throw new Error("No credentials received");
      }

      // TEXT MODE: nest textOnly under overrides.conversation
      if (textOnly) {
        sessionOpts.overrides = {
          conversation: { textOnly: true },
        };
      }

      console.log("[Daisy] Starting session, textOnly:", textOnly);
      await conversation.startSession(sessionOpts);
    } catch (err: any) {
      console.error("Failed to start Daisy:", err);
      if (err.name === "NotAllowedError") {
        console.error("[Daisy] Microphone permission denied");
      }
      setIsConnecting(false);
    }
  }, [conversation, mode, contextPayload, isConnecting]);

  const handleSendText = useCallback(() => {
    const msg = textInput.trim();
    if (!msg || conversation.status !== "connected") return;
    conversation.sendUserMessage(msg);
    setTranscript(prev => [...prev, { role: "user", text: msg }]);
    setTextInput("");
  }, [conversation, textInput]);

  const toggleMute = useCallback(async () => {
    const newVol = isMuted ? 1 : 0;
    await conversation.setVolume({ volume: newVol });
    setIsMuted(!isMuted);
  }, [conversation, isMuted]);

  const handleEndConversation = useCallback(async () => {
    try { await conversation.endSession(); } catch (e) { console.error(e); }
  }, [conversation]);

  const handleBookingComplete = useCallback((details: BookingDetails) => {
    setBookingDetails(details);
    bookingDetailsRef.current = details;
    setBookingConfirmed(true);
    bookingConfirmedRef.current = true;
    setShowCalendar(false);
    showCalendarRef.current = false;
    waitingForBookingOutcomeRef.current = false;
    fireWebhook();
    if (conversation.status === "connected") {
      conversation.sendContextualUpdate(
        "The user has just successfully booked a session with Lionel. Congratulate them warmly, then ask if there is anything else you can help them with."
      );
    }
  }, [conversation, fireWebhook]);

  const handleCalendarCancel = useCallback(() => {
    setShowCalendar(false);
    showCalendarRef.current = false;
    if (waitingForBookingOutcomeRef.current && !webhookFired.current) {
      waitingForBookingOutcomeRef.current = false;
      fireWebhook();
    }
  }, [fireWebhook]);

  const isConnected = conversation.status === "connected";
  const isIdle = !isConnected && !isConnecting;

  return (
    <div className="border-t border-foreground/10 bg-background">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">

        {/* ── IDLE: Two separate buttons ── */}
        {isIdle && (
          <div className="space-y-2">
            <button
              onClick={() => startConversation(false)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-lioner-gold/10 border border-lioner-gold/30 hover:bg-lioner-gold/20 transition-colors rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-lioner-gold/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-lioner-gold" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {language === "nl" ? "Spreek met Daisy" : "Speak to Daisy"}
              </p>
            </button>
            <button
              onClick={() => startConversation(true)}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-foreground/60" />
              </div>
              <p className="text-sm font-medium text-foreground/70">
                {language === "nl" ? "Chat met Daisy" : "Chat with Daisy"}
              </p>
            </button>
          </div>
        )}

        {/* ── CONNECTING ── */}
        {isConnecting && (
          <div className="flex items-center justify-center gap-3 py-6">
            <Loader2 className="w-5 h-5 text-lioner-gold animate-spin" />
            <span className="text-sm text-foreground/60">
              {language === "nl" ? "Verbinden..." : "Connecting..."}
            </span>
          </div>
        )}

        {/* ── CONNECTED: VOICE MODE ── */}
        {isConnected && !isTextMode && (
          <div className="flex flex-col rounded-xl border border-foreground/10 overflow-hidden bg-foreground/[0.02]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 bg-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lioner-gold/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-lioner-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Daisy</p>
                  <p className="text-[10px] text-foreground/40">
                    {conversation.isSpeaking
                      ? language === "nl" ? "Spreekt…" : "Speaking…"
                      : language === "nl" ? "Luistert…" : "Listening…"}
                  </p>
                </div>
              </div>
              {/* Audio visualizer */}
              <div className="flex items-center gap-2">
                {conversation.isSpeaking && (
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-lioner-gold rounded-full animate-pulse"
                        style={{ height: `${8 + Math.random() * 12}px`, animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={handleEndConversation}
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                  title={language === "nl" ? "Stop gesprek" : "End conversation"}
                >
                  <X className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>

            {/* Voice transcript (read-only) */}
            {transcript.length > 0 && (
              <div ref={transcriptRef} className="max-h-48 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin">
                {transcript.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "agent" && (
                      <div className="w-6 h-6 rounded-full bg-lioner-gold/20 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                        <Mic className="w-3 h-3 text-lioner-gold" />
                      </div>
                    )}
                    <div className={`px-3 py-2 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-lioner-gold/15 border border-lioner-gold/20 text-foreground rounded-tr-sm"
                        : "bg-foreground/5 border border-foreground/10 text-foreground/80 rounded-tl-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Voice controls — NO text input here */}
            <div className="flex gap-2 px-3 py-3 border-t border-foreground/10 bg-foreground/[0.03]">
              <button
                onClick={toggleMute}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  isMuted
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-foreground/5 border-foreground/10 text-foreground/70 hover:bg-foreground/10"
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isMuted ? (language === "nl" ? "Unmute" : "Unmute") : (language === "nl" ? "Mute" : "Mute")}
              </button>
              <button
                onClick={handleEndConversation}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
              >
                <X className="w-4 h-4" />
                {language === "nl" ? "Stop" : "End"}
              </button>
            </div>
          </div>
        )}

        {/* ── CONNECTED: TEXT MODE ── */}
        {isConnected && isTextMode && (
          <div className="flex flex-col rounded-xl border border-foreground/10 overflow-hidden bg-foreground/[0.02]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 bg-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lioner-gold/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-lioner-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Daisy</p>
                  <p className="text-[10px] text-foreground/40">Founder Advisor • Chat</p>
                </div>
              </div>
              <button
                onClick={handleEndConversation}
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
              >
                <X className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>

            {/* Chat messages */}
            <div ref={transcriptRef} className="h-72 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {transcript.length === 0 && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-lioner-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-3 h-3 text-lioner-gold" />
                  </div>
                  <div className="bg-foreground/5 border border-foreground/10 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-lioner-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-lioner-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-lioner-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              {transcript.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "agent" && (
                    <div className="w-6 h-6 rounded-full bg-lioner-gold/20 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                      <MessageSquare className="w-3 h-3 text-lioner-gold" />
                    </div>
                  )}
                  <div className={`px-3 py-2 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-lioner-gold/15 border border-lioner-gold/20 text-foreground rounded-tr-sm"
                      : "bg-foreground/5 border border-foreground/10 text-foreground/80 rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Text input — ONLY in text mode */}
            <div className="flex gap-2 px-3 py-3 border-t border-foreground/10 bg-foreground/[0.03]">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSendText(); }}
                placeholder={language === "nl" ? "Typ een bericht..." : "Type a message..."}
                className="flex-1 px-4 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-lioner-gold/50"
                autoFocus
              />
              <button
                onClick={handleSendText}
                disabled={!textInput.trim()}
                className="w-10 h-10 rounded-full bg-lioner-gold/20 border border-lioner-gold/30 text-lioner-gold hover:bg-lioner-gold/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Inline booking calendar */}
        {showCalendar && !bookingConfirmed && (
          <ScanBookingCalendar
            userInfo={userInfo}
            bookingType={bookingType}
            calendarId={calendarId}
            onBookingComplete={handleBookingComplete}
            onCancel={handleCalendarCancel}
          />
        )}

        {bookingConfirmed && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
            <p className="text-sm font-semibold text-foreground">
              {language === "nl" ? "Sessie ingepland" : "Session Booked"}
            </p>
            <p className="text-xs text-foreground/60 mt-1">
              {language === "nl" ? "Je ontvangt een bevestiging per e-mail." : "You'll receive a confirmation email shortly."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
