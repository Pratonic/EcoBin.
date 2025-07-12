import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.scanner': 'Scanner',
    'nav.schedule': 'Schedule',
    'nav.analytics': 'Analytics',
    'nav.community': 'Community',
    'nav.learn': 'Learn',
    'nav.about': 'About',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    
    // Landing page
    'landing.hero.title': 'Smart Waste Management for a Sustainable Future',
    'landing.hero.subtitle': 'AI-powered waste sorting, pickup scheduling, and community engagement',
    'landing.features.scanner': 'AI Scanner',
    'landing.features.schedule': 'Smart Scheduling',
    'landing.features.community': 'Community Hub',
    'landing.features.analytics': 'Analytics',
    
    // Common
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.close': 'Close',
  },
  hi: {
    // Navigation
    'nav.scanner': 'स्कैनर',
    'nav.schedule': 'अनुसूची',
    'nav.analytics': 'विश्लेषण',
    'nav.community': 'समुदाय',
    'nav.learn': 'सीखें',
    'nav.about': 'के बारे में',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉगआउट',
    'nav.login': 'लॉगिन',
    
    // Landing page
    'landing.hero.title': 'स्थायी भविष्य के लिए स्मार्ट अपशिष्ट प्रबंधन',
    'landing.hero.subtitle': 'AI-संचालित अपशिष्ट सॉर्टिंग, पिकअप शेड्यूलिंग और सामुदायिक भागीदारी',
    'landing.features.scanner': 'AI स्कैनर',
    'landing.features.schedule': 'स्मार्ट शेड्यूलिंग',
    'landing.features.community': 'समुदायिक हब',
    'landing.features.analytics': 'विश्लेषण',
    
    // Common
    'common.submit': 'प्रस्तुत करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.loading': 'लोड हो रहा है...',
    'common.success': 'सफलता',
    'common.error': 'त्रुटि',
    'common.close': 'बंद करें',
  },
  kn: {
    // Navigation
    'nav.scanner': 'ಸ್ಕ್ಯಾನರ್',
    'nav.schedule': 'ವೇಳಾಪಟ್ಟಿ',
    'nav.analytics': 'ವಿಶ್ಲೇಷಣೆ',
    'nav.community': 'ಸಮುದಾಯ',
    'nav.learn': 'ಕಲಿಯಿರಿ',
    'nav.about': 'ಬಗ್ಗೆ',
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.logout': 'ಲಾಗೌಟ್',
    'nav.login': 'ಲಾಗಿನ್',
    
    // Landing page
    'landing.hero.title': 'ಸುಸ್ಥಿರ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಸ್ಮಾರ್ಟ್ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ',
    'landing.hero.subtitle': 'AI-ನಿಯಂತ್ರಿತ ತ್ಯಾಜ್ಯ ವಿಂಗಡಣೆ, ಪಿಕಪ್ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಸಮುದಾಯ ಭಾಗವಹಿಸುವಿಕೆ',
    'landing.features.scanner': 'AI ಸ್ಕ್ಯಾನರ್',
    'landing.features.schedule': 'ಸ್ಮಾರ್ಟ್ ವೇಳಾಪಟ್ಟಿ',
    'landing.features.community': 'ಸಮುದಾಯ ಕೇಂದ್ರ',
    'landing.features.analytics': 'ವಿಶ್ಲೇಷಣೆ',
    
    // Common
    'common.submit': 'ಸಲ್ಲಿಸಿ',
    'common.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'common.save': 'ಉಳಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.success': 'ಯಶಸ್ಸು',
    'common.error': 'ದೋಷ',
    'common.close': 'ಮುಚ್ಚಿ',
  },
  mr: {
    // Navigation
    'nav.scanner': 'स्कॅनर',
    'nav.schedule': 'वेळापत्रक',
    'nav.analytics': 'विश्लेषण',
    'nav.community': 'समुदाय',
    'nav.learn': 'शिका',
    'nav.about': 'बद्दल',
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.logout': 'लॉगआउट',
    'nav.login': 'लॉगिन',
    
    // Landing page
    'landing.hero.title': 'शाश्वत भविष्यासाठी स्मार्ट कचरा व्यवस्थापन',
    'landing.hero.subtitle': 'AI-चालित कचरा वर्गीकरण, पिकअप शेड्यूलिंग आणि सामुदायिक सहभाग',
    'landing.features.scanner': 'AI स्कॅनर',
    'landing.features.schedule': 'स्मार्ट शेड्यूलिंग',
    'landing.features.community': 'समुदाय केंद्र',
    'landing.features.analytics': 'विश्लेषण',
    
    // Common
    'common.submit': 'सबमिट करा',
    'common.cancel': 'रद्द करा',
    'common.save': 'सेव्ह करा',
    'common.delete': 'डिलीट करा',
    'common.edit': 'संपादित करा',
    'common.loading': 'लोड होत आहे...',
    'common.success': 'यश',
    'common.error': 'त्रुटी',
    'common.close': 'बंद करा',
  },
  ta: {
    // Navigation
    'nav.scanner': 'ஸ்கேனர்',
    'nav.schedule': 'கால அட்டவணை',
    'nav.analytics': 'பகுப்பாய்வு',
    'nav.community': 'சமூகம்',
    'nav.learn': 'கற்றுக்கொள்',
    'nav.about': 'பற்றி',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.logout': 'வெளியேறு',
    'nav.login': 'உள்நுழை',
    
    // Landing page
    'landing.hero.title': 'நிலையான எதிர்காலத்திற்கான ஸ்மார்ட் கழிவு மேலாண்மை',
    'landing.hero.subtitle': 'AI-இயங்கும் கழிவு வரிசைப்படுத்துதல், பிக்அப் திட்டமிடல் மற்றும் சமூக ஈடுபாடு',
    'landing.features.scanner': 'AI ஸ்கேனர்',
    'landing.features.schedule': 'ஸ்மார்ட் திட்டமிடல்',
    'landing.features.community': 'சமூக மையம்',
    'landing.features.analytics': 'பகுப்பாய்வு',
    
    // Common
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமிக்கவும்',
    'common.delete': 'நீக்கு',
    'common.edit': 'திருத்து',
    'common.loading': 'ஏற்றுகிறது...',
    'common.success': 'வெற்றி',
    'common.error': 'பிழை',
    'common.close': 'மூடு',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations];
    return langTranslations?.[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}