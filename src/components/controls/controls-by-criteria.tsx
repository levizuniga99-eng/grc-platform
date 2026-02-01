"use client";

import { useState, useEffect, useMemo } from "react";
import { Control, ControlStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ControlStatusSelect } from "./control-status-select";
import { ControlDetailPanel } from "./control-detail-panel";
import { ControlFilters } from "./control-filters";
import { ChevronDown, ChevronRight } from "lucide-react";
import { frameworks } from "@/lib/mock-data/frameworks";

const STORAGE_KEY = "grc-controls";

interface ControlsByCriteriaProps {
  controls: Control[];
}

interface CriteriaGroup {
  id: string;
  name: string;
  description: string;
  controls: Control[];
}

function loadSavedControls(): Control[] | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveControls(controls: Control[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
  } catch {
    // Ignore storage errors
  }
}

// Build mapping of control IDs to criteria codes
function buildControlToCriteriaMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();

  frameworks.forEach((framework) => {
    framework.categories.forEach((category) => {
      category.requirements.forEach((requirement) => {
        requirement.mappedControlIds.forEach((controlId) => {
          const existing = map.get(controlId) || [];
          if (!existing.includes(requirement.referenceCode)) {
            existing.push(requirement.referenceCode);
          }
          map.set(controlId, existing);
        });
      });
    });
  });

  return map;
}

// Get SOC 2 categories with their controls
function buildCriteriaGroups(controls: Control[]): CriteriaGroup[] {
  const soc2 = frameworks.find((f) => f.id === "soc2-type2");
  if (!soc2) return [];

  const controlToCriteria = buildControlToCriteriaMap();
  const groups: CriteriaGroup[] = [];

  soc2.categories.forEach((category) => {
    // Get the category prefix (e.g., "CC1" from "soc2-cc1")
    const prefix = category.id.replace("soc2-", "").toUpperCase();

    // Find all controls that have criteria starting with this prefix
    const categoryControls = controls.filter((control) => {
      const criteria = controlToCriteria.get(control.id) || [];
      return criteria.some((c) => c.startsWith(prefix));
    });

    // Remove duplicates and sort by criteria
    const uniqueControls = Array.from(
      new Map(categoryControls.map((c) => [c.id, c])).values()
    );

    groups.push({
      id: category.id,
      name: category.name,
      description: category.description,
      controls: uniqueControls,
    });
  });

  return groups;
}

export function ControlsByCriteria({ controls: initialControls }: ControlsByCriteriaProps) {
  const [controls, setControls] = useState<Control[]>(initialControls);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const controlToCriteria = useMemo(() => buildControlToCriteriaMap(), []);

  // Filter controls based on selected filters
  const filteredControls = useMemo(() => {
    return controls.filter((control) => {
      if (statusFilter !== "all" && control.status !== statusFilter) {
        return false;
      }
      if (categoryFilter !== "all" && control.category !== categoryFilter) {
        return false;
      }
      return true;
    });
  }, [controls, statusFilter, categoryFilter]);

  // Load saved controls on mount
  useEffect(() => {
    const savedControls = loadSavedControls();
    if (savedControls && savedControls.length > 0) {
      setControls(savedControls);
    }
  }, []);

  const criteriaGroups = useMemo(() => buildCriteriaGroups(filteredControls), [filteredControls]);

  const handleStatusChange = (controlId: string, newStatus: ControlStatus) => {
    setControls((prev) => {
      const updated = prev.map((control) =>
        control.id === controlId ? { ...control, status: newStatus } : control
      );
      saveControls(updated);
      return updated;
    });

    if (selectedControl?.id === controlId) {
      setSelectedControl((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedGroups(new Set(criteriaGroups.map((g) => g.id)));
  };

  const collapseAll = () => {
    setExpandedGroups(new Set());
  };

  // Get status counts for a group
  const getStatusCounts = (groupControls: Control[]) => {
    const accepted = groupControls.filter((c) => c.status === "Accepted").length;
    const needsReview = groupControls.filter((c) => c.status === "Needs Review").length;
    const evidenceNeeded = groupControls.filter((c) => c.status === "Additional Evidence Needed").length;
    return { accepted, needsReview, evidenceNeeded, total: groupControls.length };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <ControlFilters
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
        />
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Expand All
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={collapseAll}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Collapse All
          </button>
        </div>
      </div>

      {criteriaGroups.map((group) => {
        const isExpanded = expandedGroups.has(group.id);
        const counts = getStatusCounts(group.controls);

        return (
          <Card key={group.id}>
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors py-4"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <CardTitle className="text-base">{group.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {counts.accepted > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {counts.accepted} Accepted
                    </Badge>
                  )}
                  {counts.needsReview > 0 && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {counts.needsReview} Review
                    </Badge>
                  )}
                  {counts.evidenceNeeded > 0 && (
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {counts.evidenceNeeded} Evidence
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {counts.total} controls
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {isExpanded && group.controls.length > 0 && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {group.controls.map((control) => {
                    const criteria = controlToCriteria.get(control.id) || [];
                    const prefix = group.id.replace("soc2-", "").toUpperCase();
                    const relevantCriteria = criteria
                      .filter((c) => c.startsWith(prefix))
                      .sort();

                    return (
                      <div
                        key={control.id}
                        className="flex items-center justify-between bg-muted/30 rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedControl(control)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex flex-wrap gap-1 shrink-0">
                            {relevantCriteria.map((code) => (
                              <Badge
                                key={code}
                                variant="outline"
                                className="font-mono text-xs"
                              >
                                {code}
                              </Badge>
                            ))}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">{control.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {control.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {control.type}
                          </Badge>
                        </div>
                        <div className="ml-3 shrink-0">
                          <ControlStatusSelect
                            value={control.status}
                            onValueChange={(newStatus) =>
                              handleStatusChange(control.id, newStatus)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}

            {isExpanded && group.controls.length === 0 && (
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground italic py-2">
                  No controls mapped to this criteria category
                </p>
              </CardContent>
            )}
          </Card>
        );
      })}

      <ControlDetailPanel
        control={selectedControl}
        open={!!selectedControl}
        onOpenChange={(open) => !open && setSelectedControl(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
