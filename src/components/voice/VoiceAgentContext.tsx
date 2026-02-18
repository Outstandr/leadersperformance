import { createContext, useContext, useState, ReactNode } from "react";

interface VoiceAgentContextType {
  isOpen: boolean;
  openVoiceAgent: () => void;
  closeVoiceAgent: () => void;
}

const VoiceAgentContext = createContext<VoiceAgentContextType | null>(null);

export const VoiceAgentProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <VoiceAgentContext.Provider
      value={{
        isOpen,
        openVoiceAgent: () => setIsOpen(true),
        closeVoiceAgent: () => setIsOpen(false),
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
