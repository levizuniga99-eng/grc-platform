"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { ArrowRight } from "lucide-react";

interface FrameworkProgress {
  id: string;
  name: string;
  progress: number;
  status: string;
}

interface FrameworksOverviewProps {
  frameworks: FrameworkProgress[];
}

export function FrameworksOverview({ frameworks }: FrameworksOverviewProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          Frameworks Overview
        </CardTitle>
        <Link
          href="/frameworks"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {frameworks.map((framework) => (
          <Link
            key={framework.id}
            href={`/frameworks/${framework.id}`}
            className="block group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {framework.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {framework.progress}%
                </span>
                <StatusBadge status={getStatusType(framework.status)} label={framework.status} />
              </div>
            </div>
            <Progress value={framework.progress} className="h-2" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
