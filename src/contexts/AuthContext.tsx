
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, otp: string) => boolean;
  signup: (name: string, phone: string, otp: string) => boolean;
  sendOTP: (phone: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in localStorage
    const savedUser = localStorage.getItem('divs_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const sendOTP = (phone: string): boolean => {
    // Mock OTP send - in real app, this would send OTP via SMS
    if (phone && phone.length >= 10) {
      console.log(`Mock OTP sent to ${phone}: 123456`);
      return true;
    }
    return false;
  };

  const login = (phone: string, otp: string): boolean => {
    // Mock login with OTP verification - in real app, this would validate OTP
    if (phone && otp === '123456') {
      const existingUsers = JSON.parse(localStorage.getItem('divs_registered_users') || '[]');
      const existingUser = existingUsers.find((u: User) => u.phone === phone);
      
      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem('divs_user', JSON.stringify(existingUser));
        return true;
      }
    }
    return false;
  };

  const signup = (name: string, phone: string, otp: string): boolean => {
    // Mock signup with OTP verification
    if (name && phone && otp === '123456') {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        phone,
      };
      
      // Store user in registered users list
      const existingUsers = JSON.parse(localStorage.getItem('divs_registered_users') || '[]');
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('divs_registered_users', JSON.stringify(updatedUsers));
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('divs_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('divs_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      sendOTP,
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
