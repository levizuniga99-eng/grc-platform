"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vendors } from "@/lib/mock-data/vendors";
import { Vendor } from "@/types";
import { format } from "date-fns";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const riskColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "Vendor",
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <p className="font-medium truncate">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground truncate">
          {row.original.category}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "riskRating",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.getValue("riskRating") as string;
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
      return <StatusBadge status={getStatusType(status)} label={status} />;
    },
  },
  {
    accessorKey: "complianceCertifications",
    header: "Certifications",
    cell: ({ row }) => {
      const certs = row.getValue("complianceCertifications") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {certs.slice(0, 2).map((cert) => (
            <Badge key={cert} variant="secondary" className="text-xs">
              {cert}
            </Badge>
          ))}
          {certs.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{certs.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "lastAssessmentDate",
    header: "Last Assessment",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("lastAssessmentDate")), "MMM d, yyyy")}
      </span>
    ),
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
];

export default function VendorsPage() {
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const criticalCount = vendors.filter((v) => v.riskRating === "Critical").length;
  const highCount = vendors.filter((v) => v.riskRating === "High").length;
  const approvedCount = vendors.filter((v) => v.status === "Approved").length;
  const pendingCount = vendors.filter((v) => v.status === "Pending" || v.status === "Under Review").length;

  const filteredVendors = vendors.filter((vendor) => {
    if (riskFilter !== "all" && vendor.riskRating !== riskFilter) return false;
    if (statusFilter !== "all" && vendor.status !== statusFilter) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Risk Management", href: "/risks" },
          { label: "Vendors" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and assess third-party vendor security and compliance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{criticalCount}</p>
                  <p className="text-sm text-muted-foreground">Critical Risk</p>
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
                  <p className="text-2xl font-bold">{highCount}</p>
                  <p className="text-sm text-muted-foreground">High Risk</p>
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
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Risks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={filteredVendors}
          searchPlaceholder="Search vendors..."
        />
      </div>
    </>
  );
}
