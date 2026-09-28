/* =========================================================
   CHANDRA BHUSHAN PORTFOLIO — MAIN JAVASCRIPT
   Myntra-inspired portfolio interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =========================
       NAVBAR SHADOW ON SCROLL
    ========================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });
    }


    /* =========================
       SEARCH FUNCTIONALITY
    ========================= */

    const searchInput = document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                const query = this.value.trim().toLowerCase();

                if (!query) return;

                const searchableSections = {
                    "skill": "#skills",
                    "skills": "#skills",
                    "project": "#projects",
                    "projects": "#projects",
                    "experience": "#experience",
                    "about": "#about",
                    "contact": "#contact",
                    "leetcode": "#achievements",
                    "dsa": "#skills",
                    "backend": "#skills",
                    "python": "#skills",
                    "cpp": "#skills",
                    "c++": "#skills",
                    "javascript": "#skills",
                    "mysql": "#skills",
                    "mongodb": "#skills",
                    "resume": "#contact"
                };

                let targetSection = null;

                for (const keyword in searchableSections) {
                    if (query.includes(keyword)) {
                        targetSection = searchableSections[keyword];
                        break;
                    }
                }

                if (targetSection) {

                    const target = document.querySelector(targetSection);

                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: "smooth"
                        });
                    }

                } else {

                    alert(
                        `No direct result found for "${this.value}".\n\nTry searching: projects, skills, backend, DSA, Python, MySQL, LeetCode, experience`
                    );

                }

            }

        });

    }


    /* =========================
       SEARCH PLACEHOLDER EFFECT
    ========================= */

    if (searchInput) {

        const placeholders = [
            "Search projects, skills...",
            "Search Python...",
            "Search backend...",
            "Search DSA...",
            "Search projects..."
        ];

        let placeholderIndex = 0;

        setInterval(() => {

            if (document.activeElement !== searchInput && !searchInput.value) {

                placeholderIndex =
                    (placeholderIndex + 1) % placeholders.length;

                searchInput.placeholder =
                    placeholders[placeholderIndex];

            }

        }, 2500);

    }


    /* =========================
       HERO BUTTONS
    ========================= */

    const exploreButton = document.querySelector(
        'a[href="#projects"]'
    );

    if (exploreButton) {

        exploreButton.addEventListener("click", function (e) {

            e.preventDefault();

            const projects = document.querySelector("#projects");

            if (projects) {
                window.scrollTo({
                    top: projects.offsetTop - 80,
                    behavior: "smooth"
                });
            }

        });

    }


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(
        ".skill-card, .project-card, .timeline-item, .about-content, .contact-content, .achievement-content"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       SKILL CARD HOVER EFFECT
    ========================= */

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-6px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });


    /* =========================
       PROJECT CARD INTERACTION
    ========================= */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });

    });


    /* =========================
       LEETCODE COUNTER
    ========================= */

    const statNumbers = document.querySelectorAll(".stat-number");

    statNumbers.forEach(stat => {

        const text = stat.textContent.trim();

        if (!text.includes("340")) return;

        const target = 340;
        let current = 0;

        const duration = 1200;
        const increment = target / (duration / 16);

        function animateCounter() {

            current += increment;

            if (current >= target) {
                stat.textContent = "340+";
                return;
            }

            stat.textContent = `${Math.floor(current)}+`;

            requestAnimationFrame(animateCounter);
        }

        const observer = new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {

                    animateCounter();

                    observer.disconnect();

                }

            },
            { threshold: 0.5 }
        );

        observer.observe(stat);

    });


    /* =========================
       BACK TO TOP
    ========================= */

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";
    backToTop.className = "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });


    /* =========================
       RESUME BUTTON
    ========================= */

    const resumeLinks = document.querySelectorAll(
        'a[href="resume.pdf"]'
    );

    resumeLinks.forEach(link => {

        link.addEventListener("click", () => {

            console.log("Opening resume...");

        });

    });


    /* =========================
       EXTERNAL LINKS
    ========================= */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================
       MOBILE MENU
    ========================= */

    const navContainer = document.querySelector(".nav-container");

    if (navContainer) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-btn";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        navContainer.appendChild(menuButton);

        menuButton.addEventListener("click", () => {

            document.querySelector(".nav-links")
                ?.classList.toggle("mobile-open");

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                document.querySelector(".nav-links")
                    ?.classList.remove("mobile-open");

            });

        });

    }


    /* =========================
       IMAGE FALLBACK
    ========================= */

    const profileImage = document.querySelector(
        'img[src="profile.jpeg"]'
    );

    if (profileImage) {

        profileImage.addEventListener("error", () => {

            profileImage.style.display = "none";

            const parent = profileImage.parentElement;

            if (parent) {
                parent.classList.add("image-fallback");
            }

        });

    }


    /* =========================
       KEYBOARD SHORTCUT
       "/" → SEARCH
    ========================= */

    document.addEventListener("keydown", e => {

        if (
            e.key === "/" &&
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA"
        ) {

            e.preventDefault();

            if (searchInput) {
                searchInput.focus();
            }

        }

    });


    /* =========================
       ESCAPE SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener("keydown", e => {

            if (e.key === "Escape") {

                searchInput.value = "";
                searchInput.blur();

            }

        });

    }


    /* =========================
       CONSOLE MESSAGE
    ========================= */

    console.log(
        "%c👋 Welcome to Chandra Bhushan's Portfolio!",
        "font-size:16px;font-weight:bold;"
    );

    console.log(
        "%cBuilt with HTML, CSS & JavaScript.",
        "font-size:13px;"
    );

});
