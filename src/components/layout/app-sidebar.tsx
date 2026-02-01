"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  Shield,
  FileCheck,
  FileText,
  AlertTriangle,
  ScrollText,
  Building2,
  Users,
  Plug,
  ShieldCheck,
  LogOut,
  KeyRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const clientNavigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        title: "Controls",
        url: "/controls",
        icon: FileCheck,
      },
      {
        title: "Evidence",
        url: "/evidence",
        icon: FileText,
      },
      {
        title: "Frameworks Overview",
        url: "/frameworks",
        icon: Shield,
      },
    ],
  },
  {
    title: "Risk Management",
    items: [
      {
        title: "Risks",
        url: "/risks",
        icon: AlertTriangle,
      },
      {
        title: "Policies",
        url: "/policies",
        icon: ScrollText,
      },
      {
        title: "Vendors",
        url: "/vendors",
        icon: Building2,
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        title: "People",
        url: "/people",
        icon: Users,
      },
      {
        title: "Access",
        url: "/access",
        icon: KeyRound,
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: Plug,
      },
    ],
  },
];

const auditorNavigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        title: "Controls",
        url: "/controls",
        icon: FileCheck,
      },
      {
        title: "Evidence",
        url: "/evidence",
        icon: FileText,
      },
      {
        title: "Frameworks Overview",
        url: "/frameworks",
        icon: Shield,
      },
    ],
  },
  {
    title: "Risk Management",
    items: [
      {
        title: "Risks",
        url: "/risks",
        icon: AlertTriangle,
      },
      {
        title: "Policies",
        url: "/policies",
        icon: ScrollText,
      },
      {
        title: "Vendors",
        url: "/vendors",
        icon: Building2,
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        title: "People",
        url: "/people",
        icon: Users,
      },
      {
        title: "Access",
        url: "/access",
        icon: KeyRound,
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: Plug,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const navigation = user?.role === "auditor" ? auditorNavigation : clientNavigation;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">GRC Platform</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.role === "auditor" ? "Auditor Portal" : "Client Portal"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        {user && (
          <div className="px-2 py-2 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <Badge variant={user.role === "auditor" ? "default" : "secondary"} className="text-xs">
                {user.role === "auditor" ? "Auditor" : "Client"}
              </Badge>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between px-2 pb-2">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
