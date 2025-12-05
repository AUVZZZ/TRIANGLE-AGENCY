
export type StatType = '专注' | '共情' | '气场' | '欺瞒' | '主动' | '专业' | '活力' | '坚毅' | '诡秘';

export interface ArcOption {
  id: string;
  name: string;
  description: string;
  type: 'Anomaly' | 'Reality' | 'Competency';
  details?: string[];
  // Competency specific
  primeDirective?: string;
  authorizedActivities?: string[];
  // Reality specific
  defaultTrigger?: string;
  defaultRelief?: string;
}

export interface QuizQuestion {
  question: string;
  options: {
    text: string;
    bonusStat: StatType;
    bonusAmount: number;
  }[];
}

export interface StatValue {
  current: number;
  max: number;
}

export interface CharacterStats {
  [key: string]: StatValue;
}

// Updated Track State for W/L Balance logic
export interface TrackProgress {
  value: number; // How many marked from start
  burned: number; // How many removed from end (due to other tracks)
}

export interface WlTrackState {
  competency: TrackProgress;
  reality: TrackProgress;
  anomaly: TrackProgress;
}

export interface CustomTrack {
  id: string;
  name: string;
  value: number; 
  max: number;
}

// Full Save State Interface
export interface AgentSaveData {
  characterName: string;
  pronouns: string;
  agencyTitle: string;
  agencyRating: string;
  anomalyId: string | null;
  realityId: string | null;
  competencyId: string | null;
  realityTrigger: string;
  overloadRelief: string;
  stats: CharacterStats;
  totalGrowthPoints: number;
  commendations: number;
  reprimands: number;
  overload: number;
  mvpCount: number;
  probationCount: number;
  wlTrackState: WlTrackState;
  customTracks: CustomTrack[];
  setupPhase: boolean;
}
