import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PusherMessages from "./components/PusherMessages";
import BeamsNotifications from "./components/BeamsNotifications";
import Dialogs from "./components/Dialogs";
import { DashboardSidebar } from "./components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div className="pt-[15px] pb-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <PusherMessages />
      <BeamsNotifications />
      <Dialogs />
    </>
  );
};

export default DashboardLayout;

export const dynamic = "force-dynamic";
