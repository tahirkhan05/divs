
export const APP_CONFIG = {
  name: 'DIVS',
  fullName: 'Decentralized Identity Verification System',
  version: '1.0.0',
  description: 'Secure • Decentralized • Verified',
} as const;

export const STORAGE_KEYS = {
  USER: 'divs_user',
  AUTH: 'divs_authenticated',
  REGISTERED_USERS: 'divs_registered_users',
  THEME: 'divs_theme',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    DELETE_ACCOUNT: '/auth/delete-account',
  },
  IDENTITY: {
    CREATE_SHARE: '/identity/create-share',
    VERIFY_ACCESS: '/identity/verify-access',
    GET_SHARES: '/identity/shares',
  },
  VERIFICATION: {
    UPLOAD_DOCUMENT: '/verification/documents',
    GET_DOCUMENTS: '/verification/documents',
    ENROLL_BIOMETRIC: '/verification/biometric',
    GET_BIOMETRIC: '/verification/biometric',
    SUBMIT_BUSINESS: '/verification/business',
    GET_BUSINESS: '/verification/business',
    GET_SECURITY_SCORE: '/verification/security-score',
  },
  STORAGE: {
    UPLOAD: '/storage/upload',
    DELETE: '/storage/delete',
  },
} as const;

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

export const BIOMETRIC_TYPES = {
  FINGERPRINT: 'fingerprint',
  FACE: 'face',
  VOICE: 'voice',
} as const;

export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license',
  NATIONAL_ID: 'national_id',
} as const;

export const EXPIRY_OPTIONS = [
  { value: '1h', label: '1 hour' },
  { value: '6h', label: '6 hours' },
  { value: '24h', label: '24 hours' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
] as const;

export const VERIFICATION_METHODS = {
  QR: 'qr',
  CODE: 'code',
} as const;

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_DOCUMENT_TYPES: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ],
  ALLOWED_IMAGE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/webp',
  ],
} as const;
