import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { error } from '@sveltejs/kit';
import type { User } from '$lib/db';

// Constants
const SALT_ROUNDS = 10;
const PIN_LENGTH = 4;

// Types
export type AuthUser = Omit<User, 'pinHash'>;

// Helper functions
export function validatePin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

export async function hashPin(pin: string): Promise<string> {
  if (!validatePin(pin)) {
    throw error(400, 'PIN must be exactly 4 digits');
  }
  return bcrypt.hash(pin, SALT_ROUNDS);
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

// Authentication functions
export async function authenticateUser(username: string, pin: string): Promise<AuthUser> {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  });

  if (!user) {
    throw error(401, 'Invalid username or PIN');
  }

  const isValid = await verifyPin(pin, user.pinHash);
  if (!isValid) {
    throw error(401, 'Invalid username or PIN');
  }

  // Return user without the pin hash
  const { pinHash, ...authUser } = user;
  return authUser;
}

export async function createUser(username: string, pin: string, role: 'admin' | 'player' = 'player'): Promise<AuthUser> {
  // Check if username already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  });

  if (existingUser) {
    throw error(400, 'Username already exists');
  }

  // Hash the PIN
  const pinHash = await hashPin(pin);

  // Create the user
  const [user] = await db.insert(users).values({
    username,
    pinHash,
    role
  }).returning();

  // Return user without the pin hash
  const { pinHash: _, ...authUser } = user;
  return authUser;
}

export async function updateUserPin(userId: string, newPin: string): Promise<void> {
  const pinHash = await hashPin(newPin);
  await db.update(users)
    .set({ pinHash, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

export async function getUserById(userId: string): Promise<AuthUser | null> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  });

  if (!user) {
    return null;
  }

  const { pinHash, ...authUser } = user;
  return authUser;
}

export async function getUserByUsername(username: string): Promise<AuthUser | null> {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  });

  if (!user) {
    return null;
  }

  const { pinHash, ...authUser } = user;
  return authUser;
} 