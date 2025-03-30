import { Skeleton } from "@/components/ui/skeleton"

const CategoriesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="w-[81px] rounded-xl" key={index} />
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
