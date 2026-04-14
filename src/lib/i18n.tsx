import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ar";

const translations = {
  en: {
    nav: { home: "Home", howItWorks: "How It Works", features: "Features", download: "Download App" },
    hero: {
      badge: "🚗 Airbnb for Parking in Egypt",
      title: "Find & Book Parking Spots Instantly",
      subtitle: "Connect with private parking space owners across Cairo. Book guaranteed spots in advance — no more circling blocks.",
      cta: "Get Early Access",
      ctaSecondary: "List Your Space",
      stat1Label: "Avg. time saved",
      stat1Value: "25 min",
      stat2Label: "Launch city",
      stat2Value: "Cairo",
      stat3Label: "Commission",
      stat3Value: "15-20%",
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Three simple steps to guaranteed parking",
      step1Title: "Search & Discover",
      step1Desc: "Enter your destination and browse available spots on the live map with photos, ratings, and pricing.",
      step2Title: "Book & Pay",
      step2Desc: "Reserve your spot in advance and pay securely using Vodafone Cash, InstaPay, or card.",
      step3Title: "Park & Go",
      step3Desc: "Navigate to your guaranteed spot, park with confidence, and rate your experience.",
    },
    features: {
      title: "Built for Egypt",
      subtitle: "Every feature designed for the Egyptian driver",
      f1Title: "Live Map",
      f1Desc: "Real-time availability across Cairo's busiest neighbourhoods.",
      f2Title: "Local Payments",
      f2Desc: "Vodafone Cash, InstaPay, Fawry, and card payments.",
      f3Title: "Arabic-First",
      f3Desc: "Full Arabic UI with RTL support, built for local users.",
      f4Title: "Advance Booking",
      f4Desc: "Reserve hours or days ahead — your spot is guaranteed.",
      f5Title: "Host Dashboard",
      f5Desc: "Track earnings, manage availability, and grow your income.",
      f6Title: "Two-Way Reviews",
      f6Desc: "Trust built through ratings from both drivers and hosts.",
    },
    owners: {
      title: "Own a Parking Space?",
      subtitle: "Turn your idle garage, driveway, or basement into a steady income stream.",
      benefit1: "Set your own price & schedule",
      benefit2: "Earn passive income daily",
      benefit3: "Full control from your phone",
      cta: "Start Earning Today",
    },
    footer: {
      tagline: "The parking marketplace for Egypt",
      copyright: "© 2026 Arkenly. All rights reserved.",
    },
    theme: { light: "Light", dark: "Dark" },
  },
  ar: {
    nav: { home: "الرئيسية", howItWorks: "كيف يعمل", features: "المميزات", download: "حمّل التطبيق" },
    hero: {
      badge: "🚗 Airbnb لمواقف السيارات في مصر",
      title: "ابحث واحجز مواقف سيارات فوراً",
      subtitle: "تواصل مع أصحاب أماكن الانتظار الخاصة في القاهرة. احجز مكانك مسبقاً — بدون لف ودوران.",
      cta: "سجّل الآن",
      ctaSecondary: "أضف مكانك",
      stat1Label: "متوسط الوقت الموفّر",
      stat1Value: "٢٥ دقيقة",
      stat2Label: "مدينة الإطلاق",
      stat2Value: "القاهرة",
      stat3Label: "العمولة",
      stat3Value: "١٥-٢٠٪",
    },
    howItWorks: {
      title: "كيف يعمل",
      subtitle: "ثلاث خطوات بسيطة لموقف مضمون",
      step1Title: "ابحث واستكشف",
      step1Desc: "أدخل وجهتك وتصفح الأماكن المتاحة على الخريطة مع صور وتقييمات وأسعار.",
      step2Title: "احجز وادفع",
      step2Desc: "احجز مكانك مسبقاً وادفع بأمان عبر فودافون كاش أو إنستاباي أو البطاقة.",
      step3Title: "اركن وامشي",
      step3Desc: "توجه لمكانك المضمون، اركن بثقة، وقيّم تجربتك.",
    },
    features: {
      title: "مصمّم لمصر",
      subtitle: "كل ميزة مصممة للسائق المصري",
      f1Title: "خريطة حية",
      f1Desc: "توفر لحظي في أكثر أحياء القاهرة ازدحاماً.",
      f2Title: "دفع محلي",
      f2Desc: "فودافون كاش، إنستاباي، فوري، والبطاقات.",
      f3Title: "عربي أولاً",
      f3Desc: "واجهة عربية كاملة مع دعم RTL.",
      f4Title: "حجز مسبق",
      f4Desc: "احجز بالساعات أو الأيام — مكانك مضمون.",
      f5Title: "لوحة المالك",
      f5Desc: "تابع أرباحك وأدر مواعيدك وزد دخلك.",
      f6Title: "تقييم ثنائي",
      f6Desc: "ثقة مبنية على تقييمات من السائقين والملاك.",
    },
    owners: {
      title: "عندك مكان انتظار؟",
      subtitle: "حوّل جراجك أو بدرومك الفارغ لمصدر دخل ثابت.",
      benefit1: "حدد سعرك ومواعيدك",
      benefit2: "اكسب دخل يومي بدون مجهود",
      benefit3: "تحكم كامل من موبايلك",
      cta: "ابدأ الربح اليوم",
    },
    footer: {
      tagline: "سوق مواقف السيارات في مصر",
      copyright: "© ٢٠٢٦ اركنلي. جميع الحقوق محفوظة.",
    },
    theme: { light: "فاتح", dark: "داكن" },
  },
} as const;

type Translations = (typeof translations)[Lang];

interface I18nContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", l);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  return (
    <I18nContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", t: translations[lang], setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
