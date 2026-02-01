"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityItem } from "@/types";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Upload,
  GraduationCap,
  Building2,
  RefreshCw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const activityIcons: Record<ActivityItem["type"], typeof CheckCircle2> = {
  control_accepted: CheckCircle2,
  control_evidence_needed: AlertTriangle,
  risk_identified: AlertTriangle,
  policy_approved: FileText,
  evidence_uploaded: Upload,
  training_completed: GraduationCap,
  vendor_reviewed: Building2,
  integration_synced: RefreshCw,
};

const activityColors: Record<ActivityItem["type"], string> = {
  control_accepted: "text-emerald-600 dark:text-emerald-400",
  control_evidence_needed: "text-amber-600 dark:text-amber-400",
  risk_identified: "text-amber-600 dark:text-amber-400",
  policy_approved: "text-blue-600 dark:text-blue-400",
  evidence_uploaded: "text-purple-600 dark:text-purple-400",
  training_completed: "text-teal-600 dark:text-teal-400",
  vendor_reviewed: "text-indigo-600 dark:text-indigo-400",
  integration_synced: "text-cyan-600 dark:text-cyan-400",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-6">
          <div className="space-y-4 pb-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type];
              const colorClass = activityColors[activity.type];
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={`mt-0.5 ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-tight">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.actor} &middot;{" "}
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
