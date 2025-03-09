"use client";

import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const { queryParams, setQueryParams } = useQueryParams<{
    page?: number;
  }>();

  const currentPage = queryParams.get("page") ?? "1";

  const handlePrevClick = () => {
    setQueryParams({ page: +currentPage - 1 });
  };

  const handleNextClick = () => {
    setQueryParams({ page: +currentPage + 1 });
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={handlePrevClick}
        disabled={+currentPage === 1}
      >
        <ChevronLeft className="mr-2 h-5 w-5" /> Prev
      </Button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <Button
        variant="ghost"
        onClick={handleNextClick}
        disabled={+currentPage === totalPages}
      >
        Next <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
