import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/currency';
import { QuantitySelector } from '../components/common/QuantitySelector';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-6">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-zinc-400 mb-8 max-w-sm mx-auto">
          Explore our collection of luxury timepieces to find your perfect watch.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c5a880] text-black text-sm font-semibold rounded-xl hover:bg-[#d6b991] transition shadow-lg shadow-[#c5a880]/20"
        >
          <ArrowLeft size={16} />
          Explore Watches
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Shopping Bag</h1>
          <p className="text-sm text-zinc-400 mt-1">
            You have <span className="text-[#c5a880] font-semibold">{totalItems} timepiece{totalItems > 1 ? 's' : ''}</span> in your bag
          </p>
        </div>
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 flex flex-col sm:flex-row items-center gap-5 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-zinc-900 border border-zinc-800 flex-shrink-0"
                />
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest block">
                    {product.brand}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-base font-semibold text-white hover:text-[#c5a880] transition"
                  >
                    {product.name}
                  </Link>
                  <span className="block text-sm font-bold text-zinc-300 mt-1">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => updateQuantity(product.id, quantity + 1)}
                  onDecrease={() => updateQuantity(product.id, quantity - 1)}
                />
                <span className="text-base font-bold text-white min-w-[90px] text-right">
                  {formatPrice(product.price * quantity)}
                </span>
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#141419] border border-zinc-800 space-y-6">
          <h3 className="text-lg font-bold text-white">Order Summary</h3>

          <div className="space-y-3 text-sm border-b border-zinc-800 pb-4">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Insured Courier Delivery</span>
              <span className="text-emerald-400 font-semibold">FREE</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline text-lg font-bold">
            <span className="text-white">Estimated Total</span>
            <span className="text-2xl text-[#c5a880]">{formatPrice(totalPrice)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-[#c5a880] text-black font-semibold rounded-xl hover:bg-[#d6b991] transition flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/20"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
            <ShieldCheck size={16} className="text-[#c5a880]" />
            <span>Cash on Delivery & 3-Year Warranty included</span>
          </div>
        </div>
      </div>
    </div>
  );
};
