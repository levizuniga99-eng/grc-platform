import { Framework } from "@/types";
import { Progress } from "@/components/ui/progress";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface FrameworkHeaderProps {
  framework: Framework;
}

export function FrameworkHeader({ framework }: FrameworkHeaderProps) {
  const satisfiedCount = framework.categories.reduce(
    (acc, cat) =>
      acc + cat.requirements.filter((r) => r.status === "Satisfied").length,
    0
  );
  const partialCount = framework.categories.reduce(
    (acc, cat) =>
      acc + cat.requirements.filter((r) => r.status === "Partially Satisfied").length,
    0
  );
  const notSatisfiedCount = framework.categories.reduce(
    (acc, cat) =>
      acc + cat.requirements.filter((r) => r.status === "Not Satisfied").length,
    0
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{framework.name}</h1>
            <StatusBadge
              status={getStatusType(framework.status)}
              label={framework.status}
            />
          </div>
          <p className="text-lg text-muted-foreground">{framework.fullName}</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            {framework.description}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {framework.lastAssessed && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Assessed: {format(new Date(framework.lastAssessed), "MMM d, yyyy")}</span>
            </div>
          )}
          {framework.nextAuditDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Next Audit: {format(new Date(framework.nextAuditDate), "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Readiness</span>
                <span className="text-2xl font-bold">
                  {framework.readinessPercentage}%
                </span>
              </div>
              <Progress value={framework.readinessPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {framework.satisfiedRequirements} of {framework.totalRequirements}{" "}
                requirements satisfied
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{satisfiedCount}</p>
                <p className="text-xs text-muted-foreground">Satisfied</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{partialCount}</p>
                <p className="text-xs text-muted-foreground">Partial</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notSatisfiedCount}</p>
                <p className="text-xs text-muted-foreground">Not Satisfied</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
