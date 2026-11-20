/* =====================================================================
   PORTFOLIO ENGINE — renders everything from js/data.js.
   You normally don't need to edit this file.
   ===================================================================== */
(() => {
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Icons ---------- */
  const ICONS = {
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    twitter: '<path d="M4 4l16 16M20 4 4 20"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24">${ICONS[name] || ICONS.link}</svg>`;

  /* ---------- Helpers ---------- */
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0);
  const initials = (t) => { const w = t.trim().split(/\s+/); return (w.length > 1 ? w.map((x) => x[0]).join("") : w[0]).slice(0, 2).toUpperCase(); };
  function coverHTML(p, withStatus = true) {
    const status = withStatus ? `<span class="status ${esc(p.status)}">${p.status === "finished" ? "Finished" : "In progress"}</span>` : "";
    if (p.image && p.imageFit === "icon")
      return `<div class="cover is-icon"><div class="cover-bg" style="background-image:url('${esc(p.image)}')"></div><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">${status}</div>`;
    if (p.image) return `<div class="cover"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">${status}</div>`;
    const h = Math.abs(hash(p.title)) % 360;
    const bg = `linear-gradient(135deg, hsl(${h} 70% 45%), hsl(${(h + 60) % 360} 75% 35%))`;
    return `<div class="cover"><div class="cover-gen" style="background:${bg}"><b>${esc(initials(p.title))}</b></div>${status}</div>`;
  }
  const tagsHTML = (tech = []) => `<div class="tags">${tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`;
  const socialsHTML = () => D.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.icon)}</a>`).join("");
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Profile / Hero ---------- */
  const P = D.profile;
  document.documentElement.style.setProperty("--accent", P.accent || "#7c5cff");
  document.title = `${P.name} — Portfolio`;
  $("#logo").textContent = (P.logo || P.initials || initials(P.name)).trim();
  $("#heroName").textContent = P.name;
  $("#heroTagline").textContent = P.tagline;
  $("#availBadge").hidden = !P.available;
  const avatarText = esc((P.initials || initials(P.name)).trim());
  $("#avatar").innerHTML = P.photo ? `<img src="${esc(P.photo)}" alt="${esc(P.name)}">` : avatarText;
  $("#avatar img")?.addEventListener("error", () => ($("#avatar").innerHTML = avatarText));
  const cvBtn = $("#cvBtn");
  if (P.cv) { cvBtn.href = P.cv; cvBtn.insertAdjacentHTML("afterbegin", icon("download")); } else cvBtn.remove();
  $("#heroSocials").innerHTML = socialsHTML();
  $("#footerSocials").innerHTML = socialsHTML();
  $("#footerText").innerHTML = `© ${new Date().getFullYear()} ${esc(P.name)} · Built with passion &amp; code`;

  // Typing effect
  (function typer() {
    const el = $("#typed");
    const roles = P.roles || [];
    if (!roles.length) return;
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let r = 0, i = 0, del = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 40 : 80);
    })();
  })();

  /* ---------- About ---------- */
  $("#aboutText").innerHTML = D.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.about.stats
    .map((s) => `<div class="stat card"><strong data-count="${s.value}" data-suffix="${esc(s.suffix || "")}">0</strong><span>${esc(s.label)}</span></div>`)
    .join("");
  function countUp(el) {
    const end = +el.dataset.count, suffix = el.dataset.suffix, dur = 1400, t0 = performance.now();
    const dec = (el.dataset.count.split(".")[1] || "").length;
    (function step(t) {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = (end * (1 - Math.pow(1 - k, 3))).toFixed(dec) + suffix;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- Skills ---------- */
  const groups = ["All", ...D.skills.map((g) => g.group)];
  let activeGroup = "All";
  function renderSkills() {
    $("#skillTabs").innerHTML = groups.map((g) => `<button class="chip ${g === activeGroup ? "active" : ""}" data-group="${esc(g)}">${esc(g)}</button>`).join("");
    const items = D.skills.filter((g) => activeGroup === "All" || g.group === activeGroup).flatMap((g) => g.items);
    $("#skillList").innerHTML = items
      .map((s, i) => `<div class="skill card" style="animation-delay:${i * 40}ms"><div class="skill-top">${esc(s.name)}<span>${s.level}%</span></div><div class="bar"><i data-w="${s.level}"></i></div></div>`)
      .join("");
    requestAnimationFrame(() => requestAnimationFrame(() => document.querySelectorAll("#skillList .bar i").forEach((b) => (b.style.width = b.dataset.w + "%"))));
  }
  $("#skillTabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-group]");
    if (!b) return;
    activeGroup = b.dataset.group;
    renderSkills();
  });

  /* ---------- Experience & Education ---------- */
  const TL_ICON = { work: "💼", project: "🛠️", intern: "🧑‍💻", volunteer: "🤝", education: "🎓", org: "👥", award: "🏆", course: "📜" };
  function renderTimeline(sel, list = [], fallback) {
    const el = $(sel);
    if (!list.length) return el.closest("section").remove();
    el.innerHTML = list
      .map(
        (t) => `<div class="tl-item card reveal">
        <span class="tl-dot">${TL_ICON[t.type] || fallback}</span>
        <div class="tl-meta"><h3>${esc(t.title)}</h3><span class="tl-period">${esc(t.period)}</span></div>
        <div class="tl-org">${esc(t.org)}</div>
        <p>${esc(t.description)}</p>
      </div>`
      )
      .join("");
  }
  renderTimeline("#experienceList", D.experience, TL_ICON.work);
  renderTimeline("#educationList", D.education, TL_ICON.education);

  /* ---------- Projects ---------- */
  const projects = [...D.projects].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = projects.find((p) => p.featured);
  const latest = featured || projects[0];
  const when = (p) => esc(p.period || fmtDate(p.date));
  let filter = "All", query = "", visible = [];

  if (latest) {
    $("#spotlight").classList.add("card");
    $("#spotlight").innerHTML = `
      ${coverHTML(latest)}
      <div class="spotlight-body">
        <span class="spotlight-label">★ ${featured ? "Featured" : "Latest"} project · ${when(latest)}</span>
        <h3>${esc(latest.title)}</h3>
        <p>${esc(latest.summary)}</p>
        ${tagsHTML(latest.tech)}
        <div><span class="btn btn-primary">View details ${icon("external")}</span></div>
      </div>`;
    $("#spotlight").onclick = () => openModal(latest);
  } else $("#spotlight").remove();

  const cats = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  if (projects.some((p) => p.status === "finished") && projects.some((p) => p.status !== "finished")) cats.push("Finished");

  function renderFilters() {
    $("#filters").innerHTML = cats.map((c) => `<button class="chip ${c === filter ? "active" : ""}" data-cat="${esc(c)}">${esc(c === "Finished" ? "✓ Finished" : c)}</button>`).join("");
  }
  function renderProjects() {
    const q = query.toLowerCase();
    visible = projects.filter((p) => {
      const okCat = filter === "All" || (filter === "Finished" ? p.status === "finished" : p.category === filter);
      const hay = [p.title, p.summary, p.category, ...(p.tech || [])].join(" ").toLowerCase();
      return okCat && (!q || hay.includes(q));
    });
    $("#projectGrid").innerHTML = visible
      .map(
        (p, i) => `<article class="project-card card" data-i="${i}" tabindex="0" style="animation-delay:${i * 60}ms">
          ${coverHTML(p)}
          <div class="project-card-body">
            <div class="pmeta"><span>${esc(p.category || "")}</span><span>${when(p)}</span></div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary)}</p>
            ${tagsHTML(p.tech)}
          </div>
        </article>`
      )
      .join("");
    $("#emptyState").hidden = visible.length > 0;
    bindTilt(document.querySelectorAll(".project-card"), 6);
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    filter = b.dataset.cat;
    renderFilters();
    renderProjects();
  });
  $("#projectSearch").addEventListener("input", (e) => { query = e.target.value.trim(); renderProjects(); });
  $("#projectGrid").addEventListener("click", (e) => {
    const c = e.target.closest(".project-card");
    if (c) openModal(visible[+c.dataset.i], visible);
  });
  $("#projectGrid").addEventListener("keydown", (e) => {
    const c = e.target.closest(".project-card");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openModal(visible[+c.dataset.i], visible); }
  });

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  let modalList = projects, modalIdx = 0, lastFocus = null;
  function openModal(p, list = projects) {
    modalList = list;
    modalIdx = list.indexOf(p);
    lastFocus = document.activeElement;
    renderModal();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".modal-close").focus();
  }
  function renderModal() {
    const p = modalList[modalIdx];
    const L = p.links || {};
    const links = [
      L.demo && `<a class="btn btn-primary" href="${esc(L.demo)}" target="_blank" rel="noopener">Live demo ${icon("external")}</a>`,
      L.repo && `<a class="btn btn-ghost" href="${esc(L.repo)}" target="_blank" rel="noopener">${icon("github")} Source code</a>`,
    ].filter(Boolean).join("");
    $("#modalBody").innerHTML = `
      ${coverHTML(p)}
      <div class="modal-content">
        <div class="pmeta"><span>${[p.category, p.role].filter(Boolean).map(esc).concat(when(p)).join(" · ")}</span></div>
        <h3 id="modalTitle">${esc(p.title)}</h3>
        <p>${esc(p.description || p.summary)}</p>
        ${p.highlights?.length ? `<div><h4>Highlights</h4><ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>` : ""}
        ${p.tech?.length ? `<div><h4>Tech stack</h4>${tagsHTML(p.tech)}</div>` : ""}
        ${p.gallery?.length ? `<div><h4>Gallery</h4><div class="gallery">${p.gallery.map((g) => `<a href="${esc(g)}" target="_blank" rel="noopener"><img src="${esc(g)}" alt="" loading="lazy"></a>`).join("")}</div></div>` : ""}
        ${links ? `<div class="modal-links">${links}</div>` : ""}
        <div class="modal-nav">
          <button data-step="-1" ${modalIdx <= 0 ? "disabled" : ""}>← Previous</button>
          <button data-step="1" ${modalIdx >= modalList.length - 1 ? "disabled" : ""}>Next →</button>
        </div>
      </div>`;
    $(".modal-panel").scrollTop = 0;
  }
  function step(d) {
    const n = modalIdx + d;
    if (n < 0 || n >= modalList.length) return;
    modalIdx = n;
    renderModal();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocus?.focus();
  }
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
    const s = e.target.closest("[data-step]");
    if (s) step(+s.dataset.step);
  });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* ---------- Contact ---------- */
  const C = D.contact;
  $("#contactHeading").textContent = C.heading;
  $("#contactText").textContent = C.text;
  $("#copyEmail").textContent = P.email;
  $("#location").textContent = P.location ? `📍 ${P.location}` : "";
  $("#copyEmail").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(P.email); toast("Email copied to clipboard ✓"); }
    catch { location.href = `mailto:${P.email}`; }
  });
  $("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, data = Object.fromEntries(new FormData(f)), status = $("#formStatus");
    if (C.formEndpoint) {
      status.textContent = "Sending…";
      try {
        const r = await fetch(C.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error();
        status.textContent = "Thanks! Your message has been sent.";
        f.reset();
      } catch { status.textContent = "Something went wrong — please email me directly."; }
    } else {
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      location.href = `mailto:${P.email}?subject=${encodeURIComponent("Portfolio contact from " + data.name)}&body=${body}`;
      status.textContent = "Opening your email app…";
    }
  });

  /* ---------- Theme ---------- */
  const root = document.documentElement, themeBtn = $("#themeToggle");
  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.innerHTML = icon(t === "dark" ? "sun" : "moon");
    localStorage.setItem("theme", t);
  }
  setTheme(localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  /* ---------- Nav: scroll state, active link, mobile menu ---------- */
  const nav = $("#nav"), links = [...document.querySelectorAll(".nav-links a")], menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  menuBtn.addEventListener("click", () => { menuBtn.classList.toggle("open"); navLinks.classList.toggle("open"); });
  links.forEach((a) => a.addEventListener("click", () => { menuBtn.classList.remove("open"); navLinks.classList.remove("open"); }));
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 20);
    $("#scrollProgress").style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    let current = "";
    document.querySelectorAll("main section[id]").forEach((s) => { if (y >= s.offsetTop - 140) current = s.id; });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      en.target.querySelectorAll?.("[data-count]").forEach(countUp);
      io.unobserve(en.target);
    }),
    { threshold: 0.12 }
  );

  /* ---------- 3D tilt ---------- */
  function bindTilt(els, max = 10) {
    if (reduceMotion || matchMedia("(hover: none)").matches) return;
    els.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- Cursor glow ---------- */
  const glow = $("#cursorGlow");
  if (!matchMedia("(hover: none)").matches) {
    addEventListener("mousemove", (e) => { glow.style.opacity = 1; glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });
  }

  /* ---------- Background particle network ---------- */
  (function particles() {
    if (reduceMotion) return;
    const cv = $("#bgCanvas"), ctx = cv.getContext("2d");
    let w, h, pts, mouse = { x: -999, y: -999 };
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(70, Math.floor((w * h) / 22000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    }
    addEventListener("resize", resize);
    addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    resize();
    (function frame() {
      const accent = getComputedStyle(root).getPropertyValue("--accent").trim();
      const light = root.dataset.theme === "light";
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 120) { p.x += (p.x - mouse.x) / dm; p.y += (p.y - mouse.y) / dm; }
      }
      ctx.strokeStyle = accent; ctx.fillStyle = accent;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        ctx.globalAlpha = light ? 0.35 : 0.5;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.globalAlpha = (1 - d / 130) * (light ? 0.15 : 0.22);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    })();
  })();

  /* ---------- Init ---------- */
  renderSkills();
  renderFilters();
  renderProjects();
  bindTilt([$("#avatarWrap")], 14);
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  onScroll();
})();
