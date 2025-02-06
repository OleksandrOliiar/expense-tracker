import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <span>Transactions</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <span>Accounts</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <span>Categories</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
