
export interface UserData {
  name: string;
  phone: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserData;
  error?: string;
}

export class AuthService {
  private static readonly STORAGE_KEY = 'divs_user';
  private static readonly AUTH_KEY = 'divs_authenticated';

  static async sendOTP(phone: string): Promise<{ success: boolean; error?: string }> {
    // This would integrate with backend SMS service
    console.log(`Sending OTP to ${phone}`);
    return { success: true };
  }

  static async verifyOTP(phone: string, otp: string): Promise<{ success: boolean; error?: string }> {
    // This would integrate with backend OTP verification
    if (otp === "123456") {
      return { success: true };
    }
    return { success: false, error: "Invalid OTP" };
  }

  static async signup(userData: UserData, otp: string): Promise<AuthResponse> {
    const otpResult = await this.verifyOTP(userData.phone, otp);
    
    if (!otpResult.success) {
      return { success: false, error: otpResult.error };
    }

    // This would integrate with backend user creation
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(this.AUTH_KEY, 'true');
    
    return { success: true, user: userData };
  }

  static async login(phone: string, otp: string): Promise<AuthResponse> {
    const otpResult = await this.verifyOTP(phone, otp);
    
    if (!otpResult.success) {
      return { success: false, error: otpResult.error };
    }

    // This would integrate with backend user authentication
    const existingUser = this.getCurrentUser();
    if (existingUser && existingUser.phone === phone) {
      localStorage.setItem(this.AUTH_KEY, 'true');
      return { success: true, user: existingUser };
    }

    return { success: false, error: "User not found" };
  }

  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  static deleteAccount(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.AUTH_KEY);
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  static getCurrentUser(): UserData | null {
    const userData = localStorage.getItem(this.STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static updateUser(userData: UserData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
  }
}
