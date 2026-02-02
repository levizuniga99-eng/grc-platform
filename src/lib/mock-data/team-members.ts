export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "auditor" | "viewer";
  status: "active" | "pending";
}

export const teamMembers: TeamMember[] = [
  { id: "1", name: "John Smith", email: "john@company.com", role: "admin", status: "active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@company.com", role: "admin", status: "active" },
  { id: "3", name: "Mike Chen", email: "mike@company.com", role: "viewer", status: "active" },
  { id: "4", name: "Emily Davis", email: "emily@company.com", role: "admin", status: "active" },
  { id: "5", name: "David Wilson", email: "david@company.com", role: "viewer", status: "active" },
  { id: "6", name: "Lisa Anderson", email: "lisa@company.com", role: "admin", status: "active" },
  { id: "7", name: "James Taylor", email: "james@audit.com", role: "auditor", status: "active" },
  { id: "8", name: "Jennifer Brown", email: "jennifer@audit.com", role: "auditor", status: "active" },
];

// Get non-auditor team members (for control owners)
export const getControlOwners = () => {
  return teamMembers.filter((member) => member.role !== "auditor" && member.status === "active");
};
