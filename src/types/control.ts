export type ControlStatus = "Passing" | "Failing" | "Not Implemented" | "Needs Attention";
export type ControlCategory =
  | "Access Control"
  | "Data Protection"
  | "Network Security"
  | "Incident Response"
  | "Change Management"
  | "Business Continuity"
  | "Vulnerability Management"
  | "Logging & Monitoring"
  | "Endpoint Security"
  | "Physical Security"
  | "Human Resources"
  | "Risk Management";
export type ControlType = "Automated" | "Manual";

export interface Control {
  id: string;
  name: string;
  description: string;
  category: ControlCategory;
  status: ControlStatus;
  type: ControlType;
  owner: string;
  ownerEmail: string;
  frameworkIds: string[];
  evidenceIds: string[];
  lastTested: string;
  nextReview: string;
  testFrequency: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Annually";
  implementationDetails: string;
  failureReason?: string;
}
