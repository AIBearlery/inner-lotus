-- Grant the app roles the table privileges they need.
--
-- The initial schema enabled RLS and added per-row policies, but the public tables never
-- received the standard DML grants for the `anon` / `authenticated` roles (only REFERENCES,
-- TRIGGER, TRUNCATE were present). Postgres requires BOTH a table grant AND passing RLS, so
-- every read/write was denied at the privilege level before RLS applied — onboarding,
-- check-ins, chat, and completions all failed silently. Anonymous-auth users use the
-- `authenticated` role; `anon` covers any pre-auth request.

grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

-- Same privileges for any tables/sequences added later.
alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated;
alter default privileges in schema public
  grant usage, select on sequences to anon, authenticated;
