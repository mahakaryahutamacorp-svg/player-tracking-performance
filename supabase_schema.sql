-- 🏀 PLAYER TRACKING DATABASE SCHEMA (FINAL FIXED)
-- Run this in the Supabase SQL Editor.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS (Safe creation with DO blocks)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('player', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'player_position') THEN
        CREATE TYPE player_position AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_status') THEN
        CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'injury_status') THEN
        CREATE TYPE injury_status AS ENUM ('healthy', 'rehab', 'out', 'day-to-day');
    END IF;
END $$;

-- 3. CORE TABLES (IF NOT EXISTS)

-- USERS
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE, 
  email TEXT UNIQUE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  password_plain TEXT,
  role user_role DEFAULT 'player',
  position player_position,
  jersey_number INTEGER,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'normal', 'high')) DEFAULT 'normal',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TRAINING SESSIONS
CREATE TABLE IF NOT EXISTS public.training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT DEFAULT 'Training Facility Main Court',
  session_type TEXT DEFAULT 'practice', 
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ATTENDANCE
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES training_sessions(id) ON DELETE CASCADE,
  status attendance_status DEFAULT 'present',
  check_in_time TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, session_id)
);

-- DAILY METRICS
CREATE TABLE IF NOT EXISTS public.daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  shooting_made INTEGER DEFAULT 0,
  shooting_total INTEGER DEFAULT 100,
  bench_press_kg NUMERIC,
  squat_kg NUMERIC,
  deadlift_kg NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, date)
);

-- RUN TRACKING
CREATE TABLE IF NOT EXISTS public.run_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  distance_km NUMERIC NOT NULL,
  duration_seconds INTEGER NOT NULL,
  avg_pace TEXT,
  route_data JSONB, 
  created_at TIMESTAMPTZ DEFAULT now()
);

-- MATCH STATS
CREATE TABLE IF NOT EXISTS public.match_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_date DATE NOT NULL,
  opponent TEXT,
  minutes_played NUMERIC DEFAULT 0,
  points INTEGER DEFAULT 0,
  rebounds INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  steals INTEGER DEFAULT 0,
  blocks INTEGER DEFAULT 0,
  turnovers INTEGER DEFAULT 0,
  fg_made INTEGER DEFAULT 0,
  fg_attempted INTEGER DEFAULT 0,
  three_made INTEGER DEFAULT 0,
  three_attempted INTEGER DEFAULT 0,
  ft_made INTEGER DEFAULT 0,
  ft_attempted INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- NUTRITION LOG
CREATE TABLE IF NOT EXISTS public.nutrition_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  calories INTEGER,
  protein_g NUMERIC,
  carbs_g NUMERIC,
  fat_g NUMERIC,
  water_liters NUMERIC,
  supplements JSONB DEFAULT '[]'::JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, date)
);

-- INJURY REPORTS
CREATE TABLE IF NOT EXISTS public.injury_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  body_part TEXT NOT NULL,
  description TEXT,
  status injury_status DEFAULT 'healthy',
  recovery_estimate DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. AUTH SYNC TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Player'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'player'::user_role)
  )
  ON CONFLICT (auth_id) DO UPDATE SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4a. ATTACH TRIGGER (Final Step for Auth Sync)
-- This ensures every new signup gets a profile entry automatically.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.run_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.injury_reports ENABLE ROW LEVEL SECURITY;

-- 5a. POLICIES (Safe creation)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Players view own profile') THEN
        CREATE POLICY "Players view own profile" ON public.users FOR SELECT USING (auth.uid() = auth_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins full access') THEN
        CREATE POLICY "Admins full access" ON public.users FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.users WHERE auth_id = auth.uid() AND role = 'admin'));
    END IF;
END $$;
