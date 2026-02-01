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
    <Card className="max-w-md">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-semibold">Risk Matrix</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="overflow-x-auto">
          <div className="min-w-[300px]">
            <div className="flex">
              <div className="w-16 shrink-0" />
              <div className="flex-1 grid grid-cols-5 gap-0.5 mb-0.5">
                {impactLabels.map((label, i) => (
                  <div
                    key={label}
                    className="text-[10px] text-center text-muted-foreground font-medium"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              <div className="w-16 shrink-0 pr-1">
                <div className="text-[10px] text-muted-foreground font-medium text-right">
                  L↑ I→
                </div>
              </div>

              <div className="flex-1">
                <TooltipProvider>
                  {[5, 4, 3, 2, 1].map((likelihood) => (
                    <div key={likelihood} className="flex items-center gap-0.5 mb-0.5">
                      <div className="w-4 text-[10px] text-muted-foreground text-right shrink-0">
                        {likelihood}
                      </div>
                      <div className="flex-1 grid grid-cols-5 gap-0.5">
                        {[1, 2, 3, 4, 5].map((impact) => {
                          const cellRisks = getRisksInCell(likelihood, impact);
                          return (
                            <Tooltip key={`${likelihood}-${impact}`}>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "h-6 w-6 rounded flex items-center justify-center text-white text-xs font-medium transition-transform hover:scale-105 cursor-pointer",
                                    getCellColor(likelihood, impact),
                                    cellRisks.length > 0 && "ring-1 ring-white dark:ring-gray-900"
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

            <div className="flex flex-wrap items-center justify-center gap-2 mt-2 pt-2 border-t">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-500" />
                <span className="text-[10px] text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-yellow-500" />
                <span className="text-[10px] text-muted-foreground">Med</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-orange-500" />
                <span className="text-[10px] text-muted-foreground">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-red-500" />
                <span className="text-[10px] text-muted-foreground">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
