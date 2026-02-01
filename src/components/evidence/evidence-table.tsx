"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Evidence } from "@/types";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  FileText,
  Image,
  FileJson,
  FileSpreadsheet,
  Download,
  Eye,
} from "lucide-react";

interface EvidenceTableProps {
  evidence: Evidence[];
  actions?: React.ReactNode;
}

const typeIcons: Record<string, typeof FileText> = {
  Document: FileText,
  Screenshot: Image,
  Automated: FileJson,
  API: FileJson,
  Report: FileSpreadsheet,
  Certificate: FileText,
};

const columns: ColumnDef<Evidence>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Evidence",
    cell: ({ row }) => {
      const TypeIcon = typeIcons[row.original.type] || FileText;
      return (
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-muted p-2">
            <TypeIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="max-w-[250px]">
            <p className="font-medium truncate">{row.getValue("name")}</p>
            <p className="text-xs text-muted-foreground truncate">
              {row.original.description}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("type")}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let statusType: "passing" | "needs-attention" | "failing" | "in-review";
      switch (status) {
        case "Current":
          statusType = "passing";
          break;
        case "Expiring Soon":
          statusType = "needs-attention";
          break;
        case "Expired":
          statusType = "failing";
          break;
        case "Pending Review":
          statusType = "in-review";
          break;
        default:
          statusType = "passing";
      }
      return <StatusBadge status={statusType} label={status} />;
    },
  },
  {
    accessorKey: "uploadedBy",
    header: "Uploaded By",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("uploadedBy")}</span>
    ),
  },
  {
    accessorKey: "uploadedDate",
    header: "Uploaded",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("uploadedDate")), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "expirationDate",
    header: "Expires",
    cell: ({ row }) => {
      const date = row.getValue("expirationDate") as string | null;
      return (
        <span className="text-sm text-muted-foreground">
          {date ? format(new Date(date), "MMM d, yyyy") : "Never"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View evidence">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Download evidence">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

const statuses = ["Current", "Expiring Soon", "Expired", "Pending Review"];
const types = ["Screenshot", "Document", "API", "Automated", "Certificate", "Report", "Population"];

export function EvidenceTable({ evidence, actions }: EvidenceTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredEvidence = evidence.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }
    if (typeFilter !== "all" && item.type !== typeFilter) {
      return false;
    }
    return true;
  });

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

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredEvidence}
        searchPlaceholder="Search evidence..."
        actions={actions}
      />
    </div>
  );
}
