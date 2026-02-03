"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AuditsTable } from "@/components/audit-hub/audits-table";
import { auditClients } from "@/lib/mock-data/audits";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import {
  Building2,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function AuditHubPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const inProgressCount = auditClients.filter(
    (a) => a.status === "In Progress"
  ).length;
  const pendingReviewCount = auditClients.filter(
    (a) => a.status === "Pending Review"
  ).length;
  const completedCount = auditClients.filter(
    (a) => a.status === "Completed"
  ).length;
  const totalClients = auditClients.length;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-sidebar">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">GRC Platform</h1>
                <p className="text-xs text-muted-foreground">Auditor Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              )}
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Audit Hub</h2>
          <p className="text-muted-foreground mt-1">
            Manage and access your client audits
          </p>
        </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalClients}</p>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <ClipboardCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
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
                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingReviewCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
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
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">All Audits ({totalClients})</h2>
          <AuditsTable audits={auditClients} />
        </div>
      </div>
    </div>
  );
}
