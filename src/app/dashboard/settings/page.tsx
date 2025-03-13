import DashboardNavigation from "../components/DashboardNavigation";
import BanksServer from "./components/BanksServer";
import PortalLink from "./components/PortalLink";
import SubscriptionServer from "./components/SubscriptionServer";

type SettingsProps = {
  searchParams: {
    name?: string;
  };
};

const Settings = ({ searchParams }: SettingsProps) => {
  return (
    <>
      <header className="px-4 mb-8">
        <DashboardNavigation title="Settings" />
      </header>
      <div className="px-4">
        <SubscriptionServer />
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-12 mb-8">
          Connected banks
        </h2>
        <BanksServer name={searchParams.name} />
      </div>
    </>
  );
};

export default Settings;
