const projects = [
    {
        title: "Retratos com identidade",
        category: "Retrato",
        year: "2026",
        service: "Fotografia",
        client: "Projeto pessoal",
        location: "Porto",
        image: "images/portfolio/projeto-01.jpg",
        fallback: "radial-gradient(circle at 40% 30%, #777, #111 68%)",
        description:
            "Um estudo sobre identidade, presença e expressão. " +
            "Cada retrato foi construído para revelar personalidade " +
            "sem perder a naturalidade de quem está diante da câmara."
    },
    {
        title: "Campanha de marca",
        category: "Campanha",
        year: "2026",
        service: "Fotografia e conteúdo",
        client: "Marca comercial",
        location: "Vila Nova de Gaia",
        image: "images/portfolio/projeto-02.jpg",
        fallback:
            "radial-gradient(circle at 65% 35%, #a476ff, #1a112c 65%)",
        description:
            "Uma campanha visual criada para dar consistência e força " +
            "à presença digital da marca, com imagens adaptadas para " +
            "publicações, stories, anúncios e comunicação institucional."
    },
    {
        title: "Editorial em movimento",
        category: "Fashion",
        year: "2026",
        service: "Editorial",
        client: "Projeto criativo",
        location: "Porto",
        image: "images/portfolio/projeto-03.jpg",
        fallback:
            "radial-gradient(circle at 30% 30%, #ff7357, #2b0d0d 67%)",
        description:
            "Moda, luz e movimento reunidos numa narrativa visual de " +
            "carácter editorial. O enquadramento e a cor conduzem o olhar " +
            "e transformam cada imagem numa pequena cena."
    },
    {
        title: "Forma e matéria",
        category: "Produto",
        year: "2026",
        service: "Fotografia de produto",
        client: "Marca de produto",
        location: "Estúdio",
        image: "images/portfolio/projeto-04.jpg",
        fallback:
            "radial-gradient(circle at 60% 40%, #efbb59, #251807 70%)",
        description:
            "Fotografia de produto com atenção à textura, ao volume e à " +
            "luz. O objetivo foi criar imagens comerciais sofisticadas " +
            "sem retirar autenticidade ao objeto."
    },
    {
        title: "Histórias próximas",
        category: "Narrativa",
        year: "2026",
        service: "Fotografia documental",
        client: "Projeto pessoal",
        location: "Portugal",
        image: "images/portfolio/projeto-05.jpg",
        fallback:
            "radial-gradient(circle at 30% 30%, #4b9aff, #071629 70%)",
        description:
            "Uma narrativa documental centrada nos gestos, nos espaços e " +
            "nos momentos que normalmente passam despercebidos, mas que " +
            "guardam a verdadeira memória de um lugar."
    },
    {
        title: "Movimento com intenção",
        category: "Vídeo",
        year: "2026",
        service: "Vídeo e edição",
        client: "Conteúdo digital",
        location: "Porto",
        image: "images/portfolio/projeto-06.jpg",
        fallback:
            "radial-gradient(circle at 70% 30%, #50d69a, #071d16 70%)",
        description:
            "Uma produção pensada para vídeo vertical e redes sociais. " +
            "Ritmo, cortes, cor e composição trabalham em conjunto para " +
            "prender a atenção nos primeiros segundos."
    }
];
document.body.classList.add("is-loading");

const preloader = document.querySelector("#preloader");
const preloaderPercentage = document.querySelector(
    "#preloader-percentage"
);
const preloaderLineProgress = document.querySelector(
    "#preloader-line-progress"
);

let loadingValue = 0;
let loadingFinished = false;

const finishPreloader = () => {
    if (loadingFinished) {
        return;
    }

    loadingFinished = true;
    loadingValue = 100;

    if (preloaderPercentage) {
        preloaderPercentage.textContent = "100";
    }

    if (preloaderLineProgress) {
        preloaderLineProgress.style.width = "100%";
    }

    window.setTimeout(() => {
        preloader?.classList.add("is-complete");
        document.body.classList.remove("is-loading");
        document.body.classList.add("is-ready");
    }, 350);

    window.setTimeout(() => {
        preloader?.remove();
    }, 1600);
};

const simulateLoading = () => {
    if (loadingFinished) {
        return;
    }

    const remaining = 96 - loadingValue;
    const increment = Math.max(
        0.3,
        Math.random() * Math.min(4, remaining)
    );

    loadingValue = Math.min(96, loadingValue + increment);

    if (preloaderPercentage) {
        preloaderPercentage.textContent =
            String(Math.floor(loadingValue));
    }

    if (preloaderLineProgress) {
        preloaderLineProgress.style.width =
            `${loadingValue}%`;
    }

    window.setTimeout(
        simulateLoading,
        45 + Math.random() * 90
    );
};

simulateLoading();

window.addEventListener("load", () => {
    window.setTimeout(finishPreloader, 500);
});

window.setTimeout(finishPreloader, 4500);

const siteImages = document.querySelectorAll(
    ".hero-main-image, .card-image img, .about-placeholder img"
);

siteImages.forEach((image) => {
    const revealImage = () => {
        image.classList.add("is-loaded");
    };

    const hideBrokenImage = () => {
        image.style.display = "none";
    };

    if (image.complete && image.naturalWidth > 0) {
        revealImage();
    } else {
        image.addEventListener("load", revealImage, {
            once: true
        });

        image.addEventListener("error", hideBrokenImage, {
            once: true
        });
    }
});
const clamp = (value, minimum = 0, maximum = 1) => {
    return Math.min(Math.max(value, minimum), maximum);
};

const progressThroughSection = (section) => {
    const rectangle = section.getBoundingClientRect();
    const availableDistance = rectangle.height - window.innerHeight;

    if (availableDistance <= 0) {
        return 0;
    }

    return clamp(-rectangle.top / availableDistance);
};

const cursor = document.querySelector(".cursor");
const cursorGlow = document.querySelector(".cursor-glow");
const interactiveElements = document.querySelectorAll(
    "a, button, .tunnel-card, .service-card"
);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {
        cursor.style.transform =
            `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }
});

interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursorGlow?.classList.add("is-active");
    });

    element.addEventListener("mouseleave", () => {
        cursorGlow?.classList.remove("is-active");
    });
});

const animateCursor = () => {
    glowX += (mouseX - glowX) * 0.13;
    glowY += (mouseY - glowY) * 0.13;

    if (cursorGlow) {
        cursorGlow.style.transform =
            `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateCursor);
};

animateCursor();

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(".navigation a");

const closeMenu = () => {
    menuButton?.classList.remove("is-open");
    navigation?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
};

menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");

    navigation?.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

const heroFrame = document.querySelector(".hero-frame");
const heroMainImage = document.querySelector(".hero-main-image");
const heroImageOverlay = document.querySelector(
    ".hero-image-overlay"
);
const heroContent = document.querySelector(".hero-content");
const hero = document.querySelector(".hero");

const manifesto = document.querySelector(".manifesto");
const manifestoLines = document.querySelectorAll(".manifesto-title span");
const manifestoEnding = document.querySelector(".manifesto-ending");

const tunnelSection = document.querySelector(".tunnel-section");
const tunnelCards = document.querySelectorAll(".tunnel-card");
const tunnelIntro = document.querySelector(".tunnel-intro");
const tunnelCurrent = document.querySelector("#tunnel-current");

const wordSection = document.querySelector(".word-explosion");
const wordLetters = document.querySelectorAll(".explosion-word span");
const explosionWord = document.querySelector(".explosion-word");
const explosionReveal = document.querySelector(".explosion-reveal");

const about = document.querySelector(".about");
const aboutImage = document.querySelector(".about-placeholder");

const updateHero = () => {
    if (!hero || !heroFrame || !heroContent) {
        return;
    }

    const progress = progressThroughSection(hero);
    const scale = 1 + progress * 1.35;
    const rotateX = 5 - progress * 5;
    const opacity = 1 - progress * 0.95;

    heroFrame.style.transform =
        `translateX(-50%) scale(${scale}) rotateX(${rotateX}deg)`;

    heroContent.style.opacity = String(clamp(opacity));
    heroContent.style.transform =
        `translateY(${-progress * 90}px)`;
            if (heroMainImage) {
        const imageScale = 1.03 + progress * 0.16;

        heroMainImage.style.transform =
            `scale(${imageScale})`;
    }

    if (heroImageOverlay) {
        heroImageOverlay.style.background = `
            linear-gradient(
                to bottom,
                rgba(0, 0, 0, ${0.08 + progress * 0.2}),
                rgba(0, 0, 0, ${0.38 + progress * 0.35})
            )
        `;
    }
};

const updateManifesto = () => {
    if (!manifesto) {
        return;
    }

    const progress = progressThroughSection(manifesto);

    manifestoLines.forEach((line, index) => {
        const start = 0.08 + index * 0.16;
        const localProgress = clamp((progress - start) / 0.3);
        const scale = 0.75 + localProgress * 0.25;

        line.style.opacity = String(0.16 + localProgress * 0.84);
        line.style.transform = `scale(${scale})`;
    });

    const endingProgress = clamp((progress - 0.62) / 0.22);

    if (manifestoEnding) {
        manifestoEnding.style.opacity = String(endingProgress);
        manifestoEnding.style.transform =
            `translateY(${30 - endingProgress * 30}px)`;
    }
};

const tunnelDirections = [
    { x: -1.1, y: 0.15, rotation: -12 },
    { x: 1.15, y: -0.3, rotation: 8 },
    { x: -0.15, y: -1.1, rotation: -5 },
    { x: 0.9, y: 0.8, rotation: 10 },
    { x: -0.95, y: 0.75, rotation: -8 },
    { x: 1.25, y: 0.15, rotation: 6 }
];

const updateTunnel = () => {
    if (!tunnelSection) {
        return;
    }

    const progress = progressThroughSection(tunnelSection);

    tunnelCards.forEach((card, index) => {
        const depth = Number(card.dataset.depth || 0.5);
        const delay = index * 0.055;
        const localProgress = clamp((progress - delay) / 0.58);
        const direction = tunnelDirections[index];

        const initialZ = -1200 - index * 170;
        const z = initialZ + localProgress * 2200;
        const x = direction.x * localProgress * 420;
        const y = direction.y * localProgress * 260;
        const rotation = direction.rotation * localProgress;
        const scale = 0.55 + localProgress * (0.7 + depth * 0.2);

        const fadeIn = clamp(localProgress / 0.18);
        const fadeOut = clamp((1 - localProgress) / 0.12);
        const opacity = Math.min(fadeIn, fadeOut);

        card.style.opacity = String(opacity);
        card.style.transform = `
            translate3d(${x}px, ${y}px, ${z}px)
            rotateZ(${rotation}deg)
            scale(${scale})
        `;
    });

    if (tunnelIntro) {
        tunnelIntro.style.opacity =
            String(clamp(1 - progress * 4));
        tunnelIntro.style.transform =
            `translateY(${-progress * 80}px)`;
    }

    if (tunnelCurrent) {
        const current = Math.min(
            6,
            Math.max(1, Math.ceil(progress * 6))
        );

        tunnelCurrent.textContent =
            String(current).padStart(2, "0");
    }
};

const letterDirections = [
    { x: -550, y: -250, z: 500, rotation: -90 },
    { x: -370, y: 330, z: 300, rotation: 65 },
    { x: -180, y: -450, z: 650, rotation: -75 },
    { x: 20, y: 480, z: 250, rotation: 100 },
    { x: 220, y: -400, z: 500, rotation: 75 },
    { x: 410, y: 270, z: 350, rotation: -80 },
    { x: 600, y: -200, z: 700, rotation: 95 }
];

const updateWordExplosion = () => {
    if (!wordSection) {
        return;
    }

    const progress = progressThroughSection(wordSection);
    const explosionProgress = clamp((progress - 0.22) / 0.42);
    const revealProgress = clamp((progress - 0.58) / 0.27);

    wordLetters.forEach((letter, index) => {
        const direction = letterDirections[index];

        const x = direction.x * explosionProgress;
        const y = direction.y * explosionProgress;
        const z = direction.z * explosionProgress;
        const rotation = direction.rotation * explosionProgress;

        letter.style.transform = `
            translate3d(${x}px, ${y}px, ${z}px)
            rotateZ(${rotation}deg)
            rotateY(${rotation * 0.7}deg)
        `;

        letter.style.opacity =
            String(clamp(1 - explosionProgress * 1.2));
    });

    if (explosionWord) {
        const earlyScale = 0.76 + clamp(progress / 0.22) * 0.24;
        explosionWord.style.transform = `scale(${earlyScale})`;
    }

    if (explosionReveal) {
        explosionReveal.style.opacity = String(revealProgress);
        explosionReveal.style.transform =
            `scale(${0.75 + revealProgress * 0.25})`;
    }
};

const updateAbout = () => {
    if (!about || !aboutImage) {
        return;
    }

    const rectangle = about.getBoundingClientRect();
    const progress = clamp(
        (window.innerHeight - rectangle.top) /
        (window.innerHeight + rectangle.height)
    );

    aboutImage.style.transform =
        `translateY(${-12 + progress * 18}%) scale(1.06)`;
};

let ticking = false;

const updatePage = () => {
    updateHero();
    updateManifesto();
    updateTunnel();
    updateWordExplosion();
    updateAbout();

    ticking = false;
};

window.addEventListener(
    "scroll",
    () => {
        if (!ticking) {
            requestAnimationFrame(updatePage);
            ticking = true;
        }
    },
    { passive: true }
);

window.addEventListener("resize", updatePage);

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

updatePage();
const projectViewer = document.querySelector("#project-viewer");
const projectClose = document.querySelector("#project-close");
const projectPrevious = document.querySelector("#project-previous");
const projectNext = document.querySelector("#project-next");

const projectNumber = document.querySelector("#project-number");
const projectImage = document.querySelector("#project-image");
const projectFallback = document.querySelector(
    "#project-viewer-fallback"
);
const projectCategory = document.querySelector("#project-category");
const projectYear = document.querySelector("#project-year");
const projectTitle = document.querySelector("#project-title");
const projectDescription = document.querySelector(
    "#project-description"
);
const projectService = document.querySelector("#project-service");
const projectClient = document.querySelector("#project-client");
const projectLocation = document.querySelector("#project-location");

let activeProjectIndex = 0;
let projectViewerIsOpen = false;

const updateProjectViewer = (index) => {
    activeProjectIndex =
        (index + projects.length) % projects.length;

    const project = projects[activeProjectIndex];

    if (projectNumber) {
        projectNumber.textContent = String(
            activeProjectIndex + 1
        ).padStart(2, "0");
    }

    if (projectCategory) {
        projectCategory.textContent = project.category;
    }

    if (projectYear) {
        projectYear.textContent = project.year;
    }

    if (projectTitle) {
        projectTitle.textContent = project.title;
    }

    if (projectDescription) {
        projectDescription.textContent = project.description;
    }

    if (projectService) {
        projectService.textContent = project.service;
    }

    if (projectClient) {
        projectClient.textContent = project.client;
    }

    if (projectLocation) {
        projectLocation.textContent = project.location;
    }

    if (projectFallback) {
        projectFallback.style.background = project.fallback;
    }

    if (projectImage) {
        projectImage.classList.remove("is-visible");
        projectImage.alt = project.title;

        window.setTimeout(() => {
            projectImage.src = project.image;

            if (projectImage.complete &&
                projectImage.naturalWidth > 0) {
                projectImage.classList.add("is-visible");
            }
        }, 180);
    }
};

projectImage?.addEventListener("load", () => {
    projectImage.classList.add("is-visible");
});

projectImage?.addEventListener("error", () => {
    projectImage.classList.remove("is-visible");
});

const openProjectViewer = (index) => {
    updateProjectViewer(index);

    projectViewerIsOpen = true;
    document.body.classList.add("project-is-open");

    projectViewer?.classList.remove("is-closing");
    projectViewer?.setAttribute("aria-hidden", "false");

    window.requestAnimationFrame(() => {
        projectViewer?.classList.add("is-open");
    });

    window.setTimeout(() => {
        projectClose?.focus();
    }, 850);
};

const closeProjectViewer = () => {
    if (!projectViewerIsOpen) {
        return;
    }

    projectViewerIsOpen = false;
    projectViewer?.classList.add("is-closing");
    projectViewer?.classList.remove("is-open");

    window.setTimeout(() => {
        document.body.classList.remove("project-is-open");
        projectViewer?.classList.remove("is-closing");
        projectViewer?.setAttribute("aria-hidden", "true");
    }, 900);
};

tunnelCards.forEach((card) => {
    const openCardProject = () => {
        const index = Number(card.dataset.projectIndex || 0);
        openProjectViewer(index);
    };

    card.addEventListener("click", openCardProject);

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openCardProject();
        }
    });
});

projectClose?.addEventListener("click", closeProjectViewer);

projectPrevious?.addEventListener("click", () => {
    updateProjectViewer(activeProjectIndex - 1);
});

projectNext?.addEventListener("click", () => {
    updateProjectViewer(activeProjectIndex + 1);
});

window.addEventListener("keydown", (event) => {
    if (!projectViewerIsOpen) {
        return;
    }

    if (event.key === "Escape") {
        closeProjectViewer();
    }

    if (event.key === "ArrowLeft") {
        updateProjectViewer(activeProjectIndex - 1);
    }

    if (event.key === "ArrowRight") {
        updateProjectViewer(activeProjectIndex + 1);
    }
});