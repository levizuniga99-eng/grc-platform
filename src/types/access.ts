export type AccessReviewStatus = "Pending" | "Approved" | "Revoked" | "Expired";

export interface AccessReview {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  department: string;
  resource: string;
  resourceType: "Application" | "Database" | "Server" | "Repository" | "Cloud Service";
  accessLevel: "Read" | "Write" | "Admin" | "Owner";
  grantedDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
  status: AccessReviewStatus;
  reviewer: string;
  justification?: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
}

export interface AccessStats {
  totalAccessRights: number;
  pendingReviews: number;
  approvedThisMonth: number;
  revokedThisMonth: number;
  overdueReviews: number;
}
