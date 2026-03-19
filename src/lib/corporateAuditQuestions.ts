export interface AuditQuestion {
  id: string;
  questionNumber: number;
  title: string;
  question: string;
  options: {
    label: string;
    points: number;
  }[];
}

export const auditQuestions: AuditQuestion[] = [
  {
    id: "q1",
    questionNumber: 1,
    title: "THE MORNING STANDARD",
    question: "When does your team start work?",
    options: [
      { label: "When they feel like it. No set times.", points: 1 },
      { label: "Flexible start, but most arrive around the same time.", points: 2 },
      { label: "Core hours exist but aren't strictly enforced.", points: 3 },
      { label: "At the agreed time, sharp. Late arrivals are corrected immediately.", points: 4 },
    ],
  },
  {
    id: "q2",
    questionNumber: 2,
    title: "THE SILENCE TEST",
    question: "If you (The CEO) leave the office for 2 weeks with zero contact, what happens?",
    options: [
      { label: "Chaos. Performance drops. The phone rings constantly.", points: 1 },
      { label: "Things slow down noticeably. Key decisions wait.", points: 2 },
      { label: "Most things continue, but some areas struggle.", points: 3 },
      { label: "Execution continues. The standard holds.", points: 4 },
    ],
  },
  {
    id: "q3",
    questionNumber: 3,
    title: "THE DEADLINE PROTOCOL",
    question: "How does your team handle missed deadlines?",
    options: [
      { label: "They offer excuses. We accept them.", points: 1 },
      { label: "They acknowledge it but don't prevent recurrence.", points: 2 },
      { label: "They own it and usually fix it, but it still happens.", points: 3 },
      { label: "They own it. They fix it. They ensure it doesn't happen twice.", points: 4 },
    ],
  },
  {
    id: "q4",
    questionNumber: 4,
    title: "THE CONFRONTATION",
    question: "When a team member is underperforming, what does the rest of the team do?",
    options: [
      { label: "They cover for them or complain behind their back.", points: 1 },
      { label: "They ignore it and let management deal with it.", points: 2 },
      { label: "Some team members speak up, but it's inconsistent.", points: 3 },
      { label: "They regulate them. The team demands the standard before I do.", points: 4 },
    ],
  },
  {
    id: "q5",
    questionNumber: 5,
    title: "THE MEETING TAX",
    question: "Do your meetings have a clear agenda and a hard stop time?",
    options: [
      { label: "No. We talk until we feel 'done.' It often drags on.", points: 1 },
      { label: "Sometimes there's an agenda, rarely enforced.", points: 2 },
      { label: "Usually structured, but we often run over.", points: 3 },
      { label: "Yes. Clear objective. Hard stop. If you are late, the door is locked.", points: 4 },
    ],
  },
  {
    id: "q6",
    questionNumber: 6,
    title: "THE PROBLEM SOLVER",
    question: "When a problem arises, what comes to your desk?",
    options: [
      { label: "The problem. 'Boss, what do we do?'", points: 1 },
      { label: "The problem with some context, but no proposal.", points: 2 },
      { label: "The problem with a rough idea of what to do.", points: 3 },
      { label: "The solution. 'Boss, this broke. Here is how I fixed it.'", points: 4 },
    ],
  },
  {
    id: "q7",
    questionNumber: 7,
    title: "THE MIRROR",
    question: "Be honest. If you had to re-hire your entire current team today, would you?",
    options: [
      { label: "No. I would replace at least 50% of them.", points: 1 },
      { label: "No. I would replace about 30% of them.", points: 2 },
      { label: "Mostly yes, but a few positions need upgrading.", points: 3 },
      { label: "Yes. They are killers.", points: 4 },
    ],
  },
];
