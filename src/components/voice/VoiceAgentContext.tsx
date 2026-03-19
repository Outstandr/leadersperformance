import { createContext, useContext, useState, ReactNode } from "react";
import { PressureScores } from "@/lib/founderPressureScoring";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";

export type VoiceAgentMode = "general" | "pressure_scan" | "capital_protection" | "capital_assessment" | "corporate_audit";

export interface VoiceAgentContextData {
  mode: VoiceAgentMode;
  autoConnect?: boolean;
  scanScores?: PressureScores;
  scanUserInfo?: ScanUserInfo;
  cpReport?: any;
  cpUserInfo?: any;
  cpResult?: any;
  assessmentResult?: any;
  assessmentUserInfo?: any;
  auditScores?: any;
  auditUserInfo?: any;
}

interface VoiceAgentContextType {
  isOpen: boolean;
  contextData: VoiceAgentContextData;
  isSpeaking: boolean;
  setIsSpeaking: (v: boolean) => void;
  openVoiceAgent: (data?: VoiceAgentContextData) => void;
  closeVoiceAgent: () => void;
}

const defaultContext: VoiceAgentContextData = { mode: "general" };

const VoiceAgentContext = createContext<VoiceAgentContextType | null>(null);

export const VoiceAgentProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextData, setContextData] = useState<VoiceAgentContextData>(defaultContext);
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <VoiceAgentContext.Provider
      value={{
        isOpen,
        contextData,
        isSpeaking,
        setIsSpeaking,
        openVoiceAgent: (data) => {
          setContextData(data || defaultContext);
          setIsOpen(true);
        },
        closeVoiceAgent: () => {
          setIsOpen(false);
          setContextData(defaultContext);
          setIsSpeaking(false);
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
