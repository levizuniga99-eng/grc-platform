import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { Framework } from "@/types";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";

interface FrameworkCardProps {
  framework: Framework;
}

export function FrameworkCard({ framework }: FrameworkCardProps) {
  return (
    <Link href={`/frameworks/${framework.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{framework.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {framework.fullName}
              </p>
            </div>
            <StatusBadge
              status={getStatusType(framework.status)}
              label={framework.status}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {framework.description}
          </p>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Readiness</span>
              <span className="text-sm text-muted-foreground">
                {framework.satisfiedRequirements}/{framework.totalRequirements}{" "}
                requirements
              </span>
            </div>
            <Progress value={framework.readinessPercentage} className="h-2" />
            <p className="text-right text-sm font-medium mt-1">
              {framework.readinessPercentage}%
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {framework.nextAuditDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Audit: {format(new Date(framework.nextAuditDate), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
