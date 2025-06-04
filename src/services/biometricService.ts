
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type BiometricVerification = Database['public']['Tables']['biometric_verifications']['Row'];
type BiometricInsert = Database['public']['Tables']['biometric_verifications']['Insert'];

export const biometricService = {
  async uploadBiometricData(file: File, biometricType: string): Promise<{ fileUrl: string; templateHash: string } | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${biometricType}_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('biometric-data')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('biometric-data')
        .getPublicUrl(fileName);

      // Generate a mock template hash (in real implementation, this would be from ML processing)
      const templateHash = `hash_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      return {
        fileUrl: publicUrl,
        templateHash
      };
    } catch (error) {
      console.error('Error uploading biometric data:', error);
      return null;
    }
  },

  async createVerification(biometricData: Omit<BiometricInsert, 'user_id'>): Promise<BiometricVerification | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('biometric_verifications')
        .insert({
          ...biometricData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating biometric verification:', error);
      return null;
    }
  },

  async getUserBiometrics(): Promise<BiometricVerification[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('biometric_verifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user biometrics:', error);
      return [];
    }
  },

  async updateVerificationStatus(id: string, status: string, confidenceScore?: number, livenessScore?: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('biometric_verifications')
        .update({
          status: status as any,
          confidence_score: confidenceScore,
          liveness_score: livenessScore,
          verified_at: status === 'verified' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating biometric verification status:', error);
      return false;
    }
  }
};
