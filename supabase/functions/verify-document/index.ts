
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

    console.log(`Processing document: ${documentId}, type: ${documentType}`)
    
    // Update status to processing
    await supabase
      .from('document_verifications')
      .update({ status: 'processing' })
      .eq('id', documentId)

    // Simulate ML processing pipeline similar to referenced repositories
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock ML results based on document processing pipeline:
    // 1. U-Net segmentation (midv-500-models, ID-Card-Segmentation)
    // 2. OCR text extraction (tensorflow/pytorch models)
    // 3. Document authenticity verification
    // 4. Quality assessment (IDcard-visibility-classifier)
    
    const segmentationResult = {
      document_detected: true,
      segmentation_confidence: 0.95,
      corners_detected: true,
      perspective_corrected: true
    }
    
    const ocrResult = {
      text_regions: [
        { type: 'name', text: 'John Doe', confidence: 0.97 },
        { type: 'document_number', text: `DOC${Math.floor(Math.random() * 1000000)}`, confidence: 0.94 },
        { type: 'date_of_birth', text: '1990-01-01', confidence: 0.92 },
        { type: 'expiry_date', text: '2030-12-31', confidence: 0.89 }
      ],
      overall_ocr_confidence: 0.93
    }
    
    const authenticityCheck = {
      security_features_detected: ['watermark', 'microprint', 'hologram'],
      tampering_detected: false,
      authenticity_score: 0.91
    }
    
    const qualityAssessment = {
      visibility_score: 0.88,
      blur_detection: 0.12,
      lighting_quality: 0.85,
      angle_deviation: 2.3
    }

    // Determine overall verification result
    const overallConfidence = (
      segmentationResult.segmentation_confidence * 0.2 +
      ocrResult.overall_ocr_confidence * 0.3 +
      authenticityCheck.authenticity_score * 0.3 +
      qualityAssessment.visibility_score * 0.2
    )
    
    const verificationResult = {
      status: overallConfidence > 0.85 ? 'verified' : 'rejected',
      confidence_score: overallConfidence,
      extracted_data: {
        full_name: ocrResult.text_regions.find(r => r.type === 'name')?.text || '',
        document_number: ocrResult.text_regions.find(r => r.type === 'document_number')?.text || '',
        date_of_birth: ocrResult.text_regions.find(r => r.type === 'date_of_birth')?.text || '',
        expiry_date: ocrResult.text_regions.find(r => r.type === 'expiry_date')?.text || '',
        issuing_authority: "Government Authority"
      },
      blockchain_hash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      verification_metadata: {
        processing_time_ms: 2000,
        ml_models_used: ['unet_midv500', 'tesseract_ocr', 'tensorflow_authenticity'],
        segmentation: segmentationResult,
        ocr_results: ocrResult,
        authenticity_check: authenticityCheck,
        quality_assessment: qualityAssessment,
        processing_pipeline: [
          'document_detection',
          'segmentation',
          'perspective_correction',
          'ocr_extraction',
          'authenticity_verification',
          'quality_assessment',
          'blockchain_registration'
        ]
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
    const authHeader = req.headers.get('Authorization')
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const { data: { user } } = await supabase.auth.getUser(token)
      if (user) {
        await supabase.from('activity_logs').insert({
          user_id: user.id,
          activity_type: 'document_verification',
          activity_description: `Document verification ${verificationResult.status} for ${documentType}`,
          metadata: { 
            document_id: documentId, 
            confidence_score: verificationResult.confidence_score,
            ml_pipeline: verificationResult.verification_metadata.processing_pipeline
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
