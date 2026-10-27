import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease
}) => {
  return (
    <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900/60 p-1">
      <button
        type="button"
        onClick={onDecrease}
        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center font-medium text-sm text-zinc-100">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
