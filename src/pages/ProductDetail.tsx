import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { productService } from '../services/productService';
import type { Product } from '../types/product';
import { formatPrice } from '../utils/currency';
import { useCart } from '../hooks/useCart';
import { QuantitySelector } from '../components/common/QuantitySelector';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    const fetchWatch = async () => {
      if (!id) return;
      setLoading(true);
      const data = await productService.getById(id);
      if (data) {
        setProduct(data);
        setSelectedImage(data.image);
      }
      setLoading(false);
    };

    fetchWatch();
  }, [id]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">Loading timepiece...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-xl font-bold text-white mb-4">Watch Not Found</h2>
        <button onClick={() => navigate('/')} className="text-[#c5a880] underline text-sm">
          Return to storefront
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={16} />
        Back to collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover object-center" />
          </div>
          {product.gallery.length > 1 && (
            <div className="flex gap-4">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === img ? 'border-[#c5a880]' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] block mb-1">
              {product.brand}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-zinc-500 text-sm">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400 block">Total Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400">
              In Stock & Insured Dispatch
            </span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">{product.description}</p>

          <div className="border-t border-b border-zinc-800 py-6">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="text-zinc-500 block">Movement</span>
                <span className="text-zinc-200 font-medium">{product.specs.movement}</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="text-zinc-500 block">Case Diameter</span>
                <span className="text-zinc-200 font-medium">{product.specs.caseSize}</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="text-zinc-500 block">Water Resistance</span>
                <span className="text-zinc-200 font-medium">{product.specs.waterResistance}</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="text-zinc-500 block">Strap Material</span>
                <span className="text-zinc-200 font-medium">{product.specs.strapMaterial}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#c5a880] text-black font-semibold rounded-xl hover:bg-[#d6b991] transition flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/20"
            >
              {added ? (
                <>
                  <Check size={18} />
                  Added to Shopping Bag!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  Add to Shopping Bag
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 text-center text-[11px] text-zinc-400">
            <div className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col items-center gap-1">
              <ShieldCheck size={18} className="text-[#c5a880]" />
              <span>3-Year Warranty</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col items-center gap-1">
              <Truck size={18} className="text-[#c5a880]" />
              <span>Free Delivery</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col items-center gap-1">
              <RotateCcw size={18} className="text-[#c5a880]" />
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
