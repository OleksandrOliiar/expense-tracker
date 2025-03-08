import Search from "@/components/Search";
import BanksServer from "./components/BanksServer";
import PortalLink from "./components/PortalLink";
import PlaidLink from "./components/PlaidLink";

type SettingsProps = {
  searchParams: {
    name?: string;
  };
};

const Settings = ({ searchParams }: SettingsProps) => {
  return (
    <div className="px-4">
      <PortalLink />
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-12 mb-8">
        Connected banks
      </h2>
      <BanksServer name={searchParams.name} />
    </div>
  );
};

export default Settings;
