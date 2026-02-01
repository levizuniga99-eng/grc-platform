import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { FrameworksOverview } from "@/components/dashboard/frameworks-overview";
import { ControlsOverview } from "@/components/dashboard/controls-overview";
import { RisksOverview } from "@/components/dashboard/risks-overview";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { TasksList } from "@/components/dashboard/tasks-list";
import {
  dashboardMetrics,
  recentActivity,
  upcomingTasks,
  controlsStatusData,
  frameworksProgress,
  risksBySeverity,
} from "@/lib/mock-data/dashboard";
import { FileText } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <ControlsOverview data={controlsStatusData} />
          <MetricCard
            title="Evidence Coverage"
            value={`${Math.round((dashboardMetrics.currentEvidence / dashboardMetrics.totalEvidence) * 100)}%`}
            subtitle={`${dashboardMetrics.currentEvidence} of ${dashboardMetrics.totalEvidence} items current`}
            icon={FileText}
            variant="default"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FrameworksOverview frameworks={frameworksProgress} />
          <RisksOverview
            data={risksBySeverity}
            totalRisks={dashboardMetrics.totalRisks}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <ActivityFeed activities={recentActivity} />
          <TasksList tasks={upcomingTasks} />
        </div>
      </div>
    </>
  );
}
