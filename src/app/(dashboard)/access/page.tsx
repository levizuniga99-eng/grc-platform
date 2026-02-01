"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { accessReviews, accessStats } from "@/lib/mock-data/access";
import { AccessReview } from "@/types/access";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
} from "lucide-react";

const columns: ColumnDef<AccessReview>[] = [
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.userName}</p>
        <p className="text-xs text-muted-foreground">{row.original.userEmail}</p>
      </div>
    ),
  },
  {
    accessorKey: "resource",
    header: "Resource",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.resource}</p>
        <Badge variant="outline" className="text-xs mt-1">
          {row.original.resourceType}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "accessLevel",
    header: "Access Level",
    cell: ({ row }) => {
      const level = row.original.accessLevel;
      const variant = level === "Owner" || level === "Admin" ? "default" : "secondary";
      return <Badge variant={variant}>{level}</Badge>;
    },
  },
  {
    accessorKey: "riskLevel",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.original.riskLevel;
      return (
        <StatusBadge
          status={getStatusType(risk)}
          label={risk}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusMap: Record<string, string> = {
        Pending: "needs-review",
        Approved: "accepted",
        Revoked: "failing",
        Expired: "needs-attention",
      };
      return (
        <StatusBadge
          status={getStatusType(statusMap[status] || status)}
          label={status}
        />
      );
    },
  },
  {
    accessorKey: "nextReviewDate",
    header: "Next Review",
    cell: ({ row }) => {
      const date = new Date(row.original.nextReviewDate);
      const isOverdue = date < new Date();
      return (
        <span className={`text-sm ${isOverdue ? "text-red-600 dark:text-red-400 font-medium" : "text-muted-foreground"}`}>
          {format(date, "MMM d, yyyy")}
          {isOverdue && " (Overdue)"}
        </span>
      );
    },
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.reviewer}</span>
    ),
  },
];

export default function AccessPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredReviews = accessReviews.filter((review) => {
    if (statusFilter !== "all" && review.status !== statusFilter) return false;
    if (riskFilter !== "all" && review.riskLevel !== riskFilter) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Organization", href: "/people" },
          { label: "Access Reviews" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Access Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage user access rights across systems and applications.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accessStats.totalAccessRights}</p>
                  <p className="text-sm text-muted-foreground">Total Access Rights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accessStats.pendingReviews}</p>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accessStats.approvedThisMonth}</p>
                  <p className="text-sm text-muted-foreground">Approved This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accessStats.revokedThisMonth}</p>
                  <p className="text-sm text-muted-foreground">Revoked This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accessStats.overdueReviews}</p>
                  <p className="text-sm text-muted-foreground">Overdue Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Revoked">Revoked</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Risk Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={filteredReviews}
          searchPlaceholder="Search access reviews..."
        />
      </div>
    </>
  );
}
