import type { Order, CustomerDetails } from '../types/order';
import type { CartItem } from '../types/cart';
import { getStorageItem, setStorageItem } from '../utils/storage';

const ORDERS_KEY = 'khpal_watch_orders';

export const orderService = {
  async createOrder(
    customer: CustomerDetails,
    items: CartItem[],
    totalAmount: number,
    paymentMethod: 'COD' | 'Card' = 'COD'
  ): Promise<Order> {
    const newOrder: Order = {
      id: `KW-ORD-${Date.now().toString().slice(-6)}`,
      customer,
      items,
      totalAmount,
      shippingFee: 0,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const existing = getStorageItem<Order[]>(ORDERS_KEY, []);
    setStorageItem(ORDERS_KEY, [newOrder, ...existing]);
    return Promise.resolve(newOrder);
  },

  async getOrders(): Promise<Order[]> {
    return Promise.resolve(getStorageItem<Order[]>(ORDERS_KEY, []));
  }
};
