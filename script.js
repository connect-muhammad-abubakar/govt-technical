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
    // Update bilingual elements everywhere (courses, cards, etc.)
    document.querySelectorAll("[data-en]").forEach(el => {
      const val = el.dataset[lang];
      if (typeof val !== "undefined") el.textContent = val;
    });

    // Set correct dir & lang
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  }

  function setLanguage(lang) {
    currentLang = lang;

    // Navbar
    if (navHome)    navHome.textContent    = translations[lang].home;
    if (navAbout)   navAbout.textContent   = translations[lang].about;
    if (navCourses) navCourses.textContent = translations[lang].courses;
    if (navUpdates) navUpdates.textContent = translations[lang].updates;
    if (navApply)   navApply.textContent   = translations[lang].apply;
    if (langBtn)    langBtn.textContent    = translations[lang].langBtn;

    // Courses + other bilingual content
    applyTranslations(lang);

    // Update banners too
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

  // Auto-slide
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
function switchLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    if (lang === "ur") {
      el.textContent = el.getAttribute("data-ur");
    } else {
      el.textContent = el.getAttribute("data-en");
    }
  });
}

// Example buttons for language toggle
document.getElementById("lang-en").addEventListener("click", () => switchLanguage("en"));
document.getElementById("lang-ur").addEventListener("click", () => switchLanguage("ur"));
// Within your existing DOMContentLoaded / setLanguage() logic:
applyTranslations(lang); // Will update the h4 and paragraph

// Make sure the footer elements have data-en and data-ur as shown above.
