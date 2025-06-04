
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type DocumentVerification = Database['public']['Tables']['document_verifications']['Row'];
type DocumentInsert = Database['public']['Tables']['document_verifications']['Insert'];

export const documentService = {
  async uploadDocument(file: File, documentType: string): Promise<{ fileUrl: string; fileName: string } | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      return {
        fileUrl: publicUrl,
        fileName: file.name
      };
    } catch (error) {
      console.error('Error uploading document:', error);
      return null;
    }
  },

  async createVerification(documentData: Omit<DocumentInsert, 'user_id'>): Promise<DocumentVerification | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('document_verifications')
        .insert({
          ...documentData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating document verification:', error);
      return null;
    }
  },

  async getUserDocuments(): Promise<DocumentVerification[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('document_verifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user documents:', error);
      return [];
    }
  },

  async updateVerificationStatus(id: string, status: string, metadata?: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('document_verifications')
        .update({
          status: status as any,
          verification_metadata: metadata,
          verified_at: status === 'verified' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating verification status:', error);
      return false;
    }
  }
};
