"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Risk, RiskSeverity, RiskStatus, RiskCategory, RiskLikelihood, RiskImpact } from "@/types";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { format, differenceInDays } from "date-fns";
import { User, Calendar, Shield, Pencil, Trash2, RefreshCw, AlertTriangle } from "lucide-react";

interface RiskRegisterTableProps {
  risks: Risk[];
  onUpdateRisk?: (risk: Risk) => void;
  onDeleteRisk?: (riskId: string) => void;
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
    accessorKey: "lastReviewed",
    header: "Last Reviewed",
    cell: ({ row }) => {
      const lastReviewed = row.original.lastReviewed || row.original.dueDate;
      const daysSinceReview = differenceInDays(new Date(), new Date(lastReviewed));
      const isOverdue = daysSinceReview > 365;
      const isDueSoon = daysSinceReview > 300 && daysSinceReview <= 365;

      return (
        <div className="flex items-center gap-2">
          {isOverdue && (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          )}
          {isDueSoon && (
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          )}
          <span className={`text-sm ${isOverdue ? "text-red-600 dark:text-red-400 font-medium" : isDueSoon ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
            {format(new Date(lastReviewed), "MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
];

const severities = ["Critical", "High", "Medium", "Low"];
const statuses = ["Open", "In Treatment", "Mitigated", "Accepted"];
const categories = ["Operational", "Technical", "Compliance", "Strategic", "Financial", "Reputational"];

export function RiskRegisterTable({ risks, onUpdateRisk, onDeleteRisk }: RiskRegisterTableProps) {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Risk | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [riskToDelete, setRiskToDelete] = useState<Risk | null>(null);

  const handleEditClick = () => {
    if (selectedRisk) {
      setEditForm({ ...selectedRisk });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editForm && onUpdateRisk) {
      // Recalculate risk score
      editForm.riskScore = editForm.likelihood * editForm.impact;
      onUpdateRisk(editForm);
      setSelectedRisk(editForm);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = () => {
    if (selectedRisk) {
      setRiskToDelete(selectedRisk);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (riskToDelete && onDeleteRisk) {
      onDeleteRisk(riskToDelete.id);
      setSelectedRisk(null);
      setDeleteDialogOpen(false);
      setRiskToDelete(null);
    }
  };

  const handleMarkAsReviewed = () => {
    if (selectedRisk && onUpdateRisk) {
      const updatedRisk = {
        ...selectedRisk,
        lastReviewed: new Date().toISOString().split("T")[0],
      };
      onUpdateRisk(updatedRisk);
      setSelectedRisk(updatedRisk);
    }
  };

  const getReviewStatus = (risk: Risk) => {
    const lastReviewed = risk.lastReviewed || risk.dueDate;
    const daysSinceReview = differenceInDays(new Date(), new Date(lastReviewed));
    if (daysSinceReview > 365) return "overdue";
    if (daysSinceReview > 300) return "due-soon";
    return "current";
  };

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

      <Sheet open={!!selectedRisk} onOpenChange={(open) => {
        if (!open) {
          setSelectedRisk(null);
          setIsEditing(false);
          setEditForm(null);
        }
      }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedRisk && !isEditing && (
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
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className={
                        getReviewStatus(selectedRisk) === "overdue"
                          ? "text-red-600 dark:text-red-400 font-medium"
                          : getReviewStatus(selectedRisk) === "due-soon"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-muted-foreground"
                      }>
                        Last Reviewed: {format(new Date(selectedRisk.lastReviewed || selectedRisk.dueDate), "MMM d, yyyy")}
                        {getReviewStatus(selectedRisk) === "overdue" && " (Overdue)"}
                        {getReviewStatus(selectedRisk) === "due-soon" && " (Due Soon)"}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Treatment Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedRisk.treatmentPlan || "No treatment plan defined"}
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

              {onUpdateRisk && (
                <div className="mt-6 p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Annual Review</p>
                      <p className="text-xs text-muted-foreground">
                        {getReviewStatus(selectedRisk) === "overdue"
                          ? "This risk is overdue for annual review"
                          : getReviewStatus(selectedRisk) === "due-soon"
                          ? "This risk is due for review soon"
                          : "Risk review is current"}
                      </p>
                    </div>
                    <Button onClick={handleMarkAsReviewed} size="sm" variant={getReviewStatus(selectedRisk) === "overdue" ? "default" : "outline"}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Mark as Reviewed
                    </Button>
                  </div>
                </div>
              )}

              {(onUpdateRisk || onDeleteRisk) && (
                <SheetFooter className="mt-4 flex gap-2">
                  {onUpdateRisk && (
                    <Button onClick={handleEditClick} variant="outline" className="flex-1">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  {onDeleteRisk && (
                    <Button onClick={handleDeleteClick} variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </SheetFooter>
              )}
            </>
          )}

          {selectedRisk && isEditing && editForm && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">Edit Risk</SheetTitle>
                <SheetDescription className="text-left">
                  Update the risk details below.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={editForm.category}
                      onValueChange={(v) => setEditForm({ ...editForm, category: v as RiskCategory })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select
                      value={editForm.severity}
                      onValueChange={(v) => setEditForm({ ...editForm, severity: v as RiskSeverity })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {severities.map((sev) => (
                          <SelectItem key={sev} value={sev}>{sev}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Likelihood</Label>
                    <Select
                      value={String(editForm.likelihood)}
                      onValueChange={(v) => setEditForm({ ...editForm, likelihood: Number(v) as RiskLikelihood })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((l) => (
                          <SelectItem key={l} value={String(l)}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Impact</Label>
                    <Select
                      value={String(editForm.impact)}
                      onValueChange={(v) => setEditForm({ ...editForm, impact: Number(v) as RiskImpact })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={editForm.status}
                      onValueChange={(v) => setEditForm({ ...editForm, status: v as RiskStatus })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Risk Score: <span className="font-bold text-foreground">{editForm.likelihood * editForm.impact}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Owner</Label>
                  <Input
                    value={editForm.owner}
                    onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Treatment Plan</Label>
                  <Textarea
                    value={editForm.treatmentPlan}
                    onChange={(e) => setEditForm({ ...editForm, treatmentPlan: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <SheetFooter className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="flex-1">
                  Save Changes
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Risk</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{riskToDelete?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
