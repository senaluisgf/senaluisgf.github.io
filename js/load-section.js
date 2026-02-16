const sections = [
  "home",
  "about",
  "services",
  "portfolio",
  "contact",
];

async function loadSections() {
  for (const section of sections) {
    const response = await fetch(`sections/${section}.html`);
    const html = await response.text();
    document.getElementById(section).innerHTML = html;
  }

  if (window.applyTranslations) {
    window.applyTranslations();
  }
}

loadSections();