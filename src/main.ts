import { CARS, CATEGORIES, WHATSAPP, type Car, type Category, type Lang } from "./data";

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el as T;
};
const fmt = (n: number): string => `Rp ${n.toLocaleString("id-ID")}`;

let lang: Lang = localStorage.getItem("gm-lang") === "id" ? "id" : "en";
let filter: Category = "all";
let selected: Car | null = null;

const grid = $<HTMLElement>("fleet-grid");
const filtersEl = $<HTMLElement>("filters");
const dlg = $<HTMLDialogElement>("book-dialog");

const renderFilters = (): void => {
  filtersEl.innerHTML = CATEGORIES.map(
    ([v, en, idn]) =>
      `<button type="button" class="chip" data-cat="${v}" aria-pressed="${filter === v}">${lang === "id" ? idn : en}</button>`,
  ).join("");
  filtersEl.querySelectorAll<HTMLButtonElement>("button").forEach((b) =>
    b.addEventListener("click", () => {
      filter = (b.dataset.cat ?? "all") as Category;
      render();
    }),
  );
};

const render = (): void => {
  renderFilters();
  const list = CARS.filter((c) => filter === "all" || c.cat === filter);
  $("fleet-empty").classList.toggle("show", list.length === 0);
  grid.innerHTML = list
    .map(
      (c) => `
   <article class="car-card panel" data-od-id="car-${c.id}">
     <div class="car-media"><img src="${c.img}" alt="${c.name}" width="800" height="800" loading="lazy"></div>
     <div class="car-body">
       <span class="car-cat">${lang === "id" ? c.specId : c.specEn}</span>
       <h3>${c.name}</h3>
       <p class="car-spec">${lang === "id" ? c.idn : c.en}</p>
       <div class="car-foot">
         <span class="price num">${fmt(c.price)}<small>${lang === "id" ? "mulai dari / hari" : "start from / day"}</small></span>
         <button type="button" class="btn" data-book="${c.id}">${lang === "id" ? "Pesan" : "Book"}</button>
       </div>
     </div>
   </article>`,
    )
    .join("");
  grid.querySelectorAll<HTMLButtonElement>("[data-book]").forEach((b) =>
    b.addEventListener("click", () => openBook(b.dataset.book ?? "")),
  );
};

const applyLang = (): void => {
  document.documentElement.lang = lang;
  $("lang-en").setAttribute("aria-pressed", String(lang === "en"));
  $("lang-id").setAttribute("aria-pressed", String(lang === "id"));
  document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
    el.textContent = lang === "id" ? (el.dataset.id ?? "") : (el.dataset.en ?? "");
  });
  localStorage.setItem("gm-lang", lang);
  render();
};

$("lang-en").addEventListener("click", () => { lang = "en"; applyLang(); });
$("lang-id").addEventListener("click", () => { lang = "id"; applyLang(); });

const updateTotal = (): void => {
  if (!selected) return;
  $("bk-total").textContent = fmt(selected.price * Number($<HTMLSelectElement>("bk-days").value));
};

const openBook = (id: string): void => {
  const car = CARS.find((c) => c.id === id);
  if (!car) return;
  selected = car;
  $("dialog-title").textContent = `${car.name} · ${fmt(car.price)}${lang === "id" ? "/hari" : "/day"}`;
  $<HTMLInputElement>("bk-date").value = $<HTMLInputElement>("date").value;
  $<HTMLSelectElement>("bk-days").value = $<HTMLSelectElement>("days").value;
  $<HTMLSelectElement>("bk-pickup").value = $<HTMLSelectElement>("pickup").value;
  $("bk-error").classList.remove("show");
  updateTotal();
  dlg.showModal();
};

$("bk-days").addEventListener("change", updateTotal);
document.querySelectorAll<HTMLButtonElement>("[data-promo-book]").forEach((b) =>
  b.addEventListener("click", () => openBook(b.dataset.promoBook ?? "")),
);
$("dialog-close").addEventListener("click", () => dlg.close());

$<HTMLFormElement>("book-form").addEventListener("submit", (e) => {
  if (!selected) return;
  const name = $<HTMLInputElement>("bk-name").value.trim();
  const date = $<HTMLInputElement>("bk-date").value;
  if (!name || !date) {
    e.preventDefault();
    $("bk-error").classList.add("show");
    return;
  }
  const days = $<HTMLSelectElement>("bk-days").value;
  const pickup = $<HTMLSelectElement>("bk-pickup").value === "port"
    ? (lang === "id" ? "Pelabuhan" : "Port")
    : (lang === "id" ? "Kantor Golden" : "Golden office");
  const driver = $<HTMLInputElement>("bk-driver").checked
    ? (lang === "id" ? "dengan sopir" : "with driver")
    : (lang === "id" ? "lepas kunci" : "self-drive");
  const msg = encodeURIComponent(
    `Hello Golden Mobil Auto, I am ${name}. I would like to rent the ${selected.name} on ${date} for ${days} day(s), pickup: ${pickup}, ${driver}. Estimated total: ${fmt(selected.price * Number(days))}.`,
  );
  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
});

$<HTMLFormElement>("booking-bar").addEventListener("submit", (e) => {
  e.preventDefault();
  const date = $<HTMLInputElement>("date");
  if (!date.value) {
    $("date-error").classList.add("show");
    date.setAttribute("aria-invalid", "true");
    date.focus();
    return;
  }
  date.removeAttribute("aria-invalid");
  $("date-error").classList.remove("show");
  const y = $("fleet").getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
});

applyLang();
