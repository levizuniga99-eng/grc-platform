"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useControlMessages } from "@/contexts/control-messages-context";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { AlertCircle, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: AlertCircle,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Clock,
  },
  resolved: {
    label: "Resolved",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle2,
  },
};

export function EvidenceRequestsList() {
  const { tasks } = useControlMessages();

  // Show only open and in-progress tasks, sorted by newest first
  const activeTasks = tasks
    .filter((t) => t.status !== "resolved")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const openCount = tasks.filter((t) => t.status === "open").length;

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Evidence Requests
          {openCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {openCount} Open
            </Badge>
          )}
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/tasks">
            View All
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-6">
          {activeTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-3" />
              <p className="text-sm font-medium">All caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">
                No pending evidence requests
              </p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {activeTasks.map((task) => {
                const config = statusConfig[task.status];
                const StatusIcon = config.icon;

                return (
                  <Link
                    key={task.id}
                    href={`/controls?highlight=${task.controlId}`}
                    className={cn(
                      "block p-3 rounded-lg border transition-colors hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <StatusIcon
                        className={cn(
                          "h-4 w-4 mt-0.5 flex-shrink-0",
                          task.status === "open" && "text-red-500",
                          task.status === "in_progress" && "text-amber-500"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium truncate">
                            {task.controlName}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.requestMessage}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className={cn("text-xs py-0 px-1.5", config.color)}
                          >
                            {config.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(task.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
