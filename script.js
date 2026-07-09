/* eCommerce Expo — page renderer (data comes from shared/config.js) */
(function () {
  "use strict";
  const X = window.SEN_CONFIG.ecommerceExpo;
  const C = window.SEN_CONFIG;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Overview copy */
  const overview = document.getElementById("overview-copy");
  if (overview) overview.textContent = X.overview;

  /* Panel spotlight — descriptive by default; the full listing (names, slot,
     stage) renders only when config sets panel.published = true. */
  const panel = document.getElementById("panelcard");
  if (panel && X.panel) {
    const P = X.panel;
    const head = `
      <h3 class="panelcard__title">${esc(P.title)}</h3>
      <p class="panelcard__subtitle">${esc(P.subtitle)}</p>`;
    if (P.published && P.internal) {
      const people = P.internal.people.map((p) => `
        <li class="pperson">
          <span class="pperson__role">${esc(p.role)}</span>
          <span class="pperson__name">${esc(p.name)}</span>
          <span class="pperson__org">${esc([p.title, p.company].filter(Boolean).join(", "))}</span>
        </li>`).join("");
      panel.innerHTML = `
        <div>
          <p class="panelcard__when">
            <span class="chip">${esc(P.internal.when)}</span>
            <span class="chip chip--soft">${esc(P.internal.stage)}</span>
          </p>
          ${head}
        </div>
        <ul class="panelcard__people">${people}</ul>`;
    } else {
      panel.classList.add("panelcard--teaser");
      panel.innerHTML = `
        <div>
          ${head}
          <p class="panelcard__desc">${esc(P.description)}</p>
          <a class="btn btn--ghost panelcard__cta" href="${esc(P.agendaCta.url)}" target="_blank" rel="noopener">${esc(P.agendaCta.label)}</a>
        </div>`;
    }
  }

  /* Happy hour module — TBD-aware */
  const hh = document.getElementById("hhcard");
  if (hh && X.happyHour) {
    const H = X.happyHour;
    const cta = C.ctas[H.lumaKey] || {};
    const btn = cta.url
      ? `<a class="btn btn--primary" href="${esc(cta.url)}" target="_blank" rel="noopener">${esc(cta.label)}</a>`
      : `<a class="btn" aria-disabled="true" role="link">${esc(cta.tbdText || "RSVP link coming soon")}</a>`;
    hh.innerHTML = `
      <p class="hhcard__eyebrow">Post&ndash;Day&nbsp;1</p>
      <h2 class="hhcard__title" id="hh-h">${esc(H.title)}</h2>
      <p class="hhcard__meta">
        <span>${esc(H.when)}</span><span class="dot" aria-hidden="true">&middot;</span>
        <span>${esc(H.where)}</span>
      </p>
      <p class="hhcard__blurb">${esc(H.blurb)}</p>
      ${btn}`;
  }

  /* Observe late-added .reveal nodes */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.is-in)").forEach((n) => io.observe(n));
  } else {
    document.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in"));
  }
})();
