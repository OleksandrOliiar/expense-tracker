import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  Table as TTable,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import Search from "@/components/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import { Transaction } from "./Columns";
import ColumnsDropdown from "./ColumnsDropdown";
import DateFilter from "./DateFilter";
import DeleteTransactionsDialog from "./DeleteTransactionsDialog";
import DownloadCsvButton from "./DownloadCsvButton";
import TableBodySkeleton from "./TableBodySkeleton";
import TransactionsTablePagination from "./TransactionsTablePagination";
import TypeFilter from "./TypeFilter";

interface TransactionsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function TransactionsTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: TransactionsTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleDelete = () => {
    table.toggleAllRowsSelected(false);
  };

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
      <TransactionsTablePagination table={table} />
    </div>
  );
}
