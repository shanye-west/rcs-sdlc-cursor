import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { auth } from '$lib/stores/auth';

export const load: LayoutLoad = async ({ url }) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  // Update auth store
  if (session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    auth.setUser({
      ...session.user,
      role: profile?.role
    });
  } else {
    auth.reset();
  }

  // Protect routes
  const isAuthPage = url.pathname === '/login';
  const isPublicPage = ['/', '/about'].includes(url.pathname);

  if (!session && !isPublicPage && !isAuthPage) {
    throw redirect(303, '/login');
  }

  if (session && isAuthPage) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    throw redirect(303, profile?.role === 'admin' ? '/admin' : '/dashboard');
  }

  return {
    session
  };
}; 