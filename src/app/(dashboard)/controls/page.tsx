"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ControlsTable } from "@/components/controls/controls-table";
import { ControlsByFramework } from "@/components/controls/controls-by-framework";
import { ControlsByCriteria } from "@/components/controls/controls-by-criteria";
import { controls } from "@/lib/mock-data/controls";
import { frameworks } from "@/lib/mock-data/frameworks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileQuestion, AlertTriangle, MinusCircle, List, LayoutGrid } from "lucide-react";

export default function ControlsPage() {
  const [selectedFramework, setSelectedFramework] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "criteria">("criteria");

  const filteredControls = useMemo(() => {
    if (selectedFramework === "all") {
      return controls;
    }
    return controls.filter((c) => c.frameworkIds.includes(selectedFramework));
  }, [selectedFramework]);

  const selectedFrameworkData = useMemo(() => {
    if (selectedFramework === "all") return null;
    return frameworks.find((f) => f.id === selectedFramework);
  }, [selectedFramework]);

  const acceptedCount = filteredControls.filter((c) => c.status === "Accepted").length;
  const evidenceNeededCount = filteredControls.filter(
    (c) => c.status === "Additional Evidence Needed"
  ).length;
  const needsReviewCount = filteredControls.filter(
    (c) => c.status === "Needs Review"
  ).length;
  const notApplicableCount = filteredControls.filter(
    (c) => c.status === "Not Applicable"
  ).length;

  const frameworkTabs = [
    { id: "all", name: "All Frameworks" },
    ...frameworks.map((f) => ({ id: f.id, name: f.name })),
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Compliance", href: "/frameworks" },
          { label: "Controls" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Controls</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your security controls across all frameworks.
            </p>
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "criteria" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("criteria")}
              className="gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              By Criteria
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              Table
            </Button>
          </div>
        </div>

        {/* Framework Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-2">
          {frameworkTabs.map((tab) => {
            const isActive = selectedFramework === tab.id;
            const controlCount = tab.id === "all"
              ? controls.length
              : controls.filter((c) => c.frameworkIds.includes(tab.id)).length;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFramework(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
                <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                  isActive ? "bg-primary-foreground/20" : "bg-background"
                }`}>
                  {controlCount}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{acceptedCount}</p>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <FileQuestion className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{needsReviewCount}</p>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{evidenceNeededCount}</p>
                  <p className="text-sm text-muted-foreground">Evidence Needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                  <MinusCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notApplicableCount}</p>
                  <p className="text-sm text-muted-foreground">Not Applicable</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View based on mode and framework selection */}
        {viewMode === "criteria" ? (
          selectedFrameworkData ? (
            <ControlsByFramework
              framework={selectedFrameworkData}
              controls={filteredControls}
            />
          ) : (
            <ControlsByCriteria controls={filteredControls} />
          )
        ) : (
          <ControlsTable controls={filteredControls} />
        )}
      </div>
    </>
  );
}
