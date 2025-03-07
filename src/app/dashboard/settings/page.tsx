import BanksServer from "./components/BanksServer";
import PlaidLink from "./components/PlaidLink";
import PortalLink from "./components/PortalLink";

type SettingsProps = {
  searchParams: {
    name?: string;
  };
};

const Settings = ({ searchParams }: SettingsProps) => {
  return (
    <div className="px-4">
      <PortalLink />
      <PlaidLink />
      <BanksServer name={searchParams.name} />
    </div>
  );
};

export default Settings;
