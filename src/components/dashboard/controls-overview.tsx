"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileQuestion, AlertTriangle, MinusCircle } from "lucide-react";

interface ControlsStatusData {
  name: string;
  value: number;
  color: string;
}

interface ControlsOverviewProps {
  data: ControlsStatusData[];
}

const statusIcons: Record<string, typeof CheckCircle> = {
  "Accepted": CheckCircle,
  "Needs Review": FileQuestion,
  "Evidence Needed": AlertTriangle,
  "Not Applicable": MinusCircle,
};

export function ControlsOverview({ data }: ControlsOverviewProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Controls Overview
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {total} Total Controls
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Horizontal stacked progress bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-muted">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            if (percentage === 0) return null;
            return (
              <div
                key={index}
                className="h-full transition-all duration-300"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color,
                }}
                title={`${item.name}: ${item.value} (${Math.round(percentage)}%)`}
              />
            );
          })}
        </div>

        {/* Legend with stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item) => {
            const Icon = statusIcons[item.name] || CheckCircle;
            const percentage = Math.round((item.value / total) * 100);
            return (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: item.color }}
                    />
                    <span className="text-sm font-medium truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold">{item.value}</span>
                    <span className="text-xs text-muted-foreground">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
