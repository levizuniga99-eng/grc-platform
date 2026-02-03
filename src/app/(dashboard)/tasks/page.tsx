"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlMessages } from "@/contexts/control-messages-context";
import { useAuth } from "@/contexts/auth-context";
import { Control, ControlStatus } from "@/types";
import { ClipboardList, Clock, CheckCircle2, AlertCircle, User } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";

const CONTROLS_STORAGE_KEY = "grc-controls";

export default function TasksPage() {
  const { tasks, updateTaskStatus, addMessage } = useControlMessages();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Function to update control status in localStorage
  const updateControlStatus = (controlId: string, newStatus: ControlStatus) => {
    try {
      const saved = localStorage.getItem(CONTROLS_STORAGE_KEY);
      if (saved) {
        const controls: Control[] = JSON.parse(saved);
        const updated = controls.map((c) =>
          c.id === controlId ? { ...c, status: newStatus } : c
        );
        localStorage.setItem(CONTROLS_STORAGE_KEY, JSON.stringify(updated));
        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent("storage", {
          key: CONTROLS_STORAGE_KEY,
          newValue: JSON.stringify(updated),
        }));
      }
    } catch {
      // Ignore errors
    }
  };

  // Handle task status change - when resolved, also update control to "Needs Review"
  const handleTaskStatusChange = (taskId: string, newStatus: "open" | "in_progress" | "resolved", task: typeof tasks[0]) => {
    updateTaskStatus(taskId, newStatus);

    // When client marks task as resolved, change control status to "Needs Review"
    if (newStatus === "resolved" && user) {
      updateControlStatus(task.controlId, "Needs Review");

      // Add message to control history
      addMessage({
        controlId: task.controlId,
        type: "status_change",
        content: `Status changed from Additional Evidence Needed to Needs Review`,
        author: user.name,
        authorEmail: user.email,
        authorRole: user.role,
        previousStatus: "Additional Evidence Needed",
        newStatus: "Needs Review",
      });
    }
  };

  const filteredTasks = statusFilter === "all"
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);

  const openCount = tasks.filter((t) => t.status === "open").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const resolvedCount = tasks.filter((t) => t.status === "resolved").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>;
      case "in_progress":
        return <Badge variant="default" className="bg-amber-500">In Progress</Badge>;
      case "resolved":
        return <Badge variant="default" className="bg-emerald-500">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Tasks" }]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Evidence requests and action items from auditor reviews.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{openCount}</p>
                  <p className="text-sm text-muted-foreground">Open Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{resolvedCount}</p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No tasks found</h3>
                  <p className="text-muted-foreground mt-1">
                    Tasks will appear here when auditors request additional evidence.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(task.status)}
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <Link href={`/controls?highlight=${task.controlId}`}>
                        <h3 className="font-semibold hover:underline cursor-pointer">
                          {task.controlName}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground font-mono mb-2">
                        {task.controlId}
                      </p>
                      <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                        {task.requestMessage}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Requested by {task.requestedBy}
                        </span>
                        {task.assignedTo && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            Assigned to {task.assignedTo}
                          </span>
                        )}
                        <span>
                          Created {format(new Date(task.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {user?.role === "client" && task.status !== "resolved" && (
                        <Select
                          value={task.status}
                          onValueChange={(value) => handleTaskStatusChange(task.id, value as "open" | "in_progress" | "resolved", task)}
                        >
                          <SelectTrigger className="w-[160px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Submit for Review</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/controls?highlight=${task.controlId}`}>
                          View Control
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
