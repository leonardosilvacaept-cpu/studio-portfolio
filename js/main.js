"use strict";

// ======================================================
// PROJETOS
// ======================================================

const projects = [
    {
        title: "Retratos com identidade",
        category: "Retrato",
        year: "2026",
        service: "Fotografia",
        client: "Projeto pessoal",
        location: "Porto",
        image: "images/portfolio/projeto-01.jpg",
        gallery: [
            "images/projects/projeto-01/01.jpg",
            "images/projects/projeto-01/02.jpg",
            "images/projects/projeto-01/03.jpg"
        ],
        fallback:
            "radial-gradient(circle at 40% 30%, #777, #111 68%)",
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
        gallery: [
            "images/projects/projeto-02/01.jpg",
            "images/projects/projeto-02/02.jpg",
            "images/projects/projeto-02/03.jpg"
        ],
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
        gallery: [
            "images/projects/projeto-03/01.jpg",
            "images/projects/projeto-03/02.jpg",
            "images/projects/projeto-03/03.jpg"
        ],
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
        gallery: [
            "images/projects/projeto-04/01.jpg",
            "images/projects/projeto-04/02.jpg",
            "images/projects/projeto-04/03.jpg"
        ],
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
        gallery: [
            "images/projects/projeto-05/01.jpg",
            "images/projects/projeto-05/02.jpg",
            "images/projects/projeto-05/03.jpg"
        ],
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
        gallery: [
            "images/projects/projeto-06/01.jpg",
            "images/projects/projeto-06/02.jpg",
            "images/projects/projeto-06/03.jpg"
        ],
        fallback:
            "radial-gradient(circle at 70% 30%, #50d69a, #071d16 70%)",
        description:
            "Uma produção pensada para vídeo vertical e redes sociais. " +
            "Ritmo, cortes, cor e composição trabalham em conjunto para " +
            "prender a atenção nos primeiros segundos."
    }
];

// ======================================================
// FUNÇÕES GERAIS
// ======================================================

const clamp = (
    value,
    minimum = 0,
    maximum = 1
) => {
    return Math.min(
        Math.max(value, minimum),
        maximum
    );
};

const smoothStep = (value) => {
    const progress = clamp(value);

    return (
        progress *
        progress *
        (3 - 2 * progress)
    );
};

const progressThroughSection = (section) => {
    if (!section) {
        return 0;
    }

    const rectangle =
        section.getBoundingClientRect();

    const availableDistance =
        rectangle.height -
        window.innerHeight;

    if (availableDistance <= 0) {
        return 0;
    }

    return clamp(
        -rectangle.top /
        availableDistance
    );
};

// ======================================================
// PRELOADER
// ======================================================

document.body.classList.add("is-loading");

const preloader =
    document.querySelector("#preloader");

const preloaderPercentage =
    document.querySelector(
        "#preloader-percentage"
    );

const preloaderLineProgress =
    document.querySelector(
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
        preloaderPercentage.textContent =
            "100";
    }

    if (preloaderLineProgress) {
        preloaderLineProgress.style.width =
            "100%";
    }

    window.setTimeout(() => {
        preloader?.classList.add(
            "is-complete"
        );

        document.body.classList.remove(
            "is-loading"
        );

        document.body.classList.add(
            "is-ready"
        );
    }, 350);

    window.setTimeout(() => {
        preloader?.remove();
    }, 1600);
};

const simulateLoading = () => {
    if (loadingFinished) {
        return;
    }

    const remaining =
        96 - loadingValue;

    const increment =
        Math.max(
            0.3,
            Math.random() *
            Math.min(4, remaining)
        );

    loadingValue =
        Math.min(
            96,
            loadingValue + increment
        );

    if (preloaderPercentage) {
        preloaderPercentage.textContent =
            String(
                Math.floor(loadingValue)
            );
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

window.addEventListener(
    "load",
    () => {
        window.setTimeout(
            finishPreloader,
            500
        );
    }
);

window.setTimeout(
    finishPreloader,
    4500
);

// ======================================================
// CARREGAMENTO DAS IMAGENS
// ======================================================

const revealSiteImage = (image) => {
    if (!image) {
        return;
    }

    const showImage = () => {
        image.classList.add("is-loaded");
    };

    const hideBrokenImage = () => {
        image.style.display = "none";
    };

    if (
        image.complete &&
        image.naturalWidth > 0
    ) {
        showImage();
        return;
    }

    image.addEventListener(
        "load",
        showImage,
        { once: true }
    );

    image.addEventListener(
        "error",
        hideBrokenImage,
        { once: true }
    );
};

const siteImages =
    document.querySelectorAll(
        [
            ".hero-main-image",
            ".card-image img",
            ".about-placeholder img",
            ".imagine-photo img",
            ".gallery-image img"
        ].join(", ")
    );

siteImages.forEach((image) => {
    revealSiteImage(image);
});

// ======================================================
// CURSOR
// ======================================================

const cursor =
    document.querySelector(".cursor");

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener(
    "mousemove",
    (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursor) {
            cursor.style.transform = `
                translate(
                    ${mouseX}px,
                    ${mouseY}px
                )
                translate(-50%, -50%)
            `;
        }
    },
    { passive: true }
);

const addCursorInteractions = () => {
    const interactiveElements =
        document.querySelectorAll(
            [
                "a",
                "button",
                ".tunnel-card",
                ".service-card",
                ".gallery-item"
            ].join(", ")
        );

    interactiveElements.forEach(
        (element) => {
            if (
                element.dataset.cursorReady ===
                "true"
            ) {
                return;
            }

            element.dataset.cursorReady =
                "true";

            element.addEventListener(
                "mouseenter",
                () => {
                    cursorGlow?.classList.add(
                        "is-active"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursorGlow?.classList.remove(
                        "is-active"
                    );
                }
            );
        }
    );
};

addCursorInteractions();

const animateCursor = () => {
    glowX +=
        (mouseX - glowX) * 0.13;

    glowY +=
        (mouseY - glowY) * 0.13;

    if (cursorGlow) {
        cursorGlow.style.transform = `
            translate(
                ${glowX}px,
                ${glowY}px
            )
            translate(-50%, -50%)
        `;
    }

    window.requestAnimationFrame(
        animateCursor
    );
};

animateCursor();

// ======================================================
// MENU
// ======================================================

const menuButton =
    document.querySelector(
        ".menu-button"
    );

const navigation =
    document.querySelector(
        ".navigation"
    );

const navigationLinks =
    document.querySelectorAll(
        ".navigation a"
    );

const closeMenu = () => {
    menuButton?.classList.remove(
        "is-open"
    );

    navigation?.classList.remove(
        "is-open"
    );

    document.body.classList.remove(
        "menu-open"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton?.setAttribute(
        "aria-label",
        "Abrir menu"
    );

    navigation?.setAttribute(
        "aria-hidden",
        "true"
    );
};

menuButton?.addEventListener(
    "click",
    () => {
        const willOpen =
            !navigation?.classList.contains(
                "is-open"
            );

        menuButton.classList.toggle(
            "is-open",
            willOpen
        );

        navigation?.classList.toggle(
            "is-open",
            willOpen
        );

        document.body.classList.toggle(
            "menu-open",
            willOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(willOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            willOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

        navigation?.setAttribute(
            "aria-hidden",
            String(!willOpen)
        );
    }
);

navigationLinks.forEach((link) => {
    link.addEventListener(
        "click",
        closeMenu
    );
});

// ======================================================
// ELEMENTOS PRINCIPAIS
// ======================================================

const hero =
    document.querySelector(".hero");

const heroFrame =
    document.querySelector(
        ".hero-frame"
    );

const heroContent =
    document.querySelector(
        ".hero-content"
    );

const heroMainImage =
    document.querySelector(
        ".hero-main-image"
    );

const heroImageOverlay =
    document.querySelector(
        ".hero-image-overlay"
    );

const manifesto =
    document.querySelector(
        ".manifesto"
    );

const manifestoLines =
    document.querySelectorAll(
        ".manifesto-title span"
    );

const manifestoEnding =
    document.querySelector(
        ".manifesto-ending"
    );

const tunnelSection =
    document.querySelector(
        ".tunnel-section"
    );

const tunnelCards =
    Array.from(
        document.querySelectorAll(
            ".tunnel-card"
        )
    );

const tunnelIntro =
    document.querySelector(
        ".tunnel-intro"
    );

const tunnelCurrent =
    document.querySelector(
        "#tunnel-current"
    );

const tunnelTotal =
    document.querySelector(
        ".tunnel-counter span:last-child"
    );

const wordSection =
    document.querySelector(
        ".word-explosion"
    );

const wordLetters =
    document.querySelectorAll(
        ".explosion-word span"
    );

const explosionWord =
    document.querySelector(
        ".explosion-word"
    );

const explosionReveal =
    document.querySelector(
        ".explosion-reveal"
    );

const imaginePhoto =
    document.querySelector(
        "#imagine-photo"
    );

const imaginePhotoImage =
    document.querySelector(
        ".imagine-photo img"
    );

const imagineDropLine =
    document.querySelector(
        ".imagine-drop-line"
    );

const imagineDropLineFill =
    document.querySelector(
        ".imagine-drop-line span"
    );

const imagineBackground =
    document.querySelector(
        ".imagine-background span"
    );

const about =
    document.querySelector(".about");

const aboutImage =
    document.querySelector(
        ".about-placeholder"
    );

// ======================================================
// HERO
// ======================================================

const updateHero = () => {
    if (
        !hero ||
        !heroFrame ||
        !heroContent
    ) {
        return;
    }

    const progress =
        progressThroughSection(hero);

    const scale =
        1 + progress * 2.1;

    const rotateX =
        5 - progress * 5;

    heroFrame.style.transform = `
        translateX(-50%)
        scale(${scale})
        rotateX(${rotateX}deg)
    `;

    heroContent.style.opacity =
        String(
            clamp(
                1 -
                progress * 1.35
            )
        );

    heroContent.style.transform =
        `translateY(${
            -progress * 90
        }px)`;

    if (heroMainImage) {
        heroMainImage.style.transform =
            `scale(${
                1.03 +
                progress * 0.16
            })`;
    }

    if (heroImageOverlay) {
        heroImageOverlay.style.background = `
            linear-gradient(
                to bottom,
                rgba(
                    0,
                    0,
                    0,
                    ${
                        0.08 +
                        progress * 0.2
                    }
                ),
                rgba(
                    0,
                    0,
                    0,
                    ${
                        0.38 +
                        progress * 0.35
                    }
                )
            )
        `;
    }
};

// ======================================================
// MANIFESTO
// ======================================================

const updateManifesto = () => {
    if (!manifesto) {
        return;
    }

    const progress =
        progressThroughSection(
            manifesto
        );

    manifestoLines.forEach(
        (line, index) => {
            const start =
                0.08 +
                index * 0.16;

            const localProgress =
                clamp(
                    (
                        progress -
                        start
                    ) /
                    0.3
                );

            line.style.opacity =
                String(
                    0.16 +
                    localProgress *
                    0.84
                );

            line.style.transform =
                `scale(${
                    0.75 +
                    localProgress *
                    0.25
                })`;
        }
    );

    if (manifestoEnding) {
        const endingProgress =
            clamp(
                (
                    progress -
                    0.62
                ) /
                0.22
            );

        manifestoEnding.style.opacity =
            String(
                endingProgress
            );

        manifestoEnding.style.transform =
            `translateY(${
                30 -
                endingProgress * 30
            }px)`;
    }
};

// ======================================================
// TÚNEL 3D LUXURY
// ======================================================

const tunnelDirections = [
    {
        x: -0.52,
        y: 0.08,
        rotationZ: -3,
        rotationY: 7
    },
    {
        x: 0.5,
        y: -0.12,
        rotationZ: 3,
        rotationY: -7
    },
    {
        x: -0.08,
        y: -0.42,
        rotationZ: -2,
        rotationY: 5
    },
    {
        x: 0.42,
        y: 0.35,
        rotationZ: 3,
        rotationY: -6
    },
    {
        x: -0.45,
        y: 0.32,
        rotationZ: -3,
        rotationY: 6
    },
    {
        x: 0.55,
        y: 0.04,
        rotationZ: 2,
        rotationY: -6
    },
    {
        x: -0.28,
        y: -0.17,
        rotationZ: 2,
        rotationY: 4
    },
    {
        x: 0.24,
        y: -0.34,
        rotationZ: -2,
        rotationY: -5
    },
    {
        x: 0.31,
        y: 0.2,
        rotationZ: 2,
        rotationY: -4
    },
    {
        x: -0.33,
        y: 0.24,
        rotationZ: -2,
        rotationY: 5
    },
    {
        x: 0.14,
        y: 0.38,
        rotationZ: 2,
        rotationY: -4
    },
    {
        x: -0.38,
        y: -0.04,
        rotationZ: -2,
        rotationY: 5
    },
    {
        x: -0.25,
        y: 0.16,
        rotationZ: -2,
        rotationY: 5
    },
    {
        x: 0.27,
        y: -0.18,
        rotationZ: 2,
        rotationY: -5
    },
    {
        x: -0.18,
        y: -0.26,
        rotationZ: -2,
        rotationY: 6
    },
    {
        x: 0.12,
        y: 0.14,
        rotationZ: 1,
        rotationY: -4
    }
];

const defaultMotionPattern = [
    "left",
    "right",
    "rotate",
    "center",
    "right",
    "left",
    "center",
    "rotate",
    "left",
    "right",
    "rotate",
    "center",
    "left",
    "right",
    "rotate",
    "center"
];

let tunnelMouseX = 0;
let tunnelMouseY = 0;
let tunnelMouseTargetX = 0;
let tunnelMouseTargetY = 0;

window.addEventListener(
    "mousemove",
    (event) => {
        tunnelMouseTargetX =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 2;

        tunnelMouseTargetY =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 2;
    },
    { passive: true }
);

window.addEventListener(
    "mouseleave",
    () => {
        tunnelMouseTargetX = 0;
        tunnelMouseTargetY = 0;
    }
);

const updateTunnel = () => {
    if (
        !tunnelSection ||
        tunnelCards.length === 0
    ) {
        return;
    }

    const progress =
        progressThroughSection(
            tunnelSection
        );

    const isMobile =
        window.innerWidth <= 820;

    const visibleCardLimit =
        isMobile
            ? Math.min(
                8,
                tunnelCards.length
            )
            : tunnelCards.length;

    if (isMobile) {
        tunnelMouseX = 0;
        tunnelMouseY = 0;
    } else {
        tunnelMouseX +=
            (
                tunnelMouseTargetX -
                tunnelMouseX
            ) * 0.04;

        tunnelMouseY +=
            (
                tunnelMouseTargetY -
                tunnelMouseY
            ) * 0.04;
    }

    tunnelCards.forEach(
        (card, index) => {
            if (
                index >=
                visibleCardLimit
            ) {
                card.style.opacity =
                    "0";

                card.style.pointerEvents =
                    "none";

                card.style.visibility =
                    "hidden";

                return;
            }

            card.style.visibility =
                "visible";

            const direction =
                tunnelDirections[
                    index %
                    tunnelDirections.length
                ];

            const depth =
                Number(
                    card.dataset.depth ||
                    0.5
                );

            const motion =
                card.dataset.motion ||
                defaultMotionPattern[
                    index %
                    defaultMotionPattern.length
                ];

            const sequenceStart =
                isMobile
                    ? index * 0.055
                    : index * 0.018;

            const sequenceDuration =
                isMobile
                    ? 0.42
                    : 0.52;

            const localProgress =
                clamp(
                    (
                        progress -
                        sequenceStart
                    ) /
                    sequenceDuration
                );

            const easedProgress =
                smoothStep(
                    localProgress
                );

            const spread =
                Math.sin(
                    localProgress *
                    Math.PI
                );

            const initialZ =
                isMobile
                    ? -850 -
                        (
                            index %
                            3
                        ) *
                        90
                    : -1650 -
                        (
                            index %
                            4
                        ) *
                        110 -
                        Math.floor(
                            index / 4
                        ) *
                        55;

            const finalZ =
                isMobile
                    ? 280 +
                        depth * 110
                    : motion ===
                        "center"
                        ? 640 +
                            depth * 200
                        : 720 +
                            depth * 230;

            const z =
                initialZ +
                easedProgress *
                (
                    finalZ -
                    initialZ
                );

            const horizontalRange =
                isMobile
                    ? Math.min(
                        window.innerWidth *
                        0.08,
                        32
                    )
                    : Math.min(
                        window.innerWidth *
                        0.12,
                        185
                    );

            const verticalRange =
                isMobile
                    ? Math.min(
                        window.innerHeight *
                        0.045,
                        35
                    )
                    : Math.min(
                        window.innerHeight *
                        0.08,
                        80
                    );

            let motionX = 0;
            let motionY = 0;
            let motionRotateZ = 0;
            let motionRotateY = 0;
            let motionRotateX = 0;

            if (
                motion === "left"
            ) {
                motionX =
                    (
                        isMobile
                            ? 18
                            : 55
                    ) -
                    easedProgress *
                    horizontalRange;

                motionY =
                    direction.y *
                    spread *
                    verticalRange;

                motionRotateZ =
                    (
                        isMobile
                            ? -1
                            : -2.5
                    ) *
                    spread;

                motionRotateY =
                    (
                        isMobile
                            ? 3
                            : 7
                    ) *
                    (
                        1 -
                        easedProgress
                    );
            } else if (
                motion === "right"
            ) {
                motionX =
                    (
                        isMobile
                            ? -18
                            : -55
                    ) +
                    easedProgress *
                    horizontalRange;

                motionY =
                    direction.y *
                    spread *
                    verticalRange;

                motionRotateZ =
                    (
                        isMobile
                            ? 1
                            : 2.5
                    ) *
                    spread;

                motionRotateY =
                    (
                        isMobile
                            ? -3
                            : -7
                    ) *
                    (
                        1 -
                        easedProgress
                    );
            } else if (
                motion === "rotate"
            ) {
                motionX =
                    direction.x *
                    spread *
                    (
                        isMobile
                            ? 25
                            : 75
                    );

                motionY =
                    direction.y *
                    spread *
                    (
                        isMobile
                            ? 20
                            : 55
                    );

                motionRotateZ =
                    direction.rotationZ *
                    spread *
                    (
                        isMobile
                            ? 0.4
                            : 1
                    );

                motionRotateY =
                    (
                        (
                            isMobile
                                ? 7
                                : 18
                        ) -
                        easedProgress *
                        (
                            isMobile
                                ? 11
                                : 28
                        )
                    ) *
                    (
                        index % 2 === 0
                            ? 1
                            : -1
                    );

                motionRotateX =
                    Math.sin(
                        localProgress *
                        Math.PI
                    ) *
                    (
                        isMobile
                            ? 1.5
                            : 4
                    );
            } else {
                motionX =
                    direction.x *
                    spread *
                    (
                        isMobile
                            ? 18
                            : 38
                    );

                motionY =
                    direction.y *
                    spread *
                    (
                        isMobile
                            ? 17
                            : 36
                    );

                motionRotateZ =
                    direction.rotationZ *
                    spread *
                    0.35;

                motionRotateY =
                    direction.rotationY *
                    (
                        1 -
                        easedProgress
                    ) *
                    (
                        isMobile
                            ? 0.2
                            : 0.45
                    );
            }

            const mouseOffsetX =
                isMobile
                    ? 0
                    : tunnelMouseX *
                        (
                            5 +
                            depth * 9
                        );

            const mouseOffsetY =
                isMobile
                    ? 0
                    : tunnelMouseY *
                        (
                            3 +
                            depth * 6
                        );

            const scale =
                isMobile
                    ? 0.58 +
                        easedProgress *
                        (
                            0.3 +
                            depth *
                            0.04
                        )
                    : 0.48 +
                        easedProgress *
                        (
                            0.48 +
                            depth *
                            0.08
                        );

            const fadeIn =
                smoothStep(
                    clamp(
                        localProgress /
                        0.16
                    )
                );

            const fadeOut =
                1 -
                smoothStep(
                    clamp(
                        (
                            localProgress -
                            0.8
                        ) /
                        0.2
                    )
                );

            const opacity =
                fadeIn *
                fadeOut;

            let blur = 0;

            if (!isMobile) {
                if (
                    localProgress <
                    0.16
                ) {
                    blur =
                        (
                            1 -
                            localProgress /
                            0.16
                        ) *
                        8;
                } else if (
                    localProgress >
                    0.8
                ) {
                    blur =
                        (
                            (
                                localProgress -
                                0.8
                            ) /
                            0.2
                        ) *
                        6;
                }
            }

            const brightness =
                isMobile
                    ? 0.9 +
                        spread * 0.1
                    : 0.72 +
                        spread * 0.27;

            const luxuryOpacity =
                clamp(
                    spread *
                    1.35
                );

            card.style.opacity =
                opacity.toFixed(4);

            card.style.pointerEvents =
                opacity > 0.28
                    ? "auto"
                    : "none";

            if (isMobile) {
                card.style.filter =
                    `brightness(${
                        brightness
                    })`;
            } else {
                card.style.filter = `
                    blur(
                        ${
                            blur.toFixed(
                                2
                            )
                        }px
                    )
                    brightness(
                        ${brightness}
                    )
                `;
            }

            card.style.transform = `
                translate3d(
                    calc(
                        ${motionX}px +
                        ${mouseOffsetX}px
                    ),
                    calc(
                        ${motionY}px +
                        ${mouseOffsetY}px
                    ),
                    ${z}px
                )
                rotateX(
                    ${
                        motionRotateX +
                        (
                            isMobile
                                ? 0
                                : tunnelMouseY *
                                    -1.2
                        )
                    }deg
                )
                rotateY(
                    ${
                        motionRotateY +
                        (
                            isMobile
                                ? 0
                                : tunnelMouseX *
                                    1.4
                        )
                    }deg
                )
                rotateZ(
                    ${motionRotateZ}deg
                )
                scale(
                    ${scale}
                )
            `;

            card.style.zIndex =
                String(
                    Math.round(
                        easedProgress *
                        100
                    )
                );

            card.style.setProperty(
                "--card-luxury-opacity",
                luxuryOpacity
                    .toFixed(3)
            );

            card.style.setProperty(
                "--tunnel-light-x",
                isMobile
                    ? "50%"
                    : `${
                        50 +
                        tunnelMouseX *
                        20
                    }%`
            );

            card.style.setProperty(
                "--tunnel-light-y",
                isMobile
                    ? "44%"
                    : `${
                        44 +
                        tunnelMouseY *
                        15
                    }%`
            );
        }
    );

    if (tunnelIntro) {
        const introExit =
            smoothStep(
                clamp(
                    progress /
                    0.16
                )
            );

        tunnelIntro.style.opacity =
            String(
                1 -
                introExit
            );

        tunnelIntro.style.transform = `
            translateY(
                ${
                    introExit *
                    -55
                }px
            )
            scale(
                ${
                    1 -
                    introExit *
                    0.035
                }
            )
        `;

        tunnelIntro.style.filter =
            isMobile
                ? "none"
                : `blur(${
                    introExit *
                    5
                }px)`;
    }

    if (tunnelCurrent) {
        const current =
            Math.min(
                visibleCardLimit,
                Math.max(
                    1,
                    Math.floor(
                        progress *
                        visibleCardLimit
                    ) + 1
                )
            );

        tunnelCurrent.textContent =
            String(current).padStart(
                2,
                "0"
            );
    }

    if (tunnelTotal) {
        tunnelTotal.textContent =
            String(
                visibleCardLimit
            ).padStart(
                2,
                "0"
            );
    }
};
// ======================================================
// GALERIA HORIZONTAL
// ======================================================

const horizontalGallery =
    document.querySelector(
        ".horizontal-gallery"
    );

const galleryTrack =
    document.querySelector(
        "#gallery-track"
    );

const galleryItems =
    Array.from(
        document.querySelectorAll(
            ".gallery-item"
        )
    );

const galleryCurrent =
    document.querySelector(
        "#gallery-current"
    );

const galleryProgressFill =
    document.querySelector(
        "#gallery-progress-fill"
    );

let galleryTargetProgress = 0;
let galleryCurrentProgress = 0;

const calculateGalleryProgress = () => {
    if (
        !horizontalGallery ||
        !galleryTrack
    ) {
        return;
    }

    const rectangle =
        horizontalGallery
            .getBoundingClientRect();

    const distance =
        horizontalGallery.offsetHeight -
        window.innerHeight;

    galleryTargetProgress =
        clamp(
            -rectangle.top /
            Math.max(
                distance,
                1
            )
        );
};

const updateHorizontalGallery = () => {
    if (
        !horizontalGallery ||
        !galleryTrack ||
        galleryItems.length === 0
    ) {
        return;
    }

    /*
     * No telemóvel, a galeria passa
     * a ter scroll horizontal manual.
     */
    if (
        window.innerWidth <= 820
    ) {
        galleryTrack.style
            .removeProperty(
                "transform"
            );

        galleryItems.forEach(
            (item) => {
                item.classList.add(
                    "is-active"
                );

                const image =
                    item.querySelector(
                        ".gallery-image img"
                    );

                image?.style
                    .removeProperty(
                        "transform"
                    );
            }
        );

        return;
    }

    galleryCurrentProgress +=
        (
            galleryTargetProgress -
            galleryCurrentProgress
        ) * 0.075;

    if (
        Math.abs(
            galleryTargetProgress -
            galleryCurrentProgress
        ) < 0.00005
    ) {
        galleryCurrentProgress =
            galleryTargetProgress;
    }

    const progress =
        clamp(
            galleryCurrentProgress
        );

    const maximumDistance =
        Math.max(
            galleryTrack.scrollWidth -
            window.innerWidth,
            0
        );

    const translation =
        -maximumDistance *
        progress;

    galleryTrack.style.transform = `
        translate3d(
            ${translation}px,
            0,
            0
        )
    `;

    let closestIndex = 0;
    let closestDistance = Infinity;

    galleryItems.forEach(
        (item, index) => {
            const rectangle =
                item.getBoundingClientRect();

            const center =
                rectangle.left +
                rectangle.width / 2;

            const viewportCenter =
                window.innerWidth / 2;

            const distanceFromCenter =
                Math.abs(
                    center -
                    viewportCenter
                );

            if (
                distanceFromCenter <
                closestDistance
            ) {
                closestDistance =
                    distanceFromCenter;

                closestIndex =
                    index;
            }

            const normalizedDistance =
                clamp(
                    (
                        center -
                        viewportCenter
                    ) /
                    window.innerWidth,
                    -1,
                    1
                );

            const image =
                item.querySelector(
                    ".gallery-image img"
                );

            if (image) {
                const parallaxX =
                    normalizedDistance *
                    -55;

                image.style.transform = `
                    translate3d(
                        ${parallaxX}px,
                        0,
                        0
                    )
                    scale(1.08)
                `;
            }
        }
    );

    galleryItems.forEach(
        (item, index) => {
            item.classList.toggle(
                "is-active",
                index ===
                closestIndex
            );
        }
    );

    if (galleryCurrent) {
        galleryCurrent.textContent =
            String(
                closestIndex + 1
            ).padStart(
                2,
                "0"
            );
    }

    if (galleryProgressFill) {
        galleryProgressFill
            .style.transform =
            `scaleX(${progress})`;
    }

    window.requestAnimationFrame(
        updateHorizontalGallery
    );
};

if (
    horizontalGallery &&
    galleryTrack &&
    galleryItems.length > 0
) {
    calculateGalleryProgress();

    galleryCurrentProgress =
        galleryTargetProgress;

    window.addEventListener(
        "scroll",
        calculateGalleryProgress,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        calculateGalleryProgress
    );

    window.requestAnimationFrame(
        updateHorizontalGallery
    );
}

// ======================================================
// EXPLOSÃO DA PALAVRA IMAGINA
// ======================================================

const letterDirections = [
    {
        x: -550,
        y: -250,
        z: 500,
        rotation: -90
    },
    {
        x: -370,
        y: 330,
        z: 300,
        rotation: 65
    },
    {
        x: -180,
        y: -450,
        z: 650,
        rotation: -75
    },
    {
        x: 20,
        y: 480,
        z: 250,
        rotation: 100
    },
    {
        x: 220,
        y: -400,
        z: 500,
        rotation: 75
    },
    {
        x: 410,
        y: 270,
        z: 350,
        rotation: -80
    },
    {
        x: 600,
        y: -200,
        z: 700,
        rotation: 95
    }
];

const updateWordExplosion = () => {
    if (!wordSection) {
        return;
    }

    const progress =
        progressThroughSection(
            wordSection
        );

    const wordEntry =
        clamp(
            progress /
            0.17
        );

    const explosionProgress =
        clamp(
            (
                progress -
                0.16
            ) /
            0.24
        );

    const photoEntry =
        clamp(
            (
                progress -
                0.25
            ) /
            0.27
        );

    const revealProgress =
        clamp(
            (
                progress -
                0.49
            ) /
            0.19
        );

    const photoDrop =
        clamp(
            (
                progress -
                0.7
            ) /
            0.3
        );

    const easedExplosion =
        smoothStep(
            explosionProgress
        );

    const easedPhotoEntry =
        smoothStep(
            photoEntry
        );

    const easedReveal =
        smoothStep(
            revealProgress
        );

    const easedDrop =
        smoothStep(
            photoDrop
        );

    wordLetters.forEach(
        (letter, index) => {
            const direction =
                letterDirections[
                    index %
                    letterDirections.length
                ];

            const rotation =
                direction.rotation *
                easedExplosion;

            letter.style.transform = `
                translate3d(
                    ${
                        direction.x *
                        easedExplosion
                    }px,
                    ${
                        direction.y *
                        easedExplosion
                    }px,
                    ${
                        direction.z *
                        easedExplosion
                    }px
                )
                rotateZ(
                    ${rotation}deg
                )
                rotateY(
                    ${
                        rotation *
                        0.7
                    }deg
                )
            `;

            letter.style.opacity =
                String(
                    clamp(
                        1 -
                        easedExplosion *
                        1.18
                    )
                );

            letter.style.filter =
                `blur(${
                    easedExplosion *
                    6
                }px)`;
        }
    );

    if (explosionWord) {
        const wordScale =
            0.72 +
            wordEntry *
            0.28;

        explosionWord.style.transform =
            `scale(${wordScale})`;

        explosionWord.style.opacity =
            String(
                clamp(
                    1 -
                    easedExplosion *
                    0.85
                )
            );
    }

    if (imaginePhoto) {
        const startingZ =
            -900 +
            easedPhotoEntry *
            900;

        const entryScale =
            0.25 +
            easedPhotoEntry *
            0.75;

        const fullRotation =
            easedPhotoEntry *
            360;

        const entryRotateX =
            22 *
            (
                1 -
                easedPhotoEntry
            );

        const entryRotateY =
            -45 *
            (
                1 -
                easedPhotoEntry
            ) +
            fullRotation;

        const entryRotateZ =
            -12 *
            (
                1 -
                easedPhotoEntry
            );

        const dropY =
            easedDrop *
            window.innerHeight *
            1.18;

        const dropX =
            easedDrop *
            window.innerWidth *
            0.04;

        const dropRotation =
            easedDrop *
            14;

        const dropScale =
            entryScale *
            (
                1 -
                easedDrop *
                0.28
            );

        const photoOpacity =
            clamp(
                photoEntry *
                1.7
            ) *
            (
                1 -
                clamp(
                    (
                        photoDrop -
                        0.86
                    ) /
                    0.14
                )
            );

        imaginePhoto.style.opacity =
            String(
                photoOpacity
            );

        imaginePhoto.style.transform = `
            translate3d(
                calc(
                    -50% +
                    ${dropX}px
                ),
                calc(
                    -50% +
                    ${dropY}px
                ),
                ${startingZ}px
            )
            rotateX(
                ${entryRotateX}deg
            )
            rotateY(
                ${entryRotateY}deg
            )
            rotateZ(
                ${
                    entryRotateZ +
                    dropRotation
                }deg
            )
            scale(
                ${dropScale}
            )
        `;

        imaginePhoto.style.filter = `
            blur(
                ${
                    (
                        1 -
                        easedPhotoEntry
                    ) *
                    12
                }px
            )
            brightness(
                ${
                    0.7 +
                    easedPhotoEntry *
                    0.3 -
                    easedDrop *
                    0.08
                }
            )
        `;
    }

    if (imaginePhotoImage) {
        const imageScale =
            1.08 -
            easedPhotoEntry *
            0.06 +
            easedDrop *
            0.05;

        imaginePhotoImage
            .style.transform =
            `scale(${imageScale})`;
    }

    if (explosionReveal) {
        const exitProgress =
            clamp(
                (
                    progress -
                    0.75
                ) /
                0.18
            );

        explosionReveal.style.opacity =
            String(
                easedReveal *
                (
                    1 -
                    exitProgress
                )
            );

        explosionReveal.style.transform = `
            translateY(
                ${
                    40 -
                    easedReveal *
                    40 -
                    exitProgress *
                    90
                }px
            )
            scale(
                ${
                    0.82 +
                    easedReveal *
                    0.18
                }
            )
        `;
    }

    if (imagineBackground) {
        imagineBackground
            .style.transform =
            `scale(${
                1.15 +
                progress *
                0.13
            })`;

        imagineBackground
            .style.opacity =
            String(
                1 -
                photoDrop *
                0.8
            );
    }

    if (imagineDropLine) {
        imagineDropLine.style.opacity =
            String(
                clamp(
                    (
                        progress -
                        0.63
                    ) /
                    0.12
                ) *
                (
                    1 -
                    photoDrop
                )
            );
    }

    if (imagineDropLineFill) {
        const lineProgress =
            clamp(
                (
                    progress -
                    0.64
                ) /
                0.18
            );

        imagineDropLineFill
            .style.transform =
            `translateY(${
                -120 +
                lineProgress *
                360
            }%)`;
    }
};

// ======================================================
// SOBRE
// ======================================================

const updateAbout = () => {
    if (
        !about ||
        !aboutImage
    ) {
        return;
    }

    /*
     * No telemóvel o efeito parallax
     * é removido por desempenho.
     */
    if (
        window.innerWidth <= 820
    ) {
        aboutImage.style
            .removeProperty(
                "transform"
            );

        return;
    }

    const rectangle =
        about.getBoundingClientRect();

    const progress =
        clamp(
            (
                window.innerHeight -
                rectangle.top
            ) /
            (
                window.innerHeight +
                rectangle.height
            )
        );

    aboutImage.style.transform = `
        translateY(
            ${
                -12 +
                progress *
                18
            }%
        )
        scale(1.06)
    `;
};

// ======================================================
// ANO DO RODAPÉ
// ======================================================

const currentYear =
    document.querySelector(
        "#current-year"
    );

if (currentYear) {
    currentYear.textContent =
        String(
            new Date()
                .getFullYear()
        );
}

// ======================================================
// VISUALIZADOR DOS PROJETOS
// ======================================================

const projectViewer =
    document.querySelector(
        "#project-viewer"
    );

const projectClose =
    document.querySelector(
        "#project-close"
    );

const projectPrevious =
    document.querySelector(
        "#project-previous"
    );

const projectNext =
    document.querySelector(
        "#project-next"
    );

const projectNumber =
    document.querySelector(
        "#project-number"
    );

const projectImage =
    document.querySelector(
        "#project-image"
    );

const projectFallback =
    document.querySelector(
        "#project-viewer-fallback"
    );

const projectCategory =
    document.querySelector(
        "#project-category"
    );

const projectYear =
    document.querySelector(
        "#project-year"
    );

const projectTitle =
    document.querySelector(
        "#project-title"
    );

const projectDescription =
    document.querySelector(
        "#project-description"
    );

const projectService =
    document.querySelector(
        "#project-service"
    );

const projectClient =
    document.querySelector(
        "#project-client"
    );

const projectLocation =
    document.querySelector(
        "#project-location"
    );

const projectGalleryTrack =
    document.querySelector(
        "#project-gallery-track"
    );

const projectGalleryDots =
    document.querySelector(
        "#project-gallery-dots"
    );

const projectGalleryPrevious =
    document.querySelector(
        "#project-gallery-previous"
    );

const projectGalleryNext =
    document.querySelector(
        "#project-gallery-next"
    );

const projectGalleryCurrent =
    document.querySelector(
        "#project-gallery-current"
    );

const projectGalleryTotal =
    document.querySelector(
        "#project-gallery-total"
    );

let activeProjectIndex = 0;
let activeGalleryIndex = 0;
let projectViewerIsOpen = false;
let lastFocusedProject = null;

// ======================================================
// GALERIA INTERNA DOS PROJETOS
// ======================================================

const updateProjectGalleryPosition =
    () => {
        if (!projectGalleryTrack) {
            return;
        }

        projectGalleryTrack
            .style.transform = `
                translate3d(
                    ${
                        activeGalleryIndex *
                        -100
                    }%,
                    0,
                    0
                )
            `;

        if (projectGalleryCurrent) {
            projectGalleryCurrent
                .textContent =
                String(
                    activeGalleryIndex +
                    1
                ).padStart(
                    2,
                    "0"
                );
        }

        projectGalleryDots
            ?.querySelectorAll(
                ".project-gallery-dot"
            )
            .forEach(
                (
                    dot,
                    index
                ) => {
                    const isActive =
                        index ===
                        activeGalleryIndex;

                    dot.classList.toggle(
                        "is-active",
                        isActive
                    );

                    dot.setAttribute(
                        "aria-current",
                        isActive
                            ? "true"
                            : "false"
                    );
                }
            );
    };

const createProjectGallery = (
    project
) => {
    if (
        !projectGalleryTrack ||
        !projectGalleryDots
    ) {
        return;
    }

    const gallery =
        Array.isArray(
            project.gallery
        ) &&
        project.gallery.length > 0
            ? project.gallery
            : [project.image];

    activeGalleryIndex = 0;

    projectGalleryTrack.innerHTML =
        "";

    projectGalleryDots.innerHTML =
        "";

    gallery.forEach(
        (
            imagePath,
            index
        ) => {
            const slide =
                document.createElement(
                    "article"
                );

            slide.className =
                "project-gallery-slide";

            const imageDescription =
                `${project.title}, ` +
                `fotografia ${
                    index + 1
                }`;

            slide.innerHTML = `
                <div class="project-gallery-image">
                    <img
                        src="${imagePath}"
                        alt="${imageDescription}"
                        loading="lazy"
                    >

                    <div class="project-gallery-fallback">
                        <span>
                            ${project.category}
                        </span>
                    </div>
                </div>

                <div class="project-gallery-slide-information">
                    <span>
                        ${
                            String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            )
                        }
                    </span>

                    <span>
                        ${project.title}
                    </span>
                </div>
            `;

            const image =
                slide.querySelector(
                    "img"
                );

            if (image) {
                revealSiteImage(
                    image
                );
            }

            projectGalleryTrack
                .appendChild(
                    slide
                );

            const dot =
                document.createElement(
                    "button"
                );

            dot.className =
                "project-gallery-dot";

            dot.type =
                "button";

            dot.setAttribute(
                "aria-label",
                `Abrir fotografia ${
                    index + 1
                }`
            );

            dot.addEventListener(
                "click",
                () => {
                    activeGalleryIndex =
                        index;

                    updateProjectGalleryPosition();
                }
            );

            projectGalleryDots
                .appendChild(
                    dot
                );
        }
    );

    if (projectGalleryTotal) {
        projectGalleryTotal
            .textContent =
            String(
                gallery.length
            ).padStart(
                2,
                "0"
            );
    }

    updateProjectGalleryPosition();
    addCursorInteractions();
};

const moveProjectGallery = (
    direction
) => {
    const total =
        projectGalleryTrack
            ?.children.length ||
        0;

    if (total === 0) {
        return;
    }

    activeGalleryIndex =
        (
            activeGalleryIndex +
            direction +
            total
        ) %
        total;

    updateProjectGalleryPosition();
};

// ======================================================
// ATUALIZAR O VISUALIZADOR
// ======================================================

const updateProjectViewer = (
    index
) => {
    if (
        projects.length === 0
    ) {
        return;
    }

    activeProjectIndex =
        (
            index +
            projects.length
        ) %
        projects.length;

    const project =
        projects[
            activeProjectIndex
        ];

    createProjectGallery(
        project
    );

    if (projectNumber) {
        projectNumber.textContent =
            String(
                activeProjectIndex +
                1
            ).padStart(
                2,
                "0"
            );
    }

    if (projectCategory) {
        projectCategory.textContent =
            project.category;
    }

    if (projectYear) {
        projectYear.textContent =
            project.year;
    }

    if (projectTitle) {
        projectTitle.textContent =
            project.title;
    }

    if (projectDescription) {
        projectDescription.textContent =
            project.description;
    }

    if (projectService) {
        projectService.textContent =
            project.service;
    }

    if (projectClient) {
        projectClient.textContent =
            project.client;
    }

    if (projectLocation) {
        projectLocation.textContent =
            project.location;
    }

    if (projectFallback) {
        projectFallback
            .style.background =
            project.fallback;
    }

    if (projectImage) {
        projectImage.classList.remove(
            "is-visible"
        );

        projectImage.alt =
            project.title;

        projectImage.src =
            project.image;
    }
};

projectImage?.addEventListener(
    "load",
    () => {
        projectImage.classList.add(
            "is-visible"
        );
    }
);

projectImage?.addEventListener(
    "error",
    () => {
        projectImage.classList.remove(
            "is-visible"
        );
    }
);

// ======================================================
// ABRIR E FECHAR PROJETOS
// ======================================================

const openProjectViewer = (
    index,
    sourceCard = null
) => {
    if (!projectViewer) {
        return;
    }

    lastFocusedProject =
        sourceCard;

    updateProjectViewer(
        index
    );

    projectViewerIsOpen =
        true;

    document.body.classList.add(
        "project-is-open"
    );

    projectViewer.classList.remove(
        "is-closing"
    );

    projectViewer.setAttribute(
        "aria-hidden",
        "false"
    );

    projectViewer.scrollTop =
        0;

    window.requestAnimationFrame(
        () => {
            projectViewer
                .classList.add(
                    "is-open"
                );
        }
    );

    window.setTimeout(
        () => {
            projectClose?.focus();
        },
        850
    );
};

const closeProjectViewer = () => {
    if (
        !projectViewerIsOpen ||
        !projectViewer
    ) {
        return;
    }

    projectViewerIsOpen =
        false;

    projectViewer.classList.add(
        "is-closing"
    );

    projectViewer.classList.remove(
        "is-open"
    );

    window.setTimeout(
        () => {
            document.body
                .classList.remove(
                    "project-is-open"
                );

            projectViewer
                .classList.remove(
                    "is-closing"
                );

            projectViewer.setAttribute(
                "aria-hidden",
                "true"
            );

            lastFocusedProject
                ?.focus();
        },
        900
    );
};

// ======================================================
// EVENTOS DOS PROJETOS
// ======================================================

tunnelCards.forEach(
    (
        card,
        fallbackIndex
    ) => {
        const openCardProject =
            () => {
                const savedIndex =
                    Number(
                        card.dataset
                            .projectIndex
                    );

                const index =
                    Number.isFinite(
                        savedIndex
                    )
                        ? savedIndex
                        : fallbackIndex %
                        projects.length;

                openProjectViewer(
                    index,
                    card
                );
            };

        card.addEventListener(
            "click",
            openCardProject
        );

        card.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key ===
                    "Enter" ||
                    event.key ===
                    " "
                ) {
                    event.preventDefault();

                    openCardProject();
                }
            }
        );
    }
);

projectClose?.addEventListener(
    "click",
    closeProjectViewer
);

projectPrevious?.addEventListener(
    "click",
    () => {
        updateProjectViewer(
            activeProjectIndex -
            1
        );

        projectViewer?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);

projectNext?.addEventListener(
    "click",
    () => {
        updateProjectViewer(
            activeProjectIndex +
            1
        );

        projectViewer?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);

projectGalleryPrevious
    ?.addEventListener(
        "click",
        () => {
            moveProjectGallery(
                -1
            );
        }
    );

projectGalleryNext
    ?.addEventListener(
        "click",
        () => {
            moveProjectGallery(
                1
            );
        }
    );

// ======================================================
// TECLADO
// ======================================================

window.addEventListener(
    "keydown",
    (event) => {
        if (
            projectViewerIsOpen
        ) {
            if (
                event.key ===
                "Escape"
            ) {
                closeProjectViewer();
                return;
            }

            if (
                event.key ===
                "ArrowLeft"
            ) {
                event.preventDefault();

                if (
                    event.shiftKey
                ) {
                    updateProjectViewer(
                        activeProjectIndex -
                        1
                    );
                } else {
                    moveProjectGallery(
                        -1
                    );
                }

                return;
            }

            if (
                event.key ===
                "ArrowRight"
            ) {
                event.preventDefault();

                if (
                    event.shiftKey
                ) {
                    updateProjectViewer(
                        activeProjectIndex +
                        1
                    );
                } else {
                    moveProjectGallery(
                        1
                    );
                }

                return;
            }
        }

        if (
            event.key ===
            "Escape"
        ) {
            closeMenu();
        }
    }
);
// ======================================================
// SERVIÇOS EXPANSÍVEIS
// ======================================================

const serviceCards =
    Array.from(
        document.querySelectorAll(
            ".service-card"
        )
    );

const closeServiceCard = (
    card
) => {
    if (!card) {
        return;
    }

    const toggle =
        card.querySelector(
            ".service-toggle"
        );

    const details =
        card.querySelector(
            ".service-details"
        );

    card.classList.remove(
        "is-open"
    );

    toggle?.setAttribute(
        "aria-expanded",
        "false"
    );

    details?.setAttribute(
        "aria-hidden",
        "true"
    );
};

const openServiceCard = (
    card
) => {
    if (!card) {
        return;
    }

    serviceCards.forEach(
        (otherCard) => {
            if (
                otherCard !== card
            ) {
                closeServiceCard(
                    otherCard
                );
            }
        }
    );

    const toggle =
        card.querySelector(
            ".service-toggle"
        );

    const details =
        card.querySelector(
            ".service-details"
        );

    card.classList.add(
        "is-open"
    );

    toggle?.setAttribute(
        "aria-expanded",
        "true"
    );

    details?.setAttribute(
        "aria-hidden",
        "false"
    );
};

serviceCards.forEach(
    (card) => {
        const toggle =
            card.querySelector(
                ".service-toggle"
            );

        toggle?.addEventListener(
            "click",
            () => {
                const isOpen =
                    card.classList.contains(
                        "is-open"
                    );

                if (isOpen) {
                    closeServiceCard(
                        card
                    );
                } else {
                    openServiceCard(
                        card
                    );
                }
            }
        );
    }
);

// ======================================================
// PROCESSO DE TRABALHO
// ======================================================

const processSection =
    document.querySelector(
        ".process"
    );

const processSteps =
    Array.from(
        document.querySelectorAll(
            ".process-step"
        )
    );

const processCurrent =
    document.querySelector(
        "#process-current"
    );

const processProgressFill =
    document.querySelector(
        "#process-progress-fill"
    );

const updateProcess = () => {
    if (
        !processSection ||
        processSteps.length === 0
    ) {
        return;
    }

    /*
     * No telemóvel, as etapas ficam
     * todas visíveis em sequência.
     */
    if (
        window.innerWidth <= 820
    ) {
        processSteps.forEach(
            (step) => {
                step.classList.add(
                    "is-active"
                );

                step.classList.remove(
                    "is-before"
                );

                step.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }
        );

        return;
    }

    const progress =
        progressThroughSection(
            processSection
        );

    const rawIndex =
        Math.floor(
            progress *
            processSteps.length
        );

    const activeIndex =
        Math.min(
            processSteps.length - 1,
            Math.max(
                0,
                rawIndex
            )
        );

    processSteps.forEach(
        (step, index) => {
            step.classList.toggle(
                "is-active",
                index ===
                activeIndex
            );

            step.classList.toggle(
                "is-before",
                index <
                activeIndex
            );

            step.setAttribute(
                "aria-hidden",
                String(
                    index !==
                    activeIndex
                )
            );
        }
    );

    if (processCurrent) {
        processCurrent.textContent =
            String(
                activeIndex + 1
            ).padStart(
                2,
                "0"
            );
    }

    if (processProgressFill) {
        processProgressFill
            .style.transform =
            `scaleY(${progress})`;
    }
};

// ======================================================
// FORMULÁRIO DE CONTACTO SEM RELOAD
// ======================================================

const quoteForm =
    document.querySelector(
        "#quote-form"
    );

const quoteName =
    document.querySelector(
        "#quote-name"
    );

const quoteEmail =
    document.querySelector(
        "#quote-email"
    );

const quotePhone =
    document.querySelector(
        "#quote-phone"
    );

const quoteCompany =
    document.querySelector(
        "#quote-company"
    );

const quoteBudget =
    document.querySelector(
        "#quote-budget"
    );

const quoteDate =
    document.querySelector(
        "#quote-date"
    );

const quoteLocation =
    document.querySelector(
        "#quote-location"
    );

const quoteMessage =
    document.querySelector(
        "#quote-message"
    );

const quotePrivacy =
    document.querySelector(
        "#quote-privacy"
    );

const messageCounter =
    document.querySelector(
        "#message-counter"
    );

const formStatus =
    document.querySelector(
        "#form-status"
    );

const serviceError =
    document.querySelector(
        "#service-error"
    );

const privacyError =
    document.querySelector(
        "#privacy-error"
    );

/*
 * Substitui este endereço
 * pelo e-mail verdadeiro.
 */
const contactRecipient =
    "ola@studio.pt";

const getSelectedService = () => {
    return document.querySelector(
        'input[name="service"]:checked, ' +
        'input[name="Servico"]:checked'
    );
};

const clearServiceError = () => {
    if (serviceError) {
        serviceError.textContent =
            "";
    }
};

const clearPrivacyError = () => {
    if (privacyError) {
        privacyError.textContent =
            "";
    }
};

const showContactStatus = (
    message,
    type = "error"
) => {
    if (!formStatus) {
        return;
    }

    formStatus.textContent =
        message;

    formStatus.classList.remove(
        "is-error",
        "is-success"
    );

    formStatus.classList.add(
        "is-visible",
        type === "success"
            ? "is-success"
            : "is-error"
    );
};

const clearContactStatus = () => {
    formStatus?.classList.remove(
        "is-visible",
        "is-error",
        "is-success"
    );
};

const clearContactErrors = () => {
    quoteForm
        ?.querySelectorAll(
            ".field-error"
        )
        .forEach(
            (error) => {
                error.textContent =
                    "";
            }
        );

    quoteForm
        ?.querySelectorAll(
            ".has-error"
        )
        .forEach(
            (field) => {
                field.classList.remove(
                    "has-error"
                );
            }
        );

    clearServiceError();
    clearPrivacyError();
    clearContactStatus();
};

const setContactError = (
    field,
    message
) => {
    if (!field) {
        return;
    }

    const container =
        field.closest(
            ".form-field"
        );

    container?.classList.add(
        "has-error"
    );

    field.setAttribute(
        "aria-invalid",
        "true"
    );

    const error =
        container?.querySelector(
            ".field-error"
        );

    if (error) {
        error.textContent =
            message;
    }
};

const clearFieldError = (
    field
) => {
    if (!field) {
        return;
    }

    const container =
        field.closest(
            ".form-field"
        );

    container?.classList.remove(
        "has-error"
    );

    field.removeAttribute(
        "aria-invalid"
    );

    const error =
        container?.querySelector(
            ".field-error"
        );

    if (error) {
        error.textContent =
            "";
    }
};

const validateContactForm = () => {
    clearContactErrors();

    let valid = true;

    if (
        !quoteName
            ?.value
            .trim()
    ) {
        setContactError(
            quoteName,
            "Indica o teu nome."
        );

        valid = false;
    }

    const email =
        quoteEmail
            ?.value
            .trim() ||
        "";

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        setContactError(
            quoteEmail,
            "Indica o teu e-mail."
        );

        valid = false;
    } else if (
        !emailPattern.test(
            email
        )
    ) {
        setContactError(
            quoteEmail,
            "Confirma se o e-mail está correto."
        );

        valid = false;
    }

    if (
        !getSelectedService()
    ) {
        if (serviceError) {
            serviceError.textContent =
                "Seleciona um serviço.";
        }

        valid = false;
    }

    const message =
        quoteMessage
            ?.value
            .trim() ||
        "";

    if (!message) {
        setContactError(
            quoteMessage,
            "Descreve brevemente o projeto."
        );

        valid = false;
    } else if (
        message.length < 20
    ) {
        setContactError(
            quoteMessage,
            "Escreve pelo menos 20 caracteres."
        );

        valid = false;
    }

    if (
        quotePrivacy &&
        !quotePrivacy.checked
    ) {
        if (privacyError) {
            privacyError.textContent =
                "É necessário aceitar esta autorização.";
        }

        valid = false;
    }

    return valid;
};

const formatContactDate = (
    value
) => {
    if (!value) {
        return "Não definida";
    }

    const parts =
        value.split("-");

    if (
        parts.length !== 3
    ) {
        return value;
    }

    return [
        parts[2],
        parts[1],
        parts[0]
    ].join("/");
};

const createContactEmail = () => {
    const selectedService =
        getSelectedService();

    const name =
        quoteName
            ?.value
            .trim() ||
        "Cliente";

    const subject =
        `Pedido de projeto — ${name}`;

    const body = [
        "NOVO PEDIDO DE PROJETO",
        "",
        `Nome: ${name}`,
        `E-mail: ${
            quoteEmail
                ?.value
                .trim() ||
            "Não indicado"
        }`,
        `Telefone: ${
            quotePhone
                ?.value
                .trim() ||
            "Não indicado"
        }`,
        `Marca/empresa: ${
            quoteCompany
                ?.value
                .trim() ||
            "Não indicada"
        }`,
        `Serviço: ${
            selectedService
                ?.value ||
            "Não indicado"
        }`,
        `Orçamento: ${
            quoteBudget
                ?.value ||
            "Não definido"
        }`,
        `Data pretendida: ${
            formatContactDate(
                quoteDate
                    ?.value ||
                ""
            )
        }`,
        `Localização: ${
            quoteLocation
                ?.value
                .trim() ||
            "Não indicada"
        }`,
        "",
        "DESCRIÇÃO",
        "",
        quoteMessage
            ?.value
            .trim() ||
        ""
    ].join("\n");

    return (
        `mailto:${contactRecipient}` +
        `?subject=${
            encodeURIComponent(
                subject
            )
        }` +
        `&body=${
            encodeURIComponent(
                body
            )
        }`
    );
};

const focusFirstContactError = () => {
    const firstInvalidField =
        quoteForm?.querySelector(
            '[aria-invalid="true"]'
        );

    if (firstInvalidField) {
        firstInvalidField.focus();
        return;
    }

    if (
        !getSelectedService()
    ) {
        quoteForm
            ?.querySelector(
                'input[name="service"], ' +
                'input[name="Servico"]'
            )
            ?.focus();

        return;
    }

    if (
        quotePrivacy &&
        !quotePrivacy.checked
    ) {
        quotePrivacy.focus();
    }
};

quoteForm?.addEventListener(
    "submit",
    (event) => {
        /*
         * Impede a página de recarregar.
         */
        event.preventDefault();

        if (
            !validateContactForm()
        ) {
            showContactStatus(
                "Confirma os campos assinalados antes de enviar.",
                "error"
            );

            focusFirstContactError();
            return;
        }

        const emailUrl =
            createContactEmail();

        showContactStatus(
            "O pedido está pronto. A aplicação de e-mail será aberta para confirmares o envio.",
            "success"
        );

        /*
         * Abre Mail, Outlook ou outra
         * aplicação de e-mail configurada.
         */
        window.location.href =
            emailUrl;
    }
);

[
    quoteName,
    quoteEmail,
    quotePhone,
    quoteCompany,
    quoteLocation
].forEach(
    (field) => {
        field?.addEventListener(
            "input",
            () => {
                clearFieldError(
                    field
                );
            }
        );
    }
);

quoteMessage?.addEventListener(
    "input",
    () => {
        clearFieldError(
            quoteMessage
        );

        if (messageCounter) {
            messageCounter.textContent =
                `${
                    quoteMessage
                        .value
                        .length
                } / 1500`;
        }
    }
);

quoteForm
    ?.querySelectorAll(
        'input[name="service"], ' +
        'input[name="Servico"]'
    )
    .forEach(
        (option) => {
            option.addEventListener(
                "change",
                clearServiceError
            );
        }
    );

quotePrivacy?.addEventListener(
    "change",
    clearPrivacyError
);

// ======================================================
// CICLO PRINCIPAL DO SCROLL
// ======================================================

let pageAnimationFrame =
    null;

const updatePage = () => {
    updateHero();
    updateManifesto();
    updateTunnel();
    updateWordExplosion();
    updateProcess();
    updateAbout();

    pageAnimationFrame =
        null;
};

const requestPageUpdate = () => {
    if (
        pageAnimationFrame !==
        null
    ) {
        return;
    }

    pageAnimationFrame =
        window.requestAnimationFrame(
            updatePage
        );
};

window.addEventListener(
    "scroll",
    requestPageUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    () => {
        calculateGalleryProgress();

        if (
            window.innerWidth >
            820
        ) {
            closeMenu();
        }

        requestPageUpdate();
    }
);

window.addEventListener(
    "pageshow",
    () => {
        if (
            !projectViewerIsOpen
        ) {
            document.body
                .classList.remove(
                    "project-is-open"
                );
        }

        if (
            !navigation
                ?.classList
                .contains(
                    "is-open"
                )
        ) {
            document.body
                .classList.remove(
                    "menu-open"
                );
        }

        document.documentElement
            .style
            .removeProperty(
                "overflow"
            );

        if (
            !projectViewerIsOpen &&
            !navigation
                ?.classList
                .contains(
                    "is-open"
                )
        ) {
            document.body
                .style
                .removeProperty(
                    "overflow"
                );
        }

        requestPageUpdate();
    }
);

// ======================================================
// INICIALIZAÇÃO
// ======================================================

calculateGalleryProgress();
updatePage();

/* =========================================================
   PUNSHONSTUDIO
   SEQUÊNCIA WEBP CONTROLADA PELO SCROLL
   ========================================================= */

(() => {
    const section = document.querySelector("#logo-scroll");
    const canvas = document.querySelector("#logo-sequence");
    const loadingText = document.querySelector(
        "#logo-scroll-loading-text"
    );
    const loadingProgress = document.querySelector(
        "#logo-scroll-loading-progress"
    );

    if (!section || !canvas) {
        console.warn(
            "A introdução do logótipo não foi encontrada."
        );
        return;
    }

    const context = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true
    });

    if (!context) {
        console.warn(
            "O navegador não suporta canvas 2D."
        );
        return;
    }

    const FRAME_COUNT = 120;
    const FIRST_FRAME = 0;
    const LAST_FRAME = FRAME_COUNT - 1;

  const IMAGE_FOLDER = "images/logo-scroll";
const FILE_PREFIX = "logo-scroll-frames_";
const FILE_SUFFIX = "_resultado.webp";

    const MAX_PIXEL_RATIO = 2;
    const PRELOAD_BATCH_SIZE = 8;

    const frames = new Array(FRAME_COUNT);

    let loadedFrames = 0;
    let currentFrame = -1;
    let requestedFrame = 0;
    let animationFrameId = null;
    let resizeTimer = null;
    let firstFrameRendered = false;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function framePath(index) {
    const number = String(index + FIRST_FRAME).padStart(
        5,
        "0"
    );

    return `${IMAGE_FOLDER}/${FILE_PREFIX}${number}${FILE_SUFFIX}`;
}

    function updateLoadingInterface() {
        const percentage = Math.round(
            (loadedFrames / FRAME_COUNT) * 100
        );

        if (loadingText) {
            loadingText.textContent =
                `A carregar ${percentage}%`;
        }

        if (loadingProgress) {
            loadingProgress.style.width =
                `${percentage}%`;
        }
    }

    function loadFrame(index) {
        if (index < 0 || index >= FRAME_COUNT) {
            return Promise.resolve(false);
        }

        if (frames[index]) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            const image = new Image();

            image.decoding = "async";
            image.src = framePath(index);

            image.onload = () => {
                frames[index] = image;
                loadedFrames += 1;

                updateLoadingInterface();

                if (
                    index === 0 &&
                    !firstFrameRendered
                ) {
                    resizeCanvas();
                    drawFrame(0);

                    firstFrameRendered = true;
                    section.classList.add("is-ready");
                }

                resolve(true);
            };

            image.onerror = () => {
                console.error(
                    "Não foi possível carregar:",
                    framePath(index)
                );

                resolve(false);
            };
        });
    }

    /*
    Carrega primeiro alguns frames distribuídos pela
    animação. Assim, o utilizador vê alguma coisa mesmo
    antes de os 120 frames terminarem de carregar.
    */

    function loadPriorityFrames() {
        const indexes = [
            0,
            1,
            2,
            3,
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100,
            110,
            119
        ];

        return Promise.all(
            indexes.map((index) => loadFrame(index))
        );
    }

    function loadRemainingFrames() {
        const priority = new Set([
            0,
            1,
            2,
            3,
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100,
            110,
            119
        ]);

        const queue = [];

        for (
            let index = 0;
            index < FRAME_COUNT;
            index += 1
        ) {
            if (!priority.has(index)) {
                queue.push(index);
            }
        }

        async function processBatch(start) {
            const batch = queue.slice(
                start,
                start + PRELOAD_BATCH_SIZE
            );

            if (!batch.length) {
                section.classList.add(
                    "all-frames-loaded"
                );
                return;
            }

            await Promise.all(
                batch.map((index) => loadFrame(index))
            );

            window.setTimeout(() => {
                processBatch(
                    start + PRELOAD_BATCH_SIZE
                );
            }, 25);
        }

        processBatch(0);
    }

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();

        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            MAX_PIXEL_RATIO
        );

        const width = Math.max(
            1,
            Math.round(
                rect.width * pixelRatio
            )
        );

        const height = Math.max(
            1,
            Math.round(
                rect.height * pixelRatio
            )
        );

        if (
            canvas.width !== width ||
            canvas.height !== height
        ) {
            canvas.width = width;
            canvas.height = height;
        }

        if (currentFrame >= 0) {
            drawFrame(currentFrame, true);
        }
    }

    function nearestLoadedFrame(target) {
        if (frames[target]) {
            return target;
        }

        for (
            let distance = 1;
            distance < FRAME_COUNT;
            distance += 1
        ) {
            const previous = target - distance;
            const next = target + distance;

            if (
                previous >= 0 &&
                frames[previous]
            ) {
                return previous;
            }

            if (
                next < FRAME_COUNT &&
                frames[next]
            ) {
                return next;
            }
        }

        return 0;
    }

    function drawFrame(target, force = false) {
        const safeTarget = Math.min(
            LAST_FRAME,
            Math.max(0, target)
        );

        if (
            !force &&
            currentFrame === safeTarget
        ) {
            return;
        }

        const availableIndex =
            nearestLoadedFrame(safeTarget);

        const image =
            frames[availableIndex];

        if (!image) {
            return;
        }

        const canvasWidth =
            canvas.width;

        const canvasHeight =
            canvas.height;

        const imageWidth =
            image.naturalWidth ||
            image.width;

        const imageHeight =
            image.naturalHeight ||
            image.height;

        /*
        "contain" mantém o enquadramento completo do
        After Effects sem cortar as extremidades.

        Como os frames já têm fundo preto, as faixas
        restantes também aparecem pretas.
        */

        const scale = Math.min(
            canvasWidth / imageWidth,
            canvasHeight / imageHeight
        );

        const drawWidth =
            imageWidth * scale;

        const drawHeight =
            imageHeight * scale;

        const drawX =
            (canvasWidth - drawWidth) / 2;

        const drawY =
            (canvasHeight - drawHeight) / 2;

        context.fillStyle = "#030303";

        context.fillRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );

        context.drawImage(
            image,
            drawX,
            drawY,
            drawWidth,
            drawHeight
        );

        currentFrame = safeTarget;
    }

    function getProgress() {
        const rect =
            section.getBoundingClientRect();

        const distance =
            section.offsetHeight -
            window.innerHeight;

        if (distance <= 0) {
            return 0;
        }

        return Math.min(
            1,
            Math.max(
                0,
                -rect.top / distance
            )
        );
    }

    function updateHeaderState(progress) {
        const isInsideIntro =
            progress < 0.985;

        document.body.classList.toggle(
            "logo-intro-active",
            isInsideIntro
        );
    }

   function clamp(value, minimum = 0, maximum = 1) {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
}

function rangeProgress(
    progress,
    start,
    end
) {
    return clamp(
        (progress - start) /
        (end - start)
    );
}

function easeInOutCubic(value) {
    if (value < 0.5) {
        return 4 * value * value * value;
    }

    return 1 -
        Math.pow(
            -2 * value + 2,
            3
        ) / 2;
}

function easeOutQuint(value) {
    return 1 -
        Math.pow(
            1 - value,
            5
        );
}

function clampTransition(
    value,
    minimum = 0,
    maximum = 1
) {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
}

function transitionRange(
    value,
    start,
    end
) {
    if (end === start) {
        return value >= end ? 1 : 0;
    }

    return clampTransition(
        (value - start) /
        (end - start)
    );
}

function transitionEase(value) {
    const safeValue =
        clampTransition(value);

    return 1 -
        Math.pow(
            1 - safeValue,
            4
        );
}


function updateCinematicTransition(progress) {
    const hero =
        document.querySelector(".hero");

    /*
    A sequência começa a sair nos últimos 14%.
    Não se tenta sobrepor fisicamente o hero ao sticky.
    Isso evita o desaparecimento produzido pela margem negativa.
    */

    const exitRaw =
        transitionRange(
            progress,
            0.86,
            1
        );

    const exitProgress =
        transitionEase(
            exitRaw
        );

    const canvasOpacity =
        1 -
        transitionEase(
            transitionRange(
                progress,
                0.91,
                1
            )
        );

    const canvasScale =
        1 +
        exitProgress * 0.08;

    const canvasBlur =
        transitionRange(
            progress,
            0.90,
            1
        ) * 8;

    const flashProgress =
        transitionRange(
            progress,
            0.87,
            0.985
        );

    const flashOpacity =
        Math.sin(
            flashProgress *
            Math.PI
        ) * 0.85;

    const flashPosition =
        -120 +
        flashProgress * 260;

    section.style.setProperty(
        "--logo-exit-progress",
        exitProgress.toFixed(4)
    );

    section.style.setProperty(
        "--logo-exit-opacity",
        canvasOpacity.toFixed(4)
    );

    section.style.setProperty(
        "--logo-exit-scale",
        canvasScale.toFixed(4)
    );

    section.style.setProperty(
        "--logo-exit-blur",
        `${canvasBlur.toFixed(2)}px`
    );

    section.style.setProperty(
        "--transition-flash-opacity",
        flashOpacity.toFixed(4)
    );

    section.style.setProperty(
        "--transition-flash-x",
        `${flashPosition.toFixed(2)}%`
    );

    /*
    O hero recebe valores seguros. No topo da página,
    fica preparado para entrar. Quando o utilizador chega
    ao hero, uma função independente calcula a sua entrada.
    */

    if (hero) {
        hero.classList.toggle(
            "hero-cinematic-enter",
            progress > 0.88
        );
    }
}
function updateHeroReveal() {
    const hero =
        document.querySelector(".hero");

    if (!hero) {
        return;
    }

    const rect =
        hero.getBoundingClientRect();

    const viewportHeight =
        window.innerHeight;

    /*
    Começa quando a parte superior do hero entra pelos
    últimos 20% do ecrã e termina perto do centro.
    */

    const rawProgress =
        clampTransition(
            (
                viewportHeight * 0.98 -
                rect.top
            ) /
            (
                viewportHeight * 0.72
            )
        );

    const progress =
        transitionEase(
            rawProgress
        );

    const contentProgress =
        transitionEase(
            transitionRange(
                progress,
                0.22,
                1
            )
        );

    const imageProgress =
        transitionEase(
            transitionRange(
                progress,
                0,
                0.9
            )
        );

    const lineProgress =
        Math.sin(
            clampTransition(
                progress
            ) *
            Math.PI
        );

    hero.style.setProperty(
        "--hero-content-opacity",
        contentProgress.toFixed(4)
    );

    hero.style.setProperty(
        "--hero-content-y",
        `${(
            65 *
            (1 - contentProgress)
        ).toFixed(2)}px`
    );

    hero.style.setProperty(
        "--hero-image-opacity",
        (
            0.15 +
            imageProgress * 0.85
        ).toFixed(4)
    );

    hero.style.setProperty(
        "--hero-image-y",
        `${(
            85 *
            (1 - imageProgress)
        ).toFixed(2)}px`
    );

    hero.style.setProperty(
        "--hero-image-scale",
        (
            1.08 -
            imageProgress * 0.08
        ).toFixed(4)
    );

    hero.style.setProperty(
        "--hero-image-brightness",
        (
            0.48 +
            imageProgress * 0.52
        ).toFixed(4)
    );

    hero.style.setProperty(
        "--hero-overlay-opacity",
        (
            0.78 -
            imageProgress * 0.36
        ).toFixed(4)
    );

    hero.style.setProperty(
        "--hero-top-line-width",
        `${(
            lineProgress * 70
        ).toFixed(2)}%`
    );

    hero.style.setProperty(
        "--hero-top-line-opacity",
        lineProgress.toFixed(4)
    );

    hero.classList.toggle(
        "hero-cinematic-complete",
        progress >= 0.995
    );
}
function updateFromScroll() {
    animationFrameId = null;

    const progress =
        reducedMotion
            ? 0
            : getProgress();

    requestedFrame = Math.min(
        LAST_FRAME,
        Math.round(
            progress * LAST_FRAME
        )
    );

    section.classList.toggle(
        "has-scrolled",
        progress > 0.012
    );

    section.classList.toggle(
        "is-ending",
        progress > 0.86
    );

    updateCinematicTransition(
        progress
    );

    updateHeroReveal();
    updateHeaderState(progress);
    drawFrame(requestedFrame);
}

    function requestScrollUpdate() {
        if (animationFrameId !== null) {
            return;
        }

        animationFrameId =
            window.requestAnimationFrame(
                updateFromScroll
            );
    }

    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        () => {
            window.clearTimeout(
                resizeTimer
            );

            resizeTimer =
                window.setTimeout(
                    () => {
                        resizeCanvas();
                        requestScrollUpdate();
                    },
                    120
                );
        }
    );

    /*
    O primeiro frame é carregado imediatamente.
    Os restantes são carregados depois por lotes.
    */
   updateHeroReveal();

    loadFrame(0)
        .then(() => loadPriorityFrames())
        .then(() => {
            loadRemainingFrames();
            requestScrollUpdate();
        });
})();