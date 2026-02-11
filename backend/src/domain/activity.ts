export type ActivityType =
  | 'SKIING'
  | 'SURFING'
  | 'OUTDOOR_SIGHTSEEING'
  | 'INDOOR_SIGHTSEEING';

export interface ActivityScore {
  activity: ActivityType;
  score: number; // 0–100
  reasoning: string;
}
