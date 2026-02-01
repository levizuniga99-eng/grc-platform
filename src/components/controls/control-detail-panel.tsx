"use client";

import { Control } from "@/types";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  User,
  Mail,
  Shield,
  FileText,
  AlertCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface ControlDetailPanelProps {
  control: Control | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ControlDetailPanel({
  control,
  open,
  onOpenChange,
}: ControlDetailPanelProps) {
  if (!control) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-muted-foreground">
              {control.id}
            </span>
            <StatusBadge
              status={getStatusType(control.status)}
              label={control.status}
            />
          </div>
          <SheetTitle className="text-left">{control.name}</SheetTitle>
          <SheetDescription className="text-left">
            {control.description}
          </SheetDescription>
        </SheetHeader>

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
            <p className="text-sm text-muted-foreground">
              {control.implementationDetails}
            </p>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
