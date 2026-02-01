import { Requirement } from "@/types";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { FileText, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequirementRowProps {
  requirement: Requirement;
}

export function RequirementRow({ requirement }: RequirementRowProps) {
  const statusType = getStatusType(requirement.status);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 rounded-lg border transition-colors hover:bg-muted/50",
        requirement.status === "Not Satisfied" && "border-red-200 dark:border-red-900/50",
        requirement.status === "Partially Satisfied" && "border-amber-200 dark:border-amber-900/50"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">
              {requirement.referenceCode}
            </span>
            <StatusBadge status={statusType} label={requirement.status} />
          </div>
          <h4 className="text-sm font-medium">{requirement.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {requirement.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {requirement.mappedControlIds.length > 0 && (
          <div className="flex items-center gap-1">
            <LinkIcon className="h-3 w-3" />
            <span>{requirement.mappedControlIds.length} controls</span>
          </div>
        )}
        {requirement.evidenceIds.length > 0 && (
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>{requirement.evidenceIds.length} evidence</span>
          </div>
        )}
      </div>
    </div>
  );
}
