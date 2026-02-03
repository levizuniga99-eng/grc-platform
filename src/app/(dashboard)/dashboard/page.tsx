import { PageHeader } from "@/components/layout/page-header";
import { FrameworksOverview } from "@/components/dashboard/frameworks-overview";
import { ControlsOverview } from "@/components/dashboard/controls-overview";
import { RisksOverview } from "@/components/dashboard/risks-overview";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { EvidenceRequestsList } from "@/components/dashboard/evidence-requests-list";
import {
  dashboardMetrics,
  recentActivity,
  controlsStatusData,
  frameworksProgress,
  risksBySeverity,
} from "@/lib/mock-data/dashboard";

export default function DashboardPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ControlsOverview data={controlsStatusData} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FrameworksOverview frameworks={frameworksProgress} />
          <RisksOverview
            data={risksBySeverity}
            totalRisks={dashboardMetrics.totalRisks}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <ActivityFeed activities={recentActivity} />
          <EvidenceRequestsList />
        </div>
      </div>
    </>
  );
}
