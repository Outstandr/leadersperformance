import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { X, Mic, MicOff, PhoneOff, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VoiceAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConversationStatus = "idle" | "connecting" | "connected" | "ended";

export const VoiceAgentDialog = ({ isOpen, onClose }: VoiceAgentDialogProps) => {
  const [status, setStatus] = useState<ConversationStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      setStatus("connected");
      setError(null);
    },
    onDisconnect: () => {
      setStatus("ended");
    },
    onMessage: (msg: any) => {
      // Capture transcripts for display
      if (msg.type === "user_transcript") {
        const text = msg.user_transcription_event?.user_transcript;
        if (text) setTranscript((prev) => [...prev, { role: "user", text }]);
      }
      if (msg.type === "agent_response") {
        const text = msg.agent_response_event?.agent_response;
        if (text) setTranscript((prev) => [...prev, { role: "agent", text }]);
      }
    },
    onError: (err) => {
      console.error("Voice agent error:", err);
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
    }
  }, [isOpen]);

  const startConversation = useCallback(async () => {
    setStatus("connecting");
    setError(null);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-voice-token`,
        {
          method: "GET",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get voice token");
      }

      const { token } = await response.json();

      await conversation.startSession({
        conversationToken: token,
        connectionType: "webrtc",
      });
    } catch (err: any) {
      console.error("Failed to start conversation:", err);
      if (err.name === "NotAllowedError") {
        setError("Microphone access was denied. Please enable it in your browser settings.");
      } else {
        setError(err.message || "Failed to connect. Please try again.");
      }
      setStatus("idle");
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    await conversation.endSession();
    setStatus("ended");

    // Capture lead from transcript
    const fullSummary = transcript.map((t) => `${t.role === "agent" ? "Lionel" : "User"}: ${t.text}`).join("\n");

    // Extract basic info heuristically from transcript text
    const fullText = transcript.map((t) => t.text).join(" ").toLowerCase();

    // Try to find email pattern
    const emailMatch = transcript.map((t) => t.text).join(" ").match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : undefined;

    // Determine recommended path from conversation
    let recommended_path = "general";
    if (fullText.includes("business") || fullText.includes("team") || fullText.includes("organization")) {
      recommended_path = "/business";
    } else if (fullText.includes("elite") || fullText.includes("personal") || fullText.includes("executive coaching")) {
      recommended_path = "/elite";
    } else if (fullText.includes("unmasked") || fullText.includes("dubai") || fullText.includes("retreat") || fullText.includes("reset")) {
      recommended_path = "UNMASKED Dubai";
    } else if (fullText.includes("academy") || fullText.includes("lpa") || fullText.includes("course")) {
      recommended_path = "Leaders Performance Academy";
    }

    if (email || fullSummary.length > 50) {
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
              email,
              recommended_path,
              conversation_summary: fullSummary.slice(0, 2000),
            }),
          }
        );
      } catch (e) {
        console.error("Lead capture failed:", e);
      }
    }
  }, [conversation, transcript]);

  const toggleMute = useCallback(async () => {
    const newVol = isMuted ? 1 : 0;
    await conversation.setVolume({ volume: newVol });
    setIsMuted(!isMuted);
  }, [conversation, isMuted]);

  if (!isOpen) return null;

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
              Your Path Advisor
            </h2>
          </div>
          <button
            onClick={async () => {
              if (status === "connected") await endConversation();
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
                Speak with our AI advisor to discover the path that fits your goals.
              </p>
              <p className="text-white/40 text-xs mb-8">
                Microphone access required
              </p>
              {error && (
                <p className="text-red-400 text-xs mb-4 bg-red-400/10 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}
              <button
                onClick={startConversation}
                className="w-full py-3.5 rounded-xl bg-[#b39758] text-black font-semibold text-sm tracking-wide hover:bg-[#c9aa6a] transition-all"
              >
                Start Conversation
              </button>
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
              {/* Voice visualizer */}
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

              <div className="text-center mb-4">
                <p className="text-white/50 text-xs">
                  {conversation.isSpeaking ? "Lionel is speaking…" : "Listening…"}
                </p>
              </div>

              {/* Transcript */}
              {transcript.length > 0 && (
                <div
                  ref={transcriptRef}
                  className="bg-white/5 rounded-xl p-4 max-h-40 overflow-y-auto mb-4 space-y-2"
                >
                  {transcript.map((line, i) => (
                    <div
                      key={i}
                      className={`text-xs leading-relaxed ${
                        line.role === "agent" ? "text-[#b39758]/90" : "text-white/70"
                      }`}
                    >
                      <span className="font-semibold uppercase text-[10px] tracking-widest opacity-60 mr-2">
                        {line.role === "agent" ? "Lionel" : "You"}
                      </span>
                      {line.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3">
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
                <button
                  onClick={endConversation}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Call
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
                  onClick={startConversation}
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
