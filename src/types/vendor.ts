export type VendorRiskRating = "Critical" | "High" | "Medium" | "Low";
export type VendorStatus = "Approved" | "Under Review" | "Pending" | "Rejected";
export type VendorCategory = "Cloud Infrastructure" | "SaaS Application" | "Data Processor" | "IT Services" | "Security" | "HR & Payroll" | "Payment Processing";

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  riskRating: VendorRiskRating;
  status: VendorStatus;
  dataAccess: string[];
  complianceCertifications: string[];
  contactName: string;
  contactEmail: string;
  contractStartDate: string;
  contractEndDate: string;
  lastAssessmentDate: string;
  nextReviewDate: string;
  description: string;
}
