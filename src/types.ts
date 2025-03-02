export interface RecyclabilityResult {
  recyclable: boolean;
  confidence: number;
  materials: Material[];
  disposalInstructions: string;
  environmentalImpact: string;
}

export interface Material {
  name: string;
  recyclable: boolean;
  percentage: number;
}

export interface ScanHistory {
  id: string;
  timestamp: Date;
  imageUrl: string;
  result: RecyclabilityResult;
  deviceName?: string;
}