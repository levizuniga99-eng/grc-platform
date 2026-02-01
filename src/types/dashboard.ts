export interface DashboardMetrics {
  overallComplianceScore: number;
  totalControls: number;
  passingControls: number;
  failingControls: number;
  needsAttentionControls: number;
  totalRisks: number;
  criticalRisks: number;
  highRisks: number;
  openTasks: number;
  completedTasks: number;
  totalPolicies: number;
  approvedPolicies: number;
  totalEvidence: number;
  currentEvidence: number;
}

export interface ActivityItem {
  id: string;
  type: "control_passed" | "control_failed" | "risk_identified" | "policy_approved" | "evidence_uploaded" | "training_completed" | "vendor_reviewed" | "integration_synced";
  title: string;
  description: string;
  timestamp: string;
  actor: string;
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  completed: boolean;
  category: string;
}
