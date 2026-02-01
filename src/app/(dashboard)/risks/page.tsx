import { PageHeader } from "@/components/layout/page-header";
import { RiskMatrix } from "@/components/risks/risk-matrix";
import { RiskRegisterTable } from "@/components/risks/risk-register-table";
import { risks } from "@/lib/mock-data/risks";
import { Card, CardContent } from "@/components/ui/card";

export default function RisksPage() {
  const criticalCount = risks.filter((r) => r.severity === "Critical").length;
  const highCount = risks.filter((r) => r.severity === "High").length;
  const openCount = risks.filter((r) => r.status === "Open").length;
  const inTreatmentCount = risks.filter((r) => r.status === "In Treatment").length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Risk Management", href: "/risks" },
          { label: "Risks" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Risk Register</h1>
          <p className="text-muted-foreground mt-1">
            Identify, assess, and manage organizational risks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {criticalCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Critical Risks</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {highCount}
                  </p>
                  <p className="text-sm text-muted-foreground">High Risks</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{openCount}</p>
                  <p className="text-sm text-muted-foreground">Open</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{openCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{inTreatmentCount}</p>
                  <p className="text-sm text-muted-foreground">In Treatment</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{inTreatmentCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <RiskMatrix risks={risks} />

        <div>
          <h2 className="text-lg font-semibold mb-4">All Risks ({risks.length})</h2>
          <RiskRegisterTable risks={risks} />
        </div>
      </div>
    </>
  );
}
