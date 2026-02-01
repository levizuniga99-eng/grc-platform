"use client";

import { FrameworkCategory } from "@/types";
import { RequirementRow } from "./requirement-row";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CategoryAccordionProps {
  category: FrameworkCategory;
  defaultOpen?: boolean;
}

export function CategoryAccordion({
  category,
  defaultOpen = false,
}: CategoryAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const satisfiedCount = category.requirements.filter(
    (r) => r.status === "Satisfied"
  ).length;
  const partialCount = category.requirements.filter(
    (r) => r.status === "Partially Satisfied"
  ).length;
  const notSatisfiedCount = category.requirements.filter(
    (r) => r.status === "Not Satisfied"
  ).length;

  const progress = Math.round(
    (satisfiedCount / category.requirements.length) * 100
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    ({category.requirements.length} requirements)
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>{satisfiedCount}</span>
                  </div>
                  {partialCount > 0 && (
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>{partialCount}</span>
                    </div>
                  )}
                  {notSatisfiedCount > 0 && (
                    <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                      <XCircle className="h-4 w-4" />
                      <span>{notSatisfiedCount}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{progress}%</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {category.requirements.map((requirement) => (
                <RequirementRow key={requirement.id} requirement={requirement} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
