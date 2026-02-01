import { cn } from "@/lib/utils";

type StatusType =
  | "passing"
  | "satisfied"
  | "failing"
  | "not-satisfied"
  | "partial"
  | "needs-attention"
  | "needs-review"
  | "additional-evidence-needed"
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "not-applicable"
  | "open"
  | "in-progress"
  | "mitigated"
  | "accepted"
  | "draft"
  | "in-review"
  | "approved"
  | "needs-update"
  | "retired"
  | "healthy"
  | "degraded"
  | "disconnected";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { bg: string; text: string; defaultLabel: string }> = {
  passing: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", defaultLabel: "Passing" },
  satisfied: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", defaultLabel: "Satisfied" },
  failing: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", defaultLabel: "Failing" },
  "not-satisfied": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", defaultLabel: "Not Satisfied" },
  partial: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", defaultLabel: "Partial" },
  "needs-attention": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", defaultLabel: "Needs Attention" },
  "needs-review": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", defaultLabel: "Needs Review" },
  "additional-evidence-needed": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", defaultLabel: "Additional Evidence Needed" },
  critical: { bg: "bg-red-200 dark:bg-red-900/50", text: "text-red-800 dark:text-red-300", defaultLabel: "Critical" },
  high: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", defaultLabel: "High" },
  medium: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", defaultLabel: "Medium" },
  low: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", defaultLabel: "Low" },
  "not-applicable": { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400", defaultLabel: "N/A" },
  open: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", defaultLabel: "Open" },
  "in-progress": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", defaultLabel: "In Progress" },
  mitigated: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", defaultLabel: "Mitigated" },
  accepted: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", defaultLabel: "Accepted" },
  draft: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400", defaultLabel: "Draft" },
  "in-review": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", defaultLabel: "In Review" },
  approved: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", defaultLabel: "Approved" },
  "needs-update": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", defaultLabel: "Needs Update" },
  retired: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400", defaultLabel: "Retired" },
  healthy: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", defaultLabel: "Healthy" },
  degraded: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", defaultLabel: "Degraded" },
  disconnected: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", defaultLabel: "Disconnected" },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      {label ?? config.defaultLabel}
    </span>
  );
}

export function getStatusType(status: string): StatusType {
  const normalized = status.toLowerCase().replace(/\s+/g, "-");
  if (normalized in statusConfig) {
    return normalized as StatusType;
  }
  if (normalized === "partially-satisfied") return "partial";
  if (normalized === "not-implemented") return "needs-attention";
  if (normalized === "in-treatment") return "in-progress";
  if (normalized === "audit-ready") return "passing";
  if (normalized === "not-started") return "draft";
  if (normalized === "additional-evidence-needed") return "additional-evidence-needed";
  if (normalized === "needs-review") return "needs-review";
  return "not-applicable";
}
