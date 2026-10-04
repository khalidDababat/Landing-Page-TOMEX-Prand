export interface CountryCode {
  code: string;
  label: string;
}

export const DEFAULT_COUNTRY_CODE = '+970';

/** International dial codes offered by the WhatsApp number selector. */
export const COUNTRY_CODES: CountryCode[] = [
  { code: '+970', label: 'Palestine (+970)' },
  { code: '+972', label: 'Israel (+972)' },
  { code: '+962', label: 'Jordan (+962)' },
  { code: '+961', label: 'Lebanon (+961)' },
  { code: '+963', label: 'Syria (+963)' },
  { code: '+964', label: 'Iraq (+964)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+971', label: 'United Arab Emirates (+971)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+965', label: 'Kuwait (+965)' },
  { code: '+973', label: 'Bahrain (+973)' },
  { code: '+968', label: 'Oman (+968)' },
  { code: '+967', label: 'Yemen (+967)' },
  { code: '+20', label: 'Egypt (+20)' },
  { code: '+218', label: 'Libya (+218)' },
  { code: '+216', label: 'Tunisia (+216)' },
  { code: '+213', label: 'Algeria (+213)' },
  { code: '+212', label: 'Morocco (+212)' },
  { code: '+249', label: 'Sudan (+249)' },
  { code: '+90', label: 'Turkey (+90)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+1', label: 'United States / Canada (+1)' },
];
