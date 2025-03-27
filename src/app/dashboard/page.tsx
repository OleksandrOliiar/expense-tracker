import DashboardNavigation from "./components/DashboardNavigation";
import DashboardOverviewServer from "./components/DashboardOverviewServer";

type DashboardProps = {
  searchParams: {
    startDate?: string;
    endDate?: string;
    date?: string;
  };
};

export default async function Page({ searchParams }: DashboardProps) {
  return (
    <div className="overflow-x-hidden">
      <header className="px-4 mb-8">
        <DashboardNavigation title="Overview" />
      </header>
      <div className="px-4">
        <DashboardOverviewServer
          startDate={searchParams.startDate}
          endDate={searchParams.endDate}
          date={searchParams.date}
        />
      </div>
    </div>
  );
}