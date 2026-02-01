"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Control } from "@/types";
import { DataTable } from "@/components/shared/data-table";
import { ControlFilters } from "./control-filters";
import { ControlDetailPanel } from "./control-detail-panel";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ControlsTableProps {
  controls: Control[];
}

const columns: ColumnDef<Control>[] = [
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
    header: "Control",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <p className="font-medium truncate">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground truncate">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="whitespace-nowrap">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <StatusBadge status={getStatusType(status)} label={status} />
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("type")}</Badge>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("owner")}</span>
    ),
  },
  {
    accessorKey: "lastTested",
    header: "Last Tested",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("lastTested")), "MMM d, yyyy")}
      </span>
    ),
  },
];

export function ControlsTable({ controls }: ControlsTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const filteredControls = controls.filter((control) => {
    if (statusFilter !== "all" && control.status !== statusFilter) {
      return false;
    }
    if (categoryFilter !== "all" && control.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <ControlFilters
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
      />

      <DataTable
        columns={columns}
        data={filteredControls}
        searchPlaceholder="Search controls..."
        onRowClick={(control) => setSelectedControl(control)}
      />

      <ControlDetailPanel
        control={selectedControl}
        open={!!selectedControl}
        onOpenChange={(open) => !open && setSelectedControl(null)}
      />
    </div>
  );
}
