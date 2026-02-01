"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Building2 } from "lucide-react";
import { useSettings } from "@/contexts/settings-context";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({ breadcrumbs, actions }: PageHeaderProps) {
  const { settings } = useSettings();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-sidebar">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <BreadcrumbItem key={item.label}>
                  {index > 0 && <BreadcrumbSeparator />}
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href ?? "#"}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        {actions && <div className="flex items-center gap-2">{actions}</div>}
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{settings.organizationName}</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-muted-foreground">{settings.scopeName}</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-muted-foreground">{settings.auditName}</span>
        </div>
      </div>
    </header>
  );
}
