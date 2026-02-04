"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { AuditClient } from "@/lib/mock-data/audits";
import { DataTable } from "@/components/shared/data-table";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Building2, Calendar, ArrowRight } from "lucide-react";
import { useSettings } from "@/contexts/settings-context";
import { FinalReportUploadDialog } from "./final-report-upload-dialog";
import { Control } from "@/types";
import { controls as mockControls } from "@/lib/mock-data/controls";

interface AuditsTableProps {
  audits: AuditClient[];
}

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Pending Review": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Completed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Not Started": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const auditStatuses: AuditClient["status"][] = ["Not Started", "In Progress", "Pending Review", "Completed"];

const AUDITS_STORAGE_KEY = "grc-audits";
const AUDIT_REPORTS_STORAGE_KEY = "grc-audit-reports";
const CONTROLS_STORAGE_KEY = "grc-controls";

export function AuditsTable({ audits: initialAudits }: AuditsTableProps) {
  const router = useRouter();
  const { settings } = useSettings();
  const [statusFilter, setStatusFilter] = useState("all");
  const [audits, setAudits] = useState<AuditClient[]>(initialAudits);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [pendingCompletionAudit, setPendingCompletionAudit] = useState<AuditClient | null>(null);
  const [controls, setControls] = useState<Control[]>(mockControls);

  // Load audits from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(AUDITS_STORAGE_KEY);
    if (saved) {
      try {
        setAudits(JSON.parse(saved));
      } catch {
        // Use initial data if parse fails
      }
    }
  }, []);

  // Load controls from localStorage to get real counts (fallback to mock data)
  useEffect(() => {
    const loadControls = () => {
      const saved = localStorage.getItem(CONTROLS_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.length > 0) {
            setControls(parsed);
          }
        } catch {
          // Use mock data if parse fails
        }
      }
    };

    loadControls();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONTROLS_STORAGE_KEY) {
        loadControls();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save audits to localStorage when they change
  const saveAudits = (updatedAudits: AuditClient[]) => {
    localStorage.setItem(AUDITS_STORAGE_KEY, JSON.stringify(updatedAudits));
  };

  const handleStatusChange = (auditId: string, newStatus: AuditClient["status"]) => {
    const audit = audits.find((a) => a.id === auditId);
    if (!audit) return;

    // If completing, require final report upload
    if (newStatus === "Completed") {
      setPendingCompletionAudit(audit);
      setShowReportDialog(true);
      return;
    }

    // Otherwise, update status directly
    setAudits((prev) => {
      const updated = prev.map((a) =>
        a.id === auditId
          ? { ...a, status: newStatus, lastActivity: new Date().toISOString() }
          : a
      );
      saveAudits(updated);
      return updated;
    });
  };

  const handleReportSubmit = (file: File) => {
    if (!pendingCompletionAudit) return;

    // Store the report reference
    const reportId = `report-${Date.now()}`;
    const reader = new FileReader();
    reader.onload = () => {
      const reports = JSON.parse(localStorage.getItem(AUDIT_REPORTS_STORAGE_KEY) || "{}");
      reports[reportId] = {
        id: reportId,
        auditId: pendingCompletionAudit.id,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        content: reader.result,
      };
      localStorage.setItem(AUDIT_REPORTS_STORAGE_KEY, JSON.stringify(reports));
    };
    reader.readAsDataURL(file);

    // Update audit status to completed
    setAudits((prev) => {
      const updated = prev.map((a) =>
        a.id === pendingCompletionAudit.id
          ? {
              ...a,
              status: "Completed" as const,
              lastActivity: new Date().toISOString(),
              finalReportId: reportId,
            }
          : a
      );
      saveAudits(updated);
      return updated;
    });

    setPendingCompletionAudit(null);
  };

  // Calculate real control stats
  const controlStats = useMemo(() => {
    const total = controls.length;
    const passing = controls.filter((c) => c.status === "Accepted").length;
    const progress = total > 0 ? Math.round((passing / total) * 100) : 0;
    return { total, passing, progress };
  }, [controls]);

  // Override audit data with current settings and real control stats
  const auditsWithSettings = useMemo(() => {
    return audits.map((audit) => ({
      ...audit,
      organizationName: settings.organizationName,
      scopeName: settings.scopeName,
      auditName: settings.auditName,
      auditPeriodStart: settings.auditPeriodStart,
      auditPeriodEnd: settings.auditPeriodEnd,
      controlsTotal: controlStats.total,
      controlsPassing: controlStats.passing,
      progress: controlStats.progress,
    }));
  }, [audits, settings, controlStats]);

  const filteredAudits = auditsWithSettings.filter((audit) => {
    if (statusFilter !== "all" && audit.status !== statusFilter) return false;
    return true;
  });

  const handleRowClick = () => {
    // Navigate to the dashboard/client portal for this audit
    router.push("/dashboard");
  };

  const columns: ColumnDef<AuditClient>[] = [
    {
      accessorKey: "organizationName",
      header: "Client",
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{row.getValue("organizationName")}</p>
            <p className="text-xs text-muted-foreground">{row.original.scopeName}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "auditName",
      header: "Audit",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("auditName")}</p>
          <p className="text-xs text-muted-foreground">{row.original.framework}</p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as AuditClient["status"];
        const auditId = row.original.id;
        return (
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(auditId, value as AuditClient["status"])}
          >
            <SelectTrigger
              className={`w-[140px] h-8 text-xs font-medium border-0 ${statusColors[status]}`}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent onClick={(e) => e.stopPropagation()}>
              {auditStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${statusColors[s]}`}>
                    {s}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number;
        const passing = row.original.controlsPassing;
        const total = row.original.controlsTotal;
        return (
          <div className="w-32">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">{passing}/{total} controls</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "auditPeriodStart",
      header: "Audit Period",
      cell: ({ row }) => {
        const startDate = new Date(row.original.auditPeriodStart);
        const endDate = new Date(row.original.auditPeriodEnd);
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {format(startDate, "M/d/yy")} to {format(endDate, "M/d/yy")}
            </span>
          </div>
        );
      },
    },
    {
      id: "action",
      header: "",
      cell: () => (
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {auditStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredAudits}
        searchPlaceholder="Search clients or audits..."
        onRowClick={handleRowClick}
      />

      <FinalReportUploadDialog
        open={showReportDialog}
        onOpenChange={(open) => {
          setShowReportDialog(open);
          if (!open) {
            setPendingCompletionAudit(null);
          }
        }}
        auditName={pendingCompletionAudit?.auditName || ""}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
