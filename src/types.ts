export interface UserProfile {
  age: number;
  gender: string;
  goal: string;
}

export interface WellnessTip {
  id: string;
  title: string;
  short: string;
  icon: string;
  category?: string;
  color?: string;
}

export interface TipDetail {
  title: string;
  explanation: string;
  steps: string[];
  benefits: string[];
}

export type Screen = 'profile' | 'board' | 'details' | 'saved';
