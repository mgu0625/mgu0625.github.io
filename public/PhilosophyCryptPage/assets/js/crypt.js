(() => {
    "use strict";

    const posts = Array.isArray(window.CRYPT_POSTS) ? window.CRYPT_POSTS : [];
    const page = document.body.dataset.page;
    const formatNames = {
        essay: "Essay",
        poem: "Poem",
        "book-note": "Book Note"
    };
    const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    })[char]);

    const formatDate = (date) => new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    }).format(new Date(`${date}T12:00:00`));

    const entryURL = (post) => `entry.html?slug=${encodeURIComponent(post.slug)}`;

    function renderTags(items = []) {
        return items.map((item) => `<span>${escapeHTML(item)}</span>`).join("");
    }

    function renderVisual(post, modifier = "") {
        return `
            <div class="visual-placeholder ${modifier}" role="img" aria-label="Placeholder for future artwork for ${escapeHTML(post.title)}">
                <span class="coordinate-label">${escapeHTML(post.visualLabel || "Archive Image")}</span>
                <span class="placeholder-symbol" aria-hidden="true">◇</span>
                <strong>Artwork placeholder</strong>
                <small>Replace this block with your own image or GIF later.</small>
                <span class="scan-line" aria-hidden="true"></span>
            </div>
        `;
    }

    function renderCard(post, compact = false) {
        const format = formatNames[post.format] || post.format;
        const details = post.format === "book-note"
            ? `<dl class="book-fields">
                <div><dt>Author</dt><dd>${escapeHTML(post.author || "Add author")}</dd></div>
                <div><dt>Status</dt><dd>${escapeHTML(post.status || "In progress")}</dd></div>
                <div><dt>Thread</dt><dd>${escapeHTML(post.themeLabel)}</dd></div>
                </dl>`
            : `<p class="post-card__excerpt">${escapeHTML(post.excerpt)}</p>`;

        return `
            <article class="post-card post-card--${post.format} mood-${post.mood || "yami"}${compact ? " post-card--compact" : ""}" data-post-card data-format="${post.format}" data-theme="${escapeHTML(post.theme)}">
                ${post.format === "poem" ? '<span class="washi washi--pink" aria-hidden="true">future tape</span>' : ""}
                ${post.isNew ? '<span class="new-sticker" aria-label="New entry">New</span>' : ""}
                <div class="post-card__meta">
                <span>Entry ${escapeHTML(post.entry)}</span>
                <span>${escapeHTML(format)}</span>
                <time datetime="${escapeHTML(post.date)}">${formatDate(post.date)}</time>
                </div>
                <h3><a href="${entryURL(post)}">${escapeHTML(post.title)}</a></h3>
                ${details}
                <div class="post-card__tags">${renderTags(post.subjects)}</div>
                <a class="open-entry" href="${entryURL(post)}">${post.format === "book-note" ? "Open reading file" : "Read transmission"} <span aria-hidden="true">→</span></a>
            </article>
        `;
    }

    function renderFeatured(post) {
        const target = document.querySelector("[data-featured-file]");
        if (!target || !post) return;

        target.innerHTML = `
            <article class="featured-post mood-${post.mood || "yami"}">
                <span class="washi washi--grid" aria-hidden="true">future grid tape</span>
                <header class="featured-post__header">
                    <div class="post-card__meta">
                        <span>Featured file</span>
                        <span>Entry ${escapeHTML(post.entry)}</span>
                        <span>${escapeHTML(formatNames[post.format])}</span>
                    </div>
                    <p class="featured-kicker">${escapeHTML(post.themeLabel)}</p>
                    <h2>${escapeHTML(post.title)}</h2>
                    <p class="featured-deck">${escapeHTML(post.excerpt)}</p>
                </header>
                ${renderVisual(post, "visual-placeholder--featured")}
                <footer class="featured-post__footer">
                    <div class="post-card__tags">${renderTags(post.subjects)}</div>
                    <a class="open-entry open-entry--large" href="${entryURL(post)}">Read transmission <span aria-hidden="true">→</span></a>
                </footer>
                <div class="sticker-placeholder sticker-placeholder--corner" aria-hidden="true">future<br>sticker</div>
            </article>
        `;
    }

    function initArchive() {
        const feed = document.querySelector("[data-post-grid]");
        const showcase = document.querySelector("[data-format-showcase]");
        const status = document.querySelector("[data-filter-status]");
        const emptyState = document.querySelector("[data-empty-state]");
        const postCount = document.querySelector("[data-post-count]");
        const state = { format: "all", theme: "all" };

        renderFeatured(posts.find((post) => post.featured) || posts[0]);
        if (postCount) postCount.textContent = String(posts.length).padStart(2, "0");

        if (showcase) {
            ["essay", "poem", "book-note"].forEach((format) => {
                const post = posts.find((item) => item.format === format);
                if (post) showcase.insertAdjacentHTML("beforeend", renderCard(post, true));
            });
        }

        function updateFeed() {
            const filtered = posts.filter((post) => {
                const formatMatch = state.format === "all" || post.format === state.format;
                const themeMatch = state.theme === "all" || post.theme === state.theme;
                return formatMatch && themeMatch;
            });

            feed.innerHTML = filtered.map((post) => renderCard(post)).join("");
            emptyState.hidden = filtered.length > 0;
            const formatText = state.format === "all" ? "all formats" : formatNames[state.format];
            const themeButton = document.querySelector(`[data-theme-filter="${state.theme}"]`);
            const themeText = state.theme === "all" ? "all themes" : themeButton?.textContent.trim();
            status.textContent = `Showing ${filtered.length} file${filtered.length === 1 ? "" : "s"} · ${formatText} · ${themeText}`;
        }

        function activateButtons(attribute, value) {
            document.querySelectorAll(`[${attribute}]`).forEach((button) => {
                const isActive = button.getAttribute(attribute) === value;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });
        }

        document.querySelectorAll("[data-format-filter]").forEach((button) => {
            button.addEventListener("click", () => {
                state.format = button.dataset.formatFilter;
                activateButtons("data-format-filter", state.format);
                updateFeed();
                document.querySelector("#archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });

        document.querySelectorAll("[data-theme-filter]").forEach((button) => {
            button.addEventListener("click", () => {
                state.theme = button.dataset.themeFilter;
                activateButtons("data-theme-filter", state.theme);
                updateFeed();
            });
        });

        activateButtons("data-format-filter", state.format);
        activateButtons("data-theme-filter", state.theme);
        updateFeed();
    }

    async function initEntry() {
        const shell = document.querySelector("[data-entry-shell]");
        const slug = new URLSearchParams(window.location.search).get("slug");
        const post = posts.find((item) => item.slug === slug);

        if (!post) {
            shell.innerHTML = `
                <section class="entry-error machine-panel">
                    <p class="eyebrow">Signal missing</p>
                    <h1>This archive file could not be found.</h1>
                    <p>Check the entry link or return to the main Philosophy Crypt archive.</p>
                    <a class="open-entry" href="index.html">Return to archive →</a>
                </section>`;
            return;
        }

        document.title = `${post.title} · Philosophy Crypt`;

        try {
            const response = await fetch(post.contentPath);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const articleBody = await response.text();

            shell.innerHTML = `
                <article class="longform-entry longform-entry--${post.format} mood-${post.mood || "yami"}">
                    <header class="longform-entry__header machine-panel">
                        <div class="post-card__meta">
                            <span>Entry ${escapeHTML(post.entry)}</span>
                            <span>${escapeHTML(formatNames[post.format])}</span>
                            <time datetime="${escapeHTML(post.date)}">${formatDate(post.date)}</time>
                            <span>${escapeHTML(post.readingTime)}</span>
                        </div>
                        <p class="featured-kicker">${escapeHTML(post.themeLabel)}</p>
                        <h1>${escapeHTML(post.title)}</h1>
                            ${post.author ? `<p class="entry-byline">By ${escapeHTML(post.author)} · ${escapeHTML(post.status || "")}</p>` : ""}
                        <p class="entry-deck">${escapeHTML(post.excerpt)}</p>
                        <div class="post-card__tags">${renderTags(post.subjects)}</div>
                    </header>

                    <div class="longform-entry__layout">
                        <aside class="entry-margin machine-panel">
                            <span class="washi washi--pink" aria-hidden="true">future tape</span>
                            <p class="eyebrow">Margin file</p>
                            ${renderVisual(post, "visual-placeholder--entry")}
                            <div class="sticker-placeholder sticker-placeholder--yami">future<br>sticker</div>
                        </aside>

                        <div class="article-paper">
                            ${articleBody}
                        </div>
                    </div>
                </article>
            `;
        } catch (error) {
            shell.innerHTML = `
                <section class="entry-error machine-panel">
                    <p class="eyebrow">Content plate offline</p>
                    <h1>${escapeHTML(post.title)}</h1>
                    <p>The metadata loaded, but the content file could not be opened. Confirm that <code>${escapeHTML(post.contentPath)}</code> was uploaded to Neocities.</p>
                    <a class="open-entry" href="index.html">Return to archive →</a>
                </section>`;
            console.error(error);
        }
    }

    function createParticles() {
        const field = document.querySelector("[data-particle-field]");
        if (!field) return;

        const fragment = document.createDocumentFragment();
        for (let index = 0; index < 20; index += 1) {
            const particle = document.createElement("span");
            particle.style.setProperty("--x", `${52 + Math.random() * 46}%`);
            particle.style.setProperty("--y", `${Math.random() * 38}%`);
            particle.style.setProperty("--size", `${2 + Math.random() * 5}px`);
            particle.style.setProperty("--delay", `${Math.random() * -8}s`);
            particle.style.setProperty("--duration", `${4 + Math.random() * 5}s`);
            particle.style.setProperty("--drift-x", `${4 + Math.random() * 15}px`);
            particle.style.setProperty("--drift-y", `${-8 + Math.random() * 16}px`);
            fragment.appendChild(particle);
        }
        field.appendChild(fragment);
    }

    function initReturnLabel() {
        const link = document.querySelector("[data-return-link]");
        const label = document.querySelector("[data-return-label]");
        if (!link || !label) return;
        const original = label.textContent;
        link.addEventListener("mouseenter", () => { label.textContent = "Exit the Crypt"; });
        link.addEventListener("mouseleave", () => { label.textContent = original; });
        link.addEventListener("focus", () => { label.textContent = "Exit the Crypt"; });
        link.addEventListener("blur", () => { label.textContent = original; });
    }

    createParticles();
    initReturnLabel();
    if (page === "archive") initArchive();
    if (page === "entry") initEntry();
})();