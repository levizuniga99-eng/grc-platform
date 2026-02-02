"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { AuditClient } from "@/lib/mock-data/audits";
import { DataTable } from "@/components/shared/data-table";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, formatDistanceToNow } from "date-fns";
import { Building2, Calendar, ArrowRight } from "lucide-react";
import { useSettings } from "@/contexts/settings-context";

interface AuditsTableProps {
  audits: AuditClient[];
}

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Pending Review": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Completed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Not Started": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const columns: ColumnDef<AuditClient>[] = [
  {
    accessorKey: "organizationName",
    header: "Client",
    cell: ({ row }) => (
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-muted p-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">{row.getValue("organizationName")}</p>
          <p className="text-xs text-muted-foreground">{row.original.scopeName}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "auditName",
    header: "Audit",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("auditName")}</p>
        <p className="text-xs text-muted-foreground">{row.original.framework}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      const passing = row.original.controlsPassing;
      const total = row.original.controlsTotal;
      return (
        <div className="w-32">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">{passing}/{total} controls</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      );
    },
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActivity"));
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        {format(new Date(row.getValue("dueDate")), "MMM d, yyyy")}
      </div>
    ),
  },
  {
    id: "action",
    header: "",
    cell: () => (
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    ),
  },
];

const statuses = ["In Progress", "Pending Review", "Completed", "Not Started"];

export function AuditsTable({ audits }: AuditsTableProps) {
  const router = useRouter();
  const { settings } = useSettings();
  const [statusFilter, setStatusFilter] = useState("all");

  // Override audit data with current settings
  const auditsWithSettings = useMemo(() => {
    return audits.map((audit) => ({
      ...audit,
      organizationName: settings.organizationName,
      scopeName: settings.scopeName,
      auditName: settings.auditName,
    }));
  }, [audits, settings]);

  const filteredAudits = auditsWithSettings.filter((audit) => {
    if (statusFilter !== "all" && audit.status !== statusFilter) return false;
    return true;
  });

  const handleRowClick = () => {
    // Navigate to the dashboard/client portal for this audit
    router.push("/dashboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredAudits}
        searchPlaceholder="Search clients or audits..."
        onRowClick={handleRowClick}
      />
    </div>
  );
}
