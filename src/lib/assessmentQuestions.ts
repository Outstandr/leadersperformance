export interface Question {
  id: string;
  questionNumber: number;
  text: {
    en: string;
    nl: string;
  };
  domain: 'selfDiscipline' | 'impulseControl' | 'consistency';
  reverseScored: boolean;
}

export const questions: Question[] = [
  {
    id: 'q1',
    questionNumber: 1,
    text: {
      en: "I consistently follow through on commitments I make to myself",
      nl: "Ik kom de afspraken met mijzelf altijd na"
    },
    domain: 'selfDiscipline',
    reverseScored: false
  },
  {
    id: 'q2',
    questionNumber: 2,
    text: {
      en: "When working toward a long-term goal, I maintain focus even when progress feels slow",
      nl: "Bij het werken aan een langetermijndoel blijf ik gefocust, zelfs wanneer de voortgang langzaam aanvoelt"
    },
    domain: 'selfDiscipline',
    reverseScored: false
  },
  {
    id: 'q3',
    questionNumber: 3,
    text: {
      en: "I easily give up on tasks that require sustained effort",
      nl: "Ik geef gemakkelijk op bij taken die aanhoudende inspanning vereisen"
    },
    domain: 'selfDiscipline',
    reverseScored: true
  },
  {
    id: 'q4',
    questionNumber: 4,
    text: {
      en: "I can resist immediate pleasures to achieve larger, future rewards",
      nl: "Ik kan verleidingen weerstaan om grotere, toekomstige beloningen te bereiken"
    },
    domain: 'selfDiscipline',
    reverseScored: false
  },
  {
    id: 'q8',
    questionNumber: 8,
    text: {
      en: "I often act on impulse without thinking through the consequences",
      nl: "Ik handel vaak impulsief zonder na te denken over de gevolgen"
    },
    domain: 'impulseControl',
    reverseScored: true
  },
  {
    id: 'q9',
    questionNumber: 9,
    text: {
      en: "When I'm stressed, I can maintain control over my reactions",
      nl: "Wanneer ik gestrest ben, kan ik controle houden over mijn reacties"
    },
    domain: 'impulseControl',
    reverseScored: false
  },
  {
    id: 'q10',
    questionNumber: 10,
    text: {
      en: "I frequently make purchases I later regret",
      nl: "Ik doe regelmatig aankopen waar ik later spijt van heb"
    },
    domain: 'impulseControl',
    reverseScored: true
  },
  {
    id: 'q15',
    questionNumber: 15,
    text: {
      en: "I maintain daily routines that support my goals",
      nl: "Ik onderhoud dagelijkse routines die mijn doelen ondersteunen"
    },
    domain: 'consistency',
    reverseScored: false
  },
  {
    id: 'q16',
    questionNumber: 16,
    text: {
      en: "My productivity varies dramatically from day to day",
      nl: "Mijn productiviteit varieert sterk van dag tot dag"
    },
    domain: 'consistency',
    reverseScored: true
  },
  {
    id: 'q17',
    questionNumber: 17,
    text: {
      en: "I bounce back quickly from setbacks and failures",
      nl: "Ik herstel snel van tegenslagen en mislukkingen"
    },
    domain: 'consistency',
    reverseScored: false
  }
];

export const ratingLabels = {
  en: [
    "Not at all like me",
    "Slightly like me",
    "Moderately like me",
    "Very much like me",
    "Extremely like me"
  ],
  nl: [
    "Helemaal oneens",
    "Oneens",
    "Niet eens, niet oneens",
    "Eens",
    "Helemaal eens"
  ]
};

export const countries = [
  { code: "AE", name: "United Arab Emirates", lang: "en" },
  { code: "NL", name: "Netherlands", lang: "nl" },
  { code: "BE", name: "Belgium", lang: "nl" },
  { code: "SR", name: "Suriname", lang: "nl" },
  { code: "US", name: "United States", lang: "en" },
  { code: "GB", name: "United Kingdom", lang: "en" },
  { code: "CA", name: "Canada", lang: "en" },
  { code: "AU", name: "Australia", lang: "en" },
  { code: "AF", name: "Afghanistan", lang: "en" },
  { code: "AL", name: "Albania", lang: "en" },
  { code: "DZ", name: "Algeria", lang: "en" },
  { code: "AD", name: "Andorra", lang: "en" },
  { code: "AO", name: "Angola", lang: "en" },
  { code: "AG", name: "Antigua and Barbuda", lang: "en" },
  { code: "AR", name: "Argentina", lang: "en" },
  { code: "AM", name: "Armenia", lang: "en" },
  { code: "AT", name: "Austria", lang: "en" },
  { code: "AZ", name: "Azerbaijan", lang: "en" },
  { code: "BS", name: "Bahamas", lang: "en" },
  { code: "BH", name: "Bahrain", lang: "en" },
  { code: "BD", name: "Bangladesh", lang: "en" },
  { code: "BB", name: "Barbados", lang: "en" },
  { code: "BY", name: "Belarus", lang: "en" },
  { code: "BZ", name: "Belize", lang: "en" },
  { code: "BJ", name: "Benin", lang: "en" },
  { code: "BT", name: "Bhutan", lang: "en" },
  { code: "BO", name: "Bolivia", lang: "en" },
  { code: "BA", name: "Bosnia and Herzegovina", lang: "en" },
  { code: "BW", name: "Botswana", lang: "en" },
  { code: "BR", name: "Brazil", lang: "en" },
  { code: "BN", name: "Brunei", lang: "en" },
  { code: "BG", name: "Bulgaria", lang: "en" },
  { code: "BF", name: "Burkina Faso", lang: "en" },
  { code: "BI", name: "Burundi", lang: "en" },
  { code: "CV", name: "Cabo Verde", lang: "en" },
  { code: "KH", name: "Cambodia", lang: "en" },
  { code: "CM", name: "Cameroon", lang: "en" },
  { code: "CF", name: "Central African Republic", lang: "en" },
  { code: "TD", name: "Chad", lang: "en" },
  { code: "CL", name: "Chile", lang: "en" },
  { code: "CN", name: "China", lang: "en" },
  { code: "CO", name: "Colombia", lang: "en" },
  { code: "KM", name: "Comoros", lang: "en" },
  { code: "CG", name: "Congo", lang: "en" },
  { code: "CR", name: "Costa Rica", lang: "en" },
  { code: "HR", name: "Croatia", lang: "en" },
  { code: "CU", name: "Cuba", lang: "en" },
  { code: "CY", name: "Cyprus", lang: "en" },
  { code: "CZ", name: "Czech Republic", lang: "en" },
  { code: "DK", name: "Denmark", lang: "en" },
  { code: "DJ", name: "Djibouti", lang: "en" },
  { code: "DM", name: "Dominica", lang: "en" },
  { code: "DO", name: "Dominican Republic", lang: "en" },
  { code: "EC", name: "Ecuador", lang: "en" },
  { code: "EG", name: "Egypt", lang: "en" },
  { code: "SV", name: "El Salvador", lang: "en" },
  { code: "GQ", name: "Equatorial Guinea", lang: "en" },
  { code: "ER", name: "Eritrea", lang: "en" },
  { code: "EE", name: "Estonia", lang: "en" },
  { code: "SZ", name: "Eswatini", lang: "en" },
  { code: "ET", name: "Ethiopia", lang: "en" },
  { code: "FJ", name: "Fiji", lang: "en" },
  { code: "FI", name: "Finland", lang: "en" },
  { code: "FR", name: "France", lang: "en" },
  { code: "GA", name: "Gabon", lang: "en" },
  { code: "GM", name: "Gambia", lang: "en" },
  { code: "GE", name: "Georgia", lang: "en" },
  { code: "DE", name: "Germany", lang: "en" },
  { code: "GH", name: "Ghana", lang: "en" },
  { code: "GR", name: "Greece", lang: "en" },
  { code: "GD", name: "Grenada", lang: "en" },
  { code: "GT", name: "Guatemala", lang: "en" },
  { code: "GN", name: "Guinea", lang: "en" },
  { code: "GW", name: "Guinea-Bissau", lang: "en" },
  { code: "GY", name: "Guyana", lang: "en" },
  { code: "HT", name: "Haiti", lang: "en" },
  { code: "HN", name: "Honduras", lang: "en" },
  { code: "HU", name: "Hungary", lang: "en" },
  { code: "IS", name: "Iceland", lang: "en" },
  { code: "IN", name: "India", lang: "en" },
  { code: "ID", name: "Indonesia", lang: "en" },
  { code: "IR", name: "Iran", lang: "en" },
  { code: "IQ", name: "Iraq", lang: "en" },
  { code: "IE", name: "Ireland", lang: "en" },
  { code: "IL", name: "Israel", lang: "en" },
  { code: "IT", name: "Italy", lang: "en" },
  { code: "JM", name: "Jamaica", lang: "en" },
  { code: "JP", name: "Japan", lang: "en" },
  { code: "JO", name: "Jordan", lang: "en" },
  { code: "KZ", name: "Kazakhstan", lang: "en" },
  { code: "KE", name: "Kenya", lang: "en" },
  { code: "KI", name: "Kiribati", lang: "en" },
  { code: "KW", name: "Kuwait", lang: "en" },
  { code: "KG", name: "Kyrgyzstan", lang: "en" },
  { code: "LA", name: "Laos", lang: "en" },
  { code: "LV", name: "Latvia", lang: "en" },
  { code: "LB", name: "Lebanon", lang: "en" },
  { code: "LS", name: "Lesotho", lang: "en" },
  { code: "LR", name: "Liberia", lang: "en" },
  { code: "LY", name: "Libya", lang: "en" },
  { code: "LI", name: "Liechtenstein", lang: "en" },
  { code: "LT", name: "Lithuania", lang: "en" },
  { code: "LU", name: "Luxembourg", lang: "en" },
  { code: "MG", name: "Madagascar", lang: "en" },
  { code: "MW", name: "Malawi", lang: "en" },
  { code: "MY", name: "Malaysia", lang: "en" },
  { code: "MV", name: "Maldives", lang: "en" },
  { code: "ML", name: "Mali", lang: "en" },
  { code: "MT", name: "Malta", lang: "en" },
  { code: "MH", name: "Marshall Islands", lang: "en" },
  { code: "MR", name: "Mauritania", lang: "en" },
  { code: "MU", name: "Mauritius", lang: "en" },
  { code: "MX", name: "Mexico", lang: "en" },
  { code: "FM", name: "Micronesia", lang: "en" },
  { code: "MD", name: "Moldova", lang: "en" },
  { code: "MC", name: "Monaco", lang: "en" },
  { code: "MN", name: "Mongolia", lang: "en" },
  { code: "ME", name: "Montenegro", lang: "en" },
  { code: "MA", name: "Morocco", lang: "en" },
  { code: "MZ", name: "Mozambique", lang: "en" },
  { code: "MM", name: "Myanmar", lang: "en" },
  { code: "NA", name: "Namibia", lang: "en" },
  { code: "NR", name: "Nauru", lang: "en" },
  { code: "NP", name: "Nepal", lang: "en" },
  { code: "NZ", name: "New Zealand", lang: "en" },
  { code: "NI", name: "Nicaragua", lang: "en" },
  { code: "NE", name: "Niger", lang: "en" },
  { code: "NG", name: "Nigeria", lang: "en" },
  { code: "MK", name: "North Macedonia", lang: "en" },
  { code: "NO", name: "Norway", lang: "en" },
  { code: "OM", name: "Oman", lang: "en" },
  { code: "PK", name: "Pakistan", lang: "en" },
  { code: "PW", name: "Palau", lang: "en" },
  { code: "PA", name: "Panama", lang: "en" },
  { code: "PG", name: "Papua New Guinea", lang: "en" },
  { code: "PY", name: "Paraguay", lang: "en" },
  { code: "PE", name: "Peru", lang: "en" },
  { code: "PH", name: "Philippines", lang: "en" },
  { code: "PL", name: "Poland", lang: "en" },
  { code: "PT", name: "Portugal", lang: "en" },
  { code: "QA", name: "Qatar", lang: "en" },
  { code: "RO", name: "Romania", lang: "en" },
  { code: "RU", name: "Russia", lang: "en" },
  { code: "RW", name: "Rwanda", lang: "en" },
  { code: "KN", name: "Saint Kitts and Nevis", lang: "en" },
  { code: "LC", name: "Saint Lucia", lang: "en" },
  { code: "VC", name: "Saint Vincent and the Grenadines", lang: "en" },
  { code: "WS", name: "Samoa", lang: "en" },
  { code: "SM", name: "San Marino", lang: "en" },
  { code: "ST", name: "Sao Tome and Principe", lang: "en" },
  { code: "SA", name: "Saudi Arabia", lang: "en" },
  { code: "SN", name: "Senegal", lang: "en" },
  { code: "RS", name: "Serbia", lang: "en" },
  { code: "SC", name: "Seychelles", lang: "en" },
  { code: "SL", name: "Sierra Leone", lang: "en" },
  { code: "SG", name: "Singapore", lang: "en" },
  { code: "SK", name: "Slovakia", lang: "en" },
  { code: "SI", name: "Slovenia", lang: "en" },
  { code: "SB", name: "Solomon Islands", lang: "en" },
  { code: "SO", name: "Somalia", lang: "en" },
  { code: "ZA", name: "South Africa", lang: "en" },
  { code: "SS", name: "South Sudan", lang: "en" },
  { code: "ES", name: "Spain", lang: "en" },
  { code: "LK", name: "Sri Lanka", lang: "en" },
  { code: "SD", name: "Sudan", lang: "en" },
  { code: "SE", name: "Sweden", lang: "en" },
  { code: "CH", name: "Switzerland", lang: "en" },
  { code: "SY", name: "Syria", lang: "en" },
  { code: "TW", name: "Taiwan", lang: "en" },
  { code: "TJ", name: "Tajikistan", lang: "en" },
  { code: "TZ", name: "Tanzania", lang: "en" },
  { code: "TH", name: "Thailand", lang: "en" },
  { code: "TL", name: "Timor-Leste", lang: "en" },
  { code: "TG", name: "Togo", lang: "en" },
  { code: "TO", name: "Tonga", lang: "en" },
  { code: "TT", name: "Trinidad and Tobago", lang: "en" },
  { code: "TN", name: "Tunisia", lang: "en" },
  { code: "TR", name: "Turkey", lang: "en" },
  { code: "TM", name: "Turkmenistan", lang: "en" },
  { code: "TV", name: "Tuvalu", lang: "en" },
  { code: "UG", name: "Uganda", lang: "en" },
  { code: "UA", name: "Ukraine", lang: "en" },
  { code: "UY", name: "Uruguay", lang: "en" },
  { code: "UZ", name: "Uzbekistan", lang: "en" },
  { code: "VU", name: "Vanuatu", lang: "en" },
  { code: "VE", name: "Venezuela", lang: "en" },
  { code: "VN", name: "Vietnam", lang: "en" },
  { code: "YE", name: "Yemen", lang: "en" },
  { code: "ZM", name: "Zambia", lang: "en" },
  { code: "ZW", name: "Zimbabwe", lang: "en" },
  { code: "Other", name: "Other", lang: "en" },
];
