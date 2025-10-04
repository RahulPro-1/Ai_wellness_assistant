import React, { useState, useEffect } from 'react';
import { useWellness } from '../context/WellnessContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { generateTipDetails } from '../services/aiService';
import { TipDetail } from '../types';
import { ArrowLeft, Heart, CheckCircle2, Star, Sparkles } from 'lucide-react';

export const TipDetails: React.FC = () => {
  const { selectedTip, profile, setCurrentScreen, isTipSaved, saveTip, unsaveTip } = useWellness();
  const [details, setDetails] = useState<TipDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedTip || !profile) return;

      setLoading(true);
      setError(null);
      try {
        const tipDetails = await generateTipDetails(selectedTip, profile);
        setDetails(tipDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [selectedTip, profile]);

  if (!selectedTip) {
    setCurrentScreen('board');
    return null;
  }

  const saved = isTipSaved(selectedTip.id);

  const handleSave = () => {
    if (saved) {
      unsaveTip(selectedTip.id);
    } else {
      saveTip(selectedTip);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient relative overflow-hidden">
      <div className="absolute top-0 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>

      <nav className="bg-white/70 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-white/50 animate-slideDown">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentScreen('board')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-110 font-bold shadow-lg hover:shadow-2xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tips
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-110 shadow-lg hover:shadow-2xl ${
                saved
                  ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white animate-pulse-glow'
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current animate-heartbeat' : ''}`} />
              {saved ? 'Saved' : 'Save Tip'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className={`${selectedTip.color} rounded-3xl p-10 md:p-16 shadow-3xl mb-12 animate-zoomIn relative overflow-hidden border-4 border-white/30`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-slow"></div>

          <div className="flex items-center gap-6 mb-6 relative z-10">
            <div className="text-8xl animate-float-slow transform hover:scale-125 transition-transform duration-500">{selectedTip.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-white/90 animate-pulse" />
                <span className="text-base font-bold text-white/90 uppercase tracking-wider">
                  {selectedTip.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl animate-slideIn">{selectedTip.title}</h1>
            </div>
          </div>
          <p className="text-xl text-white/95 leading-relaxed font-medium relative z-10">{selectedTip.short}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 animate-shake">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Loading detailed guidance..." />
        ) : details ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white/50 animate-slideUp relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
                  <Sparkles className="w-7 h-7 text-white animate-wiggle" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why This Matters</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-xl font-medium relative z-10">{details.explanation}</p>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white/50 animate-slideUp relative overflow-hidden group hover:shadow-3xl transition-all duration-500" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 via-teal-500 to-teal-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
                  <CheckCircle2 className="w-7 h-7 text-white animate-wiggle" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">How to Get Started</h2>
              </div>
              <div className="space-y-4">
                {details.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-5 p-6 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl border-2 border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slideIn relative z-10 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 via-teal-500 to-teal-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed flex-1 text-lg font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white/50 animate-slideUp relative overflow-hidden group hover:shadow-3xl transition-all duration-500" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
                  <Star className="w-7 h-7 text-white animate-wiggle" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Key Benefits</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {details.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-300 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slideIn relative z-10 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Star className="w-7 h-7 text-yellow-600 fill-current flex-shrink-0 mt-0.5 group-hover:rotate-180 transition-transform duration-500" />
                    <p className="text-gray-800 leading-relaxed text-lg font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
