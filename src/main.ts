// TypeScript port of the inline <script> in index.html — same logic, typed.
// index.html remains the runnable page; this file is the typed source copy.

type Lang = "en" | "id";
type Category = "all" | "4" | "6" | "luxury" | "bus";

interface Car {
  id: string;
  name: string;
  img: string;
  cat: Exclude<Category, "all">;
  price: number;
  en: string;
  idn: string;
  specEn: string;
  specId: string;
}

const CARS: readonly Car[] = [
  { id: "honda-brio", name: "Honda Brio", img: "assets/honda-brio.webp", cat: "4", price: 300000, en: "Compact and fuel-efficient for city trips.", idn: "Kompak dan irit BBM untuk perjalanan dalam kota.", specEn: "4 Seater", specId: "4 Kursi" },
  { id: "avanza-veloz", name: "Toyota Avanza Veloz", img: "assets/avanza-veloz.webp", cat: "6", price: 300000, en: "Family MPV with Manual and CVT options.", idn: "MPV keluarga dengan pilihan Manual dan CVT.", specEn: "6 Seater · Manual / CVT", specId: "6 Kursi · Manual / CVT" },
  { id: "innova-reborn", name: "Toyota Innova Reborn", img: "assets/toyota-innova-reborn.webp", cat: "6", price: 500000, en: "Roomy MPV — 2.0 petrol Dual VVT-i or 2.4 diesel.", idn: "MPV lega — bensin 2.0 Dual VVT-i atau diesel 2.4.", specEn: "6 Seater", specId: "6 Kursi" },
  { id: "innova-venturer", name: "Toyota Innova Venturer", img: "assets/toyota-innova-venturer.webp", cat: "6", price: 600000, en: "The Innova with a more premium cabin.", idn: "Innova dengan kabin yang lebih premium.", specEn: "6 Seater", specId: "6 Kursi" },
  { id: "innova-zenix", name: "Toyota Innova Zenix", img: "assets/toyota-innova-zenix.webp", cat: "6", price: 700000, en: "The newest Innova for family trips.", idn: "Innova terbaru untuk perjalanan keluarga.", specEn: "6 Seater", specId: "6 Kursi" },
  { id: "fortuner", name: "Toyota Fortuner", img: "assets/toyota-fortuner.webp", cat: "6", price: 1100000, en: "2.4 diesel SUV, 6-speed automatic.", idn: "SUV diesel 2.4, otomatis 6 percepatan.", specEn: "6 Seater · SUV", specId: "6 Kursi · SUV" },
  { id: "hiace", name: "Toyota Hiace", img: "assets/toyota-hiace.webp", cat: "bus", price: 1500000, en: "Group van for family and company trips.", idn: "Van rombongan untuk keluarga dan perusahaan.", specEn: "Bus · 11–16 Seater", specId: "Bus · 11–16 Kursi" },
  { id: "alphard", name: "Toyota Alphard", img: "assets/alphard-2022.webp", cat: "luxury", price: 2500000, en: "Luxury MPV for occasions that matter.", idn: "MPV mewah untuk momen istimewa.", specEn: "Luxury Car", specId: "Mobil Mewah" },
];

const CATS: ReadonlyArray<readonly [Category, string, string]> = [
  ["all", "All cars", "Semua mobil"],
  ["4", "4 Seater", "4 Kursi"],
  ["6", "6 Seater", "6 Kursi"],
  ["luxury", "Luxury", "Mewah"],
  ["bus", "Bus", "Bus"],
];

const WHATSAPP = "628117007717";

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

function renderFilters(): void {
  filtersEl.innerHTML = CATS.map(
    ([v, en, idn]) =>
      `<button type="button" class="chip" data-cat="${v}" aria-pressed="${filter === v}">${lang === "id" ? idn : en}</button>`,
  ).join("");
  filtersEl.querySelectorAll<HTMLButtonElement>("button").forEach((b) =>
    b.addEventListener("click", () => {
      filter = (b.dataset.cat ?? "all") as Category;
      render();
    }),
  );
}

function render(): void {
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
}

function applyLang(): void {
  document.documentElement.lang = lang;
  $("lang-en").setAttribute("aria-pressed", String(lang === "en"));
  $("lang-id").setAttribute("aria-pressed", String(lang === "id"));
  document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
    el.textContent = lang === "id" ? (el.dataset.id ?? "") : (el.dataset.en ?? "");
  });
  localStorage.setItem("gm-lang", lang);
  render();
}

$("lang-en").addEventListener("click", () => { lang = "en"; applyLang(); });
$("lang-id").addEventListener("click", () => { lang = "id"; applyLang(); });

/* booking dialog */
function total(): void {
  if (!selected) return;
  $("bk-total").textContent = fmt(selected.price * Number($<HTMLSelectElement>("bk-days").value));
}

function openBook(id: string): void {
  const car = CARS.find((c) => c.id === id);
  if (!car) return;
  selected = car;
  $("dialog-title").textContent = `${car.name} · ${fmt(car.price)}${lang === "id" ? "/hari" : "/day"}`;
  $<HTMLInputElement>("bk-date").value = $<HTMLInputElement>("date").value;
  $<HTMLSelectElement>("bk-days").value = $<HTMLSelectElement>("days").value;
  $<HTMLSelectElement>("bk-pickup").value = $<HTMLSelectElement>("pickup").value;
  $("bk-error").classList.remove("show");
  total();
  dlg.showModal();
}

$("bk-days").addEventListener("change", total);
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
localStorage.removeItem("gm-mode");
