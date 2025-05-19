-- Enable Row Level Security
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  role text check (role in ('admin', 'player')) not null,
  handicap integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tournaments table
create table public.tournaments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  location text not null,
  format text check (format in ('stroke_play', 'match_play')) not null,
  status text check (status in ('upcoming', 'ongoing', 'completed')) not null default 'upcoming',
  description text,
  created_by uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tournament_players table (junction table)
create table public.tournament_players (
  tournament_id uuid references public.tournaments(id) on delete cascade not null,
  player_id uuid references public.profiles(id) on delete cascade not null,
  team_id uuid references public.teams(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (tournament_id, player_id)
);

-- Create teams table
create table public.teams (
  id uuid default gen_random_uuid() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create matches table
create table public.matches (
  id uuid default gen_random_uuid() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade not null,
  team1_id uuid references public.teams(id) on delete set null,
  team2_id uuid references public.teams(id) on delete set null,
  player1_id uuid references public.profiles(id) on delete set null,
  player2_id uuid references public.profiles(id) on delete set null,
  scheduled_time timestamp with time zone not null,
  status text check (status in ('scheduled', 'in_progress', 'completed')) not null default 'scheduled',
  winner_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create scores table
create table public.scores (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references public.matches(id) on delete cascade not null,
  player_id uuid references public.profiles(id) on delete cascade not null,
  team_id uuid references public.teams(id) on delete set null,
  score integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.tournaments
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.teams
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.matches
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.scores
  for each row
  execute procedure public.handle_updated_at();

-- Create RLS policies

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Tournaments policies
create policy "Tournaments are viewable by everyone"
  on public.tournaments for select
  using (true);

create policy "Admins can create tournaments"
  on public.tournaments for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Admins can update tournaments"
  on public.tournaments for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Tournament players policies
create policy "Tournament players are viewable by everyone"
  on public.tournament_players for select
  using (true);

create policy "Admins can manage tournament players"
  on public.tournament_players for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Teams policies
create policy "Teams are viewable by everyone"
  on public.teams for select
  using (true);

create policy "Admins can manage teams"
  on public.teams for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Matches policies
create policy "Matches are viewable by everyone"
  on public.matches for select
  using (true);

create policy "Admins can manage matches"
  on public.matches for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Scores policies
create policy "Scores are viewable by everyone"
  on public.scores for select
  using (true);

create policy "Players can insert their own scores"
  on public.scores for insert
  with check (
    auth.uid() = player_id
    and exists (
      select 1 from public.tournament_players
      where tournament_id = (
        select tournament_id from public.matches where id = match_id
      )
      and player_id = auth.uid()
    )
  );

create policy "Players can update their own scores"
  on public.scores for update
  using (
    auth.uid() = player_id
    and exists (
      select 1 from public.tournament_players
      where tournament_id = (
        select tournament_id from public.matches where id = match_id
      )
      and player_id = auth.uid()
    )
  );

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, role)
  values (
    new.id,
    split_part(new.email, '@', 1),
    'player'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 