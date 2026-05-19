-- Update handle_new_user trigger: also create a contact for non-anonymous users
-- Uses v_ prefixed variables to avoid name collision with SQL column names.
-- Uses coalesce(..., false) for is_anon to handle NULL raw_app_meta_data safely.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  v_name    text;
  v_email   text;
  v_is_anon boolean;
  v_colors  text[];
  v_color   text;
begin
  v_name    := coalesce(new.raw_user_meta_data->>'name', '');
  v_email   := coalesce(new.email, '');
  v_is_anon := coalesce(
    new.raw_app_meta_data->>'provider' = 'anonymous',
    false
  );

  insert into public.profiles (id, name, email, is_guest)
  values (new.id, v_name, v_email, v_is_anon)
  on conflict (id) do nothing;

  if not v_is_anon and v_name <> '' then
    v_colors := ARRAY[
      '#FF7A00','#FF5EB3','#6E52FF','#9327FF','#00BEE8',
      '#1FD7C1','#FF745E','#FFA35E','#FC71FF','#FFC701',
      '#0038FF','#C3FF2B','#FFE62B','#FF4646','#FFBB2B'
    ];
    v_color := v_colors[
      (ascii(left(v_name, 1)) % array_length(v_colors, 1)) + 1
    ];
    insert into public.contacts (name, email, color)
    select v_name, v_email, v_color
    where not exists (
      select 1 from public.contacts c
      where c.email = v_email and v_email <> ''
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
