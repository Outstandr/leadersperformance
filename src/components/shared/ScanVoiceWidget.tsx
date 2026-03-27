import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, Volume2, Loader2, Send, MessageSquare, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanBookingCalendar, ScanBookingUserInfo } from "./ScanBookingCalendar";

const SCAN_CALENDAR_ID = "Se3SwkYLXfuW52O0F4GX";

interface ScanVoiceWidgetProps {
  mode: "pressure_scan" | "corporate_audit" | "burnout_scan";
  userInfo: ScanBookingUserInfo;
  contextPayload: Record<string, unknown>;
  bookingType: string;
}

export function ScanVoiceWidget({ mode, userInfo, contextPayload, bookingType }: ScanVoiceWidgetProps) {
  const { language } = useLanguage();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ role: "user" | "agent"; text: string }>>([]);
  const [textInput, setTextInput] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const hasAutoStarted = useRef(false);

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
    },
    onDisconnect: () => {
      console.log("Daisy disconnected (scan widget)");
    },
    onMessage: (message: any) => {
      if (message.type === "user_transcript" && message.user_transcription_event?.user_transcript) {
        setTranscript(prev => [...prev, { role: "user", text: message.user_transcription_event.user_transcript }]);
      }
      if (message.type === "agent_response" && message.agent_response_event?.agent_response) {
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

  const startConversation = useCallback(async (textOnly = false) => {
    if (isConnecting || conversation.status === "connected") return;
    setIsConnecting(true);
    setIsTextMode(textOnly);
    try {
      if (!textOnly) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const bodyKey = mode === "pressure_scan" ? "scanContext" : mode === "burnout_scan" ? "burnoutContext" : "auditContext";

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/elevenlabs-voice-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode,
            [bodyKey]: contextPayload,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to get voice credentials");

      const data = await res.json();

      const sessionOpts: any = {};
      if (data.signed_url) {
        sessionOpts.signedUrl = data.signed_url;
      } else if (data.token) {
        sessionOpts.conversationToken = data.token;
        sessionOpts.connectionType = "webrtc";
      } else {
        throw new Error("No credentials received");
      }

      if (textOnly) {
        sessionOpts.textOnly = true;
      }

      await conversation.startSession(sessionOpts);
    } catch (err) {
      console.error("Failed to start Daisy:", err);
      setIsConnecting(false);
    }
  }, [conversation, mode, contextPayload, isConnecting]);

  // Auto-start on mount (voice mode)
  useEffect(() => {
    if (!hasAutoStarted.current) {
      hasAutoStarted.current = true;
      // Don't auto-start, let user choose mode
    }
  }, []);

  const handleSendText = useCallback(() => {
    const msg = textInput.trim();
    if (!msg || conversation.status !== "connected") return;
    conversation.sendUserMessage(msg);
    setTranscript(prev => [...prev, { role: "user", text: msg }]);
    setTextInput("");
  }, [conversation, textInput]);

  const handleBookingComplete = useCallback(() => {
    setBookingConfirmed(true);
    setShowCalendar(false);
    if (conversation.status === "connected") {
      conversation.sendContextualUpdate(
        "The user has just successfully booked an intervention session with Lionel. Congratulate them and end the conversation."
      );
      setTimeout(() => conversation.endSession(), 5000);
    }
  }, [conversation]);

  const isConnected = conversation.status === "connected";
  const isWaitingForAgent = isConnected && isTextMode && transcript.length === 0;

  return (
    <div className="border-t border-foreground/10 bg-background">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {/* Mode selection (not connected, not connecting) */}
        {!isConnected && !isConnecting && (
          <div className="space-y-2">
            <button
              onClick={() => startConversation(false)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-lioner-gold/10 border border-lioner-gold/30 hover:bg-lioner-gold/20 transition-colors rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-lioner-gold/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-lioner-gold" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {language === "nl" ? "Bespreek uw resultaten" : "Discuss your results"}
                </p>
                <p className="text-xs text-foreground/50">
                  {language === "nl" ? "Gebruik uw microfoon" : "Use your microphone"}
                </p>
              </div>
            </button>
            <button
              onClick={() => startConversation(true)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-lioner-gold" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {language === "nl" ? "Bespreek uw resultaten" : "Discuss your results"}
                </p>
                <p className="text-xs text-foreground/50">
                  {language === "nl" ? "Typ uw berichten" : "Type your messages"}
                </p>
              </div>
            </button>
          </div>
        )}

        {isConnecting && (
          <div className="flex items-center justify-center gap-3 py-6">
            <Loader2 className="w-5 h-5 text-lioner-gold animate-spin" />
            <span className="text-sm text-foreground/60">
              {language === "nl" ? "Verbinden..." : "Connecting..."}
            </span>
          </div>
        )}

        {isConnected && (
          <div className="flex flex-col rounded-xl border border-foreground/10 overflow-hidden bg-foreground/[0.02]">
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 bg-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lioner-gold/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-lioner-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Daisy</p>
                  <p className="text-[10px] text-foreground/40">
                    {isTextMode
                      ? language === "nl" ? "Founder Advisor • Chat" : "Founder Advisor • Chat"
                      : conversation.isSpeaking
                        ? language === "nl" ? "Spreekt…" : "Speaking…"
                        : language === "nl" ? "Luistert…" : "Listening…"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isTextMode && conversation.isSpeaking && (
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
                  onClick={() => conversation.endSession()}
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                  title={language === "nl" ? "Stop gesprek" : "End conversation"}
                >
                  <X className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>

            {/* Chat messages area */}
            <div ref={transcriptRef} className="h-72 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {/* Waiting for Daisy's first message */}
              {isWaitingForAgent && (
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
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-lioner-gold/15 border border-lioner-gold/20 text-foreground rounded-tr-sm"
                        : "bg-foreground/5 border border-foreground/10 text-foreground/80 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Text input */}
            <div className="flex gap-2 px-3 py-3 border-t border-foreground/10 bg-foreground/[0.03]">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSendText(); }}
                placeholder={language === "nl" ? "Typ een bericht..." : "Type a message..."}
                className="flex-1 px-4 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-lioner-gold/50"
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
            calendarId={SCAN_CALENDAR_ID}
            onBookingComplete={handleBookingComplete}
            onCancel={() => setShowCalendar(false)}
          />
        )}

        {bookingConfirmed && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
            <p className="text-sm font-semibold text-green-600">
              {language === "nl" ? "Afspraak bevestigd ✓" : "Appointment confirmed ✓"}
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              {language === "nl" ? "U ontvangt een bevestiging per e-mail." : "You'll receive a confirmation email."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
