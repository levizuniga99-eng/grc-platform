"use client";

import { useState, useEffect } from "react";
import { Control, ControlStatus, ControlCategory } from "@/types";
import { ControlStatusSelect } from "./control-status-select";
import { EvidenceRequestDialog } from "./evidence-request-dialog";
import { useControlMessages } from "@/contexts/control-messages-context";
import { useAuth } from "@/contexts/auth-context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  User,
  Mail,
  Shield,
  FileText,
  AlertCircle,
  Clock,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { getControlOwners } from "@/lib/mock-data/team-members";
import { ControlMessages } from "./control-messages";

const categories: ControlCategory[] = [
  "Access Control",
  "Data Protection",
  "Network Security",
  "Incident Response",
  "Change Management",
  "Business Continuity",
  "Vulnerability Management",
  "Logging & Monitoring",
  "Endpoint Security",
  "Physical Security",
  "Human Resources",
  "Risk Management",
];

interface ControlDetailPanelProps {
  control: Control | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (controlId: string, status: ControlStatus) => void;
  onControlUpdate?: (control: Control) => void;
}

export function ControlDetailPanel({
  control,
  open,
  onOpenChange,
  onStatusChange,
  onControlUpdate,
}: ControlDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedControl, setEditedControl] = useState<Control | null>(null);
  const [showEvidenceDialog, setShowEvidenceDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ControlStatus | null>(null);
  const { addMessage, addTask } = useControlMessages();
  const { user } = useAuth();

  useEffect(() => {
    if (control) {
      setEditedControl({ ...control });
    }
    setIsEditing(false);
  }, [control]);

  if (!control || !editedControl) return null;

  const handleSave = () => {
    if (editedControl && onControlUpdate) {
      onControlUpdate(editedControl);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedControl({ ...control });
    setIsEditing(false);
  };

  const updateField = <K extends keyof Control>(field: K, value: Control[K]) => {
    setEditedControl((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleStatusChange = (newStatus: ControlStatus) => {
    if (newStatus === "Additional Evidence Needed" && user?.role === "auditor") {
      // Show dialog to request evidence details
      setPendingStatus(newStatus);
      setShowEvidenceDialog(true);
    } else {
      // Record status change in message history
      if (user && control) {
        addMessage({
          controlId: control.id,
          type: "status_change",
          content: `Status changed from ${control.status} to ${newStatus}`,
          author: user.name,
          authorEmail: user.email,
          authorRole: user.role,
          previousStatus: control.status,
          newStatus: newStatus,
        });
      }
      onStatusChange?.(control.id, newStatus);
    }
  };

  const handleEvidenceRequestSubmit = (message: string) => {
    if (!control || !user) return;

    // Add evidence request message to control history
    addMessage({
      controlId: control.id,
      type: "evidence_request",
      content: message,
      author: user.name,
      authorEmail: user.email,
      authorRole: user.role,
    });

    // Also add status change message
    addMessage({
      controlId: control.id,
      type: "status_change",
      content: `Status changed from ${control.status} to Additional Evidence Needed`,
      author: user.name,
      authorEmail: user.email,
      authorRole: user.role,
      previousStatus: control.status,
      newStatus: "Additional Evidence Needed",
    });

    // Create a task for the client
    addTask({
      controlId: control.id,
      controlName: control.name,
      requestMessage: message,
      requestedBy: user.name,
      requestedByRole: user.role,
      status: "open",
      assignedTo: control.owner,
    });

    // Apply the status change
    if (pendingStatus) {
      onStatusChange?.(control.id, pendingStatus);
    }

    setPendingStatus(null);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-muted-foreground">
              {control.id}
            </span>
            {onControlUpdate && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
          {isEditing ? (
            <>
              <Input
                value={editedControl.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="text-lg font-semibold"
                placeholder="Control name"
              />
              <Textarea
                value={editedControl.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Description"
                rows={2}
              />
            </>
          ) : (
            <>
              <SheetTitle className="text-left">{control.name}</SheetTitle>
              <SheetDescription className="text-left">
                {control.description}
              </SheetDescription>
            </>
          )}
        </SheetHeader>

        <div className="mt-4">
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <div className="mt-1">
            <ControlStatusSelect
              value={control.status}
              onValueChange={handleStatusChange}
            />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {control.failureReason && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    Issue Details
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    {control.failureReason}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-3">Details</h4>
            <div className="space-y-3">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Category</label>
                    <Select
                      value={editedControl.category}
                      onValueChange={(value) => updateField("category", value as ControlCategory)}
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
                    <label className="text-xs text-muted-foreground">Type</label>
                    <Select
                      value={editedControl.type}
                      onValueChange={(value) => updateField("type", value as "Automated" | "Manual")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Automated">Automated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Owner</label>
                    <Select
                      value={editedControl.owner}
                      onValueChange={(value) => {
                        const owners = getControlOwners();
                        const member = owners.find((m) => m.name === value);
                        updateField("owner", value);
                        if (member) {
                          updateField("ownerEmail", member.email);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        {getControlOwners().map((member) => (
                          <SelectItem key={member.id} value={member.name}>
                            {member.name} ({member.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Owner Email</label>
                    <Input
                      value={editedControl.ownerEmail}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">{control.category}</Badge>
                    <Badge variant="outline">{control.type}</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{control.owner}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{control.ownerEmail}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3">Testing Schedule</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Frequency</span>
                </div>
                <span>{control.testFrequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Last Tested</span>
                </div>
                <span>{format(new Date(control.lastTested), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next Review</span>
                </div>
                <span>{format(new Date(control.nextReview), "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3">Implementation</h4>
            {isEditing ? (
              <Textarea
                value={editedControl.implementationDetails}
                onChange={(e) => updateField("implementationDetails", e.target.value)}
                placeholder="Implementation details..."
                rows={3}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {control.implementationDetails || "No implementation details provided."}
              </p>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3">Mapped Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {control.frameworkIds.map((id) => (
                <Badge key={id} variant="outline">
                  <Shield className="h-3 w-3 mr-1" />
                  {id}
                </Badge>
              ))}
            </div>
          </div>

          {control.evidenceIds.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Evidence ({control.evidenceIds.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {control.evidenceIds.map((id) => (
                    <Badge key={id} variant="secondary">
                      <FileText className="h-3 w-3 mr-1" />
                      {id}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Activity & Messages Section */}
          <ControlMessages controlId={control.id} />
        </div>
      </SheetContent>

      {/* Evidence Request Dialog */}
      <EvidenceRequestDialog
        open={showEvidenceDialog}
        onOpenChange={(open) => {
          setShowEvidenceDialog(open);
          if (!open) {
            setPendingStatus(null);
          }
        }}
        controlName={control.name}
        onSubmit={handleEvidenceRequestSubmit}
      />
    </Sheet>
  );
}
