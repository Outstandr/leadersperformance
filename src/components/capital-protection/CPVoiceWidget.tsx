import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
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
      // Send contextual update with assessment data
      const contextMsg = buildContextMessage();
      if (contextMsg) {
        setTimeout(() => {
          conversation.sendContextualUpdate(contextMsg);
        }, 500);
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

  // Sync isSpeaking
  useEffect(() => {
    setIsSpeaking(conversation.isSpeaking);
  }, [conversation.isSpeaking, setIsSpeaking]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const buildContextMessage = () => {
    const firstName = userInfo.fullName.trim().split(/\s+/)[0];
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

IMPORTANT: Your first message to this user must be exactly: "Hi, this is Daisy from Leaders Performance." Then address them by their first name (${firstName}), and ask if they are happy with their results. Do NOT use a generic opener.

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

SCORING METHODOLOGY:
  The assessment evaluates 5 dimensions with specific weights:
  - Evidence Strength (25%): Based on types of documentation the client has (contracts, transaction records, crypto wallets, emails, legal docs, bank records). More evidence types = higher score.
  - Timeline Advantage (20%): How recently the situation started. Under 3 months = 100%, 3-12 months = 70%, 1-3 years = 40%, 3+ years = 25%. Earlier action = better recovery odds.
  - Jurisdictional Simplicity (15%): Fewer jurisdictions involved = simpler case. 1 country = 100%, 2 = 65%, 3+ = 30%.
  - Legal Positioning (20%): Legal case filed = 100%, lawyer consulted = 60%, no action = 20%.
  - Capital Exposure (20%): Higher exposure = higher strategic value. €20M+ = 100%, €5-20M = 80%, €1-5M = 60%, €500K-1M = 40%, €100-500K = 20%.
  
  Overall score tiers: High (65%+), Moderate (40-64%), Limited (<40%). Consent to strategic review adds 5% bonus.
${aiSection}

IMPORTANT INSTRUCTIONS:
  - The user is viewing their full report on screen. Discuss it proactively and in detail.
  - Reference their specific scores, strengths, and weaknesses naturally.
  - If a dimension scores red (<40%), highlight it as a priority area.
  - If a dimension scores green (70%+), acknowledge it as a strength.
  - Explain what their scores mean practically for their recovery prospects.
  - You can call show_calendar when they want to book a case review with Lionel.
  - Do not ask for contact details — they are already captured.`;
  };

  const handleStart = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

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
        }
      );

      if (!res.ok) throw new Error("Failed to get voice credentials");

      const data = await res.json();

      if (data.signed_url) {
        await conversation.startSession({
          signedUrl: data.signed_url,
        });
      } else if (data.token) {
        await conversation.startSession({
          conversationToken: data.token,
          connectionType: "webrtc",
        });
      } else {
        throw new Error("No credentials received");
      }
    } catch (err) {
      console.error("Failed to start Daisy:", err);
      setIsConnecting(false);
    }
  }, [conversation]);

  const handleBookingComplete = useCallback(() => {
    setBookingConfirmed(true);
    setShowCalendar(false);
    // Notify Daisy and end session after a brief farewell
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
      {/* Main widget area */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {/* Connection / speaking state */}
        {!isConnected && !isConnecting && (
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-lioner-gold/10 border border-lioner-gold/30 hover:bg-lioner-gold/20 transition-colors rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-lioner-gold/20 flex items-center justify-center">
              <Mic className="w-5 h-5 text-lioner-gold" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                {language === "nl" ? "Tik om met Daisy te spreken" : "Tap to speak with Daisy"}
              </p>
              <p className="text-xs text-foreground/50">
                {language === "nl"
                  ? "Bespreek uw resultaten met onze AI adviseur"
                  : "Discuss your results with our AI advisor"}
              </p>
            </div>
          </button>
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
            {/* Status bar */}
            <div className="flex items-center gap-3 py-2">
              <button
                onClick={() => conversation.endSession()}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all bg-lioner-gold/20 hover:bg-red-500/20"
                title={language === "nl" ? "Stop gesprek" : "End conversation"}
              >
                {conversation.isSpeaking ? (
                  <Volume2 className="w-5 h-5 text-lioner-gold animate-pulse" />
                ) : (
                  <MicOff className="w-5 h-5 text-foreground/60" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {conversation.isSpeaking
                    ? language === "nl" ? "Daisy spreekt…" : "Daisy is speaking…"
                    : language === "nl" ? "Daisy luistert…" : "Daisy is listening…"}
                </p>
              </div>
              {conversation.isSpeaking && (
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

            {/* Transcript */}
            {transcript.length > 0 && (
              <div
                ref={transcriptRef}
                className="max-h-32 overflow-y-auto space-y-2 px-1 scrollbar-thin"
              >
                {transcript.map((msg, i) => (
                  <div key={i} className={`text-xs ${msg.role === "agent" ? "text-foreground/70" : "text-foreground/50 italic"}`}>
                    <span className="font-semibold">{msg.role === "agent" ? "Daisy" : "You"}:</span>{" "}
                    {msg.text}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Inline booking calendar */}
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
