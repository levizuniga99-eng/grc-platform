import { PageHeader } from "@/components/layout/page-header";
import { ControlsTable } from "@/components/controls/controls-table";
import { controls } from "@/lib/mock-data/controls";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileQuestion, AlertTriangle, MinusCircle } from "lucide-react";

export default function ControlsPage() {
  const acceptedCount = controls.filter((c) => c.status === "Accepted").length;
  const evidenceNeededCount = controls.filter(
    (c) => c.status === "Additional Evidence Needed"
  ).length;
  const needsReviewCount = controls.filter(
    (c) => c.status === "Needs Review"
  ).length;
  const notApplicableCount = controls.filter(
    (c) => c.status === "Not Applicable"
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

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{acceptedCount}</p>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <FileQuestion className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{needsReviewCount}</p>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
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
                  <p className="text-2xl font-bold">{evidenceNeededCount}</p>
                  <p className="text-sm text-muted-foreground">Evidence Needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                  <MinusCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notApplicableCount}</p>
                  <p className="text-sm text-muted-foreground">Not Applicable</p>
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
