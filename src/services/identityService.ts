
import { ApiClient } from './apiClient';
import { Validators } from '@/utils/validators';
import { EXPIRY_OPTIONS, VERIFICATION_METHODS } from '@/constants';
import { IdentityShareData, AccessCode, VerificationResult, IdentityShare } from '@/types/identity';

export class IdentityService {
  static generateAccessCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async createIdentityShare(data: IdentityShareData): Promise<AccessCode> {
    // Validate data
    if (!data.idOnly && !data.addressInfo && !data.financialData && !data.fullAccess) {
      throw new Error('At least one permission must be selected');
    }

    const code = this.generateAccessCode();
    const expiresAt = this.calculateExpiryDate(data.expiryTime);
    
    const accessCode: AccessCode = {
      code,
      expiresAt,
      permissions: data
    };

    // This would integrate with backend API
    console.log('Creating identity share:', accessCode);
    
    return accessCode;
  }

  static async verifyAccessCode(code: string): Promise<VerificationResult> {
    const codeValidation = Validators.accessCode(code);
    
    if (!codeValidation.valid) {
      return {
        success: false,
        error: codeValidation.error
      };
    }

    // This would integrate with backend API
    // Mock verification for now
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({
            success: true,
            data: {
              name: "Jane Smith",
              idNumber: "•••• •••• 4321",
              verifiedAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }
          });
        } else {
          resolve({
            success: false,
            error: "Invalid or expired access code"
          });
        }
      }, 2000);
    });
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
    const option = EXPIRY_OPTIONS.find(opt => opt.value === expiryTime);
    return option ? option.label : "24 hours";
  }

  static async getIdentityShares(): Promise<IdentityShare[]> {
    // This would fetch from backend API
    // Mock data for now
    return [];
  }

  static async revokeIdentityShare(shareId: string): Promise<boolean> {
    // This would integrate with backend API
    console.log('Revoking identity share:', shareId);
    return true;
  }
}
