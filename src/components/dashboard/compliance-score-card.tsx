"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ComplianceScoreCardProps {
  score: number;
  passingControls: number;
  totalControls: number;
}

export function ComplianceScoreCard({
  score,
  passingControls,
  totalControls,
}: ComplianceScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "[&>div]:bg-emerald-500";
    if (score >= 60) return "[&>div]:bg-amber-500";
    return "[&>div]:bg-red-500";
  };

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Overall Compliance Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
          <span className="text-sm text-muted-foreground">
            {passingControls}/{totalControls} controls passing
          </span>
        </div>
        <Progress
          value={score}
          className={`mt-4 h-2 ${getProgressColor(score)}`}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {score >= 80
            ? "Your compliance posture is strong"
            : score >= 60
            ? "Some areas need attention"
            : "Immediate action required"}
        </p>
      </CardContent>
    </Card>
  );
}
