// lang.js
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

if(languageSelector){
  languageSelector.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("selectedLang", lang);
    updateLanguage(lang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLang") || "ur";
  if(languageSelector){
    languageSelector.value = savedLang;
  }
  updateLanguage(savedLang);
});
