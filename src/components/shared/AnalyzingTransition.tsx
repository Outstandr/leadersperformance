import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AnalyzingTransitionProps {
  onComplete: () => void;
  duration?: number;
  scanType?: "pressure" | "burnout" | "profit_leak" | "audit" | "capital";
}

const messages = {
  en: {
    pressure: ["Analyzing your structure…", "Mapping pressure points…", "Generating diagnosis…"],
    burnout: ["Analyzing your signals…", "Mapping risk indicators…", "Generating diagnosis…"],
    profit_leak: ["Analyzing your structure…", "Identifying leakage points…", "Generating diagnosis…"],
    audit: ["Analyzing your team…", "Mapping discipline gaps…", "Generating diagnosis…"],
    capital: ["Analyzing your situation…", "Assessing risk dimensions…", "Generating report…"],
  },
  nl: {
    pressure: ["Uw structuur wordt geanalyseerd…", "Drukpunten worden in kaart gebracht…", "Diagnose wordt gegenereerd…"],
    burnout: ["Uw signalen worden geanalyseerd…", "Risico-indicatoren worden in kaart gebracht…", "Diagnose wordt gegenereerd…"],
    profit_leak: ["Uw structuur wordt geanalyseerd…", "Lekpunten worden geïdentificeerd…", "Diagnose wordt gegenereerd…"],
    audit: ["Uw team wordt geanalyseerd…", "Disciplinegaten worden in kaart gebracht…", "Diagnose wordt gegenereerd…"],
    capital: ["Uw situatie wordt geanalyseerd…", "Risico-dimensies worden beoordeeld…", "Rapport wordt gegenereerd…"],
  },
};

export function AnalyzingTransition({ onComplete, duration = 3000, scanType = "pressure" }: AnalyzingTransitionProps) {
  const { language } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const msgs = messages[language]?.[scanType] ?? messages.en[scanType];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, msgs.length - 1));
    }, duration / msgs.length);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, duration / 50);

    const timer = setTimeout(onComplete, duration);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration, onComplete, msgs.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-8">
      {/* Pulsing ring */}
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-lioner-gold/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-lioner-gold/50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="absolute inset-4 rounded-full bg-lioner-gold/10 flex items-center justify-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-lioner-gold"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Animated message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-foreground/70 text-sm font-medium tracking-wide text-center"
        >
          {msgs[messageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-lioner-gold rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}
