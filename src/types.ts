export type Lang = "en" | "id";
export type CarCategory = "4" | "6" | "luxury" | "bus";

export interface Car {
  id: string;
  name: string;
  img: string;
  cat: CarCategory;
  /** Published "start from" daily rate in IDR. */
  price: number;
  en: string;
  idn: string;
  specEn: string;
  specId: string;
}

export interface PickupPoint {
  value: string;
  en: string;
  idn: string;
}

export interface Place {
  id: string;
  name: string;
  img: string;
  imgW: number;
  imgH: number;
  imgAlt: string;
  tagEn: string;
  tagId: string;
  en: string;
  idn: string;
}

/** What the booking dialog collects today via WhatsApp; backend should accept the same shape. */
export interface BookingRequest {
  carId: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  pickup: string; // pickup value, or free text when custom
  customPickup?: string;
  tripNumber?: string; // optional flight/ferry number
  name: string;
  phone?: string;
}
