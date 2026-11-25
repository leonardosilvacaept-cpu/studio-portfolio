/* =========================================================
   PUNSHONSTUDIO
   PAINEL LOCAL DE CONTEÚDO
   ========================================================= */

(() => {
    "use strict";

    const CONTENT_URL = "../content/site.json";

    const loadingScreen =
        document.querySelector("#admin-loading");

    const adminApp =
        document.querySelector("#admin-app");

    const adminForm =
        document.querySelector("#admin-form");

    const adminStatus =
        document.querySelector("#admin-status");

    const changeIndicator =
        document.querySelector("#admin-change-indicator");

    const changeText =
        document.querySelector("#admin-change-text");

    const exportButton =
        document.querySelector("#admin-export");

    const resetButton =
        document.querySelector("#admin-reset");

    const toast =
        document.querySelector("#admin-toast");

    const toastMessage =
        document.querySelector("#admin-toast-message");

    const navigationButtons = Array.from(
        document.querySelectorAll(
            ".admin-navigation-button"
        )
    );

    const sections = Array.from(
        document.querySelectorAll(
            ".admin-section"
        )
    );

    let originalContent = null;
    let currentContent = null;
    let hasChanges = false;
    let toastTimer = null;

    /* =====================================================
       UTILITÁRIOS
       ===================================================== */

    function cloneData(value) {
        return JSON.parse(
            JSON.stringify(value)
        );
    }

    function isPlainObject(value) {
        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        );
    }

    function pathParts(path) {
        return String(path)
            .split(".")
            .filter(Boolean);
    }

    function getValueByPath(object, path) {
        const parts = pathParts(path);

        let value = object;

        for (
            let index = 0;
            index < parts.length;
            index += 1
        ) {
            if (
                value === null ||
                value === undefined
            ) {
                return undefined;
            }

            const key = parts[index];

            value = value[key];
        }

        return value;
    }

    function setValueByPath(
        object,
        path,
        newValue
    ) {
        const parts = pathParts(path);

        if (!parts.length) {
            return;
        }

        let target = object;

        for (
            let index = 0;
            index < parts.length - 1;
            index += 1
        ) {
            const key = parts[index];
            const nextKey = parts[index + 1];

            const nextIsArrayIndex =
                /^\d+$/.test(nextKey);

            if (
                target[key] === undefined ||
                target[key] === null
            ) {
                target[key] =
                    nextIsArrayIndex
                        ? []
                        : {};
            }

            target = target[key];
        }

        const lastKey =
            parts[parts.length - 1];

        target[lastKey] = newValue;
    }

    function normalisePath(value) {
        return String(value || "")
            .trim()
            .replace(/\\/g, "/")
            .replace(/^\.?\//, "");
    }

    function resolvePreviewPath(value) {
        const path = normalisePath(value);

        if (!path) {
            return "";
        }

        if (
            /^https?:\/\//i.test(path) ||
            path.startsWith("data:") ||
            path.startsWith("blob:")
        ) {
            return path;
        }

        /*
        O painel está dentro de /admin/.
        Os caminhos do JSON são relativos à raiz.
        */

        return `../${path}`;
    }

    function showToast(
        message,
        type = "success"
    ) {
        if (!toast || !toastMessage) {
            return;
        }

        window.clearTimeout(toastTimer);

        toastMessage.textContent = message;

        toast.classList.toggle(
            "is-error",
            type === "error"
        );

        toast.hidden = false;

        toastTimer = window.setTimeout(
            () => {
                toast.hidden = true;
            },
            3500
        );
    }

    function setStatus(message, state) {
        if (!adminStatus) {
            return;
        }

        adminStatus.textContent = message;

        adminStatus.classList.remove(
            "has-changes",
            "has-error"
        );

        if (state === "changes") {
            adminStatus.classList.add(
                "has-changes"
            );
        }

        if (state === "error") {
            adminStatus.classList.add(
                "has-error"
            );
        }
    }

    function updateChangeState(changed) {
        hasChanges = changed;

        if (changeIndicator) {
            changeIndicator.classList.toggle(
                "has-changes",
                changed
            );
        }

        if (changeText) {
            changeText.textContent = changed
                ? "Existem alterações por exportar"
                : "Nenhuma alteração por exportar";
        }

        if (changed) {
            setStatus(
                "Alterações não exportadas",
                "changes"
            );
        } else {
            setStatus(
                "Conteúdo carregado",
                "ready"
            );
        }
    }

    function compareWithOriginal() {
        if (
            !originalContent ||
            !currentContent
        ) {
            updateChangeState(false);
            return;
        }

        const originalJson =
            JSON.stringify(originalContent);

        const currentJson =
            JSON.stringify(currentContent);

        updateChangeState(
            originalJson !== currentJson
        );
    }

    /* =====================================================
       PROCESSO: CRIAR OS QUATRO FORMULÁRIOS
       ===================================================== */

    function createProcessRepeaters() {
        const container =
            document.querySelector(
                "#admin-process-repeaters"
            );

        if (!container) {
            return;
        }

        container.innerHTML = "";

        for (
            let index = 0;
            index < 4;
            index += 1
        ) {
            const article =
                document.createElement(
                    "article"
                );

            article.className =
                "admin-repeater";

            const visualNumber =
                String(index + 1).padStart(
                    2,
                    "0"
                );

            article.innerHTML = `
                <header>
                    <span>Etapa ${visualNumber}</span>
                    <strong data-process-heading="${index}">
                        Processo
                    </strong>
                </header>

                <div class="admin-fields">
                    <label class="admin-field">
                        <span>Número</span>

                        <input
                            type="text"
                            name="process.items.${index}.number"
                        >
                    </label>

                    <label class="admin-field">
                        <span>Título</span>

                        <input
                            type="text"
                            name="process.items.${index}.title"
                        >
                    </label>

                    <label class="admin-field admin-field-wide">
                        <span>Descrição</span>

                        <textarea
                            name="process.items.${index}.description"
                            rows="4"
                        ></textarea>
                    </label>
                </div>
            `;

            container.appendChild(article);
        }
    }

    /* =====================================================
       PREENCHER OS CAMPOS
       ===================================================== */

    function fillForm(content) {
        if (!adminForm) {
            return;
        }

        const fields = Array.from(
            adminForm.querySelectorAll(
                "[name]"
            )
        );

        fields.forEach((field) => {
            const fieldName =
                field.getAttribute("name");

            const value =
                getValueByPath(
                    content,
                    fieldName
                );

            if (
                field.type === "checkbox"
            ) {
                field.checked =
                    Boolean(value);

                return;
            }

            if (
                field.type === "radio"
            ) {
                field.checked =
                    field.value === value;

                return;
            }

            if (
                value === undefined ||
                value === null
            ) {
                field.value = "";
                return;
            }

            field.value =
                String(value);
        });

        synchroniseColorFields();
        updateAllImagePreviews();
        updateRepeaterHeadings();
    }

    function collectFormData() {
        const updatedContent =
            cloneData(originalContent);

        const fields = Array.from(
            adminForm.querySelectorAll(
                "[name]"
            )
        );

        fields.forEach((field) => {
            const fieldName =
                field.getAttribute("name");

            if (!fieldName) {
                return;
            }

            if (
                field.type === "radio" &&
                !field.checked
            ) {
                return;
            }

            let value;

            if (
                field.type === "checkbox"
            ) {
                value = field.checked;
            } else {
                value = field.value;
            }

            setValueByPath(
                updatedContent,
                fieldName,
                value
            );
        });

        return updatedContent;
    }

    function updateContentFromForm() {
        currentContent =
            collectFormData();

        compareWithOriginal();
        updateRepeaterHeadings();
    }

    /* =====================================================
       NAVEGAÇÃO DO PAINEL
       ===================================================== */

    function openSection(sectionName) {
        sections.forEach((section) => {
            const isTarget =
                section.dataset.section ===
                sectionName;

            section.hidden = !isTarget;

            section.classList.toggle(
                "is-active",
                isTarget
            );
        });

        navigationButtons.forEach(
            (button) => {
                const isActive =
                    button.dataset.adminSection ===
                    sectionName;

                button.classList.toggle(
                    "is-active",
                    isActive
                );

                button.setAttribute(
                    "aria-current",
                    isActive
                        ? "page"
                        : "false"
                );
            }
        );

        window.scrollTo({
            top: 0,
            behavior:
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"
        });

        if (
            window.history &&
            window.history.replaceState
        ) {
            window.history.replaceState(
                null,
                "",
                `#${sectionName}`
            );
        }
    }

    function setupNavigation() {
        navigationButtons.forEach(
            (button) => {
                button.addEventListener(
                    "click",
                    () => {
                        openSection(
                            button.dataset.adminSection
                        );
                    }
                );
            }
        );

        const requestedSection =
            window.location.hash.replace(
                "#",
                ""
            );

        const validSection =
            sections.some(
                (section) =>
                    section.dataset.section ===
                    requestedSection
            );

        openSection(
            validSection
                ? requestedSection
                : "general"
        );
    }

    /* =====================================================
       CORES
       ===================================================== */

    function isHexColor(value) {
        return /^#[0-9a-f]{6}$/i.test(
            String(value || "").trim()
        );
    }

    function synchroniseColorFields() {
        const colorInputs = Array.from(
            document.querySelectorAll(
                'input[type="color"][name]'
            )
        );

        colorInputs.forEach(
            (colorInput) => {
                const name =
                    colorInput.name;

                const textInput =
                    document.querySelector(
                        `[data-color-text="${name}"]`
                    );

                if (!textInput) {
                    return;
                }

                textInput.value =
                    colorInput.value;
            }
        );
    }

    function setupColorFields() {
        const colorInputs = Array.from(
            document.querySelectorAll(
                'input[type="color"][name]'
            )
        );

        colorInputs.forEach(
            (colorInput) => {
                const name =
                    colorInput.name;

                const textInput =
                    document.querySelector(
                        `[data-color-text="${name}"]`
                    );

                if (!textInput) {
                    return;
                }

                colorInput.addEventListener(
                    "input",
                    () => {
                        textInput.value =
                            colorInput.value;

                        updateContentFromForm();
                    }
                );

                textInput.addEventListener(
                    "input",
                    () => {
                        const value =
                            textInput.value.trim();

                        if (
                            isHexColor(value)
                        ) {
                            colorInput.value =
                                value;

                            updateContentFromForm();
                        }
                    }
                );
            }
        );
    }

    /* =====================================================
       PRÉ-VISUALIZAÇÃO DE IMAGENS
       ===================================================== */

    function updateImagePreview(
        fieldName,
        imageElement,
        previewContainer
    ) {
        const input =
            adminForm.querySelector(
                `[name="${fieldName}"]`
            );

        if (
            !input ||
            !imageElement ||
            !previewContainer
        ) {
            return;
        }

        const source =
            resolvePreviewPath(
                input.value
            );

        previewContainer.classList.remove(
            "has-image",
            "has-error"
        );

        if (!source) {
            imageElement.removeAttribute(
                "src"
            );

            return;
        }

        imageElement.onload = () => {
            previewContainer.classList.add(
                "has-image"
            );

            previewContainer.classList.remove(
                "has-error"
            );
        };

        imageElement.onerror = () => {
            previewContainer.classList.remove(
                "has-image"
            );

            previewContainer.classList.add(
                "has-error"
            );
        };

        imageElement.src =
            `${source}${
                source.includes("?")
                    ? "&"
                    : "?"
            }preview=${Date.now()}`;
    }

    function updateAllImagePreviews() {
        const previews = Array.from(
            document.querySelectorAll(
                "[data-preview-for]"
            )
        );

        previews.forEach(
            (previewContainer) => {
                const fieldName =
                    previewContainer.dataset
                        .previewFor;

                const imageElement =
                    previewContainer.querySelector(
                        "img"
                    );

                updateImagePreview(
                    fieldName,
                    imageElement,
                    previewContainer
                );
            }
        );
    }

    function setupImagePreviews() {
        const previews = Array.from(
            document.querySelectorAll(
                "[data-preview-for]"
            )
        );

        previews.forEach(
            (previewContainer) => {
                const fieldName =
                    previewContainer.dataset
                        .previewFor;

                const input =
                    adminForm.querySelector(
                        `[name="${fieldName}"]`
                    );

                const imageElement =
                    previewContainer.querySelector(
                        "img"
                    );

                if (
                    !input ||
                    !imageElement
                ) {
                    return;
                }

                input.addEventListener(
                    "input",
                    () => {
                        updateImagePreview(
                            fieldName,
                            imageElement,
                            previewContainer
                        );
                    }
                );
            }
        );
    }

    /* =====================================================
       TÍTULOS DOS REPETIDORES
       ===================================================== */

    function updateRepeaterHeadings() {
        const serviceNames = [
            "services.items.0.name",
            "services.items.1.name",
            "services.items.2.name"
        ];

        const serviceArticles =
            Array.from(
                document.querySelectorAll(
                    "#admin-section-services .admin-repeater"
                )
            );

        serviceArticles.forEach(
            (article, index) => {
                const heading =
                    article.querySelector(
                        "header strong"
                    );

                const input =
                    adminForm.querySelector(
                        `[name="${serviceNames[index]}"]`
                    );

                if (
                    heading &&
                    input
                ) {
                    heading.textContent =
                        input.value.trim() ||
                        `Serviço ${index + 1}`;
                }
            }
        );

        for (
            let index = 0;
            index < 4;
            index += 1
        ) {
            const heading =
                document.querySelector(
                    `[data-process-heading="${index}"]`
                );

            const input =
                adminForm.querySelector(
                    `[name="process.items.${index}.title"]`
                );

            if (
                heading &&
                input
            ) {
                heading.textContent =
                    input.value.trim() ||
                    `Etapa ${index + 1}`;
            }
        }
    }

    /* =====================================================
       EXPORTAR JSON
       ===================================================== */

    function validateContent(content) {
        const requiredValues = [
            {
                label: "Nome da marca",
                value:
                    content.site &&
                    content.site.name
            },
            {
                label: "Título do site",
                value:
                    content.site &&
                    content.site.title
            },
            {
                label: "Título principal",
                value:
                    content.hero &&
                    content.hero.line1
            },
            {
                label: "E-mail",
                value:
                    content.contact &&
                    content.contact.email
            }
        ];

        const missing = requiredValues
            .filter(
                (item) =>
                    !String(
                        item.value || ""
                    ).trim()
            )
            .map(
                (item) =>
                    item.label
            );

        if (missing.length) {
            throw new Error(
                `Preenche os campos obrigatórios: ${missing.join(
                    ", "
                )}.`
            );
        }

        const email =
            String(
                content.contact.email
            ).trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(email)
        ) {
            throw new Error(
                "O endereço de e-mail não é válido."
            );
        }
    }

    function downloadJson(content) {
        const json =
            JSON.stringify(
                content,
                null,
                2
            ) + "\n";

        const blob =
            new Blob(
                [json],
                {
                    type:
                        "application/json;charset=utf-8"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = "site.json";

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.setTimeout(
            () => {
                URL.revokeObjectURL(url);
            },
            1000
        );
    }

    function exportContent() {
        try {
            const content =
                collectFormData();

            validateContent(content);
            downloadJson(content);

            currentContent =
                cloneData(content);

            updateChangeState(false);

            setStatus(
                "Ficheiro exportado",
                "ready"
            );

            showToast(
                "O ficheiro site.json foi exportado. Substitui agora content/site.json."
            );
        } catch (error) {
            setStatus(
                "Erro na exportação",
                "error"
            );

            showToast(
                error.message,
                "error"
            );
        }
    }

    /* =====================================================
       REPOR CONTEÚDO
       ===================================================== */

    function resetContent() {
        if (
            !originalContent ||
            !hasChanges
        ) {
            showToast(
                "Não existem alterações para repor."
            );

            return;
        }

        const confirmed =
            window.confirm(
                "Queres eliminar todas as alterações feitas no painel?"
            );

        if (!confirmed) {
            return;
        }

        currentContent =
            cloneData(originalContent);

        fillForm(currentContent);
        updateChangeState(false);

        showToast(
            "O conteúdo original foi reposto."
        );
    }

    /* =====================================================
       EVENTOS DO FORMULÁRIO
       ===================================================== */

    function setupFormEvents() {
        if (!adminForm) {
            return;
        }

        adminForm.addEventListener(
            "input",
            (event) => {
                /*
                Os campos de texto associados às cores
                são tratados separadamente.
                */

                if (
                    event.target.matches(
                        "[data-color-text]"
                    )
                ) {
                    return;
                }

                updateContentFromForm();
            }
        );

        adminForm.addEventListener(
            "change",
            () => {
                updateContentFromForm();
            }
        );

        window.addEventListener(
            "beforeunload",
            (event) => {
                if (!hasChanges) {
                    return;
                }

                event.preventDefault();

                event.returnValue =
                    "Existem alterações não exportadas.";
            }
        );
    }

    /* =====================================================
       CARREGAR O CONTEÚDO
       ===================================================== */

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
                    `Não foi possível carregar ${CONTENT_URL}. Código HTTP ${response.status}.`
                );
            }

            const content =
                await response.json();

            if (!isPlainObject(content)) {
                throw new Error(
                    "O ficheiro site.json não contém um objeto JSON válido."
                );
            }

            originalContent =
                cloneData(content);

            currentContent =
                cloneData(content);

            createProcessRepeaters();
            fillForm(currentContent);

            setupNavigation();
            setupColorFields();
            setupImagePreviews();
            setupFormEvents();

            if (exportButton) {
                exportButton.addEventListener(
                    "click",
                    exportContent
                );
            }

            if (resetButton) {
                resetButton.addEventListener(
                    "click",
                    resetContent
                );
            }

            updateChangeState(false);

            if (adminApp) {
                adminApp.hidden = false;
            }

            if (loadingScreen) {
                loadingScreen.classList.add(
                    "is-hidden"
                );

                window.setTimeout(
                    () => {
                        loadingScreen.hidden =
                            true;
                    },
                    320
                );
            }
        } catch (error) {
            console.error(
                "Erro no painel de administração:",
                error
            );

            setStatus(
                "Erro de carregamento",
                "error"
            );

            if (loadingScreen) {
                loadingScreen.innerHTML = `
                    <span class="admin-loading-logo">
                        PUNSHONSTUDIO<span>.</span>
                    </span>

                    <strong>
                        Não foi possível abrir o painel
                    </strong>

                    <span class="admin-loading-text">
                        ${error.message}
                    </span>
                `;
            }
        }
    }

    loadContent();
})();