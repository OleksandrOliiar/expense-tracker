import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import PusherMessages from "./components/PusherMessages";
import BeamsNotifications from "./components/BeamsNotifications";
import Dialogs from "./components/Dialogs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header> */}
          <div className="py-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <PusherMessages />
      <BeamsNotifications />
      <Dialogs />
    </>
  );
};

export default DashboardLayout;
