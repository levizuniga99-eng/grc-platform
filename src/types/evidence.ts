export type EvidenceStatus = "Current" | "Expiring Soon" | "Expired" | "Pending Review";
export type EvidenceType = "Screenshot" | "Document" | "API" | "Automated" | "Certificate" | "Report";

export interface Evidence {
  id: string;
  name: string;
  description: string;
  type: EvidenceType;
  status: EvidenceStatus;
  controlIds: string[];
  uploadedBy: string;
  uploadedDate: string;
  expirationDate: string | null;
  fileSize: string;
  mimeType: string;
}
