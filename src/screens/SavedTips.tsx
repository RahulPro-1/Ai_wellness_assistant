import React from 'react';
import { useWellness } from '../context/WellnessContext';
import { TipCard } from '../components/TipCard';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';

export const SavedTips: React.FC = () => {
  const { savedTips, setCurrentScreen, setSelectedTip } = useWellness();

  const handleTipClick = (tip: any) => {
    setSelectedTip(tip);
    setCurrentScreen('details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float-slow"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"></div>

      <nav className="bg-white/70 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-white/50 animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 animate-slideRight">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse-glow shadow-lg">
                <Heart className="w-8 h-8 text-white fill-current animate-heartbeat" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-red-600 to-red-700 bg-clip-text text-transparent">
                Saved Tips
              </h1>
            </div>
            <button
              onClick={() => setCurrentScreen('board')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-110 font-bold shadow-lg hover:shadow-2xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Board
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {savedTips.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] gap-8 animate-zoomIn">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center animate-float shadow-2xl">
              <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
            </div>
            <div className="text-center max-w-md">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-slideUp">No Saved Tips Yet</h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed animate-fadeIn">
                Start saving your favorite wellness tips by clicking the heart icon on any tip
              </p>
              <button
                onClick={() => setCurrentScreen('board')}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all mx-auto relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="w-6 h-6 relative z-10 animate-wiggle" />
                <span className="relative z-10">Browse Tips</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 shadow-2xl animate-slideUp border border-white/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-gray-700 text-xl relative z-10">
                You have{' '}
                <span className="font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent text-3xl">{savedTips.length}</span>{' '}
                saved {savedTips.length === 1 ? 'tip' : 'tips'} <Heart className="inline-block w-7 h-7 text-pink-500 fill-current animate-heartbeat" />
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {savedTips.map((tip, index) => (
                <TipCard
                  key={tip.id}
                  tip={tip}
                  onClick={() => handleTipClick(tip)}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
