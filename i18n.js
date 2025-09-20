// i18n.js
const translations = {
  ur: {
    logo: "زیارت سروس",
    hero_title: "خدمات زیارتی — با پشتیبانی ۲۴/۷",
    hero_text: "ویزا، هتل، ترنسپورت و پشتیبانی سفر — همه در یک‌جا.",
    visa_btn: "📑 درخواست ویزا",
    hotel_btn: "🏨 رزرو هتل",
    transport_btn: "🚌 ترنسپورت",
    food_btn: "🍴 غذا",
    footer: "© 2025 زیارت سروس | تمام حقوق محفوظ ہیں"
  },
  fa: {
    logo: "زیارت سرویس",
    hero_title: "خدمات زیارتی — <span class='highlight'>با پشتیبانی ۲۴/۷</span>",
    hero_text: "ویزا، هتل، ترانسپورت و غذا همه در یک‌جا.",
    visa_btn: "📑 درخواست ویزا",
    hotel_btn: "🏨 رزرو هتل",
    transport_btn: "🚌 ترانسپورت",
    food_btn: "🍴 غذا",
    footer: "© 2025 زیارت سرویس | تمامی حقوق محفوظ است"
  },
  en: {
    logo: "Ziarat Service",
    hero_title: "Pilgrimage Services — <span class='highlight'>supported 24/7</span>",
    hero_text: "Visa, Hotel, Transport, and Trip Support all in one place.",
    visa_btn: "📑 Apply for Visa",
    hotel_btn: "🏨 Book Hotel",
    transport_btn: "🚌 Transport",
    food_btn: "🍴 Food",
    footer: "© 2025 Ziarat Service | All Rights Reserved"
  }
};

function applyTranslations() {
  const savedLang = localStorage.getItem("selectedLang") || "ur";
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(translations[savedLang] && translations[savedLang][key]) {
      el.innerHTML = translations[savedLang][key];
    }
  });
  if(savedLang === "en") {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  } else {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = savedLang;
  }

  // انیمیشن fade-up
  const fadeElements = document.querySelectorAll(".fade-up");
  fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";
    setTimeout(() => {
      el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 50);
  });
}

window.addEventListener("DOMContentLoaded", applyTranslations);
