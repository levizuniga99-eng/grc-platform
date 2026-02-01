"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskItem } from "@/types";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { cn } from "@/lib/utils";

interface TasksListProps {
  tasks: TaskItem[];
}

function formatDueDate(dateString: string): string {
  const date = new Date(dateString);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "MMM d");
}

function getDueDateColor(dateString: string): string {
  const date = new Date(dateString);
  if (isPast(date) && !isToday(date)) return "text-red-600 dark:text-red-400";
  if (isToday(date)) return "text-amber-600 dark:text-amber-400";
  return "text-muted-foreground";
}

const priorityColors: Record<TaskItem["priority"], string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export function TasksList({ tasks }: TasksListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Upcoming Tasks ({tasks.filter((t) => !t.completed).length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-6">
          <div className="space-y-3 pb-4">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/50",
                  task.completed && "opacity-50"
                )}
              >
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  className="mt-0.5"
                  aria-label={`Mark "${task.title}" as complete`}
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={task.id}
                    className={cn(
                      "text-sm font-medium cursor-pointer",
                      task.completed && "line-through"
                    )}
                  >
                    {task.title}
                  </label>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded",
                        priorityColors[task.priority]
                      )}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {task.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      &middot;
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {task.assignee}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    getDueDateColor(task.dueDate)
                  )}
                >
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
