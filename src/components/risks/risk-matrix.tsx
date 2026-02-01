"use client";

import { Risk } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface RiskMatrixProps {
  risks: Risk[];
}

const impactLabels = ["Negligible", "Minor", "Moderate", "Major", "Severe"];
const likelihoodLabels = ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"];

function getCellColor(likelihood: number, impact: number): string {
  const score = likelihood * impact;
  if (score >= 15) return "bg-red-500 dark:bg-red-600";
  if (score >= 10) return "bg-orange-500 dark:bg-orange-600";
  if (score >= 5) return "bg-yellow-500 dark:bg-yellow-600";
  return "bg-green-500 dark:bg-green-600";
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const getRisksInCell = (likelihood: number, impact: number) => {
    return risks.filter(
      (r) => r.likelihood === likelihood && r.impact === impact
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Risk Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="flex">
              <div className="w-24 shrink-0" />
              <div className="flex-1 grid grid-cols-5 gap-1 mb-1">
                {impactLabels.map((label) => (
                  <div
                    key={label}
                    className="text-xs text-center text-muted-foreground font-medium"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-24 shrink-0 pr-2">
                <div className="text-xs text-muted-foreground font-medium text-right mb-1">
                  Impact →
                </div>
                <div className="text-xs text-muted-foreground font-medium text-right">
                  ↑ Likelihood
                </div>
              </div>

              <div className="flex-1">
                <TooltipProvider>
                  {[5, 4, 3, 2, 1].map((likelihood) => (
                    <div key={likelihood} className="flex items-center gap-1 mb-1">
                      <div className="w-20 text-xs text-muted-foreground text-right pr-2 shrink-0">
                        {likelihoodLabels[likelihood - 1]}
                      </div>
                      <div className="flex-1 grid grid-cols-5 gap-1">
                        {[1, 2, 3, 4, 5].map((impact) => {
                          const cellRisks = getRisksInCell(likelihood, impact);
                          return (
                            <Tooltip key={`${likelihood}-${impact}`}>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "aspect-square rounded-md flex items-center justify-center text-white text-sm font-medium transition-transform hover:scale-105 cursor-pointer",
                                    getCellColor(likelihood, impact),
                                    cellRisks.length > 0 && "ring-2 ring-white dark:ring-gray-900"
                                  )}
                                >
                                  {cellRisks.length > 0 ? cellRisks.length : ""}
                                </div>
                              </TooltipTrigger>
                              {cellRisks.length > 0 && (
                                <TooltipContent side="right" className="max-w-xs">
                                  <div className="space-y-1">
                                    <p className="font-medium">
                                      {cellRisks.length} risk{cellRisks.length > 1 ? "s" : ""}
                                    </p>
                                    <ul className="text-sm space-y-0.5">
                                      {cellRisks.map((risk) => (
                                        <li key={risk.id} className="text-muted-foreground">
                                          {risk.id}: {risk.title}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500" />
                <span className="text-xs text-muted-foreground">Low (1-4)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500" />
                <span className="text-xs text-muted-foreground">Medium (5-9)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-500" />
                <span className="text-xs text-muted-foreground">High (10-14)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500" />
                <span className="text-xs text-muted-foreground">Critical (15+)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
