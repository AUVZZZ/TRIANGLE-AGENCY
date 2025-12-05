
import React from 'react';
import { StatType, StatValue } from '../types';
import { Plus, RefreshCw } from 'lucide-react';
import { FormatText } from './FormatText';

interface TriangleStatProps {
  label: StatType;
  stat: StatValue;
  onSpend: () => void;
  onRefresh: () => void;
  onIncreaseMax: () => void;
  canIncreaseMax: boolean;
}

export const TriangleStat: React.FC<TriangleStatProps> = ({ 
  label, 
  stat, 
  onSpend, 
  onRefresh,
  onIncreaseMax,
  canIncreaseMax
}) => {
  
  const triangles = [];
  // Render up to 9 triangles
  for (let i = 0; i < 9; i++) {
    const isUnlocked = i < stat.max;
    const isFilled = i < stat.current;
    const isUp = i % 2 === 0;
    
    let bgClass = 'bg-gray-100'; // Default hidden/locked
    if (isUnlocked) {
      if (isFilled) {
        bgClass = 'bg-red-600'; // Active charge
      } else {
        bgClass = 'bg-transparent border-2 border-red-200'; // Spent but unlocked
      }
    }

    triangles.push(
      <div 
        key={i}
        className={`w-5 h-5 mx-[1px] transition-all duration-300 ${bgClass} ${isUp ? 'clip-triangle-up' : 'clip-triangle-down'}`}
        style={isUnlocked && !isFilled ? { clipPath: isUp ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'polygon(0% 0%, 100% 0%, 50% 100%)' } : {}}
      />
    );
  }

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between w-full items-center mb-2">
        <span className="text-sm font-black text-gray-800 uppercase tracking-widest"><FormatText>{label}</FormatText></span>
        <div className="flex space-x-1">
           {/* Refresh Button */}
           <button 
            onClick={onRefresh}
            disabled={stat.current >= stat.max}
            className={`p-1 rounded-full ${stat.current >= stat.max ? 'text-gray-200' : 'text-blue-500 hover:bg-blue-50'}`}
            title="补充 (Refresh)"
          >
            <RefreshCw size={14} />
          </button>
          
          {/* Increase Max Button */}
          <button 
            onClick={onIncreaseMax}
            disabled={!canIncreaseMax || stat.max >= 9}
            className={`p-1 rounded-full ${!canIncreaseMax || stat.max >= 9 ? 'text-gray-200' : 'text-green-500 hover:bg-green-50'}`}
            title="提升上限 (Increase Max)"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Visual Triangles */}
      <div className="flex items-center justify-center h-8 mb-2">
        {triangles}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full px-2">
        <button 
          onClick={onSpend}
          disabled={stat.current <= 0}
          className={`px-3 py-1 rounded text-xs font-bold w-full transition-colors ${stat.current <= 0 ? 'bg-gray-100 text-gray-300' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
        >
          <FormatText>消耗 (Spend)</FormatText>
        </button>
      </div>
    </div>
  );
};
