/* Renderiza o site a partir de CONFIG (js/config.js) e das traduções (js/i18n.js). Normalmente não precisa de edição. */
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)],
  esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
const C = CONFIG,
  I = C.images,
  langButton = $("#lang-button"),
  langOptions = $("#lang-options"),
  langPicker = $("#lang-picker");
// idioma: escolha guardada > idioma do navegador (se suportado) > português
let L = "pt";
try {
  const s = localStorage.getItem("lang");
  if (LANGS[s]) L = s;
  else {
    const n = (navigator.language || "pt").slice(0, 2);
    if (LANGS[n]) L = n;
  }
} catch (e) {}
const t = (k, v) => {
  let s = (I18N[L] && I18N[L][k]) ?? I18N.pt[k] ?? k;
  if (v) for (const x in v) s = s.replaceAll("{" + x + "}", v[x]);
  return s;
};
const has = (k) => k in I18N.pt;
// ligações fixas
$$("[data-booksy]").forEach((a) => {
  a.href = C.booksyUrl;
  a.target = "_blank";
  a.rel = "noopener";
});
$$("[data-ig]").forEach((a) => {
  a.href = C.instagramUrl;
  a.target = "_blank";
  a.rel = "noopener";
});
$$("[data-logo]").forEach((i) => (i.src = C.logo));
$("#directions").href =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(C.address);
$("#addr").textContent = C.address;
$("#map").innerHTML =
  `<iframe loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(C.address)}&output=embed"></iframe>`;
$("#heroimg").style.objectPosition = I.hero.pos || "center";
$("#heroimg").src = I.hero.src;
$("#aboutimg").src = I.about.src;
// observadores
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
let vio;
const dlg = $("#lb");
function updateLanguagePicker() {
  $("#lang-label").textContent = LANGS[L];
  langButton.setAttribute("aria-label", `${t("a11y.lang")}: ${LANGS[L]}`);
  langOptions.setAttribute("aria-label", t("a11y.lang"));
  langOptions.innerHTML = Object.keys(LANGS)
    .map(
      (k) =>
        `<li class="lang-option" role="option" data-lang="${k}" aria-selected="${k === L}" tabindex="-1">${esc(LANGS[k])}</li>`,
    )
    .join("");
}
function setLanguagePickerOpen(open, focusSelected = false) {
  langButton.setAttribute("aria-expanded", open);
  langOptions.hidden = !open;
  if (open && focusSelected) {
    const selected = langOptions.querySelector('[aria-selected="true"]');
    if (selected) selected.focus();
  }
}
function selectLanguage(language) {
  L = language;
  try {
    localStorage.setItem("lang", L);
  } catch (e) {}
  render();
  setLanguagePickerOpen(false);
  langButton.focus();
}
function render() {
  document.documentElement.lang = HTML_LANG[L];
  updateLanguagePicker();
  document.title = t("meta.title");
  $("meta[name=description]").content = t("meta.desc");
  $('meta[property="og:title"]').content = t("meta.title");
  $$("[data-i18n]").forEach((e) => (e.textContent = t(e.dataset.i18n)));
  $$("[data-i18n-aria]").forEach((e) =>
    e.setAttribute("aria-label", t(e.dataset.i18nAria)),
  );
  $$("[data-i18n-alt]").forEach((e) => (e.alt = t(e.dataset.i18nAlt)));
  $("#map iframe").title = t("a11y.map");
  updateMenuButton();
  $("#copy").textContent = t("foot.copy", { y: new Date().getFullYear() });
  const ct = (c, s) =>
    has(`cat.${c.id}.${s}`)
      ? t(`cat.${c.id}.${s}`)
      : s === "t"
        ? c.title
        : c.text;
  // categorias principais
  $("#mosaic").innerHTML = C.categories
    .filter((c) => c.main)
    .map((c) => {
      const p = I.categories[c.id],
        r = (I.categoryRatio || {})[c.id] || 0.75;
      return `<a class="cat rv" href="#cat-${c.id}" style="--r:${r}">${p ? `<img class="pic" loading="lazy" src="${p}" alt="${esc(ct(c, "t"))}">` : '<span class="pic ph" aria-hidden="true">♛</span>'}<div><h3>${esc(ct(c, "t"))}</h3><p>${esc(ct(c, "p"))}</p><small>${t("serv.count", { n: c.items.length })}</small></div></a>`;
    })
    .join("");
  $$(".cat").forEach((a) =>
    a.addEventListener("click", () => {
      const d = $(a.getAttribute("href"));
      if (d) d.open = true;
    }),
  );
  // catálogo (mantém as categorias abertas)
  const open = $$("#acc details[open]").map((d) => d.id);
  $("#acc").innerHTML = C.categories
    .map(
      (c) =>
        `<details id="cat-${c.id}" class="${c.signature ? "sig" : ""}"><summary>${esc(ct(c, "t"))}</summary><ul>${c.signature ? `<li class="note">${esc(ct(c, "p"))}</li>` : ""}${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></details>`,
    )
    .join("");
  open.forEach((id) => {
    const d = $("#" + id);
    if (d) d.open = true;
  });
  // galeria
  $("#gal").innerHTML = I.gallery
    .map(
      (g, i) =>
        `<figure class="rv"><button data-i="${i}" aria-label="${t("a11y.enlarge")}: ${esc(t("galalt." + i))}"><img loading="lazy" src="${g.src}" alt="${esc(t("galalt." + i))}" style="object-position:${g.pos || "center"}"></button><figcaption>${esc(t("gal." + i))}</figcaption></figure>`,
    )
    .join("");
  // equipa
  const tm = C.team.filter((x) => x.visible);
  $("#team").innerHTML = tm
    .map(
      (x) =>
        `<article class="member rv"><div class="avatar">${x.photo ? `<img loading="lazy" src="${x.photo}" alt="${esc(x.name)}">` : esc(x.name[0])}</div><h3>${esc(x.name)}</h3>${x.role ? `<p class="role">${esc(x.role)}</p>` : ""}${x.bio ? `<p>${esc(x.bio)}</p>` : ""}${x.instagram ? `<p><a href="${x.instagram}" target="_blank" rel="noopener">Instagram</a></p>` : ""}</article>`,
    )
    .join("");
  $("#equipa").hidden = !tm.length;
  // vídeos
  const rl = $("#reels");
  if (vio) vio.disconnect();
  if (C.reels && C.reels.length) {
    rl.hidden = false;
    rl.innerHTML = C.reels
      .map(
        (r, i) =>
          `<a class="reel rv" href="${esc(r.url)}" target="_blank" rel="noopener" aria-label="${esc(t("a11y.reel", { n: i + 1 }))}"><video muted loop playsinline preload="metadata" poster="${esc(r.poster)}" ${still ? "" : `src="${esc(r.video)}"`}></video><span class="reel-cta"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>${esc(t("ig.cta"))}</span></a>`,
      )
      .join("");
    if (!still) {
      vio = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            const v = e.target.querySelector("video");
            e.isIntersecting ? v.play().catch(() => {}) : v.pause();
          }),
        { threshold: 0.35 },
      );
      $$(".reel", rl).forEach((el) => vio.observe(el));
    }
  } else rl.hidden = true;
  // rodapé
  $("#fnav").innerHTML = [
    ["servicos", "nav.services"],
    ["galeria", "nav.gallery"],
    ["equipa", "nav.team"],
    ["sobre", "nav.about"],
    ["localizacao", "nav.location"],
  ]
    .map((l) => `<li><a href="#${l[0]}">${t(l[1])}</a></li>`)
    .join("");
  $$(".rv:not(.in)").forEach((el) => io.observe(el));
}
// eventos
$("#gal").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const g = I.gallery[b.dataset.i];
  $("#lbimg").src = g.src;
  $("#lbimg").alt = t("galalt." + b.dataset.i);
  dlg.showModal();
});
$("#lbx").onclick = () => dlg.close();
dlg.addEventListener("click", (e) => {
  if (e.target === dlg) dlg.close();
});
langButton.addEventListener("click", () => {
  const open = langButton.getAttribute("aria-expanded") !== "true";
  setLanguagePickerOpen(open, open);
});
langButton.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    setLanguagePickerOpen(true, true);
  }
});
langOptions.addEventListener("click", (e) => {
  const option = e.target.closest(".lang-option");
  if (option) selectLanguage(option.dataset.lang);
});
langOptions.addEventListener("keydown", (e) => {
  const options = $$(".lang-option", langOptions);
  const current = options.indexOf(document.activeElement);
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const direction = e.key === "ArrowDown" ? 1 : -1;
    options[(current + direction + options.length) % options.length].focus();
  } else if (e.key === "Home" || e.key === "End") {
    e.preventDefault();
    options[e.key === "Home" ? 0 : options.length - 1].focus();
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (current >= 0) selectLanguage(options[current].dataset.lang);
  } else if (e.key === "Escape") {
    e.preventDefault();
    setLanguagePickerOpen(false);
    langButton.focus();
  }
});
langPicker.addEventListener("focusout", (e) => {
  if (!langPicker.contains(e.relatedTarget)) setLanguagePickerOpen(false);
});
document.addEventListener("pointerdown", (e) => {
  if (!langPicker.contains(e.target)) setLanguagePickerOpen(false);
});
const h = $("header");
addEventListener("scroll", () => h.classList.toggle("on", scrollY > 40), {
  passive: true,
});
const bg = $(".burger"),
  ul = $("#primary-navigation-list"),
  primaryNav = $("#primary-navigation"),
  mobileNav = matchMedia("(max-width: 900px)");
function updateMenuButton() {
  const open = bg.getAttribute("aria-expanded") === "true";
  bg.setAttribute("aria-label", t(open ? "a11y.menuClose" : "a11y.menu"));
}
function setMobileMenuOpen(open) {
  const isOpen = open && mobileNav.matches;
  ul.classList.toggle("open", isOpen);
  bg.setAttribute("aria-expanded", String(isOpen));
  ul.inert = mobileNav.matches && !isOpen;
  updateMenuButton();
}
bg.onclick = () =>
  setMobileMenuOpen(bg.getAttribute("aria-expanded") !== "true");
ul.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMobileMenuOpen(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && bg.getAttribute("aria-expanded") === "true") {
    setMobileMenuOpen(false);
    bg.focus();
  }
});
document.addEventListener("pointerdown", (e) => {
  if (
    mobileNav.matches &&
    bg.getAttribute("aria-expanded") === "true" &&
    !primaryNav.contains(e.target) &&
    !bg.contains(e.target)
  ) {
    setMobileMenuOpen(false);
  }
});
mobileNav.addEventListener("change", () => setMobileMenuOpen(false));
setMobileMenuOpen(false);
render();
