import { PageHeader } from "@/components/layout/page-header";
import { ComplianceScoreCard } from "@/components/dashboard/compliance-score-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { FrameworksOverview } from "@/components/dashboard/frameworks-overview";
import { ControlsStatusChart } from "@/components/dashboard/controls-status-chart";
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
import {
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ComplianceScoreCard
            score={dashboardMetrics.overallComplianceScore}
            passingControls={dashboardMetrics.passingControls}
            totalControls={dashboardMetrics.totalControls}
          />
          <MetricCard
            title="Critical Risks"
            value={dashboardMetrics.criticalRisks}
            subtitle={`${dashboardMetrics.highRisks} high risks`}
            icon={AlertTriangle}
            variant={dashboardMetrics.criticalRisks > 0 ? "danger" : "success"}
          />
          <MetricCard
            title="Passing Controls"
            value={`${dashboardMetrics.passingControls}/${dashboardMetrics.totalControls}`}
            subtitle={`${dashboardMetrics.failingControls} failing`}
            icon={CheckCircle}
            variant={dashboardMetrics.failingControls > 0 ? "warning" : "success"}
          />
          <MetricCard
            title="Evidence Coverage"
            value={`${Math.round((dashboardMetrics.currentEvidence / dashboardMetrics.totalEvidence) * 100)}%`}
            subtitle={`${dashboardMetrics.currentEvidence} of ${dashboardMetrics.totalEvidence} items current`}
            icon={FileText}
            variant="default"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FrameworksOverview frameworks={frameworksProgress} />
          <ControlsStatusChart data={controlsStatusData} />
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
