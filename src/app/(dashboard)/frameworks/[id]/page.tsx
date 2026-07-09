import { notFound } from "next/navigation";
import { frameworks } from "@/lib/mock-data/frameworks";
import { controls } from "@/lib/mock-data/controls";
import { FrameworkDetailClient } from "./framework-detail-client";

interface FrameworkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FrameworkDetailPage({
  params,
}: FrameworkDetailPageProps) {
  const { id } = await params;
  const framework = frameworks.find((f) => f.id === id);

  if (!framework) {
    notFound();
  }

  const frameworkControls = controls.filter((c) => c.frameworkIds.includes(id));

  return (
    <FrameworkDetailClient
      framework={framework}
      frameworkControls={frameworkControls}
    />
  );
}
