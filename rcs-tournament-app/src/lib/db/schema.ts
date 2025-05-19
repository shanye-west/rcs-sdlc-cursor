import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

// Users and Authentication
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  pinHash: text('pin_hash').notNull(),
  role: text('role').notNull().default('player'), // 'admin' or 'player'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Tournaments
export const tournaments = pgTable('tournaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  year: integer('year').notNull(),
  location: text('location').notNull(),
  format: text('format').notNull(), // 'scramble', 'shamble', 'best_ball', 'match_play'
  isPublic: boolean('is_public').default(false).notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Teams
export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id').references(() => tournaments.id).notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Players (Team Members)
export const players = pgTable('players', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id').references(() => teams.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  fullName: text('full_name').notNull(),
  handicap: integer('handicap'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Rounds
export const rounds = pgTable('rounds', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id').references(() => tournaments.id).notNull(),
  format: text('format').notNull(), // 'scramble', 'shamble', 'best_ball', 'match_play'
  sequence: integer('sequence').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Matches
export const matches = pgTable('matches', {
  id: uuid('id').primaryKey().defaultRandom(),
  roundId: uuid('round_id').references(() => rounds.id).notNull(),
  teamAId: uuid('team_a_id').references(() => teams.id).notNull(),
  teamBId: uuid('team_b_id').references(() => teams.id).notNull(),
  scheduledAt: timestamp('scheduled_at').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'in_progress', 'completed'
  winnerId: uuid('winner_id').references(() => teams.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Scores
export const scores = pgTable('scores', {
  id: uuid('id').primaryKey().defaultRandom(),
  matchId: uuid('match_id').references(() => matches.id).notNull(),
  playerId: uuid('player_id').references(() => players.id).notNull(),
  pointsAwarded: integer('points_awarded').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Bets
export const bets = pgTable('bets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  matchId: uuid('match_id').references(() => matches.id).notNull(),
  betType: text('bet_type').notNull(), // 'match_winner', 'player_performance'
  amount: integer('amount').notNull(),
  odds: integer('odds').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'won', 'lost'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}); 