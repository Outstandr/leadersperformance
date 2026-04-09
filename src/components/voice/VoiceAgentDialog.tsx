import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { X, Mic, MicOff, PhoneOff, Volume2, Send, Check, CalendarDays, ArrowRight } from "lucide-react";
import { VoiceAgentContextData, useVoiceAgent } from "./VoiceAgentContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface VoiceAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: VoiceAgentContextData;
}

type ConversationStatus = "idle" | "connecting" | "connected" | "ended";

export const VoiceAgentDialog = ({ isOpen, onClose, contextData }: VoiceAgentDialogProps) => {
  const [status, setStatus] = useState<ConversationStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const { setIsSpeaking } = useVoiceAgent();
  const { language } = useLanguage();
  const autoConnectTriggered = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [suggestedScan, setSuggestedScan] = useState<{ label: string; path: string } | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<any>(null);

  const isPressureScan = contextData.mode === "pressure_scan";
  const isCapitalProtection = contextData.mode === "capital_protection";
  const isCorporateAudit = contextData.mode === "corporate_audit";

  const conversation = useConversation({
    clientTools: {
      show_calendar: async (params: any) => {
        console.log("[Daisy] show_calendar tool called", params);
        setShowCalendar(true);
        return "Calendar is now displayed to the user. Ask them to pick a date and time.";
      },
      suggest_scan: async (params: any) => {
        console.log("[Daisy] suggest_scan tool called", params);
        const scanType = params?.scan_type || "founder_pressure";
        const scanMap: Record<string, { label: string; path: string }> = {
          founder_pressure: { label: "Founder Pressure Scan", path: "/pressurescan" },
          profit_leak: { label: "Profit Leak Scan", path: "/profit-leak-scan" },
          capital_protection: { label: "Capital Protection Assessment", path: "/capital-protection" },
        };
        const scan = scanMap[scanType] || scanMap.founder_pressure;
        setSuggestedScan(scan);
        return `The ${scan.label} link is now visible on the user's screen. Tell them to click it when they are ready.`;
      },
    },
    onConnect: () => {
      console.log("[Daisy] Connected successfully");
      setStatus("connected");
      setError(null);

      // Send contextual data to Daisy after connection
      if (isPressureScan && contextData.scanScores && contextData.scanUserInfo) {
        const scores = contextData.scanScores;
        const user = contextData.scanUserInfo;
        const contextMessage = `[CONTEXT — Founders Pressure Scan Results for ${user.fullName} from ${user.company}]
Overall Pressure Score: ${scores.overall}% (${scores.title})
Decision Pressure: ${scores.sections[0].score}%
Founder Dependency: ${scores.sections[1].score}%
Leadership Alignment: ${scores.sections[2].score}%
Execution Momentum: ${scores.sections[3].score}%
Diagnosis: ${scores.diagnosis}
Recommendation: ${scores.recommendation}
[END CONTEXT — Use this to personalize the conversation. Address the visitor by name and reference their specific pressure points.]`;

        setTimeout(() => {
          conversation.sendContextualUpdate(contextMessage);
        }, 500);
      }

      // Capital Protection context
      if (isCapitalProtection && contextData.cpUserInfo) {
        const user = contextData.cpUserInfo;
        const report = contextData.cpReport;
        const result = contextData.cpResult;
        const contextMessage = `[CONTEXT — Capital Protection Assessment Results for ${user.fullName} from ${user.company}]
Recovery Potential: ${result?.recoveryPotential ?? "unknown"}
Risk Level: ${result?.headline?.en ?? "unknown"}
Situation Summary: ${report?.situation_summary ?? "Not available"}
Risk Indicators: ${report?.risk_indicators?.join("; ") ?? "Not available"}
Strategic Paths: ${report?.strategic_paths?.join("; ") ?? "Not available"}
Recommended Next Step: ${report?.recommended_next_step ?? "Schedule a case review with Lionel Eersteling"}
[END CONTEXT — This is a Capital Protection case. The visitor has completed the Capital Protection Assessment. Acknowledge their results, ask if they are happy or if something surprised them, have a genuine strategic conversation about their situation, and ultimately guide them toward booking a 30-minute case review with Lionel Eersteling. Lionel specializes in capital protection and special situations. Use the show_calendar tool when they agree to book.]`;

        setTimeout(() => {
          conversation.sendContextualUpdate(contextMessage);
        }, 500);
      }
    },
    onDisconnect: () => {
      console.log("[Daisy] Disconnected - previous status was:", status);
      setStatus("ended");
    },
    onMessage: (msg: any) => {
      console.log("[Daisy] onMessage:", JSON.stringify(msg));
      let message: string | null = null;
      let role: "user" | "agent" | null = null;

      if (msg?.message && msg?.source) {
        message = msg.message;
        role = msg.source === "user" ? "user" : "agent";
      } else if (msg?.type === "user_transcript") {
        message = msg.user_transcription_event?.user_transcript;
        role = "user";
      } else if (msg?.type === "agent_response") {
        message = msg.agent_response_event?.agent_response;
        role = "agent";
      }

      if (message && role) {
        setTranscript((prev) => [...prev, { role, text: message! }]);

        if (role === "agent") {
          const lower = message.toLowerCase();
          if (
            (lower.includes("email") || lower.includes("e-mail")) &&
            (lower.includes("type") || lower.includes("enter") || lower.includes("share") || lower.includes("provide") || lower.includes("what") || lower.includes("address"))
          ) {
            setShowEmailInput(true);
          }
        }
      }
    },
    onError: (err) => {
      console.error("[Daisy] Voice agent error:", JSON.stringify(err));
      setError("Connection error. Please check your microphone and try again.");
      setStatus("idle");
    },
  });

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setTranscript([]);
      setError(null);
      setIsMuted(false);
      setEmailInput("");
      setShowEmailInput(false);
      setEmailConfirmed(false);
      setTextInput("");
      setIsTextMode(false);
      setShowCalendar(false);
      setSuggestedScan(null);
      autoConnectTriggered.current = false;
    }
  }, [isOpen]);

  // Keep conversation ref updated for cleanup
  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  // Force cleanup on unmount or close
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        try { conversationRef.current.endSession(); } catch (e) { /* ignore */ }
      }
    };
  }, []);

  // Sync isSpeaking to context
  useEffect(() => {
    setIsSpeaking(conversation.isSpeaking ?? false);
  }, [conversation.isSpeaking, setIsSpeaking]);

  // Auto-connect when autoConnect is set
  useEffect(() => {
    if (isOpen && contextData.autoConnect && status === "idle" && !autoConnectTriggered.current) {
      autoConnectTriggered.current = true;
      startConversation();
    }
  }, [isOpen, contextData.autoConnect, status]);

  const submitEmail = useCallback(() => {
    const trimmed = emailInput.trim();
    if (!trimmed) return;
    conversation.sendUserMessage(`My email address is ${trimmed}. Please read it back to me to confirm.`);
    setTranscript((prev) => [...prev, { role: "user", text: trimmed }]);
    setEmailConfirmed(true);
    setShowEmailInput(false);
  }, [conversation, emailInput]);

  const startConversation = useCallback(async (textOnly = false) => {
    setStatus("connecting");
    setError(null);
    setIsTextMode(textOnly);

    try {
      if (!textOnly) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      // Build request body with context for the edge function
      let fetchOptions: RequestInit = {
        method: "GET",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      };

      if (isPressureScan && contextData.scanScores && contextData.scanUserInfo) {
        const scores = contextData.scanScores;
        const user = contextData.scanUserInfo;
        fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            mode: "pressure_scan",
            scanContext: {
              firstName: user.fullName?.split(" ")[0],
              fullName: user.fullName,
              company: user.company,
              phone: user.phone,
              email: user.email,
              overall: scores.overall,
              overallColor: scores.overallColor,
              title: scores.title,
              diagnosis: scores.diagnosis,
              recommendation: scores.recommendation,
              sections: scores.sections,
              primaryBottleneck: {
                dimensionLabel: scores.primaryBottleneck?.dimensionLabel?.en ?? "",
                impact: scores.primaryBottleneck?.impact?.en ?? "",
              },
            },
          }),
        };
      } else if (isCapitalProtection && contextData.cpUserInfo) {
        fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            mode: "capital_protection",
            context: contextData.cpUserInfo,
          }),
        };
      } else if (isCorporateAudit && contextData.auditScores && contextData.auditUserInfo) {
        const scores = contextData.auditScores;
        const user = contextData.auditUserInfo;
        fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            mode: "corporate_audit",
            auditContext: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              disciplineScore: scores.disciplineScore,
              rawScore: scores.rawScore,
              tier: scores.tier,
              overallColor: scores.overallColor,
              diagnosticNarrative: scores.diagnosticNarrative?.en ?? "",
              recommendedNextStep: scores.recommendedNextStep?.en ?? "",
              primaryBottleneck: {
                dimensionLabel: scores.primaryBottleneck?.dimensionLabel?.en ?? "",
                impact: scores.primaryBottleneck?.impact?.en ?? "",
              },
              dimensions: (scores.dimensions ?? []).map((d: any) => ({
                label: d.label?.en ?? d.key,
                score: d.score,
                color: d.color,
              })),
            },
          }),
        };
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-voice-token`,
        fetchOptions
      );

      if (!response.ok) {
        throw new Error("Failed to get voice token");
      }

      const { signed_url, token } = await response.json();
      console.log("[Daisy] Got signed_url:", !!signed_url, "token:", !!token);

      if (!signed_url && !token) {
        throw new Error("No credentials received");
      }

      console.log("[Daisy] Calling startSession...");
      const sessionOptions: any = {};

      if (signed_url) {
        sessionOptions.signedUrl = signed_url;
      } else {
        sessionOptions.conversationToken = token;
      }

      if (textOnly) {
        sessionOptions.overrides = {
          conversation: { textOnly: true },
        };
      }

      const session = await conversation.startSession(sessionOptions);
      console.log("[Daisy] startSession returned:", session);
    } catch (err: any) {
      console.error("Failed to start conversation:", err);
      if (err.name === "NotAllowedError") {
        setError("Microphone access was denied. Please enable it in your browser settings.");
      } else {
        setError(err.message || "Failed to connect. Please try again.");
      }
      setStatus("idle");
    }
  }, [conversation, isPressureScan, isCapitalProtection, isCorporateAudit, contextData]);

  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      console.error("Error ending session:", e);
    }
    setStatus("ended");

    // Build full summary
    const fullSummary = transcript.map((t) => `${t.role === "agent" ? "Daisy" : "User"}: ${t.text}`).join("\n");
    const fullText = transcript.map((t) => t.text).join(" ").toLowerCase();

    // Extract email — prioritize typed input
    const emailMatch = emailInput.trim() || transcript.map((t) => t.text).join(" ").match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
    const email = emailMatch || (isPressureScan ? contextData.scanUserInfo?.email : undefined);

    // Extract first name from transcript or context
    let first_name = isPressureScan ? contextData.scanUserInfo?.fullName.split(" ")[0] || "" : "";
    if (!first_name) {
      for (const t of transcript) {
        if (t.role === "user") {
          const nameMatch = t.text.match(/(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]+)/i);
          if (nameMatch) {
            first_name = nameMatch[1];
            break;
          }
        }
      }
    }

    // Determine recommended path
    let recommended_path = isPressureScan ? "founder_advisory" : "general";
    if (!isPressureScan) {
      if (fullText.includes("business") || fullText.includes("team") || fullText.includes("organization")) {
        recommended_path = "/business";
      } else if (fullText.includes("elite") || fullText.includes("personal") || fullText.includes("executive coaching")) {
        recommended_path = "/elite";
      } else if (fullText.includes("unmasked") || fullText.includes("dubai") || fullText.includes("retreat") || fullText.includes("reset")) {
        recommended_path = "UNMASKED Dubai";
      } else if (fullText.includes("academy") || fullText.includes("lpa") || fullText.includes("course")) {
        recommended_path = "Leaders Performance Academy";
      }
    }

    // Fire lead capture
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-lead-capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            first_name,
            email,
            phone: isPressureScan ? contextData.scanUserInfo?.phone : undefined,
            recommended_path,
            conversation_summary: fullSummary.slice(0, 2000),
          }),
        }
      );
    } catch (e) {
      console.error("Lead capture failed:", e);
    }
  }, [conversation, transcript, emailInput, isPressureScan, contextData]);

  const toggleMute = useCallback(async () => {
    const newVol = isMuted ? 1 : 0;
    await conversation.setVolume({ volume: newVol });
    setIsMuted(!isMuted);
  }, [conversation, isMuted]);

  const handleSendText = useCallback(() => {
    const msg = textInput.trim();
    if (!msg || status !== "connected") return;
    conversation.sendUserMessage(msg);
    setTranscript(prev => [...prev, { role: "user", text: msg }]);
    setTextInput("");
  }, [conversation, textInput, status]);

  if (!isOpen) return null;

  const idleTitle = language === "nl"
    ? "Ontdek hier de mogelijkheden"
    : "Discover the possibilities here";
  const idleSubtitle = isPressureScan
    ? "Tap Start Conversation to enable microphone access. Daisy will walk you through your pressure scan findings and the right next step."
    : isCapitalProtection
    ? "Tap Start Conversation to enable microphone access. Daisy will review your assessment and talk through the strategic next step."
    : "Tap Start Conversation to enable microphone access.";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={status === "idle" || status === "ended" ? onClose : undefined}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md mx-4 bg-[#0a0a0a] border border-[#b39758]/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Gold accent top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#b39758]/20 via-[#b39758] to-[#b39758]/20" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#b39758] uppercase font-medium">
              Leaders Performance
            </p>
            <h2 className="text-white font-semibold text-lg leading-tight mt-0.5">
              {language === "nl" ? "Laat je begeleiden" : "Let yourself be guided"}
            </h2>
          </div>
          <button
            onClick={async () => {
              try { await conversation.endSession(); } catch (e) { /* ignore */ }
              setStatus("idle");
              setIsSpeaking(false);
              onClose();
            }}
            className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main content area */}
        <div className="px-6 pb-6">
          {/* Idle state */}
          {status === "idle" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-[#b39758]/10 border border-[#b39758]/30 flex items-center justify-center mx-auto mb-6">
                <Mic className="w-8 h-8 text-[#b39758]" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                {idleTitle}
              </p>
              <p className="text-white/40 text-xs mb-8">
                {idleSubtitle}
              </p>
              {error && (
                <p className="text-red-400 text-xs mb-4 bg-red-400/10 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => startConversation(false)}
                  className="w-full py-3.5 rounded-xl bg-[#b39758] text-black font-semibold text-sm tracking-wide hover:bg-[#c9aa6a] transition-all flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                   {isPressureScan || isCapitalProtection || isCorporateAudit || contextData.mode === "profit_leak"
                     ? (language === "nl" ? "Bespreek uw resultaten" : "Discuss Your Results")
                     : (language === "nl" ? "Spreek met een adviseur" : "Discuss with an Advisor")}
                </button>
                <button
                  onClick={() => startConversation(true)}
                  className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-semibold text-sm tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isPressureScan || isCapitalProtection || isCorporateAudit || contextData.mode === "profit_leak"
                    ? (language === "nl" ? "Chat over uw resultaten" : "Discuss via Chat")
                    : (language === "nl" ? "Chat met een adviseur" : "Chat with an Advisor")}
              </div>
            </div>
          )}

          {/* Connecting state */}
          {status === "connecting" && (
            <div className="text-center py-12">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-[#b39758]/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border-2 border-[#b39758]/50 animate-ping animation-delay-150" />
                <div className="relative w-full h-full rounded-full bg-[#b39758]/10 border border-[#b39758]/40 flex items-center justify-center">
                  <Mic className="w-7 h-7 text-[#b39758]" />
                </div>
              </div>
              <p className="text-white/60 text-sm">Connecting…</p>
            </div>
          )}

          {/* Connected state */}
          {status === "connected" && (
            <div>
              {/* Voice visualizer (only in voice mode) */}
              {!isTextMode && (
                <div className="flex items-center justify-center gap-1.5 h-16 mb-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        conversation.isSpeaking
                          ? "bg-[#b39758]"
                          : "bg-[#b39758]/30"
                      }`}
                      style={{
                        height: conversation.isSpeaking
                          ? `${Math.random() * 32 + 8}px`
                          : "6px",
                        animationDelay: `${i * 50}ms`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-white/50 text-xs">
                  {isTextMode
                    ? language === "nl" ? "Spreek met een adviseur" : "Speak to an advisor"
                    : conversation.isSpeaking ? "Daisy is speaking…" : "Listening…"}
                </p>
              </div>

              {/* Transcript */}
              {transcript.length > 0 && (
                <div ref={transcriptRef} className="max-h-40 overflow-y-auto space-y-2 mb-4 px-1 scrollbar-thin">
                  {transcript.map((msg, i) => (
                    <div key={i} className={`text-xs ${msg.role === "agent" ? "text-white/70" : "text-white/50 italic"}`}>
                      <span className="font-semibold">{msg.role === "agent" ? "Daisy" : "You"}:</span> {msg.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Text input — only in text mode */}
              {isTextMode && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSendText(); }}
                    placeholder={language === "nl" ? "Typ een bericht..." : "Type a message..."}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#b39758]/50"
                    autoFocus
                  />
                  <button
                    onClick={handleSendText}
                    disabled={!textInput.trim()}
                    className="px-3 rounded-xl bg-[#b39758]/20 border border-[#b39758]/30 text-[#b39758] hover:bg-[#b39758]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Email input */}
              {showEmailInput && !emailConfirmed && (
                <div className="mb-4">
                  <p className="text-[#b39758] text-xs mb-2 font-medium">Type your email below:</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#b39758]/50"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && emailInput.trim()) {
                          submitEmail();
                        }
                      }}
                      autoFocus
                    />
                    {emailInput && (
                      <button
                        onClick={submitEmail}
                        className="px-3 rounded-xl bg-[#b39758]/20 border border-[#b39758]/30 text-[#b39758] hover:bg-[#b39758]/30 transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {emailConfirmed && (
                <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs">Email sent to Daisy for confirmation</span>
                </div>
              )}

              {showCalendar && (
                <div className="mb-4 p-3 rounded-xl bg-white/5 border border-[#b39758]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="w-4 h-4 text-[#b39758]" />
                    <span className="text-white/80 text-xs font-medium">
                      {language === "nl" ? "Plan een gesprek" : "Schedule a session"}
                    </span>
                  </div>
                  <a
                    href="https://api.leadconnectorhq.com/widget/booking/uebxQpVIy9vX7tR5rL9E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 rounded-lg bg-[#b39758] text-black text-xs font-semibold text-center hover:bg-[#c9aa6a] transition-all"
                  >
                    {language === "nl" ? "Open agenda" : "Open Calendar"}
                  </a>
                </div>
              )}

              {suggestedScan && (
                <div className="mb-4 p-3 rounded-xl bg-white/5 border border-[#b39758]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-[#b39758]" />
                    <span className="text-white/80 text-xs font-medium">
                      {language === "nl" ? "Aanbevolen scan" : "Recommended Scan"}
                    </span>
                  </div>
                  <a
                    href={suggestedScan.path}
                    onClick={(e) => { e.preventDefault(); onClose(); window.location.href = suggestedScan.path; }}
                    className="block w-full py-2.5 rounded-lg bg-[#b39758] text-black text-xs font-semibold text-center hover:bg-[#c9aa6a] transition-all"
                  >
                    {suggestedScan.label}
                  </a>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3">
                {!isTextMode && (
                  <button
                    onClick={toggleMute}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all border ${
                      isMuted
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                )}
                <button
                  onClick={endConversation}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  {language === "nl" ? "Stop" : "End"}
                </button>
              </div>
            </div>
          )}

          {/* Ended state */}
          {status === "ended" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#b39758]/10 border border-[#b39758]/30 flex items-center justify-center mx-auto mb-5">
                <PhoneOff className="w-6 h-6 text-[#b39758]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Conversation Complete</h3>
              <p className="text-white/50 text-sm mb-6">
                Your path recommendation has been saved. Explore the links below or book a session.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => startConversation(false)}
                  className="w-full py-3 rounded-xl bg-[#b39758]/10 border border-[#b39758]/30 text-[#b39758] text-sm font-medium hover:bg-[#b39758]/20 transition-all"
                >
                  Start New Conversation
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
