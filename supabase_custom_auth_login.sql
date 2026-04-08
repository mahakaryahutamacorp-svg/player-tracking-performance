-- Custom login for Player Tracking (anon key + RLS on public.users)
-- Run in Supabase SQL Editor AFTER supabase_schema.sql (and ideally after seed_data.sql).
-- The app calls this via supabase.rpc('login_with_credentials', {...}).

CREATE OR REPLACE FUNCTION public.login_with_credentials(
  p_username text,
  p_password text
)
RETURNS TABLE (
  id uuid,
  username text,
  role user_role,
  full_name text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.id, u.username, u.role, u.full_name
  FROM public.users u
  WHERE u.username = p_username
    AND u.password_plain = p_password
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.login_with_credentials(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.login_with_credentials(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.login_with_credentials(text, text) TO authenticated;
