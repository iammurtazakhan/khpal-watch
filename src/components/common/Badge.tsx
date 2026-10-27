import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'zinc' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold' }) => {
  const variants = {
    gold: 'bg-[#c5a880]/15 text-[#c5a880] border-[#c5a880]/30',
    zinc: 'bg-zinc-800/80 text-zinc-300 border-zinc-700',
    success: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};
