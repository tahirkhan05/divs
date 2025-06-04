
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { documentId, fileUrl, documentType } = await req.json()
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Simulate document verification using ML models
    console.log(`Processing document: ${documentId}, type: ${documentType}`)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock verification results (in real implementation, this would call actual ML models)
    const verificationResult = {
      status: Math.random() > 0.2 ? 'verified' : 'rejected', // 80% success rate
      confidence_score: 0.85 + Math.random() * 0.15, // 85-100% confidence
      extracted_data: {
        document_number: `DOC${Math.floor(Math.random() * 1000000)}`,
        full_name: "John Doe",
        date_of_birth: "1990-01-01",
        expiry_date: "2030-12-31",
        issuing_authority: "Government Authority"
      },
      blockchain_hash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      verification_metadata: {
        processing_time_ms: 2000,
        model_version: "v1.0.0",
        quality_score: 0.92,
        tampering_detected: false
      }
    }

    // Update document verification in database
    const { error } = await supabase
      .from('document_verifications')
      .update({
        status: verificationResult.status,
        confidence_score: verificationResult.confidence_score,
        extracted_data: verificationResult.extracted_data,
        blockchain_hash: verificationResult.blockchain_hash,
        verification_metadata: verificationResult.verification_metadata,
        verified_at: verificationResult.status === 'verified' ? new Date().toISOString() : null
      })
      .eq('id', documentId)

    if (error) {
      throw error
    }

    // Log activity
    const { data: { user } } = await supabase.auth.getUser(req.headers.get('Authorization')?.split(' ')[1] || '')
    if (user) {
      await supabase.from('activity_logs').insert({
        user_id: user.id,
        activity_type: 'document_verification',
        activity_description: `Document verification ${verificationResult.status} for ${documentType}`,
        metadata: { document_id: documentId, ...verificationResult.verification_metadata }
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        result: verificationResult
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in verify-document function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
