// --- تشخیص خودکار زبان مرورگر + تغییر زبان کاربر ---

document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    ur: {
      logo: "زیارت سروس",
      hero_title: "بہترین زیارتی خدمات",
      hero_text: "ویزا، ہوٹل، ٹرانسپورٹ اور کھانے کی سہولت ایک جگہ پر۔",
      visa_btn: "📑 ویزا درخواست",
      hotel_btn: "🏨 ہوٹل بُک کریں",
      transport_btn: "🚌 ٹرانسپورٹ",
      food_btn: "🍴 کھانا",
      footer: "© 2025 زیارت سروس | تمام حقوق محفوظ ہیں"
    },
    fa: {
      logo: "زیارت سرویس",
      hero_title: "بهترین خدمات زیارتی",
      hero_text: "ویزا، هتل، ترانسپورت و غذا همه در یک‌جا.",
      visa_btn: "📑 درخواست ویزا",
      hotel_btn: "🏨 رزرو هتل",
      transport_btn: "🚌 ترانسپورت",
      food_btn: "🍴 غذا",
      footer: "© 2025 زیارت سرویس | تمامی حقوق محفوظ است"
    },
    en: {
      logo: "Ziarat Service",
      hero_title: "Best Pilgrimage Services",
      hero_text: "Visa, Hotel, Transport, and Food all in one place.",
      visa_btn: "📑 Apply for Visa",
      hotel_btn: "🏨 Book Hotel",
      transport_btn: "🚌 Transport",
      food_btn: "🍴 Food",
      footer: "© 2025 Ziarat Service | All Rights Reserved"
    }
  };

  const languageSelector = document.getElementById("language");
  const elements = document.querySelectorAll("[data-i18n]");

  // تابع برای به‌روزرسانی محتوای صفحه
  function updateLanguage(lang) {
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });

    if (lang === "en") {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    } else {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = lang;
    }
  }

  // تابع تشخیص خودکار زبان مرورگر
  function detectLanguage() {
    const savedLang = localStorage.getItem("selectedLang");
    if (savedLang) return savedLang;

    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("fa")) return "fa";
    if (userLang.startsWith("ur")) return "ur";
    return "en";
  }

  // در هنگام لود شدن صفحه
  const detectedLang = detectLanguage();
  localStorage.setItem("selectedLang", detectedLang);
  languageSelector.value = detectedLang;
  updateLanguage(detectedLang);

  // وقتی کاربر زبان را عوض کند
  languageSelector.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("selectedLang", lang);
    updateLanguage(lang);
  });
});

