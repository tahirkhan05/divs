
// Re-export all types from other type files
export * from './auth';
export * from './identity';

// Common types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Verification related types
export interface VerificationDocument {
  id: string;
  type: 'passport' | 'drivers_license' | 'national_id';
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: Date;
  verifiedAt?: Date;
}

export interface BiometricData {
  id: string;
  type: 'fingerprint' | 'face' | 'voice';
  status: 'pending' | 'verified' | 'rejected';
  enrolledAt: Date;
  verifiedAt?: Date;
}

export interface BusinessVerification {
  id: string;
  businessName: string;
  registrationNumber: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: Date;
  verifiedAt?: Date;
}

export interface SecurityScore {
  overall: number;
  identity: number;
  biometric: number;
  document: number;
  business?: number;
  lastUpdated: Date;
}
