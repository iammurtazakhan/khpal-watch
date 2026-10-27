import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { productService } from '../services/productService';
import { CATEGORIES } from '../data/categories';
import type { Product } from '../types/product';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWatches = async () => {
      setLoading(true);
      const data = await productService.getByCategory(selectedCategory);
      setProducts(data);
      setLoading(false);
    };

    fetchWatches();
  }, [selectedCategory]);

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#18181f] via-[#121217] to-[#0e0e11] pt-16 pb-28 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-xs text-[#c5a880] font-semibold tracking-wider uppercase">
                <Sparkles size={14} />
                Real-Time Cloud Inventory
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Timeless Precision, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#eedbc5] to-[#c5a880]">
                  Unmatched Prestige.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore handpicked luxury and chronograph timepieces. Fully integrated with Supabase storage and nationwide Cash on Delivery.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#catalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c5a880] text-black font-semibold rounded-xl hover:bg-[#d6b991] transition duration-200 shadow-xl shadow-[#c5a880]/20"
                >
                  Explore Collection
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-4 border-t border-zinc-800/80 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[#c5a880]">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">3 Years Warranty</span>
                    <span className="block text-[11px] text-zinc-500">100% Guaranteed</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[#c5a880]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">Free Doorstep COD</span>
                    <span className="block text-[11px] text-zinc-500">Insured Dispatch</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-zinc-700/60 shadow-2xl shadow-black/80 bg-zinc-900 group">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85"
                  alt="Khpal Watch Flagship"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">Khpal Watch</span>
                  <h3 className="text-xl font-bold text-white">Crafted For Perfection</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog & Filter */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a880]">
            Live Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Curated Collection
          </h2>
          <p className="text-sm text-zinc-400">
            Real-time catalog powered directly by Supabase cloud database.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedCategory === category.slug
                  ? 'bg-[#c5a880] text-black shadow-lg shadow-[#c5a880]/20 scale-105'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-zinc-500 text-sm">Connecting to Supabase...</div>
        ) : products.length === 0 ? (
          <div className="py-16 px-6 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20 max-w-xl mx-auto space-y-4">
            <h3 className="text-lg font-bold text-white">No Watches In Catalog Yet</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All dummy data has been removed. Go to the Admin Studio to upload your first timepiece with picture directly to Supabase!
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a880] text-black text-xs font-bold rounded-xl hover:bg-[#d6b991] transition"
            >
              <PlusCircle size={16} />
              Open Admin Studio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Heritage Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141419] border border-zinc-800 rounded-3xl p-8 sm:p-14">
          <div className="max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#c5a880]">
              The Khpal Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Every Second Counts. Every Detail Matters.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              At Khpal Watch, each timepiece is assembled with surgical grade 316L stainless steel, scratch-resistant sapphire crystals, and precision calibrated movements.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
