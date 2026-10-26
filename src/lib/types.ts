export type Size = "S" | "M" | "L";

export interface SizeOption {
  size: Size;
  label: string;
  price: number;
  isDefault?: boolean;
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
  hasTextArea?: boolean;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  images: string[];
  startingPrice: number;
  sizes: SizeOption[];
  bestSeller?: boolean;
}

export interface Category {
  slug: string;
  title: string;
  image: string;
}

export interface Service {
  slug: string;
  title: string;
  image: string;
}

export interface Testimonial {
  name: string;
  city: string;
  bouquet: string;
  quote: string;
}
