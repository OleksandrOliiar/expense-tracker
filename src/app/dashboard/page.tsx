import DashboardNavigation from "./components/DashboardNavigation";

export default async function Page() {
  return (
    <>
      <header className="px-4 mb-8">
        <DashboardNavigation title="Overview" />
      </header>
    </>
  );
}
