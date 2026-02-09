export interface AuditQuestion {
  id: string;
  questionNumber: number;
  title: string;
  question: string;
  optionA: {
    label: string;
    points: 0;
  };
  optionB: {
    label: string;
    points: 10;
  };
}

export const auditQuestions: AuditQuestion[] = [
  {
    id: "q1",
    questionNumber: 1,
    title: "THE MORNING STANDARD",
    question: "When does your team start work?",
    optionA: {
      label: "When they feel like it / \"Flexible\" start times with no core hours.",
      points: 0,
    },
    optionB: {
      label: "At the agreed time, sharp. Late arrivals are corrected immediately.",
      points: 10,
    },
  },
  {
    id: "q2",
    questionNumber: 2,
    title: "THE SILENCE TEST",
    question: "If you (The CEO) leave the office for 2 weeks with zero contact, what happens?",
    optionA: {
      label: "Chaos. Performance drops. The phone rings constantly.",
      points: 0,
    },
    optionB: {
      label: "Execution continues. The standard holds.",
      points: 10,
    },
  },
  {
    id: "q3",
    questionNumber: 3,
    title: "THE DEADLINE PROTOCOL",
    question: "How does your team handle missed deadlines?",
    optionA: {
      label: "They offer excuses (\"The market,\" \"The client,\" \"Traffic\"). We accept them.",
      points: 0,
    },
    optionB: {
      label: "They own it. They fix it. They ensure it doesn't happen twice.",
      points: 10,
    },
  },
  {
    id: "q4",
    questionNumber: 4,
    title: "THE CONFRONTATION",
    question: "When a team member is underperforming, what does the rest of the team do?",
    optionA: {
      label: "They cover for them or complain behind their back.",
      points: 0,
    },
    optionB: {
      label: "They regulate them. The team demands the standard before I do.",
      points: 10,
    },
  },
  {
    id: "q5",
    questionNumber: 5,
    title: "THE MEETING TAX",
    question: "Do your meetings have a clear agenda and a hard stop time?",
    optionA: {
      label: "No. We talk until we feel 'done.' It often drags on.",
      points: 0,
    },
    optionB: {
      label: "Yes. Clear objective. Hard stop. If you are late, the door is locked.",
      points: 10,
    },
  },
  {
    id: "q6",
    questionNumber: 6,
    title: "THE PROBLEM SOLVER",
    question: "When a problem arises, what comes to your desk?",
    optionA: {
      label: "The problem. (\"Boss, what do we do?\")",
      points: 0,
    },
    optionB: {
      label: "The solution. (\"Boss, this broke. Here is how I fixed it.\")",
      points: 10,
    },
  },
  {
    id: "q7",
    questionNumber: 7,
    title: "THE MIRROR",
    question: "Be honest. If you had to re-hire your entire current team today, would you?",
    optionA: {
      label: "No. I would replace at least 30% of them.",
      points: 0,
    },
    optionB: {
      label: "Yes. They are killers.",
      points: 10,
    },
  },
];
