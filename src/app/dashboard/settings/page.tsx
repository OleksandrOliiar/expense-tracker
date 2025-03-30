import Search from "@/components/Search";
import DashboardNavigation from "../components/DashboardNavigation";
import BanksServer from "./components/BanksServer";
import SubscriptionServer from "./components/SubscriptionServer";
import PlaidLink from "./components/PlaidLink";

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
        <div className="flex justify-between flex-wrap items-center mb-6 gap-4">
          <div className="max-w-[350px]">
            <Search queryKey="name" id="bank-name" label="Search by name..." />
          </div>
          <PlaidLink />
        </div>
        <BanksServer name={searchParams.name} />
      </div>
    </>
  );
};

export default Settings;
