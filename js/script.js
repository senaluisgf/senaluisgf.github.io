var typed = new Typed(".typing", {
  strings: ["Software Engineer", "Web Developer", "Full Stack Developer", "Freelancer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

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

const ageEl = document.getElementById("age");
const birth = new Date(ageEl.dataset.birth);
const today = new Date();
let age = today.getFullYear() - birth.getFullYear();
const m = today.getMonth() - birth.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
  age--;
}
ageEl.textContent = age;
const ageWorkEl = document.getElementById("age-work");
const first = new Date(ageWorkEl.dataset.first);
let ageWork = today.getFullYear() - first.getFullYear();
const mWork = today.getMonth() - first.getMonth();
if (mWork < 0 || (mWork === 0 && today.getDate() < first.getDate())) {
  ageWork--;
}
ageWorkEl.textContent = ageWork;