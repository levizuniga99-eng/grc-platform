import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { FrameworkHeader } from "@/components/frameworks/framework-header";
import { CategoryAccordion } from "@/components/frameworks/category-accordion";
import { frameworks } from "@/lib/mock-data/frameworks";

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
      </div>
    </>
  );
}
