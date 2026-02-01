"use client";

import { useState, useEffect } from "react";
import { Framework, Control, ControlStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ControlStatusSelect } from "./control-status-select";
import { ControlDetailPanel } from "./control-detail-panel";
import { StatusBadge, getStatusType } from "@/components/shared/status-badge";
import { ChevronDown, ChevronRight } from "lucide-react";

const STORAGE_KEY = "grc-controls";

interface ControlsByFrameworkProps {
  framework: Framework;
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

export function ControlsByFramework({ framework, controls: initialControls }: ControlsByFrameworkProps) {
  const [controls, setControls] = useState<Control[]>(initialControls);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  // Load saved controls on mount
  useEffect(() => {
    const savedControls = loadSavedControls();
    if (savedControls && savedControls.length > 0) {
      setControls(savedControls);
    }
    // Expand all categories by default
    setExpandedCategories(new Set(framework.categories.map((c) => c.id)));
  }, [framework]);

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const getControlById = (controlId: string) => {
    return controls.find((c) => c.id === controlId);
  };

  return (
    <div className="space-y-4">
      {framework.categories.map((category) => {
        const isExpanded = expandedCategories.has(category.id);
        const categoryControls = new Set<string>();
        category.requirements.forEach((req) => {
          req.mappedControlIds.forEach((id) => categoryControls.add(id));
        });

        return (
          <Card key={category.id}>
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">
                  {category.requirements.length} requirements
                </Badge>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-6">
                  {category.requirements.map((requirement) => {
                    const mappedControls = requirement.mappedControlIds
                      .map(getControlById)
                      .filter(Boolean) as Control[];

                    return (
                      <div key={requirement.id} className="border-l-2 border-muted pl-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono">
                                {requirement.referenceCode}
                              </Badge>
                              <StatusBadge
                                status={getStatusType(requirement.status)}
                                label={requirement.status}
                              />
                            </div>
                            <h4 className="font-medium mt-2">{requirement.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {requirement.description}
                            </p>
                          </div>
                        </div>

                        {mappedControls.length > 0 ? (
                          <div className="bg-muted/30 rounded-lg p-3 mt-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Mapped Controls ({mappedControls.length})
                            </p>
                            <div className="space-y-2">
                              {mappedControls.map((control) => (
                                <div
                                  key={control.id}
                                  className="flex items-center justify-between bg-background rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                                  onClick={() => setSelectedControl(control)}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs text-muted-foreground">
                                      {control.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                      {control.name}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {control.type}
                                    </Badge>
                                  </div>
                                  <ControlStatusSelect
                                    value={control.status}
                                    onValueChange={(newStatus) =>
                                      handleStatusChange(control.id, newStatus)
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-muted/30 rounded-lg p-3 mt-3">
                            <p className="text-sm text-muted-foreground italic">
                              No controls mapped to this requirement
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
