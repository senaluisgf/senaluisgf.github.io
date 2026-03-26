// Language Flag Map
const langFlagMap = {
  en: '<span class="fi fi-gb"></span>',
  fr: '<span class="fi fi-fr"></span>',
  "pt-br": '<span class="fi fi-br"></span>',
};

// Language Switcher
const languageBtn = document.querySelector(".language-btn");
const languageMenu = document.querySelector(".language-menu");

// Initialize language flag immediately from localStorage
function initializeLanguageFlag() {
  const currentLang = localStorage.getItem("lang") || "en";
  languageBtn.innerHTML = langFlagMap[currentLang] || langFlagMap["en"];
}

// Call initialization immediately
initializeLanguageFlag();

languageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  // If language menu is already open, just close it
  if (languageMenu.classList.contains("active")) {
    languageMenu.classList.remove("active");
  } else {
    // Close all other menus first, then open language menu
    colorMenu.classList.remove("active");
    languageMenu.classList.add("active");
  }
});

// Close language menu when selecting a language
document.querySelectorAll(".language-menu span").forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Get the language from data attribute
    const selectedLang = option.getAttribute("data-lang");
    
    // Call setLanguage if available
    if (selectedLang && window.setLanguage) {
      window.setLanguage(selectedLang);
    }
    
    // Update the flag in the button
    if (selectedLang && langFlagMap[selectedLang]) {
      languageBtn.innerHTML = langFlagMap[selectedLang];
    }
    
    // Close the language menu
    languageMenu.classList.remove("active");
  });
});

// Wrap setLanguage to update button flag
window.addEventListener("load", () => {
  if (window.setLanguage) {
    const originalSetLanguage = window.setLanguage;
    window.setLanguage = function (lang) {
      languageBtn.innerHTML = langFlagMap[lang] || langFlagMap["en"];
      return originalSetLanguage.call(this, lang);
    };
  }
});

// Theme Switcher (Dark/Light Mode - Toggle Button)
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  // Close other menus
  languageMenu.classList.remove("active");
  colorMenu.classList.remove("active");
  
  // Toggle dark mode
  document.body.classList.toggle("dark");
  
  // Update icon
  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Initialize theme icon on load
window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Color Switcher
const colorBtn = document.querySelector(".color-btn");
const colorMenu = document.querySelector(".color-menu");
const colorPreview = document.querySelector(".color-preview");
const colorOptions = document.querySelectorAll(".color-option");

colorBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  // If color menu is already open, just close it
  if (colorMenu.classList.contains("active")) {
    colorMenu.classList.remove("active");
  } else {
    // Close all other menus first, then open color menu
    languageMenu.classList.remove("active");
    colorMenu.classList.add("active");
  }
});

colorOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Get the color from data attribute
    const color = option.getAttribute("data-color");
    
    // Call theme color switching
    if (color) {
      setThemeColor(color);
    }
    
    // Update the color preview in the button
    const computedColor = window.getComputedStyle(option).backgroundColor;
    colorPreview.style.background = computedColor;
    
    // Close the color menu
    colorMenu.classList.remove("active");
  });
});

// Initialize color preview on load
window.addEventListener("load", () => {
  // Find which color is currently active
  const alternateStyles = document.querySelectorAll(".alternate-style");
  let activeColor = "color-4"; // default
  
  alternateStyles.forEach((style) => {
    if (!style.hasAttribute("disabled")) {
      activeColor = style.getAttribute("title");
    }
  });

  // Set the preview color
  const activeColorElement = document.querySelector(
    `.color-option[data-color="${activeColor}"]`
  );
  if (activeColorElement) {
    const computedColor = window.getComputedStyle(activeColorElement).backgroundColor;
    colorPreview.style.background = computedColor;
  }
});

// Close all menus
function closeAllMenus() {
  languageMenu.classList.remove("active");
  colorMenu.classList.remove("active");
}

// Close menus on scroll
window.addEventListener("scroll", () => {
  closeAllMenus();
});

// Close menus when clicking outside
document.addEventListener("click", (e) => {
  const isLanguageSwitcher = e.target.closest(".language-switcher-container");
  const isThemeSwitcher = e.target.closest(".theme-switcher-container");
  const isColorSwitcher = e.target.closest(".color-switcher-container");

  if (!isLanguageSwitcher && !isThemeSwitcher && !isColorSwitcher) {
    closeAllMenus();
  }
});

// Theme Color Switching
const alternateStyles = document.querySelectorAll(".alternate-style");
function setThemeColor(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });

  // Update color preview
  const selectedColor = document.querySelector(
    `.color-option[data-color="${color}"]`
  );
  if (selectedColor) {
    const computedColor = window.getComputedStyle(selectedColor).backgroundColor;
    colorPreview.style.background = computedColor;
  }
}

// Expose setThemeColor globally so it can be called from anywhere
window.setThemeColor = setThemeColor;
