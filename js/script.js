const nav = document.querySelector("nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSections = document.querySelectorAll("section"),
  totalSections = allSections.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        navList[j].querySelector("a").classList.remove("active");
      }
    }
    this.classList.add("active");
    showSection(this);
    if (window.innerWidth < 1200) {
      navSectionToggleBtn();
    }
  });
}

function showSection(section) {
  for (let i = 0; i < totalSections; i++) {
    allSections[i].classList.remove("active");
  }
  const target = section.getAttribute("href");
  document.querySelector(target).classList.add("active");
}


const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
  navSectionToggleBtn();
});

function navSectionToggleBtn() {
  nav.classList.toggle("open");
  navToggler.classList.toggle("open");
  for (let i = 0; i < totalSections; i++) {
    allSections[i].classList.toggle("open");
  }
}