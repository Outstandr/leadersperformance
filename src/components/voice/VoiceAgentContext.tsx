import { createContext, useContext, useState, ReactNode } from "react";
import { PressureScores } from "@/lib/founderPressureScoring";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";

export type VoiceAgentMode = "general" | "pressure_scan";

export interface VoiceAgentContextData {
  mode: VoiceAgentMode;
  scanScores?: PressureScores;
  scanUserInfo?: ScanUserInfo;
}

interface VoiceAgentContextType {
  isOpen: boolean;
  contextData: VoiceAgentContextData;
  openVoiceAgent: (data?: VoiceAgentContextData) => void;
  closeVoiceAgent: () => void;
}

const defaultContext: VoiceAgentContextData = { mode: "general" };

const VoiceAgentContext = createContext<VoiceAgentContextType | null>(null);

export const VoiceAgentProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextData, setContextData] = useState<VoiceAgentContextData>(defaultContext);

  return (
    <VoiceAgentContext.Provider
      value={{
        isOpen,
        contextData,
        openVoiceAgent: (data) => {
          setContextData(data || defaultContext);
          setIsOpen(true);
        },
        closeVoiceAgent: () => {
          setIsOpen(false);
          setContextData(defaultContext);
        },
      }}
    >
      {children}
    </VoiceAgentContext.Provider>
  );
};

export const useVoiceAgent = () => {
  const ctx = useContext(VoiceAgentContext);
  if (!ctx) throw new Error("useVoiceAgent must be used inside VoiceAgentProvider");
  return ctx;
};
