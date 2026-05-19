-- Update handle_new_user trigger: also create a contact for non-anonymous users

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  user_name  text;
  user_email text;
  is_anon    boolean;
  colors     text[] := ARRAY[
    '#FF7A00','#FF5EB3','#6E52FF','#9327FF','#00BEE8',
    '#1FD7C1','#FF745E','#FFA35E','#FC71FF','#FFC701',
    '#0038FF','#C3FF2B','#FFE62B','#FF4646','#FFBB2B'
  ];
  color text;
begin
  user_name  := coalesce(new.raw_user_meta_data->>'name', '');
  user_email := coalesce(new.email, '');
  is_anon    := (new.raw_app_meta_data->>'provider' = 'anonymous');

  insert into public.profiles (id, name, email, is_guest)
  values (new.id, user_name, user_email, is_anon)
  on conflict (id) do nothing;

  if not is_anon and user_name <> '' then
    color := colors[(ascii(left(user_name, 1)) % array_length(colors, 1)) + 1];
    insert into public.contacts (name, email, color)
    select user_name, user_email, color
    where not exists (
      select 1 from public.contacts c
      where c.email = user_email and user_email <> ''
    );
  end if;

  return new;
end;
$$;

-- Backfill: create contacts for existing non-guest profiles without a matching contact
insert into public.contacts (name, email, color)
select
  p.name,
  p.email,
  (ARRAY[
    '#FF7A00','#FF5EB3','#6E52FF','#9327FF','#00BEE8',
    '#1FD7C1','#FF745E','#FFA35E','#FC71FF','#FFC701',
    '#0038FF','#C3FF2B','#FFE62B','#FF4646','#FFBB2B'
  ])[(ascii(left(p.name, 1)) % 15) + 1]
from public.profiles p
where
  p.is_guest = false
  and p.name <> ''
  and not exists (
    select 1 from public.contacts c
    where c.email = p.email and p.email <> ''
  );
