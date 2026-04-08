-- 🏀 PLAYER TRACKING — verifikasi supabase_schema.sql
-- Jalankan di Supabase SQL Editor SETELAH memasang skema.
-- Harapan: semua baris kolom `status` bernilai 'ok'. Jika ada 'missing', jalankan ulang bagian yang relevan dari supabase_schema.sql.

WITH
expected_extensions AS (
  SELECT unnest(ARRAY['uuid-ossp']) AS extname
),
ext_check AS (
  SELECT
    'extension:' || e.extname AS check_id,
    EXISTS (
      SELECT 1 FROM pg_extension x WHERE x.extname = e.extname
    ) AS ok
  FROM expected_extensions e
),
expected_enums AS (
  SELECT unnest(ARRAY[
    'user_role',
    'player_position',
    'attendance_status',
    'injury_status'
  ]) AS typname
),
enum_check AS (
  SELECT
    'enum:public.' || t.typname AS check_id,
    EXISTS (
      SELECT 1
      FROM pg_type t2
      JOIN pg_namespace n ON n.oid = t2.typnamespace
      WHERE n.nspname = 'public'
        AND t2.typname = t.typname
        AND t2.typtype = 'e'
    ) AS ok
  FROM expected_enums t
),
expected_tables AS (
  SELECT unnest(ARRAY[
    'users',
    'announcements',
    'training_sessions',
    'attendance',
    'daily_metrics',
    'run_tracking',
    'match_stats',
    'nutrition_log',
    'injury_reports'
  ]) AS relname
),
table_check AS (
  SELECT
    'table:public.' || r.relname AS check_id,
    EXISTS (
      SELECT 1
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public'
        AND c.relkind = 'r'
        AND c.relname = r.relname
    ) AS ok
  FROM expected_tables r
),
rls_check AS (
  SELECT
    'rls_enabled:public.' || r.relname AS check_id,
    COALESCE(
      (
        SELECT c.relrowsecurity
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind = 'r'
          AND c.relname = r.relname
      ),
      false
    ) AS ok
  FROM expected_tables r
),
expected_user_columns AS (
  SELECT unnest(ARRAY[
    'id',
    'auth_id',
    'email',
    'full_name',
    'username',
    'password_plain',
    'role',
    'position',
    'jersey_number',
    'created_at'
  ]) AS column_name
),
users_column_check AS (
  SELECT
    'column:public.users.' || c.column_name AS check_id,
    EXISTS (
      SELECT 1
      FROM information_schema.columns col
      WHERE col.table_schema = 'public'
        AND col.table_name = 'users'
        AND col.column_name = c.column_name
    ) AS ok
  FROM expected_user_columns c
),
policy_check AS (
  SELECT * FROM (
    VALUES
      (
        'policy:public.users/Players view own profile',
        EXISTS (
          SELECT 1 FROM pg_policies p
          WHERE p.schemaname = 'public'
            AND p.tablename = 'users'
            AND p.policyname = 'Players view own profile'
        )
      ),
      (
        'policy:public.users/Admins full access',
        EXISTS (
          SELECT 1 FROM pg_policies p
          WHERE p.schemaname = 'public'
            AND p.tablename = 'users'
            AND p.policyname = 'Admins full access'
        )
      )
  ) AS v(check_id, ok)
),
function_check AS (
  SELECT * FROM (
    VALUES
      (
        'function:public.handle_new_user()',
        EXISTS (
          SELECT 1
          FROM pg_proc p
          JOIN pg_namespace n ON n.oid = p.pronamespace
          WHERE n.nspname = 'public'
            AND p.proname = 'handle_new_user'
            AND p.prokind = 'f'
        )
      )
  ) AS v(check_id, ok)
),
trigger_check AS (
  SELECT
    'trigger:auth.users/on_auth_user_created' AS check_id,
    EXISTS (
      SELECT 1
      FROM pg_trigger tg
      JOIN pg_class c ON c.oid = tg.tgrelid
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'auth'
        AND c.relname = 'users'
        AND NOT tg.tgisinternal
        AND tg.tgname = 'on_auth_user_created'
    ) AS ok
),
-- Opsional: jalankan setelah supabase_custom_auth_login.sql
login_rpc_check AS (
  SELECT * FROM (
    VALUES
      (
        'function:public.login_with_credentials(text,text) [opsional]',
        EXISTS (
          SELECT 1
          FROM pg_proc p
          JOIN pg_namespace n ON n.oid = p.pronamespace
          WHERE n.nspname = 'public'
            AND p.proname = 'login_with_credentials'
            AND p.prokind = 'f'
            AND p.pronargs = 2
        )
      )
  ) AS v(check_id, ok)
),
all_checks AS (
  SELECT * FROM ext_check
  UNION ALL SELECT * FROM enum_check
  UNION ALL SELECT * FROM table_check
  UNION ALL SELECT * FROM rls_check
  UNION ALL SELECT * FROM users_column_check
  UNION ALL SELECT * FROM policy_check
  UNION ALL SELECT * FROM function_check
  UNION ALL SELECT * FROM trigger_check
  UNION ALL SELECT * FROM login_rpc_check
)
SELECT
  check_id,
  CASE WHEN ok THEN 'ok' ELSE 'missing' END AS status
FROM all_checks
ORDER BY status DESC, check_id;

-- Ringkasan cepat (satu baris)
-- SELECT
--   COUNT(*) FILTER (WHERE status = 'missing') AS missing_count,
--   COUNT(*) FILTER (WHERE status = 'ok') AS ok_count
-- FROM (
--   SELECT check_id, CASE WHEN ok THEN 'ok' ELSE 'missing' END AS status
--   FROM ( ... same CTEs ... ) x
-- ) s;
