import { PageHeader } from "@/components/layout/page-header";
import { EvidenceTable } from "@/components/evidence/evidence-table";
import { EvidenceUploadDialog } from "@/components/evidence/evidence-upload-dialog";
import { evidence } from "@/lib/mock-data/evidence";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle, FileSearch } from "lucide-react";

export default function EvidencePage() {
  const currentCount = evidence.filter((e) => e.status === "Current").length;
  const expiringSoonCount = evidence.filter(
    (e) => e.status === "Expiring Soon"
  ).length;
  const expiredCount = evidence.filter((e) => e.status === "Expired").length;
  const pendingCount = evidence.filter(
    (e) => e.status === "Pending Review"
  ).length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Compliance", href: "/frameworks" },
          { label: "Evidence" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Evidence Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage documentation and evidence supporting your compliance controls.
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
                  <p className="text-2xl font-bold">{currentCount}</p>
                  <p className="text-sm text-muted-foreground">Current</p>
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
                  <p className="text-2xl font-bold">{expiringSoonCount}</p>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
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
                  <p className="text-2xl font-bold">{expiredCount}</p>
                  <p className="text-sm text-muted-foreground">Expired</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                  <FileSearch className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <EvidenceTable evidence={evidence} actions={<EvidenceUploadDialog />} />
      </div>
    </>
  );
}
