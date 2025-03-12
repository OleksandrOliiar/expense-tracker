"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Banknote,
  Calculator,
  Goal,
  LayoutDashboard,
  Settings,
  Tag,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Banknote,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: Tag,
  },
  {
    title: "Goals",
    url: "/dashboard/goals",
    icon: Goal,
  },
  {
    title: "Budgets",
    url: "/dashboard/budgets",
    icon: Calculator,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="pt-[76px]">
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(pathname.endsWith(item.url) && "bg-muted")}
                  >
                    <item.icon />
                    <span className="ml-2">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
