-- ============================================================
-- Mshoracetutoring Phase 1 Schema
-- Run this in Supabase: Dashboard → SQL Editor → New Query
-- ============================================================

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null,
  phone text,
  role text not null check (role in ('parent', 'student', 'admin')),
  timezone text default 'America/New_York',
  created_at timestamptz default now()
);

-- Students
create table public.students (
  id uuid default gen_random_uuid() primary key,
  parent_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  grade_level text not null,
  school text,
  learning_goals text,
  math_level text,
  notes text,
  created_at timestamptz default now()
);

-- Tutor profile (single row for MVP)
create table public.tutor_profile (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  bio text,
  subjects text[] default '{}',
  grade_levels text[] default '{}',
  credentials text[] default '{}',
  hourly_rate integer default 75,
  teaching_style text,
  profile_photo_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Availability
create table public.availability (
  id uuid default gen_random_uuid() primary key,
  tutor_id uuid references public.tutor_profile(id) on delete cascade,
  day_of_week text not null check (day_of_week in ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  start_time time not null,
  end_time time not null,
  is_active boolean default true
);

-- Sessions
create table public.sessions (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id),
  parent_id uuid references public.profiles(id),
  session_type text not null check (session_type in ('1-on-1','group')),
  subject text not null,
  grade_level text,
  duration_minutes integer not null check (duration_minutes in (30, 45, 60, 90)),
  scheduled_at timestamptz not null,
  status text default 'pending' check (status in ('pending','confirmed','completed','cancelled','no-show')),
  zoom_join_url text,
  whiteboard_url text,
  price_cents integer not null,
  payment_status text default 'unpaid' check (payment_status in ('unpaid','paid','refunded')),
  stripe_payment_id text,
  notes text,
  created_at timestamptz default now()
);

-- Session reports
create table public.session_reports (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.sessions(id) on delete cascade unique,
  student_id uuid references public.students(id),
  topics_covered text[] default '{}',
  skill_gaps text,
  student_confidence integer check (student_confidence between 0 and 100),
  wins text,
  homework_assigned text,
  recommended_next_step text,
  attendance text default 'present' check (attendance in ('present','absent','late')),
  created_at timestamptz default now()
);

-- Homework uploads
create table public.homework_uploads (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id),
  session_id uuid references public.sessions(id),
  file_url text not null,
  file_name text,
  file_type text,
  topic text,
  note text,
  created_at timestamptz default now()
);

-- Payments
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  parent_id uuid references public.profiles(id),
  session_id uuid references public.sessions(id),
  amount_cents integer not null,
  status text default 'pending' check (status in ('pending','succeeded','failed','refunded')),
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.tutor_profile enable row level security;
alter table public.availability enable row level security;
alter table public.sessions enable row level security;
alter table public.session_reports enable row level security;
alter table public.homework_uploads enable row level security;
alter table public.payments enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admin can view all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Tutor profile: public read
create policy "Anyone can view tutor profile" on public.tutor_profile
  for select using (true);

create policy "Admin can manage tutor profile" on public.tutor_profile
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Availability: public read
create policy "Anyone can view availability" on public.availability
  for select using (true);

create policy "Admin can manage availability" on public.availability
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Students: parents can manage their own students
create policy "Parents can manage own students" on public.students
  for all using (parent_id = auth.uid());

create policy "Admin can view all students" on public.students
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Sessions: parents/students can view their own
create policy "Parents can view own sessions" on public.sessions
  for select using (parent_id = auth.uid());

create policy "Admin can manage all sessions" on public.sessions
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Session reports: parents can view their student's reports
create policy "Parents can view session reports" on public.session_reports
  for select using (
    exists (
      select 1 from public.students s
      where s.id = session_reports.student_id and s.parent_id = auth.uid()
    )
  );

create policy "Admin can manage session reports" on public.session_reports
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Homework: parents/students can manage their own
create policy "Parents can manage homework" on public.homework_uploads
  for all using (
    exists (
      select 1 from public.students s
      where s.id = homework_uploads.student_id and s.parent_id = auth.uid()
    )
  );

create policy "Admin can view all homework" on public.homework_uploads
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Payments: parents can view their own
create policy "Parents can view own payments" on public.payments
  for select using (parent_id = auth.uid());

create policy "Admin can manage all payments" on public.payments
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- Function: auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'parent')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Seed: default tutor profile
-- ============================================================
insert into public.tutor_profile (bio, subjects, grade_levels, credentials, hourly_rate, teaching_style)
values (
  'I''ve helped over 200 students move from confusion to confidence in math. I specialize in breaking down complex concepts into clear, manageable steps.',
  array['Pre-Algebra','Algebra 1','Algebra 2','Geometry','Trigonometry','Pre-Calculus','Calculus','AP Calculus AB','AP Calculus BC','SAT Math','ACT Math'],
  array['6th Grade','7th Grade','8th Grade','9th Grade','10th Grade','11th Grade','12th Grade'],
  array['MS Applied Mathematics, Howard University','BS Mathematics, Morehouse College','Certified Math Educator, State of Georgia'],
  75,
  'Patient, step-by-step instruction with real-world examples. I focus on building conceptual understanding, not just memorizing formulas.'
);

-- Seed: availability (Mon-Fri afternoons, Saturday mornings)
-- (Will be linked to tutor_profile.id after admin account is created)
