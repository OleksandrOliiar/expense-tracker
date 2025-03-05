import GoalsServer from "./components/GoalsServer";

type GoalsProps = {
  searchParams: {
    name?: string;
  };
};

const Goals = ({ searchParams }: GoalsProps) => {
  return (
    <div className="px-4">
      <GoalsServer name={searchParams.name} />
    </div>
  );
};

export default Goals;