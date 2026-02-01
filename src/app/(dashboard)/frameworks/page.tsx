import { PageHeader } from "@/components/layout/page-header";
import { FrameworkCard } from "@/components/frameworks/framework-card";
import { frameworks } from "@/lib/mock-data/frameworks";

export default function FrameworksPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Compliance", href: "/frameworks" },
          { label: "Frameworks" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Compliance Frameworks</h1>
          <p className="text-muted-foreground mt-1">
            Track your compliance progress across regulatory frameworks and standards.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((framework) => (
            <FrameworkCard key={framework.id} framework={framework} />
          ))}
        </div>
      </div>
    </>
  );
}
