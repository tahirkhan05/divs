
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface OTPResponse {
  success: boolean;
  error?: string;
}

// Helper function to get user display info from Supabase user
export const getUserDisplayInfo = (user: User | null) => {
  if (!user) return { name: '', email: '', phone: '' };
  
  return {
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    phone: user.user_metadata?.phone || '',
    avatar: user.user_metadata?.avatar_url || null
  };
};
