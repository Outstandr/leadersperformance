import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserInfo, AssessmentInsights } from "./AssessmentDialog";
import { DisciplineResult } from "@/lib/assessmentScoring";
import { 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb,
  Star,
  ArrowRight
} from "lucide-react";

interface ResultsStepProps {
  userInfo: UserInfo;
  results: DisciplineResult;
  insights: AssessmentInsights | null;
  onClose: () => void;
  language: 'en' | 'nl';
}

const translations = {
  en: {
    greeting: "Here's your Discipline Blueprint",
    overallScore: "Overall Score",
    disciplineType: "Your Discipline Type",
    domainScores: "Domain Breakdown",
    selfDiscipline: "Self-Discipline",
    impulseControl: "Impulse Control",
    consistency: "Consistency",
    strengths: "Your Strengths",
    improvements: "Areas for Growth",
    recommendations: "Action Steps",
    insights: "Key Insights",
    bookCall: "Book Your Strategy Call",
    bookCallDesc: "Ready to transform your discipline? Let's create a personalized plan together.",
    close: "Close"
  },
  nl: {
    greeting: "Hier is jouw Discipline Blauwdruk",
    overallScore: "Totaalscore",
    disciplineType: "Jouw Discipline Type",
    domainScores: "Domein Overzicht",
    selfDiscipline: "Zelfdiscipline",
    impulseControl: "Impulsbeheersing",
    consistency: "Consistentie",
    strengths: "Jouw Sterke Punten",
    improvements: "Groeimogelijkheden",
    recommendations: "Actiestappen",
    insights: "Belangrijke Inzichten",
    bookCall: "Boek Je Strategiegesprek",
    bookCallDesc: "Klaar om je discipline te transformeren? Laten we samen een persoonlijk plan maken.",
    close: "Sluiten"
  }
};

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-lioner-gold";
    return "text-orange-500";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
            className={getScoreColor(score)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {Math.round(score)}
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm text-muted-foreground text-center">{label}</span>
    </div>
  );
}

export function ResultsStep({ userInfo, results, insights, onClose, language }: ResultsStepProps) {
  const t = translations[language];
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lioner-gold/10 mb-4">
          <Trophy className="w-8 h-8 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          {t.greeting}, {userInfo.firstName}!
        </h2>
        {insights?.personalizedMessage && (
          <p className="text-muted-foreground max-w-lg mx-auto">
            {insights.personalizedMessage}
          </p>
        )}
      </div>

      {/* Overall Score & Type */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-lioner-gold/10 to-lioner-gold/5 rounded-lg p-6 text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">{t.overallScore}</h3>
          <div className="text-5xl font-bold text-lioner-gold mb-2">
            {Math.round(results.scores.overall)}
          </div>
          <div className="text-sm text-muted-foreground">{language === 'nl' ? 'van de 100' : 'out of 100'}</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">{t.disciplineType}</h3>
          <div className="text-2xl font-bold text-foreground mb-2">
            {results.disciplineType}
          </div>
          <p className="text-sm text-muted-foreground">
            {results.disciplineTypeDescription}
          </p>
        </div>
      </div>

      {/* Domain Scores */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-lioner-gold" />
          {t.domainScores}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <ScoreCircle score={results.scores.selfDiscipline} label={t.selfDiscipline} />
          <ScoreCircle score={results.scores.impulseControl} label={t.impulseControl} />
          <ScoreCircle score={results.scores.consistency} label={t.consistency} />
        </div>
      </div>

      {/* AI Insights */}
      {insights && (
        <>
          {/* Strengths */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              {t.strengths}
            </h3>
            <ul className="space-y-2">
              {insights.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Star className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              {t.improvements}
            </h3>
            <ul className="space-y-2">
              {insights.improvements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-lioner-gold" />
              {t.recommendations}
            </h3>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-lioner-gold text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Insights */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-lioner-gold" />
              {t.insights}
            </h3>
            <ul className="space-y-2">
              {insights.insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-lioner-gold/5 rounded-lg border border-lioner-gold/20">
                  <Lightbulb className="w-5 h-5 text-lioner-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-br from-lioner-navy to-lioner-navy/90 rounded-lg p-6 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">{t.bookCall}</h3>
        <p className="text-white/80 mb-4">{t.bookCallDesc}</p>
        <Button
          asChild
          className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-8 py-6"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.bookCall}
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      {/* Close Button */}
      <div className="text-center">
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
          {t.close}
        </Button>
      </div>
    </div>
  );
}
