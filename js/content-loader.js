/* =========================================================
   PUNSHONSTUDIO
   CARREGADOR DE CONTEÚDO EDITÁVEL
   ========================================================= */

(() => {
    "use strict";

    const CONTENT_URL = "content/site.json";

    /*
    Estas funções atualizam elementos apenas quando eles
    existem. Assim, o carregador não interrompe o site se
    alguma secção for removida ou alterada no futuro.
    */

    function select(selector, area = document) {
        return area.querySelector(selector);
    }

    function selectAll(selector, area = document) {
        return Array.from(
            area.querySelectorAll(selector)
        );
    }

    function setText(selector, value, area = document) {
        if (
            typeof value !== "string" &&
            typeof value !== "number"
        ) {
            return;
        }

        const element = select(selector, area);

        if (!element) {
            return;
        }

        element.textContent = String(value);
    }

    function setAttribute(
        selector,
        attribute,
        value,
        area = document
    ) {
        if (
            typeof value !== "string" ||
            value.trim() === ""
        ) {
            return;
        }

        const element = select(selector, area);

        if (!element) {
            return;
        }

        element.setAttribute(
            attribute,
            value
        );
    }

    function setImage(
        selector,
        source,
        alternativeText = null,
        area = document
    ) {
        if (
            typeof source !== "string" ||
            source.trim() === ""
        ) {
            return;
        }

        const image = select(selector, area);

        if (!image) {
            return;
        }

        image.src = source;

        if (
            typeof alternativeText === "string"
        ) {
            image.alt = alternativeText;
        }
    }

    function isSafeColor(value) {
        if (typeof value !== "string") {
            return false;
        }

        const color = value.trim();

        return (
            /^#[0-9a-f]{3}$/i.test(color) ||
            /^#[0-9a-f]{6}$/i.test(color) ||
            /^#[0-9a-f]{8}$/i.test(color) ||
            /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(
                color
            ) ||
            /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/i.test(
                color
            )
        );
    }

    function setCssVariable(name, value) {
        if (!isSafeColor(value)) {
            return;
        }

        document.documentElement.style.setProperty(
            name,
            value
        );
    }

    /*
    Atualiza apenas o texto visível de uma ligação.
    Elementos internos, como setas, são preservados.
    */

    function setLinkText(
        selector,
        value,
        area = document
    ) {
        if (typeof value !== "string") {
            return;
        }

        const link = select(selector, area);

        if (!link) {
            return;
        }

        const textNodes = Array.from(
            link.childNodes
        ).filter(
            (node) =>
                node.nodeType === Node.TEXT_NODE
        );

        if (textNodes.length > 0) {
            textNodes[0].nodeValue =
                `${value} `;

            return;
        }

        const firstTextElement =
            select("span:not([aria-hidden])", link);

        if (firstTextElement) {
            firstTextElement.textContent = value;
        }
    }

    // =====================================================
    // METADADOS DO SITE
    // =====================================================

    function applySiteMetadata(content) {
        const site = content.site || {};

        if (
            typeof site.language === "string"
        ) {
            document.documentElement.lang =
                site.language;
        }

        if (
            typeof site.title === "string"
        ) {
            document.title = site.title;
        }

        setAttribute(
            'meta[name="description"]',
            "content",
            site.description
        );

        setAttribute(
            'meta[property="og:title"]',
            "content",
            site.title
        );

        setAttribute(
            'meta[property="og:description"]',
            "content",
            site.description
        );

        /*
        Atualiza os nomes da marca sem destruir
        os pontos dourados existentes.
        */

      if (
    typeof site.name === "string" &&
    site.name.trim() !== ""
) {
    const logos = selectAll(
        ".header .logo, .footer .logo"
    );

    logos.forEach((logo) => {
        const accent = select(
            "span",
            logo
        );

        /*
        Remove apenas os nós de texto atuais.
        O span que contém o ponto dourado é preservado.
        */

        Array.from(
            logo.childNodes
        ).forEach((node) => {
            if (
                node.nodeType ===
                Node.TEXT_NODE
            ) {
                node.remove();
            }
        });

        const brandText =
            document.createTextNode(
                site.name
            );

        if (accent) {
            logo.insertBefore(
                brandText,
                accent
            );
        } else {
            logo.appendChild(
                brandText
            );
        }
    });
}
    }

    // =====================================================
    // CORES
    // =====================================================

    function applyTheme(theme = {}) {
        const cssVariables = {
            background:
                "--admin-background",
            surface:
                "--admin-surface",
            gold:
                "--admin-gold",
            goldLight:
                "--admin-gold-light",
            text:
                "--admin-text",
            muted:
                "--admin-muted",
            lightSection:
                "--admin-light-section",
            lightSectionText:
                "--admin-light-section-text"
        };

        Object.entries(
            cssVariables
        ).forEach(
            ([jsonName, cssName]) => {
                setCssVariable(
                    cssName,
                    theme[jsonName]
                );
            }
        );

        /*
        Algumas variáveis já usadas pela introdução.
        */

        if (isSafeColor(theme.background)) {
            document.documentElement.style.setProperty(
                "--logo-scroll-background",
                theme.background
            );
        }

        if (isSafeColor(theme.gold)) {
            document.documentElement.style.setProperty(
                "--logo-scroll-gold",
                theme.gold
            );
        }

        /*
        Mantém também um atributo para facilitar
        futuras regras ou depuração.
        */

        document.documentElement.dataset.themeLoaded =
            "true";
    }

    // =====================================================
    // NAVEGAÇÃO
    // =====================================================

    function applyNavigation(navigation = {}) {
        const links = selectAll(
            ".navigation a"
        );

        const values = [
            navigation.works,
            navigation.services,
            navigation.process,
            navigation.about,
            navigation.contact
        ];

        links.forEach((link, index) => {
            if (
                typeof values[index] === "string"
            ) {
                link.textContent =
                    values[index];
            }
        });
    }

    // =====================================================
    // HERO
    // =====================================================

    function applyHero(hero = {}, images = {}) {
        const heroSection =
            select(".hero");

        if (!heroSection) {
            return;
        }

        setText(
            ".hero-content .eyebrow",
            hero.eyebrow,
            heroSection
        );

        const heroLines = selectAll(
            ".hero-title .hero-line span",
            heroSection
        );

        const lineValues = [
            hero.line1,
            hero.line2,
            hero.line3
        ];

        heroLines.forEach(
            (line, index) => {
                if (
                    typeof lineValues[index] ===
                    "string"
                ) {
                    line.textContent =
                        lineValues[index];
                }
            }
        );

        setText(
            ".hero-description",
            hero.description,
            heroSection
        );

        setText(
            ".scroll-indicator > span:first-child",
            hero.scrollLabel,
            heroSection
        );

        setImage(
            ".hero-main-image",
            hero.image || images.hero,
            "",
            heroSection
        );
    }

    // =====================================================
    // MANIFESTO
    // =====================================================

    function applyManifesto(manifesto = {}) {
        const section =
            select(".manifesto");

        if (!section) {
            return;
        }

        setText(
            ".manifesto-small",
            manifesto.introduction,
            section
        );

        const lines = selectAll(
            ".manifesto-title span",
            section
        );

        if (
            lines[0] &&
            typeof manifesto.line1 === "string"
        ) {
            lines[0].textContent =
                manifesto.line1;
        }

        if (
            lines[1] &&
            typeof manifesto.line2 === "string"
        ) {
            lines[1].textContent =
                manifesto.line2;
        }

        setText(
            ".manifesto-ending",
            manifesto.ending,
            section
        );
    }

    // =====================================================
    // GALERIA HORIZONTAL
    // =====================================================

    function applyGallery(gallery = {}) {
        const section =
            select(".horizontal-gallery");

        if (!section) {
            return;
        }

        setText(
            ".gallery-heading p",
            gallery.eyebrow,
            section
        );

        setText(
            ".gallery-heading h2",
            gallery.title,
            section
        );
    }

    // =====================================================
    // IMAGINE
    // =====================================================

    function applyImagine(
        imagine = {},
        images = {}
    ) {
        const section =
            select(".word-explosion");

        if (!section) {
            return;
        }

        setText(
            ".imagine-background span",
            imagine.backgroundWord,
            section
        );

        setText(
            ".explosion-reveal p",
            imagine.smallText,
            section
        );

        setText(
            ".explosion-reveal h2",
            imagine.title,
            section
        );

        setImage(
            ".imagine-photo img",
            imagine.image ||
                images.imagine,
            "",
            section
        );
    }

    // =====================================================
    // SERVIÇOS
    // =====================================================

    function applyServices(services = {}) {
        const section =
            select(".services");

        if (!section) {
            return;
        }

        setText(
            ".section-heading .eyebrow",
            services.eyebrow,
            section
        );

        setText(
            ".section-heading h2",
            services.title,
            section
        );

        const cards = selectAll(
            ".service-card",
            section
        );

        const items =
            Array.isArray(services.items)
                ? services.items
                : [];

        cards.forEach((card, index) => {
            const item = items[index];

            if (!item) {
                return;
            }

            setText(
                ".service-number",
                item.number,
                card
            );

            setText(
                ".service-summary strong",
                item.name,
                card
            );

            const summaryText =
                select(
                    ".service-summary > span",
                    card
                );

            if (
                summaryText &&
                typeof item.summary === "string"
            ) {
                summaryText.textContent =
                    item.summary;
            }

            setText(
                ".service-details-introduction",
                item.introduction,
                card
            );

            setLinkText(
                ".service-contact",
                item.contactLabel,
                card
            );
        });
    }

    // =====================================================
    // PROCESSO
    // =====================================================

    function applyProcess(process = {}) {
        const section =
            select(".process");

        if (!section) {
            return;
        }

        setText(
            ".process-heading .eyebrow",
            process.eyebrow,
            section
        );

        setText(
            ".process-heading h2",
            process.title,
            section
        );

        setText(
            ".process-introduction",
            process.introduction,
            section
        );

        const steps = selectAll(
            ".process-step",
            section
        );

        const items =
            Array.isArray(process.items)
                ? process.items
                : [];

        steps.forEach((step, index) => {
            const item = items[index];

            if (!item) {
                return;
            }

            setText(
                ".process-number",
                item.number,
                step
            );

            setText(
                "h3",
                item.title,
                step
            );

            setText(
                "p",
                item.description,
                step
            );
        });
    }

    // =====================================================
    // SHOWREEL
    // =====================================================

    function applyShowreel(showreel = {}) {
        const section =
            select(".showcase");

        if (!section) {
            return;
        }

        setText(
            ".showcase-copy > p",
            showreel.eyebrow,
            section
        );

        setText(
            ".showcase-copy > h2",
            showreel.title,
            section
        );

        const status =
            select(
                ".showreel-status span:last-child",
                section
            );

        if (
            status &&
            typeof showreel.year === "string"
        ) {
            status.textContent =
                `Showreel ${showreel.year}`;
        }

        setAttribute(
            ".showreel-preview",
            "poster",
            showreel.poster,
            section
        );

        const previewSource =
            select(
                ".showreel-preview source",
                section
            );

        if (
            previewSource &&
            typeof showreel.video === "string"
        ) {
            previewSource.src =
                showreel.video;

            const previewVideo =
                select(
                    ".showreel-preview",
                    section
                );

            if (previewVideo) {
                previewVideo.load();
            }
        }

        const fullVideo =
            select("#showreel-full");

        const fullSource =
            fullVideo
                ? select("source", fullVideo)
                : null;

        if (
            fullSource &&
            typeof showreel.video === "string"
        ) {
            fullSource.src =
                showreel.video;

            fullVideo.load();
        }

        if (
            fullVideo &&
            typeof showreel.poster === "string"
        ) {
            fullVideo.poster =
                showreel.poster;
        }
    }

    // =====================================================
    // SOBRE
    // =====================================================

    function applyAbout(
        about = {},
        images = {}
    ) {
        const section =
            select(".about");

        if (!section) {
            return;
        }

        setText(
            ".about-content .eyebrow",
            about.eyebrow,
            section
        );

        setText(
            ".about-content h2",
            about.title,
            section
        );

        setText(
            ".about-content > p:not(.eyebrow)",
            about.description,
            section
        );

        setLinkText(
            ".text-link",
            about.linkLabel,
            section
        );

        setImage(
            ".about-placeholder img",
            about.image || images.about,
            "Fotografia da criadora durante uma produção",
            section
        );
    }

    // =====================================================
    // CONTACTO
    // =====================================================

    function applyContact(contact = {}) {
        const section =
            select(".contact");

        if (!section) {
            return;
        }

        setText(
            ".contact-introduction .eyebrow",
            contact.eyebrow,
            section
        );

        setText(
            ".contact-introduction h2",
            contact.title,
            section
        );

        setText(
            ".contact-description",
            contact.description,
            section
        );

        if (
            typeof contact.email === "string"
        ) {
            const emailLink = select(
                '.contact-direct a[href^="mailto:"]',
                section
            );

            if (emailLink) {
                emailLink.textContent =
                    contact.email;

                emailLink.href =
                    `mailto:${encodeURIComponent(
                        contact.email
                    )}?subject=Pedido%20de%20informações`;
            }
        }

        setText(
            "#form-submit span:first-child",
            contact.submitLabel,
            section
        );
    }

    // =====================================================
    // REDES SOCIAIS
    // =====================================================

    function applySocial(social = {}) {
        const links = selectAll(
            ".social-links a"
        );

        const values = [
            social.instagram,
            social.tiktok,
            social.vimeo
        ];

        links.forEach((link, index) => {
            const url = values[index];

            if (
                typeof url === "string" &&
                url.trim() !== ""
            ) {
                link.href = url;
            }
        });
    }

    // =====================================================
    // RODAPÉ
    // =====================================================

    function applyFooter(footer = {}) {
        const copyright =
            select(".footer > p");

        if (
            !copyright ||
            typeof footer.copyright !==
                "string"
        ) {
            return;
        }

        const year = new Date().getFullYear();

        copyright.textContent =
            `© ${year} ${footer.copyright}`;
    }

    // =====================================================
    // IMAGENS DO PORTFÓLIO E GALERIA
    // =====================================================

    function applyManagedImages(images = {}) {
        const portfolioImages =
            selectAll(
                ".tunnel-card .card-image img"
            );

        const portfolioSources = [
            images.portfolio1,
            images.portfolio2,
            images.portfolio3,
            images.portfolio4,
            images.portfolio5,
            images.portfolio6
        ];

        portfolioSources.forEach(
            (source, index) => {
                if (
                    portfolioImages[index] &&
                    typeof source === "string"
                ) {
                    portfolioImages[index].src =
                        source;
                }
            }
        );

        const galleryImages =
            selectAll(
                ".horizontal-gallery .gallery-image img"
            );

        const gallerySources = [
            images.gallery1,
            images.gallery2,
            images.gallery3,
            images.gallery4,
            images.gallery5,
            images.gallery6
        ];

        gallerySources.forEach(
            (source, index) => {
                if (
                    galleryImages[index] &&
                    typeof source === "string"
                ) {
                    galleryImages[index].src =
                        source;
                }
            }
        );

        setAttribute(
            'meta[property="og:image"]',
            "content",
            images.hero
        );
    }

    // =====================================================
    // APLICAR TODO O CONTEÚDO
    // =====================================================

    function applyContent(content) {
        if (
            !content ||
            typeof content !== "object"
        ) {
            throw new Error(
                "O conteúdo recebido não é válido."
            );
        }

        applySiteMetadata(content);
        //applyTheme(content.theme);
        applyNavigation(
            content.navigation
        );
        applyHero(
            content.hero,
            content.images
        );
        applyManifesto(
            content.manifesto
        );
        applyGallery(
            content.gallery
        );
        applyImagine(
            content.imagine,
            content.images
        );
        applyServices(
            content.services
        );
        applyProcess(
            content.process
        );
        applyShowreel(
            content.showreel
        );
        applyAbout(
            content.about,
            content.images
        );
        applyContact(
            content.contact
        );
        applySocial(
            content.social
        );
        applyFooter(
            content.footer
        );
        applyManagedImages(
            content.images
        );

        document.documentElement.classList.add(
            "content-loaded"
        );

        document.dispatchEvent(
            new CustomEvent(
                "punshon:content-loaded",
                {
                    detail: content
                }
            )
        );
    }

    // =====================================================
    // CARREGAR O JSON
    // =====================================================

    async function loadContent() {
        try {
            const response = await fetch(
                `${CONTENT_URL}?v=${Date.now()}`,
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Não foi possível carregar ${CONTENT_URL}. ` +
                    `Estado HTTP: ${response.status}`
                );
            }

            const content =
                await response.json();

            applyContent(content);
        } catch (error) {
            /*
            O site continua a funcionar com o conteúdo
            original escrito no HTML.
            */

            console.error(
                "Erro ao carregar o conteúdo editável:",
                error
            );

            document.documentElement.classList.add(
                "content-load-error"
            );

            document.dispatchEvent(
                new CustomEvent(
                    "punshon:content-error",
                    {
                        detail: {
                            message:
                                error.message
                        }
                    }
                )
            );
        }
    }

    /*
    O script é carregado no final do body, mas esta
    verificação também permite utilizá-lo no head.
    */

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            loadContent,
            {
                once: true
            }
        );
    } else {
        loadContent();
    }
})();
