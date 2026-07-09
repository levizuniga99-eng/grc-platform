"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { RiskRegisterTable } from "@/components/risks/risk-register-table";
import { AddRiskDialog } from "@/components/risks/add-risk-dialog";
import { ImportRisksDialog } from "@/components/risks/import-risks-dialog";
import { risks as mockRisks } from "@/lib/mock-data/risks";
import { Risk } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";
import { RotateCcw } from "lucide-react";

const STORAGE_KEY = "grc-risks";

function loadSavedRisks(): Risk[] | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveRisks(risks: Risk[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(risks));
  } catch {
    // Ignore storage errors
  }
}

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved risks on mount
  useEffect(() => {
    const savedRisks = loadSavedRisks();
    if (savedRisks && savedRisks.length > 0) {
      setRisks(savedRisks);
    }
    setIsLoaded(true);
  }, []);

  // Save risks whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveRisks(risks);
    }
  }, [risks, isLoaded]);

  const handleAddRisk = (risk: Risk) => {
    setRisks((prev) => [...prev, risk]);
  };

  const handleImportRisks = (importedRisks: Risk[]) => {
    setRisks((prev) => [...prev, ...importedRisks]);
  };

  const handleUpdateRisk = (updatedRisk: Risk) => {
    setRisks((prev) =>
      prev.map((risk) => (risk.id === updatedRisk.id ? updatedRisk : risk))
    );
  };

  const handleDeleteRisk = (riskId: string) => {
    setRisks((prev) => prev.filter((risk) => risk.id !== riskId));
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRisks(mockRisks);
  };

  const criticalCount = risks.filter((r) => r.severity === "Critical").length;
  const highCount = risks.filter((r) => r.severity === "High").length;
  const openCount = risks.filter((r) => r.status === "Open").length;
  const needsReviewCount = risks.filter((r) => {
    const lastReviewed = r.lastReviewed || r.dueDate;
    const daysSinceReview = differenceInDays(new Date(), new Date(lastReviewed));
    return daysSinceReview > 365;
  }).length;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Risk Management", href: "/risks" },
          { label: "Risks" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Risk Register</h1>
            <p className="text-muted-foreground mt-1">
              Identify, assess, and manage organizational risks.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleResetToDefaults} title="Reset to default risks">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <ImportRisksDialog onImportRisks={handleImportRisks} />
            <AddRiskDialog onAddRisk={handleAddRisk} />
          </div>
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
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{needsReviewCount}</p>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">All Risks ({risks.length})</h2>
          <RiskRegisterTable
            risks={risks}
            onUpdateRisk={handleUpdateRisk}
            onDeleteRisk={handleDeleteRisk}
          />
        </div>
      </div>
    </>
  );
}
