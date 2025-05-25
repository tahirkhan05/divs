
export interface IdentityPermissions {
  idOnly: boolean;
  addressInfo: boolean;
  financialData: boolean;
  fullAccess: boolean;
}

export interface IdentityShare {
  id: string;
  code?: string;
  qrData?: string;
  permissions: IdentityPermissions;
  expiryTime: string;
  expiresAt: Date;
  verificationMethod: 'qr' | 'code';
  createdAt: Date;
  usedAt?: Date;
}

export interface VerificationRequest {
  code?: string;
  qrData?: string;
}

export interface VerificationResponse {
  success: boolean;
  data?: {
    name: string;
    idNumber: string;
    address?: string;
    financialInfo?: string;
    verifiedAt: string;
    expiresAt: string;
  };
  error?: string;
}
