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
  dueDate: string;
}

export const auditClients: AuditClient[] = [
  {
    id: "AUD-001",
    organizationName: "TechCorp Inc.",
    scopeName: "Cloud Platform",
    auditName: "SOC 2 Type II 2024",
    framework: "SOC 2 Type II",
    status: "In Progress",
    progress: 72,
    controlsTotal: 64,
    controlsPassing: 46,
    lastActivity: "2024-01-15T10:30:00Z",
    auditor: "Sarah Chen",
    dueDate: "2024-03-15",
  },
  {
    id: "AUD-002",
    organizationName: "FinanceFlow Ltd.",
    scopeName: "Payment Gateway",
    auditName: "SOC 2 Type II Annual",
    framework: "SOC 2 Type II",
    status: "Pending Review",
    progress: 95,
    controlsTotal: 64,
    controlsPassing: 61,
    lastActivity: "2024-01-14T16:45:00Z",
    auditor: "Sarah Chen",
    dueDate: "2024-02-28",
  },
  {
    id: "AUD-003",
    organizationName: "HealthData Systems",
    scopeName: "Patient Portal",
    auditName: "SOC 2 + HIPAA 2024",
    framework: "SOC 2 Type II",
    status: "In Progress",
    progress: 45,
    controlsTotal: 64,
    controlsPassing: 29,
    lastActivity: "2024-01-13T09:15:00Z",
    auditor: "Sarah Chen",
    dueDate: "2024-04-30",
  },
  {
    id: "AUD-004",
    organizationName: "RetailMax Corp",
    scopeName: "E-Commerce Platform",
    auditName: "SOC 2 Type II Q1",
    framework: "SOC 2 Type II",
    status: "Not Started",
    progress: 0,
    controlsTotal: 64,
    controlsPassing: 0,
    lastActivity: "2024-01-10T14:00:00Z",
    auditor: "Sarah Chen",
    dueDate: "2024-05-15",
  },
  {
    id: "AUD-005",
    organizationName: "CloudSecure Inc.",
    scopeName: "Infrastructure Services",
    auditName: "SOC 2 Type II Renewal",
    framework: "SOC 2 Type II",
    status: "Completed",
    progress: 100,
    controlsTotal: 64,
    controlsPassing: 64,
    lastActivity: "2024-01-08T11:30:00Z",
    auditor: "Sarah Chen",
    dueDate: "2024-01-15",
  },
  {
    id: "AUD-006",
    organizationName: "DataVault Solutions",
    scopeName: "Backup Services",
    auditName: "SOC 2 Type II 2024",
    framework: "SOC 2 Type II",
    status: "In Progress",
    progress: 58,
    controlsTotal: 64,
    controlsPassing: 37,
    lastActivity: "2024-01-12T08:20:00Z",
    auditor: "Sarah Chen",
    dueDate: "2024-03-31",
  },
];
