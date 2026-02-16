const DEFAULT_LANG = "en";
const LANG_KEY = "lang";
let currentLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
let translations = {};

async function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  const response = await fetch(`i18n/${lang}.json`);
  translations = await response.json();

  applyTranslations();
  document.documentElement.lang = lang;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = translations[key] || key;
  });
}

setLanguage(currentLang);

window.applyTranslations = applyTranslations;
window.setLanguage = setLanguage;