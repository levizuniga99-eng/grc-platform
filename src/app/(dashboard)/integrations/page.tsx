import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { integrations } from "@/lib/mock-data/integrations";
import { formatDistanceToNow } from "date-fns";
import {
  Cloud,
  Key,
  GitBranch,
  MessageSquare,
  Kanban,
  Users,
  Laptop,
  Shield,
  Plug,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const categoryIcons: Record<string, typeof Cloud> = {
  "Cloud Provider": Cloud,
  "Identity Provider": Key,
  "Version Control": GitBranch,
  Communication: MessageSquare,
  "Project Management": Kanban,
  HR: Users,
  MDM: Laptop,
  Security: Shield,
};

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  Connected: { color: "text-emerald-600 dark:text-emerald-400", icon: CheckCircle },
  Available: { color: "text-gray-400", icon: Plug },
  Error: { color: "text-red-600 dark:text-red-400", icon: XCircle },
  Syncing: { color: "text-blue-600 dark:text-blue-400", icon: RefreshCw },
};

const healthColors: Record<string, "healthy" | "degraded" | "disconnected" | "not-applicable"> = {
  Healthy: "healthy",
  Degraded: "degraded",
  Down: "disconnected",
  "N/A": "not-applicable",
};

export default function IntegrationsPage() {
  const connectedCount = integrations.filter((i) => i.status === "Connected").length;
  const availableCount = integrations.filter((i) => i.status === "Available").length;
  const errorCount = integrations.filter((i) => i.status === "Error").length;

  const connectedIntegrations = integrations.filter((i) => i.status !== "Available");
  const availableIntegrations = integrations.filter((i) => i.status === "Available");

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Organization", href: "/people" },
          { label: "Integrations" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your tools and services to automatically collect compliance evidence.
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
                  <p className="text-2xl font-bold">{connectedCount}</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                  <Plug className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{availableCount}</p>
                  <p className="text-sm text-muted-foreground">Available</p>
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
                  <p className="text-2xl font-bold">{errorCount}</p>
                  <p className="text-sm text-muted-foreground">Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Connected Integrations</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectedIntegrations.map((integration) => {
              const CategoryIcon = categoryIcons[integration.category] || Plug;
              const statusInfo = statusConfig[integration.status];
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={integration.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {integration.category}
                          </p>
                        </div>
                      </div>
                      <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {integration.description}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-muted-foreground">Health: </span>
                        <StatusBadge
                          status={healthColors[integration.healthStatus]}
                          label={integration.healthStatus}
                        />
                      </div>
                      {integration.lastSyncDate && (
                        <span className="text-muted-foreground">
                          Synced{" "}
                          {formatDistanceToNow(new Date(integration.lastSyncDate), {
                            addSuffix: true,
                          })}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {integration.dataCollected.slice(0, 3).map((data) => (
                        <Badge key={data} variant="secondary" className="text-xs">
                          {data}
                        </Badge>
                      ))}
                      {integration.dataCollected.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{integration.dataCollected.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Available Integrations</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => {
              const CategoryIcon = categoryIcons[integration.category] || Plug;

              return (
                <Card key={integration.id} className="border-dashed">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-base text-muted-foreground">
                            {integration.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {integration.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {integration.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
