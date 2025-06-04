
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
    const { biometricId, biometricType, templateHash } = await req.json()
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log(`Processing biometric: ${biometricId}, type: ${biometricType}`)
    
    // Simulate biometric verification using DeepFace/ML models
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock biometric verification results
    const verificationResult = {
      status: Math.random() > 0.15 ? 'verified' : 'rejected', // 85% success rate
      confidence_score: 0.88 + Math.random() * 0.12, // 88-100% confidence
      liveness_score: biometricType === 'face' ? 0.90 + Math.random() * 0.10 : null,
      blockchain_hash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      verification_metadata: {
        processing_time_ms: 3000,
        model_version: "deepface_v2.0.0",
        quality_score: 0.94,
        feature_count: biometricType === 'fingerprint' ? 40 : biometricType === 'face' ? 128 : 64,
        anti_spoofing_score: 0.96
      }
    }

    // Update biometric verification in database
    const { error } = await supabase
      .from('biometric_verifications')
      .update({
        status: verificationResult.status,
        confidence_score: verificationResult.confidence_score,
        liveness_score: verificationResult.liveness_score,
        blockchain_hash: verificationResult.blockchain_hash,
        verification_metadata: verificationResult.verification_metadata,
        verified_at: verificationResult.status === 'verified' ? new Date().toISOString() : null
      })
      .eq('id', biometricId)

    if (error) {
      throw error
    }

    // Log activity
    const { data: { user } } = await supabase.auth.getUser(req.headers.get('Authorization')?.split(' ')[1] || '')
    if (user) {
      await supabase.from('activity_logs').insert({
        user_id: user.id,
        activity_type: 'biometric_verification',
        activity_description: `Biometric verification ${verificationResult.status} for ${biometricType}`,
        metadata: { biometric_id: biometricId, ...verificationResult.verification_metadata }
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
    console.error('Error in verify-biometric function:', error)
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
