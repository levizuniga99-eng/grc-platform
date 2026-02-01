import { DashboardMetrics, ActivityItem, TaskItem } from "@/types";

export const dashboardMetrics: DashboardMetrics = {
  overallComplianceScore: 82,
  totalControls: 16,
  acceptedControls: 11,
  evidenceNeededControls: 2,
  needsReviewControls: 2,
  notApplicableControls: 1,
  totalRisks: 23,
  criticalRisks: 2,
  highRisks: 5,
  openTasks: 12,
  completedTasks: 45,
  totalPolicies: 18,
  approvedPolicies: 15,
  totalEvidence: 156,
  currentEvidence: 142,
};

export const recentActivity: ActivityItem[] = [
  {
    id: "act-001",
    type: "control_accepted",
    title: "MFA Enforcement Control Accepted",
    description: "Automated check confirmed 100% MFA adoption across all user accounts",
    timestamp: "2026-01-31T09:15:00Z",
    actor: "System",
  },
  {
    id: "act-002",
    type: "evidence_uploaded",
    title: "Penetration Test Report Uploaded",
    description: "Q4 2025 external penetration test report has been uploaded",
    timestamp: "2026-01-30T16:42:00Z",
    actor: "Sarah Chen",
  },
  {
    id: "act-003",
    type: "risk_identified",
    title: "New Vendor Risk Identified",
    description: "Third-party payment processor requires security assessment",
    timestamp: "2026-01-30T14:20:00Z",
    actor: "Michael Torres",
  },
  {
    id: "act-004",
    type: "policy_approved",
    title: "Data Retention Policy Approved",
    description: "Updated data retention policy approved by compliance team",
    timestamp: "2026-01-30T11:05:00Z",
    actor: "Jennifer Wu",
  },
  {
    id: "act-005",
    type: "control_evidence_needed",
    title: "Backup Verification Needs Evidence",
    description: "Weekly backup restoration test did not complete successfully",
    timestamp: "2026-01-29T23:45:00Z",
    actor: "System",
  },
  {
    id: "act-006",
    type: "training_completed",
    title: "Security Training Completed",
    description: "15 employees completed annual security awareness training",
    timestamp: "2026-01-29T15:30:00Z",
    actor: "HR System",
  },
  {
    id: "act-007",
    type: "integration_synced",
    title: "AWS Integration Synced",
    description: "Asset inventory updated with 12 new EC2 instances",
    timestamp: "2026-01-29T08:00:00Z",
    actor: "System",
  },
  {
    id: "act-008",
    type: "vendor_reviewed",
    title: "Vendor Security Review Completed",
    description: "Annual security review completed for Datadog",
    timestamp: "2026-01-28T14:15:00Z",
    actor: "Alex Johnson",
  },
];

export const upcomingTasks: TaskItem[] = [
  {
    id: "task-001",
    title: "Complete vendor security questionnaire for Stripe",
    dueDate: "2026-02-01",
    priority: "High",
    assignee: "Sarah Chen",
    completed: false,
    category: "Vendors",
  },
  {
    id: "task-002",
    title: "Review and update access control policy",
    dueDate: "2026-02-03",
    priority: "High",
    assignee: "Michael Torres",
    completed: false,
    category: "Policies",
  },
  {
    id: "task-003",
    title: "Collect evidence for CC6.3 requirement",
    dueDate: "2026-02-05",
    priority: "Medium",
    assignee: "Jennifer Wu",
    completed: false,
    category: "Evidence",
  },
  {
    id: "task-004",
    title: "Schedule quarterly access review",
    dueDate: "2026-02-07",
    priority: "Medium",
    assignee: "Alex Johnson",
    completed: false,
    category: "Controls",
  },
  {
    id: "task-005",
    title: "Update disaster recovery runbook",
    dueDate: "2026-02-10",
    priority: "Low",
    assignee: "David Kim",
    completed: false,
    category: "Policies",
  },
  {
    id: "task-006",
    title: "Remediate backup verification failure",
    dueDate: "2026-02-02",
    priority: "High",
    assignee: "David Kim",
    completed: false,
    category: "Controls",
  },
];

export const controlsStatusData = [
  { name: "Accepted", value: 11, color: "#10b981" },
  { name: "Needs Review", value: 2, color: "#3b82f6" },
  { name: "Evidence Needed", value: 2, color: "#f59e0b" },
  { name: "Not Applicable", value: 1, color: "#6b7280" },
];

export const frameworksProgress = [
  { id: "soc2-type2", name: "SOC 2 Type II", progress: 87, status: "In Progress" },
  { id: "soc2-type1", name: "SOC 2 Type I", progress: 94, status: "Audit Ready" },
  { id: "hipaa", name: "HIPAA", progress: 78, status: "In Progress" },
  { id: "iso27001", name: "ISO 27001", progress: 65, status: "In Progress" },
  { id: "gdpr", name: "GDPR", progress: 58, status: "Not Started" },
];

export const risksBySeverity = [
  { severity: "Critical", count: 2, color: "#dc2626" },
  { severity: "High", count: 5, color: "#f97316" },
  { severity: "Medium", count: 9, color: "#eab308" },
  { severity: "Low", count: 7, color: "#3b82f6" },
];
