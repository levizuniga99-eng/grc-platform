export type PolicyStatus = "Draft" | "In Review" | "Approved" | "Needs Update" | "Retired";

export interface Policy {
  id: string;
  name: string;
  description: string;
  status: PolicyStatus;
  version: string;
  owner: string;
  ownerEmail: string;
  department: string;
  approvedDate: string | null;
  nextReviewDate: string;
  lastUpdated: string;
  frameworkIds: string[];
}
