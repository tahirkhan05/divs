
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type SecurityScore = Database['public']['Tables']['security_scores']['Row'];

export const securityScoreService = {
  async calculateAndUpdateScore(): Promise<number | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase.rpc('calculate_security_score', {
        user_uuid: user.id
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error calculating security score:', error);
      return null;
    }
  },

  async getUserSecurityScore(): Promise<SecurityScore | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('security_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('calculated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user security score:', error);
      return null;
    }
  }
};
