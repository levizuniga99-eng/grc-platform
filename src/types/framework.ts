export type FrameworkId = "soc2-type1" | "soc2-type2" | "hipaa" | "iso27001" | "gdpr";

export interface Framework {
  id: FrameworkId;
  name: string;
  fullName: string;
  description: string;
  totalRequirements: number;
  satisfiedRequirements: number;
  readinessPercentage: number;
  status: "In Progress" | "Audit Ready" | "Not Started" | "Certified";
  lastAssessed: string;
  nextAuditDate: string | null;
  categories: FrameworkCategory[];
}

export interface FrameworkCategory {
  id: string;
  name: string;
  description: string;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  frameworkId: FrameworkId;
  referenceCode: string;
  title: string;
  description: string;
  status: "Satisfied" | "Partially Satisfied" | "Not Satisfied" | "Not Applicable";
  mappedControlIds: string[];
  evidenceIds: string[];
}
