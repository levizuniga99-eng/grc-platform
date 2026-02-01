export type RiskSeverity = "Critical" | "High" | "Medium" | "Low";
export type RiskStatus = "Open" | "In Treatment" | "Mitigated" | "Accepted";
export type RiskLikelihood = 1 | 2 | 3 | 4 | 5;
export type RiskImpact = 1 | 2 | 3 | 4 | 5;
export type RiskCategory = "Operational" | "Technical" | "Compliance" | "Strategic" | "Financial" | "Reputational";

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  severity: RiskSeverity;
  status: RiskStatus;
  likelihood: RiskLikelihood;
  impact: RiskImpact;
  riskScore: number;
  owner: string;
  ownerEmail: string;
  treatmentPlan: string;
  mitigatingControls: string[];
  dateIdentified: string;
  dueDate: string;
  lastReviewed: string;
  residualRisk?: RiskSeverity;
}
