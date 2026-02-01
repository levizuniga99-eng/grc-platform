"use client";

import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Control, ControlStatus } from "@/types";
import { DataTable } from "@/components/shared/data-table";
import { ControlFilters } from "./control-filters";
import { ControlDetailPanel } from "./control-detail-panel";
import { ControlStatusSelect } from "./control-status-select";
import { ControlsImportExport } from "./controls-import-export";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { frameworks } from "@/lib/mock-data/frameworks";

const STORAGE_KEY = "grc-controls";

interface ControlsTableProps {
  controls: Control[];
}

function loadSavedControls(): Control[] | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveControls(controls: Control[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
  } catch {
    // Ignore storage errors
  }
}

// Build a mapping of control IDs to their framework criteria
function buildControlCriteriaMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();

  frameworks.forEach((framework) => {
    framework.categories.forEach((category) => {
      category.requirements.forEach((requirement) => {
        requirement.mappedControlIds.forEach((controlId) => {
          const existing = map.get(controlId) || [];
          if (!existing.includes(requirement.referenceCode)) {
            existing.push(requirement.referenceCode);
          }
          map.set(controlId, existing);
        });
      });
    });
  });

  return map;
}

// Get SOC 2 Type II categories for filter
function getSOC2Categories(): { id: string; name: string }[] {
  const soc2 = frameworks.find((f) => f.id === "soc2-type2");
  if (!soc2) return [];

  return soc2.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }));
}

// Parse criteria code to get sort values (e.g., "CC1.2" -> { category: 1, requirement: 2 })
function parseCriteriaCode(code: string): { category: number; requirement: number } {
  const match = code.match(/CC(\d+)\.(\d+)/);
  if (match) {
    return { category: parseInt(match[1]), requirement: parseInt(match[2]) };
  }
  return { category: 999, requirement: 999 };
}

// Get the primary (lowest) criteria code for sorting
function getPrimaryCriteria(criteria: string[]): string {
  if (!criteria || criteria.length === 0) return "ZZ99.99";

  const sorted = [...criteria].sort((a, b) => {
    const parsedA = parseCriteriaCode(a);
    const parsedB = parseCriteriaCode(b);
    if (parsedA.category !== parsedB.category) {
      return parsedA.category - parsedB.category;
    }
    return parsedA.requirement - parsedB.requirement;
  });

  return sorted[0];
}

export function ControlsTable({ controls: initialControls }: ControlsTableProps) {
  const [controls, setControls] = useState<Control[]>(initialControls);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [criteriaFilter, setCriteriaFilter] = useState("all");
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const controlCriteriaMap = useMemo(() => buildControlCriteriaMap(), []);
  const soc2Categories = useMemo(() => getSOC2Categories(), []);

  // Load saved controls on mount
  useEffect(() => {
    const savedControls = loadSavedControls();
    if (savedControls && savedControls.length > 0) {
      setControls(savedControls);
    }
  }, []);

  const handleStatusChange = (controlId: string, newStatus: ControlStatus) => {
    setControls((prev) => {
      const updated = prev.map((control) =>
        control.id === controlId
          ? { ...control, status: newStatus }
          : control
      );
      saveControls(updated);
      return updated;
    });

    if (selectedControl?.id === controlId) {
      setSelectedControl((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  const handleImport = (importedControls: Control[]) => {
    setControls(importedControls);
    saveControls(importedControls);
  };

  const columns: ColumnDef<Control>[] = [
    {
      id: "criteria",
      header: "Criteria",
      cell: ({ row }) => {
        const criteria = controlCriteriaMap.get(row.original.id) || [];
        if (criteria.length === 0) {
          return <span className="text-xs text-muted-foreground">—</span>;
        }
        // Sort criteria in numerical order
        const sortedCriteria = [...criteria].sort((a, b) => {
          const parsedA = parseCriteriaCode(a);
          const parsedB = parseCriteriaCode(b);
          if (parsedA.category !== parsedB.category) {
            return parsedA.category - parsedB.category;
          }
          return parsedA.requirement - parsedB.requirement;
        });
        return (
          <div className="flex flex-wrap gap-1">
            {sortedCriteria.slice(0, 3).map((code) => (
              <Badge key={code} variant="outline" className="font-mono text-xs">
                {code}
              </Badge>
            ))}
            {sortedCriteria.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{sortedCriteria.length - 3}
              </Badge>
            )}
          </div>
        );
      },
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

  // Filter and sort controls
  const filteredAndSortedControls = useMemo(() => {
    let result = controls.filter((control) => {
      if (statusFilter !== "all" && control.status !== statusFilter) {
        return false;
      }
      if (categoryFilter !== "all" && control.category !== categoryFilter) {
        return false;
      }
      if (criteriaFilter !== "all") {
        const criteria = controlCriteriaMap.get(control.id) || [];
        // Check if any criteria starts with the selected category prefix (e.g., "CC1")
        const categoryPrefix = criteriaFilter.replace("soc2-", "").toUpperCase();
        const hasCriteria = criteria.some((c) => c.startsWith(categoryPrefix));
        if (!hasCriteria) {
          return false;
        }
      }
      return true;
    });

    // Sort by SOC 2 criteria in numerical order
    result = result.sort((a, b) => {
      const criteriaA = controlCriteriaMap.get(a.id) || [];
      const criteriaB = controlCriteriaMap.get(b.id) || [];
      const primaryA = getPrimaryCriteria(criteriaA);
      const primaryB = getPrimaryCriteria(criteriaB);
      const parsedA = parseCriteriaCode(primaryA);
      const parsedB = parseCriteriaCode(primaryB);

      if (parsedA.category !== parsedB.category) {
        return parsedA.category - parsedB.category;
      }
      return parsedA.requirement - parsedB.requirement;
    });

    return result;
  }, [controls, statusFilter, categoryFilter, criteriaFilter, controlCriteriaMap]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-wrap gap-3">
          <ControlFilters
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            onStatusChange={setStatusFilter}
            onCategoryChange={setCategoryFilter}
          />
          <Select value={criteriaFilter} onValueChange={setCriteriaFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="All Criteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Criteria</SelectItem>
              {soc2Categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ControlsImportExport controls={controls} onImport={handleImport} />
      </div>

      <DataTable
        columns={columns}
        data={filteredAndSortedControls}
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
