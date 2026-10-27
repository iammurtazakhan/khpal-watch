import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils/currency';
import type { CustomerDetails, Order } from '../types/order';

export const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (items.length === 0 && !confirmedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No items to checkout</h2>
        <Link to="/" className="text-[#c5a880] underline text-sm">Return to catalog</Link>
      </div>
    );
  }

  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 size={36} />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Thank you, {confirmedOrder.customer.fullName}!
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Your timepiece order <span className="text-white font-mono font-bold">{confirmedOrder.id}</span> has been scheduled for insured dispatch.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 text-left space-y-3 text-sm">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Delivery Address:</span>
            <span className="text-zinc-200">{confirmedOrder.customer.address}, {confirmedOrder.customer.city}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Contact Phone:</span>
            <span className="text-zinc-200">{confirmedOrder.customer.phone}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Payment Mode:</span>
            <span className="text-emerald-400 font-medium">Cash on Delivery (COD)</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-base">
            <span className="text-white">Amount Due on Delivery:</span>
            <span className="text-[#c5a880]">{formatPrice(confirmedOrder.totalAmount)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c5a880] text-black font-semibold rounded-xl hover:bg-[#d6b991] transition"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const order = await orderService.createOrder(formData, items, totalPrice, 'COD');
      setConfirmedOrder(order);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Checkout</h1>
        <p className="text-sm text-zinc-400 mt-1">Complete your delivery information for Cash on Delivery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-4">
            <h3 className="text-base font-semibold text-white">Contact & Delivery Address</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmad Khan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="ahmad@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Street Address / House No *</label>
              <input
                type="text"
                required
                placeholder="House #123, Street 4, Sector F-7"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Islamabad, Lahore, Karachi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Postal Code</label>
                <input
                  type="text"
                  placeholder="44000"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 space-y-2">
            <h4 className="text-sm font-semibold text-white">Payment Method</h4>
            <div className="p-3.5 rounded-xl border border-[#c5a880]/50 bg-[#c5a880]/10 flex items-center gap-3">
              <Truck size={20} className="text-[#c5a880]" />
              <div>
                <span className="text-sm font-bold text-white block">Cash on Delivery (COD)</span>
                <span className="text-xs text-zinc-400">Pay cash securely when your watch arrives at your door.</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#c5a880] text-black font-semibold rounded-xl hover:bg-[#d6b991] transition flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/20 disabled:opacity-50"
          >
            {submitting ? 'Confirming Order...' : `Confirm Order — ${formatPrice(totalPrice)}`}
          </button>
        </form>

        <div className="p-6 rounded-2xl bg-[#141419] border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white">Your Selection</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 text-xs">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-800" />
                <div className="flex-1 min-w-0">
                  <span className="block font-medium text-white truncate">{product.name}</span>
                  <span className="text-zinc-500">Qty: {quantity}</span>
                </div>
                <span className="font-semibold text-zinc-200">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-emerald-400 font-semibold">FREE (Insured)</span>
            </div>
            <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-zinc-800">
              <span>Total Payable</span>
              <span className="text-[#c5a880]">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
