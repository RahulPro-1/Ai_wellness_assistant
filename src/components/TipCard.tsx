import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WellnessTip } from '../types';
import { useWellness } from '../context/WellnessContext';

interface TipCardProps {
  tip: WellnessTip;
  onClick: () => void;
  index: number;
}

export const TipCard: React.FC<TipCardProps> = ({ tip, onClick, index }) => {
  const { isTipSaved, saveTip, unsaveTip } = useWellness();
  const saved = isTipSaved(tip.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsaveTip(tip.id);
    } else {
      saveTip(tip);
    }
  };

  return (
    <div
      className={`group relative ${tip.color} rounded-3xl p-8 shadow-xl hover:shadow-3xl
        transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:rotate-1
        animate-scaleIn overflow-hidden border-2 border-white/20`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleSave}
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-125 ${
            saved
              ? 'bg-white/50 text-red-600 scale-110 animate-heartbeat'
              : 'bg-white/30 text-white hover:bg-white/50'
          }`}
          aria-label={saved ? 'Unsave tip' : 'Save tip'}
        >
          <Heart
            className={`w-6 h-6 ${saved ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      <div className="flex items-start gap-5 relative z-10">
        <div className="text-6xl animate-float-slow transform group-hover:scale-125 transition-transform duration-500">{tip.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-white/90 animate-pulse" />
            <span className="text-sm font-bold text-white/90 uppercase tracking-wider">
              {tip.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
            {tip.title}
          </h3>
          <p className="text-white/95 leading-relaxed text-lg font-medium">{tip.short}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};
