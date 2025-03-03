import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionsTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div>
      <div className="flex items-center py-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="ml-auto h-8 w-[150px]" />{" "}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-6 w-6" /> {/* Checkbox */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[100px]" /> {/* Date */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[120px]" /> {/* Category */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[150px]" /> {/* Payee */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[100px]" /> {/* Amount */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-6" /> {/* Actions */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" /> {/* Checkbox */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[90px]" /> {/* Date */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[100px]" /> {/* Category */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[120px]" /> {/* Payee */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[80px]" /> {/* Amount */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6 rounded-full" />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-[100px]" /> {/* Previous button */}
        <Skeleton className="h-8 w-[80px]" /> {/* Next button */}
      </div>
    </div>
  );
};

export default TransactionsTableSkeleton;
