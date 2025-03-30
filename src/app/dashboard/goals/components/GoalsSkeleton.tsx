import GoalCardSkeleton from "./GoalCardSkeleton";

const GoalsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <GoalCardSkeleton key={i} />
        ))}
    </div>
  );
};

export default GoalsSkeleton;
