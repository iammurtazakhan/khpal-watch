import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-6xl font-black text-[#c5a880] mb-2">404</span>
      <h1 className="text-2xl font-bold text-white mb-2">Timepiece Not Found</h1>
      <p className="text-sm text-zinc-400 mb-6 max-w-sm">
        The page you are looking for has been moved or does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a880] text-black text-sm font-semibold rounded-xl hover:bg-[#d6b991] transition"
      >
        <ArrowLeft size={16} />
        Back to Storefront
      </Link>
    </div>
  );
};
