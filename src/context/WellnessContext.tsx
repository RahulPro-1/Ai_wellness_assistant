import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, WellnessTip, Screen } from '../types';

interface WellnessContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  tips: WellnessTip[];
  setTips: (tips: WellnessTip[]) => void;
  savedTips: WellnessTip[];
  saveTip: (tip: WellnessTip) => void;
  unsaveTip: (tipId: string) => void;
  isTipSaved: (tipId: string) => boolean;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  selectedTip: WellnessTip | null;
  setSelectedTip: (tip: WellnessTip | null) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

const SAVED_TIPS_KEY = 'wellness_saved_tips';

export const WellnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [savedTips, setSavedTips] = useState<WellnessTip[]>([]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');
  const [selectedTip, setSelectedTip] = useState<WellnessTip | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_TIPS_KEY);
    if (saved) {
      try {
        setSavedTips(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved tips:', error);
      }
    }
  }, []);

  const saveTip = (tip: WellnessTip) => {
    setSavedTips((prev) => {
      const exists = prev.find((t) => t.id === tip.id);
      if (exists) return prev;

      const newSaved = [...prev, tip];
      localStorage.setItem(SAVED_TIPS_KEY, JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const unsaveTip = (tipId: string) => {
    setSavedTips((prev) => {
      const newSaved = prev.filter((t) => t.id !== tipId);
      localStorage.setItem(SAVED_TIPS_KEY, JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const isTipSaved = (tipId: string): boolean => {
    return savedTips.some((t) => t.id === tipId);
  };

  return (
    <WellnessContext.Provider
      value={{
        profile,
        setProfile,
        tips,
        setTips,
        savedTips,
        saveTip,
        unsaveTip,
        isTipSaved,
        currentScreen,
        setCurrentScreen,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = (): WellnessContextType => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};
