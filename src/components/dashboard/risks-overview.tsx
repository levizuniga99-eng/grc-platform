"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface RiskData {
  severity: string;
  count: number;
  color: string;
}

interface RisksOverviewProps {
  data: RiskData[];
  totalRisks: number;
}

export function RisksOverview({ data, totalRisks }: RisksOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Risk Overview</CardTitle>
        <Link
          href="/risks"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <span className="text-3xl font-bold">{totalRisks}</span>
          <span className="text-sm text-muted-foreground ml-2">Total Risks</span>
        </div>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.severity} className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm flex-1">{item.severity}</span>
              <span className="text-sm font-medium">{item.count}</span>
              <div className="w-20 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(item.count / totalRisks) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
