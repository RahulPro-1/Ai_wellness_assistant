import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext';
import { TipCard } from '../components/TipCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { generateWellnessTips } from '../services/aiService';
import { RefreshCw, Heart, Home, Sparkles, Target } from 'lucide-react';

export const TipBoard: React.FC = () => {
  const { profile, tips, setTips, setCurrentScreen, setSelectedTip, savedTips } = useWellness();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegenerate = async () => {
    if (!profile) return;

    setError(null);
    setLoading(true);
    try {
      const newTips = await generateWellnessTips(profile);
      setTips(newTips);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate tips');
    } finally {
      setLoading(false);
    }
  };

  const handleTipClick = (tip: any) => {
    setSelectedTip(tip);
    setCurrentScreen('details');
  };

  if (!profile || tips.length === 0) {
    setCurrentScreen('profile');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>

      <nav className="bg-white/70 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-white/50 animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-slideRight">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow shadow-lg">
                <Sparkles className="w-7 h-7 text-white animate-rotate" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Wellness Tips
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentScreen('saved')}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl hover:from-pink-500 hover:to-pink-700 transition-all transform hover:scale-110 font-semibold shadow-lg hover:shadow-2xl"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Saved</span>
                {savedTips.length > 0 && (
                  <span className="bg-white text-pink-600 text-xs px-2.5 py-1 rounded-full font-bold animate-pulse">
                    {savedTips.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentScreen('profile')}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-110 font-semibold shadow-lg hover:shadow-2xl"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 shadow-2xl animate-slideUp border border-white/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="animate-slideIn">
              <p className="text-gray-700 text-lg">
                <span className="font-bold text-blue-600 text-xl">{profile.age}</span> years old •{' '}
                <span className="font-bold text-purple-600 text-xl">{profile.gender}</span>
              </p>
              <p className="text-base text-gray-600 mt-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-pink-500" />
                Goal: <span className="font-bold text-pink-600 text-lg">{profile.goal}</span>
              </p>
            </div>
            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <RefreshCw className={`w-6 h-6 relative z-10 ${loading ? 'animate-spin' : ''}`} />
              <span className="relative z-10">Regenerate Tips</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 animate-shake">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Generating fresh wellness tips..." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, index) => (
              <TipCard
                key={tip.id}
                tip={tip}
                onClick={() => handleTipClick(tip)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
