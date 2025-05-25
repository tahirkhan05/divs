
import { ApiClient } from './apiClient';

export interface UploadResult {
  url: string;
  fileName: string;
  size: number;
  type: string;
}

export class StorageService {
  static async uploadFile(file: File, path?: string): Promise<UploadResult> {
    // Mock implementation - replace with actual storage service
    console.log('Uploading file:', { name: file.name, size: file.size, path });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: URL.createObjectURL(file),
          fileName: file.name,
          size: file.size,
          type: file.type,
        });
      }, 1000);
    });
  }

  static async deleteFile(url: string): Promise<boolean> {
    console.log('Deleting file:', url);
    return true;
  }

  static async getFileUrl(path: string): Promise<string> {
    // Mock implementation
    return `https://storage.example.com/${path}`;
  }

  static validateFile(file: File, options: {
    maxSize?: number;
    allowedTypes?: string[];
  } = {}): { valid: boolean; error?: string } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options; // 10MB default

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
      };
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`,
      };
    }

    return { valid: true };
  }
}
