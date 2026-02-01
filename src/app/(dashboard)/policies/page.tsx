"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { policies } from "@/lib/mock-data/policies";
import { Policy } from "@/types";
import { format } from "date-fns";
import { CheckCircle, Clock, FileEdit, Archive } from "lucide-react";

const columns: ColumnDef<Policy>[] = [
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
    header: "Policy",
    cell: ({ row }) => (
      <div className="max-w-[250px]">
        <p className="font-medium truncate">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground truncate">
          {row.original.department} &middot; v{row.original.version}
        </p>
      </div>
    ),
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
    accessorKey: "approvedDate",
    header: "Approved",
    cell: ({ row }) => {
      const date = row.getValue("approvedDate") as string | null;
      return (
        <span className="text-sm text-muted-foreground">
          {date ? format(new Date(date), "MMM d, yyyy") : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "nextReviewDate",
    header: "Next Review",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("nextReviewDate")), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "frameworkIds",
    header: "Frameworks",
    cell: ({ row }) => {
      const frameworks = row.getValue("frameworkIds") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {frameworks.slice(0, 2).map((id) => (
            <Badge key={id} variant="outline" className="text-xs">
              {id}
            </Badge>
          ))}
          {frameworks.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{frameworks.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
];

export default function PoliciesPage() {
  const approvedCount = policies.filter((p) => p.status === "Approved").length;
  const inReviewCount = policies.filter((p) => p.status === "In Review").length;
  const needsUpdateCount = policies.filter((p) => p.status === "Needs Update").length;
  const draftCount = policies.filter((p) => p.status === "Draft").length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Risk Management", href: "/risks" },
          { label: "Policies" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Policies</h1>
          <p className="text-muted-foreground mt-1">
            Manage organizational policies and track their review status.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inReviewCount}</p>
                  <p className="text-sm text-muted-foreground">In Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <FileEdit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{needsUpdateCount}</p>
                  <p className="text-sm text-muted-foreground">Needs Update</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                  <Archive className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{draftCount}</p>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          columns={columns}
          data={policies}
          searchPlaceholder="Search policies..."
        />
      </div>
    </>
  );
}
