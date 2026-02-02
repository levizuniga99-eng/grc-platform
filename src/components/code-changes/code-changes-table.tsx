"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CodeChange } from "@/lib/mock-data/code-changes";
import { DataTable } from "@/components/shared/data-table";
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
import {
  GitPullRequest,
  User,
  Calendar,
  Server,
  CheckCircle2,
  XCircle,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeChangesTableProps {
  changes: CodeChange[];
}

const statusColors: Record<string, string> = {
  "Pending Review": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Approved": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Deployed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Rejected": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Rolled Back": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const riskColors: Record<string, string> = {
  "Low": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Medium": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "High": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Critical": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const typeColors: Record<string, string> = {
  "Feature": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Bug Fix": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Security Patch": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Configuration": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Infrastructure": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const columns: ColumnDef<CodeChange>[] = [
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
    header: "Change",
    cell: ({ row }) => (
      <div className="max-w-[250px]">
        <p className="font-medium truncate">{row.getValue("title")}</p>
        <p className="text-xs text-muted-foreground truncate">
          {row.original.ticketId} • {row.original.repository}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${typeColors[type]}`}>
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "riskLevel",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.getValue("riskLevel") as string;
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${riskColors[risk]}`}>
          {risk}
        </span>
      );
    },
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
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("author")}</span>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const reviewer = row.getValue("reviewer") as string | null;
      return (
        <span className="text-sm text-muted-foreground">
          {reviewer || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "environment",
    header: "Environment",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("environment")}</Badge>
    ),
  },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("createdDate")), "MMM d, yyyy")}
      </span>
    ),
  },
];

const statuses = ["Pending Review", "Approved", "Deployed", "Rejected", "Rolled Back"];
const types = ["Feature", "Bug Fix", "Security Patch", "Configuration", "Infrastructure"];
const riskLevels = ["Low", "Medium", "High", "Critical"];

export function CodeChangesTable({ changes }: CodeChangesTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selectedChange, setSelectedChange] = useState<CodeChange | null>(null);

  const filteredChanges = changes.filter((change) => {
    if (statusFilter !== "all" && change.status !== statusFilter) return false;
    if (typeFilter !== "all" && change.type !== typeFilter) return false;
    if (riskFilter !== "all" && change.riskLevel !== riskFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
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
          <SelectTrigger className="w-[160px]">
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

        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Risk Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            {riskLevels.map((risk) => (
              <SelectItem key={risk} value={risk}>
                {risk}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredChanges}
        searchPlaceholder="Search changes..."
        onRowClick={(change) => setSelectedChange(change)}
      />

      <Sheet open={!!selectedChange} onOpenChange={(open) => !open && setSelectedChange(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedChange && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-mono text-muted-foreground">
                    {selectedChange.id}
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${typeColors[selectedChange.type]}`}>
                    {selectedChange.type}
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${riskColors[selectedChange.riskLevel]}`}>
                    {selectedChange.riskLevel} Risk
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusColors[selectedChange.status]}`}>
                    {selectedChange.status}
                  </span>
                </div>
                <SheetTitle className="text-left">{selectedChange.title}</SheetTitle>
                <SheetDescription className="text-left">
                  {selectedChange.description}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Repository:</span>
                      <span>{selectedChange.repository}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Author:</span>
                      <span>{selectedChange.author}</span>
                    </div>
                    {selectedChange.reviewer && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Reviewer:</span>
                        <span>{selectedChange.reviewer}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Environment:</span>
                      <Badge variant="outline">{selectedChange.environment}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Created:</span>
                      <span>{format(new Date(selectedChange.createdDate), "MMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                    {selectedChange.approvedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Approved:</span>
                        <span>{format(new Date(selectedChange.approvedDate), "MMM d, yyyy 'at' h:mm a")}</span>
                      </div>
                    )}
                    {selectedChange.deployedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Deployed:</span>
                        <span>{format(new Date(selectedChange.deployedDate), "MMM d, yyyy 'at' h:mm a")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Compliance Checks</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      {selectedChange.testsPassed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>Tests {selectedChange.testsPassed ? "Passed" : "Failed"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {selectedChange.securityReview ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-amber-500" />
                      )}
                      <span>Security Review {selectedChange.securityReview ? "Completed" : "Pending"}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Affected Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChange.affectedSystems.map((system) => (
                      <Badge key={system} variant="secondary">
                        <Shield className="h-3 w-3 mr-1" />
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">References</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
                      <a href={selectedChange.pullRequestUrl} target="_blank" rel="noopener noreferrer">
                        <GitPullRequest className="h-4 w-4" />
                        View Pull Request
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <span className="font-mono">{selectedChange.ticketId}</span>
                      <span className="text-muted-foreground">- View Ticket</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
