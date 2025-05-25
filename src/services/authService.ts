
import { ApiClient } from './apiClient';
import { Validators } from '@/utils/validators';
import { STORAGE_KEYS, API_ENDPOINTS } from '@/constants';
import { User, AuthResponse, LoginCredentials, SignupCredentials } from '@/types/auth';

export class AuthService {
  static async sendOTP(phone: string): Promise<{ success: boolean; error?: string }> {
    const phoneValidation = Validators.phone(phone);
    if (!phoneValidation.valid) {
      return { success: false, error: phoneValidation.error };
    }

    // This would integrate with backend SMS service
    console.log(`Sending OTP to ${phone}`);
    
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }

  static async verifyOTP(phone: string, otp: string): Promise<{ success: boolean; error?: string }> {
    const phoneValidation = Validators.phone(phone);
    const otpValidation = Validators.otp(otp);

    if (!phoneValidation.valid) {
      return { success: false, error: phoneValidation.error };
    }

    if (!otpValidation.valid) {
      return { success: false, error: otpValidation.error };
    }

    // Mock OTP verification
    if (otp === "123456") {
      return { success: true };
    }
    return { success: false, error: "Invalid OTP" };
  }

  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const nameValidation = Validators.name(credentials.name);
    const emailValidation = Validators.email(credentials.email);
    
    if (!nameValidation.valid) {
      return { success: false, error: nameValidation.error };
    }

    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    const otpResult = await this.verifyOTP(credentials.phone, credentials.otp);
    
    if (!otpResult.success) {
      return { success: false, error: otpResult.error };
    }

    const userData: User = {
      name: credentials.name,
      phone: credentials.phone,
      email: credentials.email,
    };

    // Store user data
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    
    // Store in registered users list
    const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
    const userWithId = { ...userData, id: Date.now().toString() };
    const updatedUsers = [...existingUsers, userWithId];
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    
    return { success: true, user: userData };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const otpResult = await this.verifyOTP(credentials.phone, credentials.otp);
    
    if (!otpResult.success) {
      return { success: false, error: otpResult.error };
    }

    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
    const existingUser = existingUsers.find((u: any) => u.phone === credentials.phone);
    
    if (existingUser) {
      const userData: User = {
        name: existingUser.name,
        phone: existingUser.phone,
        email: existingUser.email,
      };
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return { success: true, user: userData };
    }

    return { success: false, error: "User not found. Please sign up first." };
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  static deleteAccount(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      // Remove from registered users
      const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
      const updatedUsers = existingUsers.filter((u: any) => u.phone !== currentUser.phone);
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    }
    
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }

  static getCurrentUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  }

  static updateUser(userData: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    
    // Update in registered users list
    const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
    const updatedUsers = existingUsers.map((u: any) => 
      u.phone === userData.phone ? { ...u, ...userData } : u
    );
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
  }
}
