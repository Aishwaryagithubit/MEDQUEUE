/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ne';

interface Translations {
  [key: string]: {
    en: string;
    ne: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ne: 'गृहपृष्ठ' },
  'nav.findDoctor': { en: 'Find Doctor', ne: 'डाक्टर खोज्नुहोस्' },
  'nav.aiConsult': { en: 'AI Consult', ne: 'एआई परामर्श' },
  'nav.appointments': { en: 'My Appointments', ne: 'मेरो अपोइन्टमेन्ट' },
  'nav.dashboard': { en: 'Dashboard', ne: 'ड्यासबोर्ड' },
  'nav.login': { en: 'Login', ne: 'लगइन' },
  'nav.signup': { en: 'Sign Up', ne: 'साइन अप' },

  // Hero Section
  'hero.title': { en: 'Smart Healthcare at Your Fingertips', ne: 'तपाईंको हातमा स्मार्ट स्वास्थ्य सेवा' },
  'hero.subtitle': { en: 'AI-powered medical consultations, smart queue management, and instant appointments with top doctors across Nepal.', ne: 'एआई-संचालित चिकित्सा परामर्श, स्मार्ट लाइन व्यवस्थापन, र नेपालभरका शीर्ष डाक्टरहरूसँग तत्काल अपोइन्टमेन्ट।' },
  'hero.startConsult': { en: 'Start AI Consultation', ne: 'एआई परामर्श सुरु गर्नुहोस्' },
  'hero.findDoctor': { en: 'Find a Doctor', ne: 'डाक्टर खोज्नुहोस्' },
  'hero.trustedBy': { en: 'Trusted by', ne: 'विश्वसनीय' },
  'hero.patients': { en: 'patients', ne: 'बिरामीहरू' },

  // Features
  'features.title': { en: 'Why Choose MediQueue?', ne: 'मेडिक्यू किन छान्ने?' },
  'features.subtitle': { en: 'Experience the future of healthcare with our AI-powered platform', ne: 'हाम्रो एआई-संचालित प्लेटफर्मसँग स्वास्थ्य सेवाको भविष्य अनुभव गर्नुहोस्' },
  'features.ai.title': { en: 'AI-Powered Diagnosis', ne: 'एआई-संचालित निदान' },
  'features.ai.desc': { en: 'Upload reports and describe symptoms. Our AI analyzes and recommends specialists.', ne: 'रिपोर्टहरू अपलोड गर्नुहोस् र लक्षणहरू वर्णन गर्नुहोस्। हाम्रो एआईले विश्लेषण गर्छ र विशेषज्ञहरू सिफारिस गर्छ।' },
  'features.queue.title': { en: 'Smart Queue System', ne: 'स्मार्ट लाइन प्रणाली' },
  'features.queue.desc': { en: 'No more waiting in lines. Get real-time queue updates and notifications.', ne: 'अब लाइनमा कुर्नु पर्दैन। वास्तविक-समय लाइन अपडेट र सूचनाहरू पाउनुहोस्।' },
  'features.booking.title': { en: 'Instant Booking', ne: 'तत्काल बुकिङ' },
  'features.booking.desc': { en: 'Book appointments with doctors instantly and pay online securely.', ne: 'डाक्टरहरूसँग तुरुन्तै अपोइन्टमेन्ट बुक गर्नुहोस् र सुरक्षित रूपमा अनलाइन भुक्तानी गर्नुहोस्।' },
  'features.triage.title': { en: 'Priority Triage', ne: 'प्राथमिकता ट्रायज' },
  'features.triage.desc': { en: 'Critical cases are flagged and prioritized automatically.', ne: 'गम्भीर केसहरू स्वचालित रूपमा चिन्हित र प्राथमिकता दिइन्छ।' },

  // AI Chat
  'chat.title': { en: 'AI Health Assistant', ne: 'एआई स्वास्थ्य सहायक' },
  'chat.placeholder': { en: 'Describe your symptoms or upload a medical report...', ne: 'आफ्ना लक्षणहरू वर्णन गर्नुहोस् वा मेडिकल रिपोर्ट अपलोड गर्नुहोस्...' },
  'chat.send': { en: 'Send', ne: 'पठाउनुहोस्' },
  'chat.upload': { en: 'Upload Report', ne: 'रिपोर्ट अपलोड गर्नुहोस्' },
  'chat.analyzing': { en: 'Analyzing your information...', ne: 'तपाईंको जानकारी विश्लेषण गर्दै...' },
  'chat.welcome': { en: 'Hello! I\'m your AI health assistant. Tell me about your symptoms or upload your medical reports for analysis.', ne: 'नमस्ते! म तपाईंको एआई स्वास्थ्य सहायक हुँ। आफ्ना लक्षणहरूको बारेमा बताउनुहोस् वा विश्लेषणको लागि आफ्नो मेडिकल रिपोर्टहरू अपलोड गर्नुहोस्।' },

  // Doctor Search
  'doctor.search': { en: 'Search doctors, specialties...', ne: 'डाक्टरहरू, विशेषताहरू खोज्नुहोस्...' },
  'doctor.specialty': { en: 'Specialty', ne: 'विशेषता' },
  'doctor.location': { en: 'Location', ne: 'स्थान' },
  'doctor.available': { en: 'Available', ne: 'उपलब्ध' },
  'doctor.fee': { en: 'Consultation Fee', ne: 'परामर्श शुल्क' },
  'doctor.book': { en: 'Book Appointment', ne: 'अपोइन्टमेन्ट बुक गर्नुहोस्' },
  'doctor.experience': { en: 'years experience', ne: 'वर्षको अनुभव' },
  'doctor.rating': { en: 'Rating', ne: 'रेटिङ' },

  // Booking
  'booking.title': { en: 'Book Appointment', ne: 'अपोइन्टमेन्ट बुक गर्नुहोस्' },
  'booking.selectDate': { en: 'Select Date', ne: 'मिति छान्नुहोस्' },
  'booking.selectTime': { en: 'Select Time', ne: 'समय छान्नुहोस्' },
  'booking.confirm': { en: 'Confirm Booking', ne: 'बुकिङ पुष्टि गर्नुहोस्' },
  'booking.payment': { en: 'Proceed to Payment', ne: 'भुक्तानीमा जानुहोस्' },
  'booking.success': { en: 'Booking Confirmed!', ne: 'बुकिङ पुष्टि भयो!' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', ne: 'फेरि स्वागत छ' },
  'dashboard.upcoming': { en: 'Upcoming Appointments', ne: 'आगामी अपोइन्टमेन्टहरू' },
  'dashboard.today': { en: 'Today\'s Queue', ne: 'आजको लाइन' },
  'dashboard.patients': { en: 'Total Patients', ne: 'कुल बिरामीहरू' },
  'dashboard.pending': { en: 'Pending', ne: 'बाँकी' },
  'dashboard.completed': { en: 'Completed', ne: 'सम्पन्न' },
  'dashboard.critical': { en: 'Critical Cases', ne: 'गम्भीर केसहरू' },

  // Common
  'common.loading': { en: 'Loading...', ne: 'लोड हुँदैछ...' },
  'common.error': { en: 'Something went wrong', ne: 'केही गलत भयो' },
  'common.retry': { en: 'Try Again', ne: 'फेरि प्रयास गर्नुहोस्' },
  'common.cancel': { en: 'Cancel', ne: 'रद्द गर्नुहोस्' },
  'common.save': { en: 'Save', ne: 'सेभ गर्नुहोस्' },
  'common.next': { en: 'Next', ne: 'अर्को' },
  'common.back': { en: 'Back', ne: 'पछाडि' },
  'common.viewAll': { en: 'View All', ne: 'सबै हेर्नुहोस्' },

  // Footer
  'footer.about': { en: 'About Us', ne: 'हाम्रो बारेमा' },
  'footer.contact': { en: 'Contact', ne: 'सम्पर्क' },
  'footer.privacy': { en: 'Privacy Policy', ne: 'गोपनीयता नीति' },
  'footer.terms': { en: 'Terms of Service', ne: 'सेवाका सर्तहरू' },
  'footer.copyright': { en: '© 2024 MediQueue. All rights reserved.', ne: '© २०२४ मेडिक्यू। सर्वाधिकार सुरक्षित।' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
