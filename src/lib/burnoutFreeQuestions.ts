export interface BurnoutFreeQuestion {
  id: string;
  section: "workload_intensity" | "sleep_quality" | "mental_fatigue" | "decision_pressure" | "stress_tolerance";
  sectionLabel: { en: string; nl: string };
  question: { en: string; nl: string };
}

export const burnoutFreeQuestions: BurnoutFreeQuestion[] = [
  {
    id: "fq1",
    section: "workload_intensity",
    sectionLabel: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" },
    question: {
      en: "I regularly work more than 10 hours a day, including evenings and weekends.",
      nl: "Ik werk regelmatig meer dan 10 uur per dag, inclusief avonden en weekenden.",
    },
  },
  {
    id: "fq2",
    section: "workload_intensity",
    sectionLabel: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" },
    question: {
      en: "I feel like I can never fully disconnect from work, even on vacation.",
      nl: "Ik heb het gevoel dat ik nooit volledig kan loskomen van werk, zelfs niet op vakantie.",
    },
  },
  {
    id: "fq3",
    section: "sleep_quality",
    sectionLabel: { en: "Sleep Quality", nl: "Slaapkwaliteit" },
    question: {
      en: "I frequently wake up at night thinking about business problems or decisions.",
      nl: "Ik word regelmatig 's nachts wakker terwijl ik nadenk over zakelijke problemen of beslissingen.",
    },
  },
  {
    id: "fq4",
    section: "sleep_quality",
    sectionLabel: { en: "Sleep Quality", nl: "Slaapkwaliteit" },
    question: {
      en: "I rarely feel fully rested when I wake up in the morning.",
      nl: "Ik voel me zelden volledig uitgerust als ik 's ochtends wakker word.",
    },
  },
  {
    id: "fq5",
    section: "mental_fatigue",
    sectionLabel: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" },
    question: {
      en: "I notice my ability to focus and think clearly has declined over the past months.",
      nl: "Ik merk dat mijn vermogen om me te concentreren en helder te denken de afgelopen maanden is afgenomen.",
    },
  },
  {
    id: "fq6",
    section: "mental_fatigue",
    sectionLabel: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" },
    question: {
      en: "I feel mentally exhausted by the end of most workdays.",
      nl: "Ik voel me mentaal uitgeput aan het einde van de meeste werkdagen.",
    },
  },
  {
    id: "fq7",
    section: "decision_pressure",
    sectionLabel: { en: "Decision Pressure", nl: "Beslissingsdruk" },
    question: {
      en: "I feel overwhelmed by the number of decisions I need to make daily.",
      nl: "Ik voel me overweldigd door het aantal beslissingen dat ik dagelijks moet nemen.",
    },
  },
  {
    id: "fq8",
    section: "decision_pressure",
    sectionLabel: { en: "Decision Pressure", nl: "Beslissingsdruk" },
    question: {
      en: "I sometimes avoid or delay important decisions because I feel too drained to think them through.",
      nl: "Ik vermijd of stel soms belangrijke beslissingen uit omdat ik me te uitgeput voel om ze goed te doordenken.",
    },
  },
  {
    id: "fq9",
    section: "stress_tolerance",
    sectionLabel: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" },
    question: {
      en: "I react more emotionally or impatiently to problems than I used to.",
      nl: "Ik reageer emotioneler of ongeduldiger op problemen dan vroeger.",
    },
  },
  {
    id: "fq10",
    section: "stress_tolerance",
    sectionLabel: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" },
    question: {
      en: "I feel like my capacity to handle stress has significantly decreased.",
      nl: "Ik heb het gevoel dat mijn vermogen om met stress om te gaan aanzienlijk is afgenomen.",
    },
  },
];

export const burnoutScaleLabels = {
  en: [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Agree" },
    { value: 4, label: "Strongly Agree" },
  ],
  nl: [
    { value: 1, label: "Helemaal oneens" },
    { value: 2, label: "Oneens" },
    { value: 3, label: "Eens" },
    { value: 4, label: "Helemaal eens" },
  ],
};
