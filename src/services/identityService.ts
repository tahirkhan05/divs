
export interface IdentityShareData {
  idOnly: boolean;
  addressInfo: boolean;
  financialData: boolean;
  fullAccess: boolean;
  expiryTime: string;
  verificationMethod: 'qr' | 'code';
}

export interface AccessCode {
  code: string;
  expiresAt: Date;
  permissions: IdentityShareData;
}

export interface VerificationResult {
  success: boolean;
  data?: any;
  error?: string;
}

export class IdentityService {
  static generateAccessCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async createIdentityShare(data: IdentityShareData): Promise<AccessCode> {
    // This would integrate with backend API
    const code = this.generateAccessCode();
    const expiresAt = this.calculateExpiryDate(data.expiryTime);
    
    return {
      code,
      expiresAt,
      permissions: data
    };
  }

  static async verifyAccessCode(code: string): Promise<VerificationResult> {
    // This would integrate with backend API
    // Mock verification for now
    if (code.length === 6) {
      return {
        success: Math.random() > 0.1, // 90% success rate
        data: {
          name: "Jane Smith",
          idNumber: "•••• •••• 4321",
          verifiedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      };
    }
    
    return {
      success: false,
      error: "Invalid access code"
    };
  }

  static calculateExpiryDate(expiryTime: string): Date {
    const now = new Date();
    switch (expiryTime) {
      case "1h":
        return new Date(now.getTime() + 1 * 60 * 60 * 1000);
      case "6h":
        return new Date(now.getTime() + 6 * 60 * 60 * 1000);
      case "24h":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case "7d":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case "30d":
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  static getExpiryLabel(expiryTime: string): string {
    switch (expiryTime) {
      case "1h": return "1 hour";
      case "6h": return "6 hours";
      case "24h": return "24 hours";
      case "7d": return "7 days";
      case "30d": return "30 days";
      default: return "24 hours";
    }
  }
}
