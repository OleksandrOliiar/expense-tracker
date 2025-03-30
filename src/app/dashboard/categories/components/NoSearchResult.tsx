import { SearchX } from "lucide-react";

interface NoSearchResultsProps {
  searchQuery: string;
}

const NoSearchResults = ({ searchQuery }: NoSearchResultsProps) => {
  return (
    <div className="mx-auto">
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <SearchX className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">No categories found</h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn&apos;t find any categories matching{" "}
            <span className="font-medium">&apos;{searchQuery}&apos;</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoSearchResults;
