"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Control, ControlStatus } from "@/types";
import { DataTable } from "@/components/shared/data-table";
import { ControlFilters } from "./control-filters";
import { ControlDetailPanel } from "./control-detail-panel";
import { ControlStatusSelect } from "./control-status-select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ControlsTableProps {
  controls: Control[];
}

export function ControlsTable({ controls: initialControls }: ControlsTableProps) {
  const [controls, setControls] = useState<Control[]>(initialControls);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const handleStatusChange = (controlId: string, newStatus: ControlStatus) => {
    setControls((prev) =>
      prev.map((control) =>
        control.id === controlId
          ? { ...control, status: newStatus }
          : control
      )
    );
    // Also update the selected control if it's open
    if (selectedControl?.id === controlId) {
      setSelectedControl((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

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
        const control = row.original;
        return (
          <ControlStatusSelect
            value={control.status}
            onValueChange={(newStatus) => handleStatusChange(control.id, newStatus)}
          />
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
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
