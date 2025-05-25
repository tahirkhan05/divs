
export interface User {
  name: string;
  phone: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface LoginCredentials {
  phone: string;
  otp: string;
}

export interface SignupCredentials {
  name: string;
  phone: string;
  email: string;
  otp: string;
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
