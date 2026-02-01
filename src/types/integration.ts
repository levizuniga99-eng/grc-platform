export type IntegrationStatus = "Connected" | "Available" | "Error" | "Syncing";
export type IntegrationCategory = "Cloud Provider" | "Identity Provider" | "Version Control" | "Communication" | "Project Management" | "HR" | "MDM" | "Security";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  iconName: string;
  lastSyncDate: string | null;
  connectedDate: string | null;
  dataCollected: string[];
  healthStatus: "Healthy" | "Degraded" | "Down" | "N/A";
}
