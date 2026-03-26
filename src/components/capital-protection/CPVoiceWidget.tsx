import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, Volume2, Loader2, Send, MessageSquare, X } from "lucide-react";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CPBookingCalendar } from "./CPBookingCalendar";
import { CPUserInfo } from "./CPUserInfoStep";
import { CPResult } from "@/lib/capitalProtectionScoring";

interface AIReport {
  situation_summary: string;
  risk_level: string;
  risk_indicators: string[];
  strategic_paths: string[];
  recommended_next_step: string;
  recovery_potential: string;
}

interface CPVoiceWidgetProps {
  userInfo: CPUserInfo;
  result: CPResult;
  aiReport: AIReport | null;
}

export function CPVoiceWidget({ userInfo, result, aiReport }: CPVoiceWidgetProps) {
  const { setIsSpeaking } = useVoiceAgent();
  const { language } = useLanguage();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ role: "user" | "agent"; text: string }>>([]);
  const [textInput, setTextInput] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    clientTools: {
      show_calendar: async () => {
        setShowCalendar(true);
        return "Calendar is now visible on the user's screen. Ask them to pick a date and time that works for them.";
      },
    },
    onConnect: () => {
      console.log("Daisy connected");
      setIsConnecting(false);
      const contextMsg = buildContextMessage();
      if (contextMsg) {
        conversation.sendContextualUpdate(contextMsg);
      }
    },
    onDisconnect: () => {
      console.log("Daisy disconnected");
      setIsSpeaking(false);
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

  useEffect(() => {
    setIsSpeaking(conversation.isSpeaking);
  }, [conversation.isSpeaking, setIsSpeaking]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const buildSessionContext = () => ({
    firstName: userInfo.fullName.trim().split(/\s+/)[0],
    fullName: userInfo.fullName,
    company: userInfo.company,
    role: userInfo.role,
    country: userInfo.country,
    overallScore: result.overallScore,
    overallColor: result.overallColor,
    recoveryPotential: result.recoveryPotential,
    headline: result.headline.en,
    summary: result.body.en,
    nextStep: result.nextStep.en,
    sections: result.sections.map((section) => ({
      label: section.label.en,
      score: section.score,
      color: section.color,
    })),
    aiReport: aiReport ? {
      situation_summary: aiReport.situation_summary,
      risk_level: aiReport.risk_level,
      risk_indicators: aiReport.risk_indicators,
      strategic_paths: aiReport.strategic_paths,
      recommended_next_step: aiReport.recommended_next_step,
      recovery_potential: aiReport.recovery_potential,
    } : null,
  });

  const buildContextMessage = () => {
    const sections = result.sections.map(s => `${s.label.en}: ${s.score}% (${s.color})`).join("\n  ");
    const aiSection = aiReport ? `
AI STRATEGIC REPORT:
  Risk Level: ${aiReport.risk_level}
  Recovery Potential: ${aiReport.recovery_potential}
  Situation Summary: ${aiReport.situation_summary}
  Key Risk Indicators: ${aiReport.risk_indicators?.join("; ")}
  Strategic Paths: ${aiReport.strategic_paths?.join("; ")}
  Recommended Next Step: ${aiReport.recommended_next_step}` : "";

    return `CAPITAL PROTECTION ASSESSMENT — FULL CONTEXT

The user has already completed the Capital Protection Assessment and has already been greeted. They are viewing their report on screen right now. Continue from the report and the capital protection consultation path rather than restarting discovery.

CLIENT PROFILE:
  Name: ${userInfo.fullName}
  Role: ${userInfo.role}
  Company: ${userInfo.company}
  Country: ${userInfo.country}

OVERALL ASSESSMENT:
  Overall Score: ${result.overallScore}%
  Overall Color: ${result.overallColor}
  Recovery Potential: ${result.recoveryPotential}
  Headline: ${result.headline.en}
  Summary: ${result.body.en}
  Recommended Next Step: ${result.nextStep.en}

DIMENSION SCORES:
  ${sections}
${aiSection}

IMPORTANT INSTRUCTIONS:
  - The user is viewing their full report on screen. Discuss it proactively and in detail.
  - Reference their specific scores, strengths, and weaknesses naturally.
  - If a dimension scores red (<40%), highlight it as a priority area.
  - If a dimension scores green (70%+), acknowledge it as a strength.
  - The active route is Capital Protection case review with Lionel unless the user clearly says otherwise.
  - You can call show_calendar when they want to book a case review with Lionel.
  - Do not ask for contact details — they are already captured.`;
  };

  const handleStart = useCallback(async (textOnly = false) => {
    setIsConnecting(true);
    setIsTextMode(textOnly);
    try {
      if (!textOnly) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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
            mode: "capital_protection",
            context: buildSessionContext(),
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
  }, [aiReport, conversation, result, userInfo]);

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
        "The user has just successfully booked a case review appointment with Lionel. The conversation is now ending."
      );
      conversation.endSession();
    }
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="border-t border-foreground/10 bg-background">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {/* Mode selection */}
        {!isConnected && !isConnecting && (
          <div className="space-y-2">
            <button
              onClick={() => handleStart(false)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-lioner-gold/10 border border-lioner-gold/30 hover:bg-lioner-gold/20 transition-colors rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-lioner-gold/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-lioner-gold" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {language === "nl" ? "Spreek met Daisy" : "Speak with Daisy"}
                </p>
                <p className="text-xs text-foreground/50">
                  {language === "nl" ? "Gebruik uw microfoon" : "Use your microphone"}
                </p>
              </div>
            </button>
            <button
              onClick={() => handleStart(true)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-lioner-gold" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {language === "nl" ? "Chat met Daisy" : "Chat with Daisy"}
                </p>
                <p className="text-xs text-foreground/50">
                  {language === "nl" ? "Typ uw berichten" : "Type your messages"}
                </p>
              </div>
            </button>
          </div>
        )}

        {isConnecting && (
          <div className="flex items-center justify-center gap-3 py-4">
            <Loader2 className="w-5 h-5 text-lioner-gold animate-spin" />
            <span className="text-sm text-foreground/60">
              {language === "nl" ? "Verbinden met Daisy..." : "Connecting to Daisy..."}
            </span>
          </div>
        )}

        {isConnected && (
          <>
            <div className="flex items-center gap-3 py-2">
              <button
                onClick={() => conversation.endSession()}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                title={language === "nl" ? "Stop gesprek" : "End conversation"}
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {isTextMode
                    ? language === "nl" ? "Chat met Daisy" : "Chat with Daisy"
                    : conversation.isSpeaking
                      ? language === "nl" ? "Daisy spreekt…" : "Daisy is speaking…"
                      : language === "nl" ? "Daisy luistert…" : "Daisy is listening…"}
                </p>
              </div>
              {!isTextMode && conversation.isSpeaking && (
                <div className="flex items-center gap-0.5 shrink-0">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-lioner-gold rounded-full animate-pulse"
                      style={{ height: `${8 + Math.random() * 12}px`, animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {transcript.length > 0 && (
              <div ref={transcriptRef} className="max-h-48 overflow-y-auto space-y-2 px-1 scrollbar-thin">
                {transcript.map((msg, i) => (
                  <div key={i} className={`text-xs ${msg.role === "agent" ? "text-foreground/70" : "text-foreground/50 italic"}`}>
                    <span className="font-semibold">{msg.role === "agent" ? "Daisy" : "You"}:</span> {msg.text}
                  </div>
                ))}
              </div>
            )}

            {/* Text input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSendText(); }}
                placeholder={language === "nl" ? "Typ een bericht..." : "Type a message..."}
                className="flex-1 px-4 py-2.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-lioner-gold/50"
              />
              <button
                onClick={handleSendText}
                disabled={!textInput.trim()}
                className="px-3 py-2.5 rounded-lg bg-lioner-gold/20 border border-lioner-gold/30 text-lioner-gold hover:bg-lioner-gold/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {showCalendar && !bookingConfirmed && (
          <CPBookingCalendar
            userInfo={userInfo}
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
