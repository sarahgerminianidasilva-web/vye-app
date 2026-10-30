-- Voice Your English · app schema
create table if not exists public.teachers(email text primary key);
insert into public.teachers(email) values ('sarahgerminianidasilva@gmail.com') on conflict do nothing;

create or replace function public.jwt_email() returns text language sql stable as $$ select lower(coalesce(auth.jwt()->>'email','')) $$;
create or replace function public.is_teacher() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.teachers t where lower(t.email)=public.jwt_email()) $$;

create table if not exists public.students(
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  data jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now());
create or replace function public.touch() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
drop trigger if exists students_touch on public.students;
create trigger students_touch before update on public.students for each row execute function public.touch();

create or replace function public.my_student_id() returns uuid language sql stable security definer set search_path=public as $$
  select id from public.students where lower(email)=public.jwt_email() limit 1 $$;

create table if not exists public.progress(
  student_id uuid primary key references public.students(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now());

create table if not exists public.submissions(
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  kind text not null check (kind in ('homework','payment','selfeval','message')),
  ref text,
  payload jsonb not null default '{}'::jsonb,
  file_path text,
  seen boolean not null default false,
  created_at timestamptz not null default now());
create index if not exists submissions_student_idx on public.submissions(student_id, created_at desc);

alter table public.teachers enable row level security;
alter table public.students enable row level security;
alter table public.progress enable row level security;
alter table public.submissions enable row level security;

drop policy if exists teachers_read on public.teachers;
create policy teachers_read on public.teachers for select using (public.is_teacher());

drop policy if exists students_read on public.students;
create policy students_read on public.students for select using (public.is_teacher() or lower(email)=public.jwt_email());
drop policy if exists students_write on public.students;
create policy students_write on public.students for all using (public.is_teacher()) with check (public.is_teacher());

drop policy if exists progress_rw on public.progress;
create policy progress_rw on public.progress for all
  using (public.is_teacher() or student_id=public.my_student_id())
  with check (public.is_teacher() or student_id=public.my_student_id());

drop policy if exists subs_read on public.submissions;
create policy subs_read on public.submissions for select using (public.is_teacher() or student_id=public.my_student_id());
drop policy if exists subs_insert on public.submissions;
create policy subs_insert on public.submissions for insert with check (public.is_teacher() or student_id=public.my_student_id());
drop policy if exists subs_update on public.submissions;
create policy subs_update on public.submissions for update using (public.is_teacher()) with check (public.is_teacher());
drop policy if exists subs_delete on public.submissions;
create policy subs_delete on public.submissions for delete using (public.is_teacher());

-- Storage: private receipts (comprovantes) and public materials
insert into storage.buckets(id,name,public) values ('receipts','receipts',false) on conflict (id) do nothing;
insert into storage.buckets(id,name,public) values ('materials','materials',true) on conflict (id) do nothing;

drop policy if exists receipts_insert on storage.objects;
create policy receipts_insert on storage.objects for insert to authenticated
  with check (bucket_id='receipts' and (public.is_teacher() or (storage.foldername(name))[1]=public.my_student_id()::text));
drop policy if exists receipts_read on storage.objects;
create policy receipts_read on storage.objects for select to authenticated
  using (bucket_id='receipts' and (public.is_teacher() or (storage.foldername(name))[1]=public.my_student_id()::text));
drop policy if exists materials_write on storage.objects;
create policy materials_write on storage.objects for insert to authenticated
  with check (bucket_id='materials' and public.is_teacher());

-- Teacher board (agenda + controle de aulas), teacher-only
create table if not exists public.teacher_board(
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now());
alter table public.teacher_board enable row level security;
drop policy if exists board_teacher on public.teacher_board;
create policy board_teacher on public.teacher_board for all using (public.is_teacher()) with check (public.is_teacher());
