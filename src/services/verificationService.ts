
import { ApiClient } from './apiClient';
import { VerificationDocument, BiometricData, BusinessVerification, SecurityScore } from '@/types';

export class VerificationService {
  // Document Verification
  static async uploadDocument(file: File, type: string) {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);

    // Mock implementation - replace with actual API call
    console.log('Uploading document:', { file: file.name, type });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Date.now().toString(),
            type,
            status: 'pending',
            uploadedAt: new Date(),
          },
        });
      }, 2000);
    });
  }

  static async getDocuments(): Promise<VerificationDocument[]> {
    // Mock implementation
    return [
      {
        id: '1',
        type: 'passport',
        status: 'verified',
        uploadedAt: new Date('2024-01-15'),
        verifiedAt: new Date('2024-01-16'),
      },
    ];
  }

  // Biometric Verification
  static async enrollBiometric(type: string, data: any) {
    console.log('Enrolling biometric:', { type, data });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: Math.random() > 0.2, // 80% success rate
          data: {
            id: Date.now().toString(),
            type,
            status: 'verified',
            enrolledAt: new Date(),
            verifiedAt: new Date(),
          },
        });
      }, 3000);
    });
  }

  static async getBiometricData(): Promise<BiometricData[]> {
    // Mock implementation
    return [
      {
        id: '1',
        type: 'fingerprint',
        status: 'verified',
        enrolledAt: new Date('2024-01-10'),
        verifiedAt: new Date('2024-01-10'),
      },
    ];
  }

  // Business Verification
  static async submitBusinessVerification(data: {
    businessName: string;
    registrationNumber: string;
    documents: File[];
  }) {
    console.log('Submitting business verification:', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Date.now().toString(),
            businessName: data.businessName,
            registrationNumber: data.registrationNumber,
            status: 'pending',
            submittedAt: new Date(),
          },
        });
      }, 2000);
    });
  }

  static async getBusinessVerifications(): Promise<BusinessVerification[]> {
    // Mock implementation
    return [];
  }

  // Security Score
  static async getSecurityScore(): Promise<SecurityScore> {
    // Mock implementation
    return {
      overall: 85,
      identity: 90,
      biometric: 80,
      document: 85,
      lastUpdated: new Date(),
    };
  }
}
