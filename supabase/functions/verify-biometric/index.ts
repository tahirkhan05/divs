
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
    
    // Update status to processing
    await supabase
      .from('biometric_verifications')
      .update({ status: 'processing' })
      .eq('id', biometricId)
    
    // Simulate DeepFace and ML processing pipeline
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock biometric verification results using DeepFace-like processing:
    // 1. Face detection (MTCNN, RetinaFace)
    // 2. Face recognition (FaceNet, VGG-Face, ArcFace)
    // 3. Liveness detection (eye blink, head movement)
    // 4. Anti-spoofing (texture analysis, depth estimation)
    
    let verificationResult
    
    if (biometricType === 'face') {
      const faceDetection = {
        faces_detected: 1,
        face_confidence: 0.96,
        landmark_points: 68,
        face_quality_score: 0.89
      }
      
      const livenessDetection = {
        eye_blink_detected: true,
        head_movement_score: 0.87,
        texture_analysis: 0.92,
        depth_estimation: 0.84
      }
      
      const antiSpoofing = {
        real_face_probability: 0.94,
        spoof_detection_confidence: 0.91,
        attacks_detected: []
      }
      
      verificationResult = {
        status: Math.random() > 0.15 ? 'verified' : 'rejected',
        confidence_score: 0.88 + Math.random() * 0.12,
        liveness_score: 0.90 + Math.random() * 0.10,
        blockchain_hash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        verification_metadata: {
          processing_time_ms: 3000,
          models_used: ['mtcnn', 'facenet', 'arcface'],
          face_detection: faceDetection,
          liveness_detection: livenessDetection,
          anti_spoofing: antiSpoofing,
          feature_vector_length: 128,
          processing_pipeline: [
            'face_detection',
            'landmark_extraction',
            'face_alignment',
            'feature_extraction',
            'liveness_detection',
            'anti_spoofing',
            'template_matching',
            'blockchain_registration'
          ]
        }
      }
    } else if (biometricType === 'fingerprint') {
      const minutiaeExtraction = {
        minutiae_count: 40,
        ridge_endings: 24,
        bifurcations: 16,
        quality_score: 0.87
      }
      
      const patternAnalysis = {
        pattern_type: 'loop',
        core_points: 1,
        delta_points: 1,
        ridge_count: 12
      }
      
      verificationResult = {
        status: Math.random() > 0.1 ? 'verified' : 'rejected',
        confidence_score: 0.92 + Math.random() * 0.08,
        liveness_score: null,
        blockchain_hash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        verification_metadata: {
          processing_time_ms: 3000,
          models_used: ['minutiae_extractor', 'pattern_classifier'],
          minutiae_extraction: minutiaeExtraction,
          pattern_analysis: patternAnalysis,
          feature_count: 40,
          processing_pipeline: [
            'image_enhancement',
            'binarization',
            'thinning',
            'minutiae_extraction',
            'pattern_classification',
            'template_generation',
            'matching',
            'blockchain_registration'
          ]
        }
      }
    } else {
      // Generic biometric processing
      verificationResult = {
        status: Math.random() > 0.2 ? 'verified' : 'rejected',
        confidence_score: 0.85 + Math.random() * 0.15,
        liveness_score: biometricType === 'voice' ? 0.88 + Math.random() * 0.12 : null,
        blockchain_hash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        verification_metadata: {
          processing_time_ms: 3000,
          models_used: ['generic_biometric_model'],
          feature_count: biometricType === 'voice' ? 64 : 32,
          processing_pipeline: [
            'preprocessing',
            'feature_extraction',
            'template_generation',
            'matching',
            'blockchain_registration'
          ]
        }
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
    const authHeader = req.headers.get('Authorization')
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const { data: { user } } = await supabase.auth.getUser(token)
      if (user) {
        await supabase.from('activity_logs').insert({
          user_id: user.id,
          activity_type: 'biometric_verification',
          activity_description: `Biometric verification ${verificationResult.status} for ${biometricType}`,
          metadata: { 
            biometric_id: biometricId, 
            confidence_score: verificationResult.confidence_score,
            ml_models: verificationResult.verification_metadata.models_used
          }
        })
      }
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
