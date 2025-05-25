
export class Validators {
  static email(email: string): { valid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }
    
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    
    return { valid: true };
  }

  static phone(phone: string): { valid: boolean; error?: string } {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    
    if (!phone) {
      return { valid: false, error: 'Phone number is required' };
    }
    
    if (!phoneRegex.test(phone)) {
      return { valid: false, error: 'Please enter a valid phone number' };
    }
    
    return { valid: true };
  }

  static otp(otp: string): { valid: boolean; error?: string } {
    if (!otp) {
      return { valid: false, error: 'OTP is required' };
    }
    
    if (otp.length !== 6) {
      return { valid: false, error: 'OTP must be 6 digits' };
    }
    
    if (!/^\d{6}$/.test(otp)) {
      return { valid: false, error: 'OTP must contain only numbers' };
    }
    
    return { valid: true };
  }

  static accessCode(code: string): { valid: boolean; error?: string } {
    if (!code) {
      return { valid: false, error: 'Access code is required' };
    }
    
    if (code.length !== 6) {
      return { valid: false, error: 'Access code must be 6 digits' };
    }
    
    if (!/^\d{6}$/.test(code)) {
      return { valid: false, error: 'Access code must contain only numbers' };
    }
    
    return { valid: true };
  }

  static name(name: string): { valid: boolean; error?: string } {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: 'Name is required' };
    }
    
    if (name.trim().length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters' };
    }
    
    return { valid: true };
  }

  static businessRegistration(regNumber: string): { valid: boolean; error?: string } {
    if (!regNumber || regNumber.trim().length === 0) {
      return { valid: false, error: 'Business registration number is required' };
    }
    
    if (regNumber.trim().length < 5) {
      return { valid: false, error: 'Registration number must be at least 5 characters' };
    }
    
    return { valid: true };
  }
}
