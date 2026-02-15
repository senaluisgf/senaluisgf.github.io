
async function loadLanguage(language) {
  const res = await fetch(`i18n/${language}.json`);
  const translations = await res.json();
  
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = translations[key] || key;
  });
  
  localStorage.setItem("language", language);
}

async function initLanguage() {
  let currentLanguage = localStorage.getItem("language") || "en";
  await loadLanguage(currentLanguage);
}

initLanguage();
