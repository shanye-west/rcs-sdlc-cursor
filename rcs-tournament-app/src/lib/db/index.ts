import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL environment variable is not set');
}

// Create the connection
const connectionString = databaseUrl;
const client = postgres(connectionString);

// Create the database instance
export const db = drizzle(client, { schema });

// Export types
export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;
export type Tournament = typeof schema.tournaments.$inferSelect;
export type NewTournament = typeof schema.tournaments.$inferInsert;
export type Team = typeof schema.teams.$inferSelect;
export type NewTeam = typeof schema.teams.$inferInsert;
export type Player = typeof schema.players.$inferSelect;
export type NewPlayer = typeof schema.players.$inferInsert;
export type Round = typeof schema.rounds.$inferSelect;
export type NewRound = typeof schema.rounds.$inferInsert;
export type Match = typeof schema.matches.$inferSelect;
export type NewMatch = typeof schema.matches.$inferInsert;
export type Score = typeof schema.scores.$inferSelect;
export type NewScore = typeof schema.scores.$inferInsert;
export type Bet = typeof schema.bets.$inferSelect;
export type NewBet = typeof schema.bets.$inferInsert;
