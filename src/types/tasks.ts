export interface ControlMessage {
  id: string;
  controlId: string;
  type: "comment" | "status_change" | "evidence_request";
  content: string;
  author: string;
  authorEmail: string;
  authorRole: "client" | "auditor";
  timestamp: string;
  mentions?: string[]; // Team member names mentioned
  previousStatus?: string;
  newStatus?: string;
}

export interface ControlTask {
  id: string;
  controlId: string;
  controlName: string;
  requestedBy: string;
  requestedByRole: "client" | "auditor";
  requestMessage: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  assignedTo?: string;
}
