import { PageHeader } from "@/components/layout/page-header";
import { CodeChangesTable } from "@/components/code-changes/code-changes-table";
import { codeChanges } from "@/lib/mock-data/code-changes";
import { Card, CardContent } from "@/components/ui/card";
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function CodeChangesPage() {
  const deployedCount = codeChanges.filter((c) => c.status === "Deployed").length;
  const pendingCount = codeChanges.filter((c) => c.status === "Pending Review").length;
  const approvedCount = codeChanges.filter((c) => c.status === "Approved").length;
  const highRiskCount = codeChanges.filter(
    (c) => c.riskLevel === "High" || c.riskLevel === "Critical"
  ).length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Risk Management", href: "/risks" },
          { label: "Code Changes" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Code Changes</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage code changes, deployments, and change management processes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{deployedCount}</p>
                  <p className="text-sm text-muted-foreground">Deployed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <GitPullRequest className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
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
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{highRiskCount}</p>
                  <p className="text-sm text-muted-foreground">High/Critical Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">All Changes ({codeChanges.length})</h2>
          <CodeChangesTable changes={codeChanges} />
        </div>
      </div>
    </>
  );
}
