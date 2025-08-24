document.addEventListener("DOMContentLoaded", () => {
  /* ------------------ THEME ------------------ */
  const themeSwitch = document.getElementById("themeSwitch");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const startDark = storedTheme ? storedTheme === "dark" : prefersDark;
  if (startDark) document.body.classList.add("dark-mode");
  if (themeSwitch) themeSwitch.checked = startDark;

  themeSwitch?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", themeSwitch.checked);
    localStorage.setItem("theme", themeSwitch.checked ? "dark" : "light");
  });

  /* ------------------ LANGUAGE ------------------ */
  const translations = {
    en: { home:"Home", about:"About Us", courses:"Courses, We Offer", updates:"Updates", apply:"Apply Now", langBtn:"اردو" },
    ur: { home:"ہوم", about:"ہمارے بارے میں", courses:"کورسز", updates:"اپڈیٹس", apply:"ابھی درخواست دیں", langBtn:"English" }
  };

  let currentLang = "en";

  // Navbar elements
  const langBtn    = document.getElementById("langToggle");
  const navHome    = document.getElementById("nav-home");
  const navAbout   = document.getElementById("nav-about");
  const navCourses = document.getElementById("nav-courses");
  const navUpdates = document.getElementById("nav-updates");
  const navApply   = document.getElementById("nav-apply");

  function applyTranslations(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
      const val = el.dataset[lang];
      if (typeof val !== "undefined") el.textContent = val;
    });
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  }

  function setLanguage(lang) {
    currentLang = lang;
    if (navHome)    navHome.textContent    = translations[lang].home;
    if (navAbout)   navAbout.textContent   = translations[lang].about;
    if (navCourses) navCourses.textContent = translations[lang].courses;
    if (navUpdates) navUpdates.textContent = translations[lang].updates;
    if (navApply)   navApply.textContent   = translations[lang].apply;
    if (langBtn)    langBtn.textContent    = translations[lang].langBtn;

    applyTranslations(lang);
    updateBannerLanguage(lang);
  }

  langBtn?.addEventListener("click", () => {
    setLanguage(currentLang === "en" ? "ur" : "en");
  });

  /* ------------------ BANNERS ------------------ */
  const banners = Array.from(document.querySelectorAll(".banner"));
  let currentBanner = 0;

  function showBanner(i) {
    if (!banners.length) return;
    banners.forEach((b, idx) => b.classList.toggle("active", idx === i));
  }

  function updateBannerLanguage(lang) {
    const suffix = lang === "en" ? "En" : "Ur";
    banners.forEach(banner => {
      const titleEl = banner.querySelector(".banner-title");
      const descEl  = banner.querySelector(".banner-desc");
      const title   = banner.dataset[`title${suffix}`];
      const desc    = banner.dataset[`desc${suffix}`];
      if (titleEl && title) titleEl.textContent = title;
      if (descEl  && desc)  descEl.textContent  = desc;
    });
  }

  if (banners.length) {
    showBanner(0);
    setInterval(() => {
      currentBanner = (currentBanner + 1) % banners.length;
      showBanner(currentBanner);
    }, 5000);
  }

  // Init language
  setLanguage("en");
});
const scrollWrapper = document.getElementById("scrollTopWrapper");
  const scrollBtn = document.getElementById("scrollTopBtn");

  // Show when scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollWrapper.classList.add("show");
    } else {
      scrollWrapper.classList.remove("show");
    }
  });

  // Smooth scroll to top
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const chatBtn = document.getElementById("chatBoxBtn");

  chatBtn.addEventListener("click", () => {
    alert("Chat feature coming soon! 🚀");
    // You can replace with WhatsApp / Messenger / custom chat link
    // Example: window.open("https://wa.me/923001234567", "_blank");
  });
/* ------------------ SPLASH SCREEN ------------------ */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  const main   = document.getElementById("main-content");
  const logo   = document.getElementById("splash-logo");

  // Darken background after a short delay
  setTimeout(() => {
    splash.style.background = "#121212";
  }, 1200);

  // Finish animation: hide splash, show main
  const finish = () => {
    splash.style.transition = "opacity 0.9s ease";
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none";
      main.classList.add("show");
    }, 900);
  };

  logo.addEventListener("animationend", finish);
  setTimeout(finish, 5200); // fallback
});
