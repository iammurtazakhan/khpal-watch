import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Watch, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0e0e11]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c5a880] to-[#e5cfb3] flex items-center justify-center text-black shadow-lg shadow-[#c5a880]/20">
              <Watch size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                KHPAL<span className="text-[#c5a880]">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-medium">
                Timepieces
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link to="/" className="hover:text-[#c5a880] transition">Home</Link>
            <a href="/#catalog" className="hover:text-[#c5a880] transition">Watches</a>
            <a href="/#about" className="hover:text-[#c5a880] transition">Heritage</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/50 text-white transition flex items-center justify-center"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#c5a880] text-black font-bold text-xs rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#131317] px-6 py-5 space-y-4 text-sm font-medium">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-zinc-300 hover:text-[#c5a880]">Home</Link>
          <a href="/#catalog" onClick={() => setMobileMenuOpen(false)} className="block text-zinc-300 hover:text-[#c5a880]">Watches</a>
          <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="block text-zinc-300 hover:text-[#c5a880]">Heritage</a>
        </div>
      )}
    </header>
  );
};
