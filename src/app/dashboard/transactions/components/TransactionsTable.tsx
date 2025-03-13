import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  SortingState,
  Table as TTable,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import { Transaction } from "./Columns";
import ColumnsDropdown from "./ColumnsDropdown";
import DateFilter from "./DateFilter";
import DeleteTransactionsDialog from "./DeleteTransactionsDialog";
import DownloadCsvButton from "./DownloadCsvButton";
import TableBodySkeleton from "./TableBodySkeleton";
import TransactionsTablePagination from "./TransactionsTablePagination";
import TypeFilter from "./TypeFilter";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

interface TransactionsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  totalPages: number;
}

export function TransactionsTable<TData, TValue>({
  columns,
  data,
  isLoading,
  totalPages,
}: TransactionsTableProps<TData, TValue>) {
  const { setQueryParams, queryParams } = useQueryParams<{
    page: string;
    perPage: string;
    sort: string;
  }>();

  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState(() => {
    return {
      pageIndex: queryParams.get("page")
        ? parseInt(queryParams.get("page")!)
        : 0,
      pageSize: queryParams.get("perPage")
        ? parseInt(queryParams.get("perPage")!)
        : 10,
    };
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: totalPages,
    manualSorting: true,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleDelete = () => {
    table.toggleAllRowsSelected(false);
  };

  const debouncedPagination = useDebouncedValue(pagination, 300);

  useEffect(() => {
    setQueryParams({
      page: debouncedPagination.pageIndex.toString(),
      perPage: debouncedPagination.pageSize.toString(),
    });
  }, [debouncedPagination, setQueryParams]);

  const debouncedSorting = useDebouncedValue(sorting, 300);

  useEffect(() => {
    if (debouncedSorting.length > 0) {
      const sort = debouncedSorting[0];

      const field = sort.id as "date" | "amount" | "name";
      const order = sort.desc ? "desc" : "asc";

      setQueryParams({ sort: `${field}-${order}` });
    } else {
      setQueryParams({ sort: undefined });
    }
  }, [debouncedSorting, setQueryParams]);

  return (
    <div>
      <div className="flex items-center flex-wrap gap-2 py-4">
        {selectedRows.length > 0 ? (
          <div className="flex items-center gap-2">
            <DeleteTransactionsDialog
              selectedRows={selectedRows as Row<Transaction>[]}
              onDelete={handleDelete}
            />
            <DownloadCsvButton
              selectedRows={selectedRows as Row<Transaction>[]}
            />
          </div>
        ) : null}
        <CategoriesFilter />
        <DateFilter />
        <TypeFilter />
        <ColumnsDropdown table={table as unknown as TTable<Transaction>} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBodySkeleton />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      row.toggleSelected();
                    }}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <TransactionsTablePagination table={table} dataLength={data.length} />
    </div>
  );
}
