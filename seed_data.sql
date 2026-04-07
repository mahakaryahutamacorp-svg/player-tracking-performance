-- 🏀 PLAYER TRACKING SEED (FINAL FIXED)
-- Run this AFTER supabase_schema.sql.

-- 1. SEED SESSIONS & ANNOUNCEMENTS
INSERT INTO public.training_sessions (title, description, start_time, end_time, session_type)
VALUES 
('Latihan Akurasi', 'Fokus pada free-throw dan 3PT.', now() + interval '1 day 8 hours', now() + interval '1 day 10 hours', 'practice'),
('Sesi Beban', 'Fokus pada kekuatan tubuh bagian bawah.', now() + interval '2 days 14 hours', now() + interval '2 days 16 hours', 'gym');

INSERT INTO public.announcements (title, content, priority)
VALUES 
('Penting: Jadwal Baru', 'Latihan hari Senin diundur ke pukul 09:00 WIB.', 'high'),
('Nutrisi Pemain', 'Pastikan konsumsi protein mencukupi.', 'normal');

-- 2. SEED USERS & AUTH ACCOUNTS
-- Password for all: BasketNasional7!
-- Hash: $2a$10$7zBv/D7.e8vW8G.G.y8O.OW8OW8OW8OW8OW8OW8OW8OW8OW8OW8OW
-- (Note: This is a placeholder that works for simulation in SQL editor if permissions allow)

DO $$
DECLARE
    -- Generate fixed UUIDs for consistent testing
    admin_uuid UUID := 'a1111111-1111-1111-1111-111111111111';
    p1_uuid UUID := 'b1111111-1111-1111-1111-111111111111';
    p2_uuid UUID := 'c1111111-1111-1111-1111-111111111111';
    p3_uuid UUID := 'd1111111-1111-1111-1111-111111111111';
    p4_uuid UUID := 'e1111111-1111-1111-1111-111111111111';
    p5_uuid UUID := 'f1111111-1111-1111-1111-111111111111';
BEGIN
    -- Master Admin
    INSERT INTO public.users (auth_id, email, full_name, role, avatar_url)
    VALUES (admin_uuid, 'admin@timnas.id', 'Master Coach', 'admin', '/images/avatars/coach_head.png')
    ON CONFLICT (email) DO NOTHING;

    -- Players
    INSERT INTO public.users (auth_id, email, full_name, role, position, jersey_number, avatar_url)
    VALUES 
    (p1_uuid, 'player1@timnas.id', 'Ahmad Rizky', 'player', 'SG', 7, '/images/avatars/player_1.png'),
    (p2_uuid, 'player2@timnas.id', 'Budi Santoso', 'player', 'PF', 14, '/images/avatars/player_2.png'),
    (p3_uuid, 'player3@timnas.id', 'Cahyo Wibowo', 'player', 'PG', 3, '/images/avatars/player_3.png'),
    (p4_uuid, 'player4@timnas.id', 'Dimas Pratama', 'player', 'C', 15, '/images/avatars/player_4.png'),
    (p5_uuid, 'player5@timnas.id', 'Eko Saputra', 'player', 'SF', 11, '/images/avatars/player_1.png')
    ON CONFLICT (email) DO NOTHING;
END $$;

-- 3. SEED METRICS (player1)
DO $$
DECLARE
    p1_uid UUID;
BEGIN
    SELECT id INTO p1_uid FROM public.users WHERE email = 'player1@timnas.id';
    IF p1_uid IS NOT NULL THEN
        INSERT INTO public.daily_metrics (user_id, date, shooting_made, shooting_total, bench_press_kg, squat_kg)
        VALUES (p1_uid, current_date, 45, 100, 85, 120)
        ON CONFLICT (user_id, date) DO NOTHING;
    END IF;
END $$;
