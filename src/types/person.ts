export type TrainingStatus = "Complete" | "In Progress" | "Overdue" | "Not Started";
export type AccessReviewStatus = "Reviewed" | "Pending" | "Overdue";
export type BackgroundCheckStatus = "Cleared" | "Pending" | "In Progress" | "Not Required";

export interface Person {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  startDate: string;
  trainingStatus: TrainingStatus;
  trainingCompletionDate: string | null;
  trainingDueDate: string;
  accessReviewStatus: AccessReviewStatus;
  lastAccessReview: string | null;
  backgroundCheckStatus: BackgroundCheckStatus;
  mfaEnabled: boolean;
}
