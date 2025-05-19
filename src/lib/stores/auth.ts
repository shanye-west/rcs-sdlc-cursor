import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: 'admin' | 'player';
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthUser | null>(null);

  return {
    subscribe,
    setUser: (user: AuthUser | null) => set(user),
    updateUser: (data: Partial<AuthUser>) => update(user => user ? { ...user, ...data } : null),
    reset: () => set(null)
  };
}

export const auth = createAuthStore(); 