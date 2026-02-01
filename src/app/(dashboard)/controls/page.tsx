import { PageHeader } from "@/components/layout/page-header";
import { ControlsTable } from "@/components/controls/controls-table";
import { controls } from "@/lib/mock-data/controls";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function ControlsPage() {
  const passingCount = controls.filter((c) => c.status === "Passing").length;
  const failingCount = controls.filter((c) => c.status === "Failing").length;
  const needsAttentionCount = controls.filter(
    (c) => c.status === "Needs Attention"
  ).length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Compliance", href: "/frameworks" },
          { label: "Controls" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Controls</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your security controls across all frameworks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{passingCount}</p>
                  <p className="text-sm text-muted-foreground">Passing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{failingCount}</p>
                  <p className="text-sm text-muted-foreground">Failing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{needsAttentionCount}</p>
                  <p className="text-sm text-muted-foreground">Needs Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ControlsTable controls={controls} />
      </div>
    </>
  );
}
