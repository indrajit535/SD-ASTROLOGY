/**
 * Supported languages for AI Palm Reader app
 * English, Hindi, Spanish, French, Italian, Korean
 */

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    locale: 'en-US',
    rtl: false,
    aiModelPreference: 'liquid/lfm-2.5-1.2b-thinking:free',
    translation: {
      // Common UI strings
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      skip: 'Skip',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Navigation
      home: 'Home',
      palmScan: 'Palm Scan',
      tarot: 'Tarot',
      horoscope: 'Horoscope',
      dailyGuidance: 'Daily Guidance',
      settings: 'Settings',
      
      // Features
      aiChat: 'AI Palm Chat',
      loveReading: 'Love Reading',
      careerReading: 'Career Reading',
      financeReading: 'Finance Reading',
      personalGrowth: 'Personal Growth',
      
      // Palm lines
      heartLine: 'Heart Line',
      headLine: 'Head Line',
      lifeLine: 'Life Line',
      fateLine: 'Fate Line',
      
      // Zodiac signs
      aries: 'Aries',
      taurus: 'Taurus',
      gemini: 'Gemini',
      cancer: 'Cancer',
      leo: 'Leo',
      virgo: 'Virgo',
      libra: 'Libra',
      scorpio: 'Scorpio',
      sagittarius: 'Sagittarius',
      capricorn: 'Capricorn',
      aquarius: 'Aquarius',
      pisces: 'Pisces',
    }
  },
  
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    locale: 'hi-IN',
    rtl: false,
    aiModelPreference: 'liquid/lfm-2.5-1.2b-thinking:free',
    translation: {
      continue: 'जारी रखें',
      back: 'पीछे',
      next: 'अगला',
      skip: 'छोड़ें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफल',
      
      home: 'होम',
      palmScan: 'हस्तरेखा',
      tarot: 'टैरो',
      horoscope: 'राशिफल',
      dailyGuidance: 'दैनिक मार्गदर्शन',
      settings: 'सेटिंग्स',
      
      aiChat: 'AI हथेली चैट',
      loveReading: 'प्रेम रीडिंग',
      careerReading: 'करियर रीडिंग',
      financeReading: 'वित्त रीडिंग',
      personalGrowth: 'व्यक्तिगत विकास',
      
      heartLine: 'हृदय रेखा',
      headLine: 'मस्तिष्क रेखा',
      lifeLine: 'जीवन रेखा',
      fateLine: 'भाग्य रेखा',
      
      aries: 'मेष',
      taurus: 'वृषभ',
      gemini: 'मिथुन',
      cancer: 'कर्क',
      leo: 'सिंह',
      virgo: 'कन्या',
      libra: 'तुला',
      scorpio: 'वृश्चिक',
      sagittarius: 'धनु',
      capricorn: 'मकर',
      aquarius: 'कुम्भ',
      pisces: 'मीन',
    }
  },
  
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    locale: 'es-ES',
    rtl: false,
    aiModelPreference: 'liquid/lfm-2.5-1.2b-thinking:free',
    translation: {
      continue: 'Continuar',
      back: 'Atrás',
      next: 'Siguiente',
      skip: 'Saltar',
      save: 'Guardar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      
      home: 'Inicio',
      palmScan: 'Lectura de Palma',
      tarot: 'Tarot',
      horoscope: 'Horóscopo',
      dailyGuidance: 'Guía Diaria',
      settings: 'Ajustes',
      
      aiChat: 'Chat de Palma IA',
      loveReading: 'Lectura de Amor',
      careerReading: 'Lectura de Carrera',
      financeReading: 'Lectura de Finanzas',
      personalGrowth: 'Crecimiento Personal',
      
      heartLine: 'Línea del Corazón',
      headLine: 'Línea de la Cabeza',
      lifeLine: 'Línea de la Vida',
      fateLine: 'Línea del Destino',
      
      aries: 'Aries',
      taurus: 'Tauro',
      gemini: 'Géminis',
      cancer: 'Cáncer',
      leo: 'Leo',
      virgo: 'Virgo',
      libra: 'Libra',
      scorpio: 'Escorpio',
      sagittarius: 'Sagitario',
      capricorn: 'Capricornio',
      aquarius: 'Acuario',
      pisces: 'Piscis',
    }
  },
  
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    locale: 'fr-FR',
    rtl: false,
    aiModelPreference: 'liquid/lfm-2.5-1.2b-thinking:free',
    translation: {
      continue: 'Continuer',
      back: 'Retour',
      next: 'Suivant',
      skip: 'Passer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      
      home: 'Accueil',
      palmScan: 'Lecture de la Main',
      tarot: 'Tarot',
      horoscope: 'Horoscope',
      dailyGuidance: 'Guide Quotidien',
      settings: 'Paramètres',
      
      aiChat: 'Chat IA Main',
      loveReading: 'Lecture Amour',
      careerReading: 'Lecture Carrière',
      financeReading: 'Lecture Finances',
      personalGrowth: 'Croissance Personnelle',
      
      heartLine: 'Ligne de Cœur',
      headLine: 'Ligne de Tête',
      lifeLine: 'Ligne de Vie',
      fateLine: 'Ligne du Destin',
      
      aries: 'Bélier',
      taurus: 'Taureau',
      gemini: 'Gémeaux',
      cancer: 'Cancer',
      leo: 'Lion',
      virgo: 'Vierge',
      libra: 'Balance',
      scorpio: 'Scorpion',
      sagittarius: 'Sagittaire',
      capricorn: 'Capricorne',
      aquarius: 'Vereau',
      pisces: 'Poissons',
    }
  },
  
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    locale: 'it-IT',
    rtl: false,
    aiModelPreference: 'liquid/lfm-2.5-1.2b-thinking:free',
    translation: {
      continue: 'Continua',
      back: 'Indietro',
      next: 'Avanti',
      skip: 'Salta',
      save: 'Salva',
      cancel: 'Annulla',
      confirm: 'Conferma',
      loading: 'Caricamento...',
      error: 'Errore',
      success: 'Successo',
      
      home: 'Home',
      palmScan: 'Lettura del Palmo',
      tarot: 'Tarocchi',
      horoscope: 'Oroscopo',
      dailyGuidance: 'Guida Giornaliera',
      settings: 'Impostazioni',
      
      aiChat: 'Chat IA Palmo',
      loveReading: 'Lettura Amore',
      careerReading: 'Lettura Carriera',
      financeReading: 'Lettura Finanze',
      personalGrowth: 'Crescita Personale',
      
      heartLine: 'Linea del Cuore',
      headLine: 'Linea della Testa',
      lifeLine: 'Linea della Vita',
      fateLine: 'Linea del Destino',
      
      aries: 'Ariete',
      taurus: 'Toro',
      gemini: 'Gemelli',
      cancer: 'Cancro',
      leo: 'Leone',
      virgo: 'Vergine',
      libra: 'Bilancia',
      scorpio: 'Scorpione',
      sagittarius: 'Sagittario',
      capricorn: 'Capricorno',
      aquarius: 'Acquario',
      pisces: 'Pesci',
    }
  },
  
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    locale: 'ko-KR',
    rtl: false,
    aiModelPreference: 'liquid/lfm-2.5-1.2b-thinking:free',
    translation: {
      continue: '계속',
      back: '뒤로',
      next: '다음',
      skip: '건너뛰기',
      save: '저장',
      cancel: '취소',
      confirm: '확인',
      loading: '로딩 중...',
      error: '오류',
      success: '성공',
      
      home: '홈',
      palmScan: '손금 읽기',
      tarot: '타로',
      horoscope: '별자리',
      dailyGuidance: '일일 안내',
      settings: '설정',
      
      aiChat: 'AI 손금 채팅',
      loveReading: '사랑 운세',
      careerReading: '경력 운세',
      financeReading: '재정 운세',
      personalGrowth: '개인 성장',
      
      heartLine: '심장선',
      headLine: '두뇌선',
      lifeLine: '생명선',
      fateLine: '운명선',
      
      aries: '양자리',
      taurus: '황소자리',
      gemini: '쌍둥이자리',
      cancer: '게자리',
      leo: '사자자리',
      virgo: '처녀자리',
      libra: '천칭자리',
      scorpio: '전갈자리',
      sagittarius: '사수자리',
      capricorn: '염소자리',
      aquarius: '물병자리',
      pisces: '물고기자리',
    }
  }
};

// Language list for selection
export const languageList = Object.values(languages).map(lang => ({
  value: lang.code,
  label: lang.nativeName,
  subLabel: lang.name,
  flag: lang.flag
}));

// Get translation for current language
export const getTranslation = (key, languageCode = 'en') => {
  const lang = languages[languageCode] || languages.en;
  return lang.translation[key] || key;
};

// Format date according to language locale
export const formatDate = (date, languageCode = 'en') => {
  const lang = languages[languageCode] || languages.en;
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  
  try {
    return new Date(date).toLocaleDateString(lang.locale, options);
  } catch (error) {
    return date;
  }
};

// Get direction (ltr/rtl) for language
export const getTextDirection = (languageCode) => {
  const lang = languages[languageCode];
  return lang?.rtl ? 'rtl' : 'ltr';
};

export default languages;
