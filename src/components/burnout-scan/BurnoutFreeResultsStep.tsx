import { Button } from "@/components/ui/button";
import { BurnoutFreeResult } from "@/lib/burnoutScoring";
import { colorConfig } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { Lock, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

interface BurnoutFreeResultsStepProps {
  result: BurnoutFreeResult;
  onUnlockFull: () => void;
  isProcessing: boolean;
  userInfo?: { fullName: string; email: string; phone: string; company: string };
  showOutsideDialog?: boolean;
}

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const c = colorConfig[color as keyof typeof colorConfig] || colorConfig.green;
  const dashOffset = 251.2 - (score / 100) * 251.2;

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" stroke="rgba(0,0,0,0.08)" strokeWidth="8" fill="none" />
        <circle
          cx="48" cy="48" r="40"
          stroke={c.stroke}
          strokeWidth="8" fill="none"
          strokeDasharray="251.2"
          strokeDashoffset={dashOffset}
          strokeLinecap="butt"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-black ${c.text}`}>{score}</span>
        <span className="text-xs text-foreground/40">/ 100</span>
      </div>
    </div>
  );
}

function DomainBar({ label, score, color, interpretation }: { label: string; score: number; color: string; interpretation: string }) {
  const c = colorConfig[color as keyof typeof colorConfig] || colorConfig.green;
  return (
    <div className="p-4 border border-foreground/10 bg-foreground/[0.02] space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
        <div className="h-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: c.stroke }} />
      </div>
      <p className="text-xs text-foreground/60 leading-relaxed">{interpretation}</p>
    </div>
  );
}

const sectionInterpretations: Record<string, Record<string, { en: string; nl: string }>> = {
  workload_intensity: {
    low: {
      en: "Your workload is within manageable limits. You have capacity to handle unexpected demands without system overload.",
      nl: "Uw werkbelasting is binnen beheersbare grenzen. U heeft capaciteit om onverwachte eisen op te vangen zonder systeemoverbelasting.",
    },
    moderate: {
      en: "Your workload is elevated. You're operating above sustainable capacity — this creates cumulative fatigue that compounds over weeks.",
      nl: "Uw werkbelasting is verhoogd. U werkt boven duurzame capaciteit — dit creëert cumulatieve vermoeidheid die zich over weken opstapelt.",
    },
    high: {
      en: "Your workload intensity is critically high. Operating at this level depletes cognitive reserves and directly accelerates burnout progression.",
      nl: "Uw werkdruk is kritiek hoog. Op dit niveau werken put cognitieve reserves uit en versnelt direct de burnout-progressie.",
    },
  },
  sleep_quality: {
    low: {
      en: "Your sleep quality supports recovery. This is a protective factor that buffers against pressure accumulation.",
      nl: "Uw slaapkwaliteit ondersteunt herstel. Dit is een beschermende factor die beschermt tegen drukopstapeling.",
    },
    moderate: {
      en: "Your sleep is being disrupted by founder pressure. Poor sleep reduces decision quality by up to 40% and impairs emotional regulation.",
      nl: "Uw slaap wordt verstoord door founder-druk. Slechte slaap vermindert de besluitvormingskwaliteit met tot 40% en belemmert emotionele regulatie.",
    },
    high: {
      en: "Severe sleep disruption detected. This is one of the strongest predictors of burnout progression — your nervous system cannot recover without restorative sleep.",
      nl: "Ernstige slaapverstoring gedetecteerd. Dit is een van de sterkste voorspellers van burnout-progressie — uw zenuwstelsel kan niet herstellen zonder herstellende slaap.",
    },
  },
  mental_fatigue: {
    low: {
      en: "Your mental clarity is intact. You can process complex decisions without significant cognitive strain.",
      nl: "Uw mentale helderheid is intact. U kunt complexe beslissingen verwerken zonder significante cognitieve belasting.",
    },
    moderate: {
      en: "You're experiencing decision fatigue. The volume of daily choices is depleting your executive function — this often shows up as procrastination or avoidance of hard decisions.",
      nl: "U ervaart beslissingsmoeheid. Het volume aan dagelijkse keuzes put uw executieve functie uit — dit uit zich vaak als uitstelgedrag of vermijding van moeilijke beslissingen.",
    },
    high: {
      en: "Significant mental exhaustion detected. Your cognitive bandwidth is severely compromised — founders at this level often make costly errors in judgment they wouldn't normally make.",
      nl: "Significante mentale uitputting gedetecteerd. Uw cognitieve bandbreedte is ernstig aangetast — founders op dit niveau maken vaak kostbare beoordelingsfouten die ze normaal niet zouden maken.",
    },
  },
  decision_pressure: {
    low: {
      en: "Decision pressure is manageable. You have adequate support structures or delegation systems in place.",
      nl: "Beslissingsdruk is beheersbaar. U heeft adequate ondersteuningsstructuren of delegatiesystemen.",
    },
    moderate: {
      en: "You carry disproportionate decision weight. When too many critical decisions funnel through one person, each decision costs more mental energy than it should.",
      nl: "U draagt onevenredig veel beslissingsgewicht. Wanneer te veel kritieke beslissingen via één persoon lopen, kost elke beslissing meer mentale energie dan nodig.",
    },
    high: {
      en: "Critical decision overload. You are the single point of failure for too many business-critical choices — this is a structural burnout accelerator.",
      nl: "Kritieke beslissingsoverbelasting. U bent het enige faalrisicopunt voor te veel bedrijfskritische keuzes — dit is een structurele burnout-versneller.",
    },
  },
  stress_tolerance: {
    low: {
      en: "Your stress resilience is healthy. You can absorb pressure spikes without lasting impact on performance or wellbeing.",
      nl: "Uw stressbestendigheid is gezond. U kunt drukpieken opvangen zonder blijvende impact op prestaties of welzijn.",
    },
    moderate: {
      en: "Your stress tolerance is wearing thin. You may notice shorter fuse, irritability, or physical tension that wasn't there before — these are early nervous system warnings.",
      nl: "Uw stresstolerantie wordt dunner. U merkt mogelijk een kortere lont, prikkelbaarheid of fysieke spanning die er eerder niet was — dit zijn vroege zenuwstelselwaarschuwingen.",
    },
    high: {
      en: "Your stress response system is depleted. At this level, even minor stressors trigger disproportionate reactions — a sign that your nervous system has lost its buffer capacity.",
      nl: "Uw stressrespons systeem is uitgeput. Op dit niveau veroorzaken zelfs kleine stressoren onevenredige reacties — een teken dat uw zenuwstelsel zijn buffercapaciteit heeft verloren.",
    },
  },
};

function getInterpretationLevel(score: number): string {
  if (score <= 40) return "low";
  if (score <= 65) return "moderate";
  return "high";
}

const overallInterpretations = {
  en: {
    low: "Your preliminary assessment shows manageable pressure levels. However, founder burnout is cumulative — it builds silently over months. This score reflects a snapshot, not a guarantee. Continue monitoring.",
    moderate: "You are showing early-to-moderate signs of founder pressure accumulation. This is the stage where most founders dismiss the signals as 'just being busy.' The data suggests otherwise — multiple domains are trending toward risk territory.",
    high: "Your preliminary score indicates significant burnout risk. The combination of your domain scores creates a compounding effect — pressure in one area amplifies strain in others. Without structured intervention, this pattern typically escalates within 3-6 months.",
    critical: "Your preliminary results show critical founder pressure. Multiple systems are under severe strain simultaneously. This is not normal entrepreneurial stress — this is a pattern that, based on clinical data, precedes functional breakdown. Immediate assessment is recommended.",
  },
  nl: {
    low: "Uw voorlopige beoordeling toont beheersbare drukniveaus. Founder burnout is echter cumulatief — het bouwt zich stil op over maanden. Deze score weerspiegelt een momentopname, geen garantie. Blijf monitoren.",
    moderate: "U toont vroege tot matige tekenen van founder-drukopstapeling. Dit is het stadium waarin de meeste founders de signalen afdoen als 'gewoon druk zijn.' De data suggereert anders — meerdere domeinen bewegen richting risicogebied.",
    high: "Uw voorlopige score wijst op significant burnout-risico. De combinatie van uw domeinscores creëert een versterkend effect — druk in het ene gebied versterkt spanning in andere. Zonder gestructureerde interventie escaleert dit patroon typisch binnen 3-6 maanden.",
    critical: "Uw voorlopige resultaten tonen kritieke founder-druk. Meerdere systemen staan gelijktijdig onder zware spanning. Dit is geen normale ondernemerstress — dit is een patroon dat, op basis van klinische data, voorafgaat aan functionele instorting. Onmiddellijke beoordeling wordt aanbevolen.",
  },
};

function getOverallLevel(score: number): string {
  if (score <= 25) return "low";
  if (score <= 50) return "moderate";
  if (score <= 75) return "high";
  return "critical";
}

const ui = {
  en: {
    title: "Your Founder Burnout Risk Score",
    preliminary: "(Preliminary Assessment)",
    howCalculated: "How This Score Was Calculated",
    howExplanation: "Your FBR Score is derived from 10 diagnostic questions across 5 pressure domains. Each domain is scored 0-100 based on your responses, and weighted equally to produce your overall risk score.",
    domainBreakdown: "Domain Breakdown",
    interpretation: "What This Means",
    highestRisk: "Highest Risk Area",
    unlockTitle: "Go Deeper: Full Founder Burnout Diagnostic",
    unlockDesc: "This preliminary test identifies warning signals. The Full Diagnostic maps your exact burnout phase, recovery timeline, and the structural patterns driving your score.",
    unlockBullets: [
      "32 deep-diagnostic questions across 4 weighted domains",
      "Exact burnout phase identification (Phase 1-5)",
      "Recovery timeline: with vs. without intervention",
      "AI triage session with Daisy, your founder advisor",
      "Direct booking for a Founder Intervention Call with Lionel",
    ],
    unlockBtn: "Unlock Full Diagnostic — $195",
    processing: "Redirecting to payment...",
  },
  nl: {
    title: "Uw Founder Burnout Risk Score",
    preliminary: "(Voorlopige Beoordeling)",
    howCalculated: "Hoe Deze Score Is Berekend",
    howExplanation: "Uw FBR-score is afgeleid van 10 diagnostische vragen over 5 drukdomeinen. Elk domein wordt gescoord van 0-100 op basis van uw antwoorden en gelijk gewogen om uw algehele risicoscore te produceren.",
    domainBreakdown: "Domeinanalyse",
    interpretation: "Wat Dit Betekent",
    highestRisk: "Hoogste Risicogebied",
    unlockTitle: "Ga Dieper: Volledige Founder Burnout Diagnostiek",
    unlockDesc: "Deze voorlopige test identificeert waarschuwingssignalen. De Volledige Diagnostiek brengt uw exacte burnout-fase, hersteltijdlijn en de structurele patronen achter uw score in kaart.",
    unlockBullets: [
      "32 diep-diagnostische vragen over 4 gewogen domeinen",
      "Exacte burnout-fase identificatie (Fase 1-5)",
      "Hersteltijdlijn: met vs. zonder interventie",
      "AI-triage sessie met Daisy, uw founder-adviseur",
      "Directe boeking voor een Founder Interventie Gesprek met Lionel",
    ],
    unlockBtn: "Ontgrendel Volledige Diagnostiek — $195",
    processing: "Doorsturen naar betaling...",
  },
};

export function BurnoutFreeResultsStep({ result, onUnlockFull, isProcessing, userInfo, showOutsideDialog }: BurnoutFreeResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  // Find highest risk domain
  const sortedSections = [...result.sectionScores].sort((a, b) => b.score - a.score);
  const highestRisk = sortedSections[0];
  const lowestRisk = sortedSections[sortedSections.length - 1];
  const overallLevel = getOverallLevel(result.fbrScore);

  const voiceContext = userInfo ? {
    fullName: userInfo.fullName,
    company: userInfo.company,
    phone: userInfo.phone,
    email: userInfo.email,
    fbrScore: result.fbrScore,
    fbrColor: result.fbrColor,
    fbrLabel: result.fbrLabel[language],
    sectionScores: result.sectionScores.map(s => ({
      domain: s.label,
      score: s.score,
      level: getInterpretationLevel(s.score),
    })),
    highestRiskDomain: highestRisk?.label,
    overallInterpretation: overallInterpretations[language][overallLevel as keyof typeof overallInterpretations["en"]],
  } : null;

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Score */}
      <div className="text-center space-y-3">
        <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-wide">
          {t.title}
        </h2>
        <p className="text-xs text-foreground/40">{t.preliminary}</p>
        <div className="flex justify-center">
          <ScoreGauge score={result.fbrScore} color={result.fbrColor} />
        </div>
        <div className={`inline-block px-4 py-2 ${colorConfig[result.fbrColor].bg} border ${colorConfig[result.fbrColor].border} ${colorConfig[result.fbrColor].text} text-sm font-bold uppercase tracking-widest`}>
          {result.fbrLabel[language]}
        </div>
      </div>

      {/* Overall Interpretation */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2">
        <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.interpretation}</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          {overallInterpretations[language][overallLevel as keyof typeof overallInterpretations["en"]]}
        </p>
      </div>

      {/* How calculated */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.howCalculated}</h4>
        <p className="text-foreground/60 leading-relaxed text-sm">{t.howExplanation}</p>
      </div>

      {/* Domain Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.domainBreakdown}</h3>
        {result.sectionScores.map((s) => {
          const level = getInterpretationLevel(s.score);
          const interp = sectionInterpretations[s.key]?.[level]?.[language] || "";
          return (
            <DomainBar key={s.key} label={s.label} score={s.score} color={s.color} interpretation={interp} />
          );
        })}
      </div>

      {/* Highest Risk Highlight */}
      {highestRisk && highestRisk.score > 40 && (
        <div className="p-5 border border-red-500/20 bg-red-500/5 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.highestRisk}</h4>
          </div>
          <p className="text-foreground font-bold text-sm">{highestRisk.label}: {highestRisk.score}%</p>
          <p className="text-foreground/70 text-xs leading-relaxed">
            {sectionInterpretations[highestRisk.key]?.[getInterpretationLevel(highestRisk.score)]?.[language] || ""}
          </p>
        </div>
      )}

      {/* Daisy Voice Widget */}
      {showOutsideDialog && userInfo && voiceContext && (
        <ScanVoiceWidget
          mode="burnout_scan"
          userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={voiceContext}
          bookingType="Founder Burnout Intervention"
        />
      )}

      {/* Unlock CTA */}
      <div className="p-6 border-2 border-red-500/30 bg-red-500/5 space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-red-500 shrink-0" />
          <h3 className="text-lg font-bold text-foreground">{t.unlockTitle}</h3>
        </div>
        <p className="text-sm text-foreground/70">{t.unlockDesc}</p>
        <div className="space-y-2">
          {t.unlockBullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              <span className="text-xs text-foreground/70">{b}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={onUnlockFull}
          disabled={isProcessing}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-none py-5 text-base font-bold uppercase tracking-wider"
        >
          {isProcessing ? t.processing : (
            <>
              {t.unlockBtn}
              <ArrowRight className="w-5 h-5 ml-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
