-- 🏀 PLAYER TRACKING SEED (CUSTOM AUTH VERSION)
-- Run this AFTER supabase_schema.sql.
-- Then run supabase_custom_auth_login.sql so the app can log in with the anon key (RLS-safe RPC).

-- 1. SEED SESSIONS & ANNOUNCEMENTS
INSERT INTO public.training_sessions (title, description, start_time, end_time, session_type)
VALUES 
('Latihan Akurasi', 'Fokus pada free-throw dan 3PT.', now() + interval '1 day 8 hours', now() + interval '1 day 10 hours', 'practice'),
('Sesi Beban', 'Fokus pada kekuatan tubuh bagian bawah.', now() + interval '2 days 14 hours', now() + interval '2 days 16 hours', 'gym');

INSERT INTO public.announcements (title, content, priority)
VALUES 
('Penting: Jadwal Baru', 'Latihan hari Senin diundur ke pukul 09:00 WIB.', 'high'),
('Nutrisi Pemain', 'Pastikan konsumsi protein mencukupi.', 'normal');

-- 2. SEED USERS (Custom Auth)
-- Coach Account
INSERT INTO public.users (username, password_plain, full_name, role, avatar_url)
VALUES ('coach12', '223344', 'Master Coach', 'admin', '/images/avatars/coach_head.png')
ON CONFLICT (username) DO UPDATE SET password_plain = EXCLUDED.password_plain;

-- Player Accounts
INSERT INTO public.users (username, password_plain, full_name, role, position, jersey_number, avatar_url)
VALUES 
('player01', '123456', 'Ahmad Rizky', 'player', 'SG', 7, '/images/avatars/player_1.png'),
('player02', '123456', 'Budi Santoso', 'player', 'PF', 14, '/images/avatars/player_2.png'),
('player03', '123456', 'Cahyo Wibowo', 'player', 'PG', 3, '/images/avatars/player_3.png'),
('player04', '123456', 'Dimas Pratama', 'player', 'C', 15, '/images/avatars/player_4.png'),
('player05', '123456', 'Eko Saputra', 'player', 'SF', 11, '/images/avatars/player_1.png')
ON CONFLICT (username) DO UPDATE SET password_plain = EXCLUDED.password_plain;

-- 3. SEED METRICS (player01)
DO $$
DECLARE
    p1_uid UUID;
BEGIN
    SELECT id INTO p1_uid FROM public.users WHERE username = 'player01';
    IF p1_uid IS NOT NULL THEN
        INSERT INTO public.daily_metrics (user_id, date, shooting_made, shooting_total, bench_press_kg, squat_kg)
        VALUES (p1_uid, current_date, 45, 100, 85, 120)
        ON CONFLICT (user_id, date) DO NOTHING;
    END IF;
END $$;
