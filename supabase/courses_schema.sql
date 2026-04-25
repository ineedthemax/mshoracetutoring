-- ============================================================
-- Courses & Digital Products Schema
-- Run in Supabase SQL Editor
-- ============================================================

-- Courses table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  short_description text,
  subject text,
  grade_level text,
  price_cents integer not null default 0,
  is_free boolean default false,
  is_published boolean default false,
  thumbnail_url text,
  preview_description text,
  total_lessons integer default 0,
  created_at timestamptz default now()
);

-- Lessons inside a course
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  file_url text,
  file_name text,
  lesson_order integer default 0,
  is_free_preview boolean default false,
  created_at timestamptz default now()
);

-- Course bundles
create table public.bundles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price_cents integer not null,
  is_published boolean default false,
  created_at timestamptz default now()
);

-- Which courses are in each bundle
create table public.bundle_courses (
  bundle_id uuid references public.bundles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  primary key (bundle_id, course_id)
);

-- Student course purchases (individual)
create table public.course_purchases (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.profiles(id),
  course_id uuid references public.courses(id),
  bundle_id uuid references public.bundles(id),
  amount_cents integer,
  stripe_checkout_session_id text,
  purchased_at timestamptz default now()
);

-- Student lesson progress
create table public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.profiles(id),
  lesson_id uuid references public.lessons(id),
  course_id uuid references public.courses(id),
  completed boolean default false,
  completed_at timestamptz,
  unique(student_id, lesson_id)
);

-- RLS
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.bundles enable row level security;
alter table public.bundle_courses enable row level security;
alter table public.course_purchases enable row level security;
alter table public.lesson_progress enable row level security;

-- Courses: published ones are public
create policy "Anyone can view published courses" on public.courses
  for select using (is_published = true);

create policy "Admin can manage courses" on public.courses
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Lessons: free previews are public, paid lessons require purchase
create policy "Anyone can view free preview lessons" on public.lessons
  for select using (is_free_preview = true);

create policy "Students can view purchased lessons" on public.lessons
  for select using (
    exists (
      select 1 from public.course_purchases
      where student_id = auth.uid() and course_id = lessons.course_id
    )
  );

create policy "Admin can manage lessons" on public.lessons
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Bundles: public read
create policy "Anyone can view published bundles" on public.bundles
  for select using (is_published = true);

create policy "Admin can manage bundles" on public.bundles
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Anyone can view bundle courses" on public.bundle_courses
  for select using (true);

-- Purchases: users see their own
create policy "Students see own purchases" on public.course_purchases
  for select using (student_id = auth.uid());

create policy "Students can insert purchases" on public.course_purchases
  for insert with check (student_id = auth.uid());

create policy "Admin can view all purchases" on public.course_purchases
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Progress: users manage their own
create policy "Students manage own progress" on public.lesson_progress
  for all using (student_id = auth.uid());

create policy "Admin can view all progress" on public.lesson_progress
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
