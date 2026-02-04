export interface AuditClient {
  id: string;
  organizationName: string;
  scopeName: string;
  auditName: string;
  framework: string;
  status: "In Progress" | "Pending Review" | "Completed" | "Not Started";
  progress: number;
  controlsTotal: number;
  controlsPassing: number;
  lastActivity: string;
  auditor: string;
  auditPeriodStart: string;
  auditPeriodEnd: string;
  finalReportId?: string;
}

export const auditClients: AuditClient[] = [
  {
    id: "AUD-001",
    organizationName: "Acme Corporation",
    scopeName: "Cloud Platform",
    auditName: "SOC 2 Type II 2024",
    framework: "SOC 2 Type II",
    status: "In Progress",
    progress: 72,
    controlsTotal: 64,
    controlsPassing: 46,
    lastActivity: "2024-01-15T10:30:00Z",
    auditor: "Sarah Chen",
    auditPeriodStart: "2025-01-01",
    auditPeriodEnd: "2025-12-31",
  },
];
