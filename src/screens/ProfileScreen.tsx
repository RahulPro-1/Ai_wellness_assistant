import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useWellness } from '../context/WellnessContext';
import { generateWellnessTips } from '../services/aiService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Sparkles, User, Target, Calendar } from 'lucide-react';

const goals = [
  'Weight Loss',
  'Muscle Gain',
  'Stress Reduction',
  'Better Sleep',
  'More Energy',
  'Mental Clarity',
  'Flexibility',
  'Heart Health',
];

const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export const ProfileScreen: React.FC = () => {
  const { setProfile, setTips, setCurrentScreen } = useWellness();
  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: '',
    goal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.gender || !formData.goal) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const tips = await generateWellnessTips(formData);
      setProfile(formData);
      setTips(tips);
      setCurrentScreen('board');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate tips');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <LoadingSpinner message="Crafting your personalized wellness journey..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 animate-gradient relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-slow"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>

      <div className="max-w-lg w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 animate-zoomIn relative z-10 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4 animate-pulse-glow">
            <Sparkles className="w-12 h-12 text-white animate-wiggle" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-slideDown">
            Wellness Journey
          </h1>
          <p className="text-gray-600 text-lg animate-fadeIn">Let's personalize your health recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-5 h-5 text-blue-500 animate-bounce-slow" />
              Age
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all outline-none text-lg font-medium hover:border-blue-300 hover:shadow-lg"
              required
            />
          </div>

          <div className="space-y-2 animate-slideIn" style={{ animationDelay: '0.3s' }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-5 h-5 text-purple-500 animate-bounce-slow" />
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              {genders.map((gender, index) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg ${
                    formData.gender === gender
                      ? 'border-purple-500 bg-gradient-to-r from-purple-400 to-purple-600 text-white scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700 bg-white'
                  }`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 animate-slideIn" style={{ animationDelay: '0.5s' }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Target className="w-5 h-5 text-pink-500 animate-bounce-slow" />
              Health Goal
            </label>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal, index) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setFormData({ ...formData, goal })}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg ${
                    formData.goal === goal
                      ? 'border-pink-500 bg-gradient-to-r from-pink-400 to-pink-600 text-white scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300 text-gray-700 bg-white'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.05}s` }}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 relative overflow-hidden group animate-slideUp"
            style={{ animationDelay: '0.9s' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              Generate My Tips
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  );
};
