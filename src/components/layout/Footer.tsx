import React from 'react';
import { Link } from 'react-router-dom';
import { Watch, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-800/80 text-zinc-400">
      <div className="border-b border-zinc-800/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-xl bg-zinc-900 text-[#c5a880] border border-zinc-800">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Authentic</h4>
              <p className="text-xs text-zinc-500">Certified genuine luxury timepieces</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-xl bg-zinc-900 text-[#c5a880] border border-zinc-800">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Express Insured Delivery</h4>
              <p className="text-xs text-zinc-500">Free nationwide doorstep delivery</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-xl bg-zinc-900 text-[#c5a880] border border-zinc-800">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">3-Year Warranty</h4>
              <p className="text-xs text-zinc-500">Comprehensive movement coverage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#c5a880] flex items-center justify-center text-black">
            <Watch size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">KHPAL WATCH</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>� {new Date().getFullYear()} Khpal Watch Store. All Pakistan Cash on Delivery.</span>
          <Link to="/admin" className="inline-flex items-center gap-1 text-zinc-600 hover:text-[#c5a880] transition">
            <Lock size={12} /> Admin Studio
          </Link>
        </div>
      </div>
    </footer>
  );
};
