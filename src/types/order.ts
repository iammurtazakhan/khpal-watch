import type { CartItem } from './cart';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: 'COD' | 'Card';
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}
