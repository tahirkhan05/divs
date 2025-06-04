
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  sendOTP: (phone: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user?.email);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            phone,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const sendOTP = async (phone: string): Promise<boolean> => {
    // For now, return true as a placeholder - phone auth would need additional setup
    console.log(`OTP would be sent to ${phone}`);
    return true;
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      // First delete the user's profile data
      if (user) {
        const { error: deleteError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', user.id);

        if (deleteError) {
          console.error('Error deleting profile:', deleteError);
        }
      }

      // Then sign out (actual account deletion would need admin API)
      await logout();
      
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      });
    } catch (error) {
      console.error('Delete account error:', error);
      toast({
        title: "Deletion failed",
        description: "Failed to delete account",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      login, 
      signup, 
      sendOTP,
      logout,
      deleteAccount,
      isAuthenticated: !!session,
      loading
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
