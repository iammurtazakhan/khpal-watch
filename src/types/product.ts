export interface ProductSpecs {
  caseSize: string;
  movement: string;
  waterResistance: string;
  strapMaterial: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: 'Luxury' | 'Chronograph' | 'Minimalist' | 'Diving' | 'Classic';
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  specs: ProductSpecs;
}
export const Product = {};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}
export const Category = {};
