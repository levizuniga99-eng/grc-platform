import { ControlMessage, ControlTask } from "@/types/tasks";

export const controlMessages: ControlMessage[] = [
  {
    id: "msg-001",
    controlId: "CTL-001",
    type: "status_change",
    content: "Control status changed",
    author: "Sarah Johnson",
    authorEmail: "sarah@audit.com",
    authorRole: "auditor",
    timestamp: "2026-01-15T10:30:00Z",
    previousStatus: "Needs Review",
    newStatus: "Additional Evidence Needed",
  },
  {
    id: "msg-002",
    controlId: "CTL-001",
    type: "evidence_request",
    content: "Please provide documentation showing the access control policy was reviewed and approved by management within the last 12 months. Include sign-off dates and approver names.",
    author: "Sarah Johnson",
    authorEmail: "sarah@audit.com",
    authorRole: "auditor",
    timestamp: "2026-01-15T10:31:00Z",
  },
  {
    id: "msg-003",
    controlId: "CTL-001",
    type: "comment",
    content: "@John Smith Can you help locate the policy approval documentation?",
    author: "Emily Davis",
    authorEmail: "emily@company.com",
    authorRole: "client",
    timestamp: "2026-01-15T14:00:00Z",
    mentions: ["John Smith"],
  },
  {
    id: "msg-004",
    controlId: "CTL-002",
    type: "status_change",
    content: "Control status changed",
    author: "James Taylor",
    authorEmail: "james@audit.com",
    authorRole: "auditor",
    timestamp: "2026-01-20T09:00:00Z",
    previousStatus: "Needs Review",
    newStatus: "Accepted",
  },
];

export const controlTasks: ControlTask[] = [
  {
    id: "task-001",
    controlId: "CTL-001",
    controlName: "Access Control Policy",
    requestedBy: "Sarah Johnson",
    requestedByRole: "auditor",
    requestMessage: "Please provide documentation showing the access control policy was reviewed and approved by management within the last 12 months. Include sign-off dates and approver names.",
    status: "open",
    createdAt: "2026-01-15T10:31:00Z",
    updatedAt: "2026-01-15T10:31:00Z",
    assignedTo: "John Smith",
  },
];
