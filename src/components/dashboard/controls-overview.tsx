"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Controls Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="h-[160px] w-[160px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ControlsStatusData;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: data.color }}
                            />
                            <span className="text-sm font-medium">
                              {data.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {data.value} ({Math.round((data.value / total) * 100)}%)
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center gap-3 flex-1">
            {data.map((item) => {
              const Icon = statusIcons[item.name] || CheckCircle;
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="h-4 w-4"
                      style={{ color: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.value}</span>
                    <span className="text-xs text-muted-foreground">
                      ({Math.round((item.value / total) * 100)}%)
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="border-t pt-2 mt-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Controls</span>
                <span className="text-sm font-semibold">{total}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
