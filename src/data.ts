export type Lang = "en" | "id";
export type Category = "all" | "4" | "6" | "luxury" | "bus";

export interface Car {
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

export const CARS: readonly Car[] = [
  { id: "honda-brio", name: "Honda Brio", img: "assets/honda-brio.webp", cat: "4", price: 300000, en: "Compact and fuel-efficient for city trips.", idn: "Kompak dan irit BBM untuk perjalanan dalam kota.", specEn: "4 Seater", specId: "4 Kursi" },
  { id: "avanza-veloz", name: "Toyota Avanza Veloz", img: "assets/avanza-veloz.webp", cat: "6", price: 300000, en: "Family MPV with Manual and CVT options.", idn: "MPV keluarga dengan pilihan Manual dan CVT.", specEn: "6 Seater · Manual / CVT", specId: "6 Kursi · Manual / CVT" },
  { id: "innova-reborn", name: "Toyota Innova Reborn", img: "assets/toyota-innova-reborn.webp", cat: "6", price: 500000, en: "Roomy MPV — 2.0 petrol Dual VVT-i or 2.4 diesel.", idn: "MPV lega — bensin 2.0 Dual VVT-i atau diesel 2.4.", specEn: "6 Seater", specId: "6 Kursi" },
  { id: "innova-venturer", name: "Toyota Innova Venturer", img: "assets/toyota-innova-venturer.webp", cat: "6", price: 600000, en: "The Innova with a more premium cabin.", idn: "Innova dengan kabin yang lebih premium.", specEn: "6 Seater", specId: "6 Kursi" },
  { id: "innova-zenix", name: "Toyota Innova Zenix", img: "assets/toyota-innova-zenix.webp", cat: "6", price: 700000, en: "The newest Innova for family trips.", idn: "Innova terbaru untuk perjalanan keluarga.", specEn: "6 Seater", specId: "6 Kursi" },
  { id: "fortuner", name: "Toyota Fortuner", img: "assets/toyota-fortuner.webp", cat: "6", price: 1100000, en: "2.4 diesel SUV, 6-speed automatic.", idn: "SUV diesel 2.4, otomatis 6 percepatan.", specEn: "6 Seater · SUV", specId: "6 Kursi · SUV" },
  { id: "hiace", name: "Toyota Hiace", img: "assets/toyota-hiace.webp", cat: "bus", price: 1500000, en: "Group van for family and company trips.", idn: "Van rombongan untuk keluarga dan perusahaan.", specEn: "Bus · 11–16 Seater", specId: "Bus · 11–16 Kursi" },
  { id: "alphard", name: "Toyota Alphard", img: "assets/alphard-2022.webp", cat: "luxury", price: 2500000, en: "Luxury MPV for occasions that matter.", idn: "MPV mewah untuk momen istimewa.", specEn: "Luxury Car", specId: "Mobil Mewah" },
];

export const CATEGORIES: ReadonlyArray<readonly [Category, string, string]> = [
  ["all", "All cars", "Semua mobil"],
  ["4", "4 Seater", "4 Kursi"],
  ["6", "6 Seater", "6 Kursi"],
  ["luxury", "Luxury", "Mewah"],
  ["bus", "Bus", "Bus"],
];

export const WHATSAPP = "628117007717";
