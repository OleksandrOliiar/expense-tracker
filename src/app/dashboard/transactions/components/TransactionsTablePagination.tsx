import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type TransactionsTablePaginationProps<T> = {
  table: Table<T>;
};

const TransactionsTablePagination = <T,>({
  table,
}: TransactionsTablePaginationProps<T>) => {
  const [pageSize, setPageSize] = useState(
    table.getState().pagination.pageSize
  );
  const debouncedPageSize = useDebouncedValue(pageSize, 500);

  useEffect(() => {
    table.setPageSize(debouncedPageSize);
  }, [debouncedPageSize]);

  return (
    <div className="flex items-center justify-end gap-6">
      <div className="flex items-center gap-2">
        <Label htmlFor="rows-per-page" className="text-sm text-nowrap">
          Rows per page:
        </Label>
        <Input
          id="rows-per-page"
          type="number"
          className="max-w-16 px-2 text-center h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TransactionsTablePagination;
