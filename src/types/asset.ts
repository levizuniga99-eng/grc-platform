export type AssetType = "Server" | "Endpoint" | "Application" | "Database" | "Network Device" | "Cloud Resource";
export type AssetStatus = "Active" | "Inactive" | "Decommissioned" | "Under Maintenance";
export type AssetClassification = "Critical" | "High" | "Medium" | "Low";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  classification: AssetClassification;
  owner: string;
  department: string;
  ipAddress?: string;
  operatingSystem?: string;
  location: string;
  lastScanDate: string;
  vulnerabilities: number;
  description: string;
}
