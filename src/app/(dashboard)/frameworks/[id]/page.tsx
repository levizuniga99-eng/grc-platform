"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { FrameworkHeader } from "@/components/frameworks/framework-header";
import { CategoryAccordion } from "@/components/frameworks/category-accordion";
import { ControlsByCriteria } from "@/components/controls/controls-by-criteria";
import { frameworks } from "@/lib/mock-data/frameworks";
import { controls } from "@/lib/mock-data/controls";
import { Button } from "@/components/ui/button";
import { ListChecks, Map } from "lucide-react";

interface FrameworkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function FrameworkDetailPage({
  params,
}: FrameworkDetailPageProps) {
  const { id } = use(params);
  const framework = frameworks.find((f) => f.id === id);
  const [activeTab, setActiveTab] = useState<"controls" | "journey">("controls");

  const frameworkControls = useMemo(() => {
    return controls.filter((c) => c.frameworkIds.includes(id));
  }, [id]);

  if (!framework) {
    notFound();
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Compliance", href: "/frameworks" },
          { label: "Frameworks", href: "/frameworks" },
          { label: framework.name },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <FrameworkHeader framework={framework} />

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
          <Button
            variant={activeTab === "controls" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("controls")}
            className="gap-2"
          >
            <ListChecks className="h-4 w-4" />
            Controls
          </Button>
          <Button
            variant={activeTab === "journey" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("journey")}
            className="gap-2"
          >
            <Map className="h-4 w-4" />
            Compliance Journey
          </Button>
        </div>

        {activeTab === "controls" ? (
          <ControlsByCriteria controls={frameworkControls} />
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Categories ({framework.categories.length})
            </h2>
            {framework.categories.map((category, index) => (
              <CategoryAccordion
                key={category.id}
                category={category}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
