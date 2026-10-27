import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/currency';
import { useCart } from '../../hooks/useCart';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-[#131317] border border-zinc-800/80 hover:border-[#c5a880]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
      <div>
        <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-zinc-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#c5a880] rounded-full border border-white/10">
            {product.category}
          </span>
        </Link>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="uppercase tracking-widest text-zinc-500">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-semibold text-white group-hover:text-[#c5a880] transition line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between mt-2">
        <div>
          <span className="text-xs text-zinc-500 block">Price</span>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#c5a880] text-black text-xs font-semibold rounded-lg hover:bg-[#d6b991] transition active:scale-95 shadow-md shadow-[#c5a880]/10"
        >
          <ShoppingBag size={14} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};
