
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
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

  const login = (email: string, password: string): boolean => {
    // Mock login - in real app, this would validate against backend
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
      };
      setUser(mockUser);
      localStorage.setItem('divs_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Mock signup - in real app, this would create user in backend
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      setUser(mockUser);
      localStorage.setItem('divs_user', JSON.stringify(mockUser));
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
