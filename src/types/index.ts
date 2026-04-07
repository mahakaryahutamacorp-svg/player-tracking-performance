// ============================================
// 🏀 Player Tracking — Type Definitions
// ============================================

export type UserRole = 'player' | 'admin';
export type PlayerPosition = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface User {
  id: string;
  auth_id?: string;
  email: string;
  full_name: string;
  role: UserRole;
  position?: PlayerPosition;
  jersey_number?: number;
  height_cm?: number;
  weight_kg?: number;
  avatar_url?: string;
  created_at: string;
}

export interface DailyMetrics {
  id: string;
  user_id: string;
  date: string;
  shooting_made: number;
  shooting_total: number;
  bench_press_kg?: number;
  squat_kg?: number;
  deadlift_kg?: number;
  notes?: string;
  created_at: string;
}

export interface RunTracking {
  id: string;
  user_id: string;
  date: string;
  distance_km: number;
  duration_seconds: number;
  avg_pace?: string;
  route_data?: RoutePoint[];
  created_at: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface MatchStats {
  id: string;
  user_id: string;
  match_date: string;
  opponent?: string;
  minutes_played: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fg_made: number;
  fg_attempted: number;
  three_made: number;
  three_attempted: number;
  ft_made: number;
  ft_attempted: number;
  created_at: string;
}

export interface NutritionLog {
  id: string;
  user_id: string;
  date: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  water_liters?: number;
  supplements?: string[];
  notes?: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  date: string;
  status: AttendanceStatus;
  check_in_time?: string;
  notes?: string;
  created_at: string;
}

// Radar chart data shape
export interface RadarMetric {
  category: string;
  value: number;
  fullMark: number;
}

// Dashboard stat card
export interface StatCardData {
  label: string;
  value: string | number;
  unit?: string;
  change?: number; // positive = improvement
  icon: string;
}
