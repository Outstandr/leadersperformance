export interface BurnoutFullQuestion {
  id: string;
  domain: "pressure_load" | "nervous_system" | "business_dependency" | "recovery_capacity";
  domainLabel: { en: string; nl: string };
  question: { en: string; nl: string };
}

export const burnoutFullQuestions: BurnoutFullQuestion[] = [
  // Domain 1: Founder Pressure Load (8 questions)
  {
    id: "dq1", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "I am the final decision-maker for nearly all strategic and operational matters.", nl: "Ik ben de uiteindelijke beslisser voor bijna alle strategische en operationele zaken." },
  },
  {
    id: "dq2", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "My workload has increased significantly over the past 12 months.", nl: "Mijn werkdruk is de afgelopen 12 maanden aanzienlijk toegenomen." },
  },
  {
    id: "dq3", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "I carry responsibilities that should be delegated but I cannot let go of.", nl: "Ik draag verantwoordelijkheden die gedelegeerd zouden moeten worden, maar waar ik geen afstand van kan doen." },
  },
  {
    id: "dq4", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "I feel the weight of the company's success rests primarily on my shoulders.", nl: "Ik voel dat het succes van het bedrijf vooral op mijn schouders rust." },
  },
  {
    id: "dq5", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "My calendar is consistently overbooked with meetings and obligations.", nl: "Mijn agenda zit consequent overvol met vergaderingen en verplichtingen." },
  },
  {
    id: "dq6", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "I regularly deal with financial pressure or cash flow uncertainty personally.", nl: "Ik ga regelmatig persoonlijk om met financiële druk of cashflow-onzekerheid." },
  },
  {
    id: "dq7", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "I manage conflicts between team members, clients, or partners on a regular basis.", nl: "Ik manage regelmatig conflicten tussen teamleden, klanten of partners." },
  },
  {
    id: "dq8", domain: "pressure_load",
    domainLabel: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" },
    question: { en: "The number of people depending on me for direction creates constant pressure.", nl: "Het aantal mensen dat voor richting van mij afhankelijk is, creëert constante druk." },
  },

  // Domain 2: Nervous System Depletion (8 questions)
  {
    id: "dq9", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "I have trouble falling asleep or staying asleep most nights.", nl: "Ik heb de meeste nachten moeite met in slaap vallen of doorslapen." },
  },
  {
    id: "dq10", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "I experience physical symptoms like headaches, tension, or digestive issues regularly.", nl: "Ik ervaar regelmatig fysieke symptomen zoals hoofdpijn, spanning of spijsverteringsproblemen." },
  },
  {
    id: "dq11", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "My energy levels fluctuate dramatically throughout the day.", nl: "Mijn energieniveau fluctueert dramatisch gedurende de dag." },
  },
  {
    id: "dq12", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "I rely on caffeine, alcohol, or other substances to manage my energy or mood.", nl: "Ik ben afhankelijk van cafeïne, alcohol of andere middelen om mijn energie of stemming te reguleren." },
  },
  {
    id: "dq13", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "I feel a constant low-level anxiety even when there is no immediate crisis.", nl: "Ik voel een constant laag niveau van angst, zelfs als er geen directe crisis is." },
  },
  {
    id: "dq14", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "I have noticed my memory and recall ability have worsened.", nl: "Ik heb gemerkt dat mijn geheugen en herinneringsvermogen zijn verslechterd." },
  },
  {
    id: "dq15", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "I feel emotionally numb or detached from things I used to care about.", nl: "Ik voel me emotioneel verdoofd of los van dingen waar ik vroeger om gaf." },
  },
  {
    id: "dq16", domain: "nervous_system",
    domainLabel: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" },
    question: { en: "My body feels physically heavy or exhausted even after rest.", nl: "Mijn lichaam voelt fysiek zwaar of uitgeput, zelfs na rust." },
  },

  // Domain 3: Business Dependency (8 questions)
  {
    id: "dq17", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "If I stepped away for 30 days, the company's revenue would drop significantly.", nl: "Als ik 30 dagen weg zou zijn, zou de omzet van het bedrijf aanzienlijk dalen." },
  },
  {
    id: "dq18", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "Key client relationships are maintained primarily through me, not my team.", nl: "Belangrijke klantrelaties worden voornamelijk door mij onderhouden, niet door mijn team." },
  },
  {
    id: "dq19", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "My team lacks the authority or capability to handle crises without me.", nl: "Mijn team mist de bevoegdheid of het vermogen om crises zonder mij aan te pakken." },
  },
  {
    id: "dq20", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "I have no second-in-command who could run the company in my absence.", nl: "Ik heb geen rechterhand die het bedrijf zou kunnen runnen in mijn afwezigheid." },
  },
  {
    id: "dq21", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "Core processes and systems exist only in my head, not documented.", nl: "Kernprocessen en systemen bestaan alleen in mijn hoofd, niet gedocumenteerd." },
  },
  {
    id: "dq22", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "Sales or business development stalls when I am not actively involved.", nl: "Sales of business development stagneert wanneer ik niet actief betrokken ben." },
  },
  {
    id: "dq23", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "My team regularly escalates decisions to me that they should handle themselves.", nl: "Mijn team escaleert regelmatig beslissingen naar mij die ze zelf zouden moeten afhandelen." },
  },
  {
    id: "dq24", domain: "business_dependency",
    domainLabel: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" },
    question: { en: "The company's operational structure would not survive my extended absence.", nl: "De operationele structuur van het bedrijf zou mijn langdurige afwezigheid niet overleven." },
  },

  // Domain 4: Recovery Capacity (8 questions)
  {
    id: "dq25", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I have a consistent exercise routine that I follow at least 3 times per week.", nl: "Ik heb een consistent trainingsritme dat ik minstens 3 keer per week volg." },
  },
  {
    id: "dq26", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I have meaningful relationships outside of work that I invest time in.", nl: "Ik heb betekenisvolle relaties buiten het werk waar ik tijd in investeer." },
  },
  {
    id: "dq27", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I take regular breaks and vacations without checking work constantly.", nl: "Ik neem regelmatig pauzes en vakanties zonder constant werk te checken." },
  },
  {
    id: "dq28", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I have hobbies or activities that fully disconnect me from work mentally.", nl: "Ik heb hobby's of activiteiten die mij mentaal volledig loskoppelen van werk." },
  },
  {
    id: "dq29", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I eat well and maintain a healthy diet consistently.", nl: "Ik eet goed en onderhoud consistent een gezond dieet." },
  },
  {
    id: "dq30", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I have someone I trust (mentor, advisor, therapist) to talk about pressure.", nl: "Ik heb iemand die ik vertrouw (mentor, adviseur, therapeut) om over druk te praten." },
  },
  {
    id: "dq31", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I can usually recover my energy within a weekend of rest.", nl: "Ik kan mijn energie meestal herstellen binnen een weekend van rust." },
  },
  {
    id: "dq32", domain: "recovery_capacity",
    domainLabel: { en: "Recovery Capacity", nl: "Herstelcapaciteit" },
    question: { en: "I feel optimistic about my personal health and energy trajectory.", nl: "Ik voel me optimistisch over mijn persoonlijke gezondheid en energietraject." },
  },
];
