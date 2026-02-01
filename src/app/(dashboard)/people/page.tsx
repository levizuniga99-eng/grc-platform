"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { people } from "@/lib/mock-data/people";
import { Person } from "@/types";
import { Users, GraduationCap, Shield, AlertTriangle, CheckCircle } from "lucide-react";

const trainingStatusColors: Record<string, string> = {
  Complete: "passing",
  "In Progress": "in-progress",
  Overdue: "failing",
  "Not Started": "draft",
};

const accessStatusColors: Record<string, string> = {
  Reviewed: "passing",
  Pending: "needs-attention",
  Overdue: "failing",
};

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("department")}</Badge>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("role")}</span>
    ),
  },
  {
    accessorKey: "trainingStatus",
    header: "Training",
    cell: ({ row }) => {
      const status = row.getValue("trainingStatus") as string;
      return (
        <StatusBadge
          status={trainingStatusColors[status] as "passing" | "in-progress" | "failing" | "draft"}
          label={status}
        />
      );
    },
  },
  {
    accessorKey: "accessReviewStatus",
    header: "Access Review",
    cell: ({ row }) => {
      const status = row.getValue("accessReviewStatus") as string;
      return (
        <StatusBadge
          status={accessStatusColors[status] as "passing" | "needs-attention" | "failing"}
          label={status}
        />
      );
    },
  },
  {
    accessorKey: "mfaEnabled",
    header: "MFA",
    cell: ({ row }) => {
      const enabled = row.getValue("mfaEnabled") as boolean;
      return enabled ? (
        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
      );
    },
  },
  {
    accessorKey: "backgroundCheckStatus",
    header: "Background Check",
    cell: ({ row }) => {
      const status = row.getValue("backgroundCheckStatus") as string;
      let statusType: "passing" | "in-progress" | "needs-attention" | "not-applicable" = "not-applicable";
      if (status === "Cleared") statusType = "passing";
      else if (status === "In Progress") statusType = "in-progress";
      else if (status === "Pending") statusType = "needs-attention";
      return <StatusBadge status={statusType} label={status} />;
    },
  },
];

export default function PeoplePage() {
  const totalPeople = people.length;
  const trainingComplete = people.filter((p) => p.trainingStatus === "Complete").length;
  const trainingOverdue = people.filter((p) => p.trainingStatus === "Overdue").length;
  const accessOverdue = people.filter((p) => p.accessReviewStatus === "Overdue").length;
  const mfaDisabled = people.filter((p) => !p.mfaEnabled).length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Organization", href: "/people" },
          { label: "People" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">People</h1>
          <p className="text-muted-foreground mt-1">
            Track employee compliance status including training, access reviews, and security requirements.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalPeople}</p>
                  <p className="text-sm text-muted-foreground">Total People</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{trainingComplete}</p>
                  <p className="text-sm text-muted-foreground">Training Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{trainingOverdue}</p>
                  <p className="text-sm text-muted-foreground">Training Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accessOverdue}</p>
                  <p className="text-sm text-muted-foreground">Access Review Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mfaDisabled}</p>
                  <p className="text-sm text-muted-foreground">MFA Disabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          columns={columns}
          data={people}
          searchPlaceholder="Search people..."
        />
      </div>
    </>
  );
}
