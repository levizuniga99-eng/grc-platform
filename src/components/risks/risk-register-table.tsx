"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Risk } from "@/types";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { User, Calendar, Shield } from "lucide-react";

interface RiskRegisterTableProps {
  risks: Risk[];
}

const severityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const columns: ColumnDef<Risk>[] = [
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
    accessorKey: "title",
    header: "Risk",
    cell: ({ row }) => (
      <div className="max-w-[250px]">
        <p className="font-medium truncate">{row.getValue("title")}</p>
        <p className="text-xs text-muted-foreground truncate">
          {row.original.category}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as string;
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${severityColors[severity]}`}>
          {severity}
        </span>
      );
    },
  },
  {
    accessorKey: "riskScore",
    header: "Score",
    cell: ({ row }) => {
      const score = row.getValue("riskScore") as number;
      return (
        <div className="text-center">
          <span className="font-bold">{score}</span>
          <span className="text-xs text-muted-foreground block">
            {row.original.likelihood}×{row.original.impact}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={getStatusType(status)} label={status} />;
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("owner")}</span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("dueDate")), "MMM d, yyyy")}
      </span>
    ),
  },
];

const severities = ["Critical", "High", "Medium", "Low"];
const statuses = ["Open", "In Treatment", "Mitigated", "Accepted"];
const categories = ["Operational", "Technical", "Compliance", "Strategic", "Financial", "Reputational"];

export function RiskRegisterTable({ risks }: RiskRegisterTableProps) {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const filteredRisks = risks.filter((risk) => {
    if (severityFilter !== "all" && risk.severity !== severityFilter) return false;
    if (statusFilter !== "all" && risk.status !== statusFilter) return false;
    if (categoryFilter !== "all" && risk.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Severities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            {severities.map((severity) => (
              <SelectItem key={severity} value={severity}>
                {severity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
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

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredRisks}
        searchPlaceholder="Search risks..."
        onRowClick={(risk) => setSelectedRisk(risk)}
      />

      <Sheet open={!!selectedRisk} onOpenChange={(open) => !open && setSelectedRisk(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedRisk && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-muted-foreground">
                    {selectedRisk.id}
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${severityColors[selectedRisk.severity]}`}>
                    {selectedRisk.severity}
                  </span>
                  <StatusBadge status={getStatusType(selectedRisk.status)} label={selectedRisk.status} />
                </div>
                <SheetTitle className="text-left">{selectedRisk.title}</SheetTitle>
                <SheetDescription className="text-left">
                  {selectedRisk.description}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Risk Assessment</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <p className="text-2xl font-bold">{selectedRisk.likelihood}</p>
                      <p className="text-xs text-muted-foreground">Likelihood</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <p className="text-2xl font-bold">{selectedRisk.impact}</p>
                      <p className="text-xs text-muted-foreground">Impact</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <p className="text-2xl font-bold">{selectedRisk.riskScore}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                  {selectedRisk.residualRisk && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Residual Risk: <span className="font-medium">{selectedRisk.residualRisk}</span>
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="secondary">{selectedRisk.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRisk.owner}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {format(new Date(selectedRisk.dueDate), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Treatment Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedRisk.treatmentPlan}
                  </p>
                </div>

                {selectedRisk.mitigatingControls.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-3">Mitigating Controls</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRisk.mitigatingControls.map((controlId) => (
                          <Badge key={controlId} variant="outline">
                            <Shield className="h-3 w-3 mr-1" />
                            {controlId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
