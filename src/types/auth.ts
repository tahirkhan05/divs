
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
