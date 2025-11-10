document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const logo = document.getElementById("brandLogo");
  const login = document.getElementById("loginBtn");
  const hero = document.querySelector(".hero-text");
  const navbarCollapse = document.getElementById("mainNavbar");
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
  const scrollBtn = document.getElementById("scrollDown");

  // Reveal navbar & hero
  setTimeout(() => {
    navbar.classList.add("visible");
    hero.classList.add("visible");
  }, 500);

  // Scroll listener
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle("scrolled", scrolled);
    logo.src = scrolled
      ? "images/umbrellalogoblack.png"
      : "images/umbrellalogowhite.png";
    login.classList.toggle("btn-outline-dark", scrolled);
    login.classList.toggle("btn-outline-light", !scrolled);
    scrollBtn.classList.toggle("hidden", scrolled);
  });

  // Hero fade on mobile menu open/close
  navbarCollapse.addEventListener("show.bs.collapse", () =>
    hero.classList.add("fade-hidden")
  );
  navbarCollapse.addEventListener("hide.bs.collapse", () =>
    hero.classList.remove("fade-hidden")
  );

  // Close menu on resize to desktop
  window.addEventListener("resize", () => {
    const isTogglerVisible =
      window.getComputedStyle(document.querySelector(".navbar-toggler"))
        .display !== "none";
    if (!isTogglerVisible && navbarCollapse.classList.contains("show")) {
      bsCollapse.hide();
      hero.classList.remove("fade-hidden");
    }
  });

  // Fade-in content blocks
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll(".content-block")
    .forEach((block) => observer.observe(block));

  // Video playlist
  const videoEl = document.getElementById("bgVideo");
  const sourceEl = videoEl.querySelector("source");
  const videoSources = [
    "https://videos.pexels.com/video-files/3191861/3191861-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/3195972/3195972-uhd_2560_1440_25fps.mp4",
  ];
  let currentVideo = 0;

  videoEl.addEventListener("ended", () => {
    videoEl.classList.add("fade-out");
    currentVideo = (currentVideo + 1) % videoSources.length;
    sourceEl.src = videoSources[currentVideo];
    videoEl.load();
    setTimeout(() => {
      videoEl.play();
      videoEl.classList.remove("fade-out");
    }, 1000);
  });

  // Scroll-down knapp
  scrollBtn.addEventListener("click", () => {
    document
      .getElementById("company-presentation")
      .scrollIntoView({ behavior: "smooth" });
  });
});
