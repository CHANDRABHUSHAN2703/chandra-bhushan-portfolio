const PROFILE = {
  email: "pathakmuskan829@gmail.com",
  github: 'https://github.com/CHANDRABHUSHAN2703/',
  linkedin: 'https://www.linkedin.com/in/chandra-bhushanpathak',
  leetcode: 'https://leetcode.com/u/bhushan_2703/',
  live: 'https://qrify-eight.vercel.app'
};

document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

const socialRow = document.getElementById("socialRow");
const socials = [
  ["GitHub", PROFILE.github],
  ["LinkedIn", PROFILE.linkedin],
  ["LeetCode", PROFILE.leetcode],
  ["Email", `mailto:${PROFILE.email}`]
];
socials.forEach(([label, url]) => {
  if (!url) return;
  const a = document.createElement("a");
  a.href = url;
  a.textContent = label + " ↗";
  if (!url.startsWith("mailto:")) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  socialRow.appendChild(a);
});

document.querySelectorAll("[data-link]").forEach(link => {
  const key = link.dataset.link;
  const value = PROFILE[key];
  if (!value) {
    link.style.display = "none";
    return;
  }
  link.href = value;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const progress = document.getElementById("progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
