import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
