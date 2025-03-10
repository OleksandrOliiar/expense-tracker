"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown01, ArrowDownZA, ArrowUp10, ArrowUpZA } from "lucide-react";
import { EditTransactionSchema } from "../validations/editTransactionSchema";
import TransactionMenu from "./TransactionMenu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type Transaction = {
  id: string;
  amount: number | string;
  date: Date;
  category: {
    name: string;
    id: string;
    icon: string | null;
  } | null;
  name: string | null;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-muted/40"
        >
          Date
          {column.getIsSorted() === "asc" ? (
            <ArrowDown01 className="h-4 w-4" />
          ) : (
            <ArrowUp10 className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date");

      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date as Date);

      return formatted;
    },
    enableMultiSort: true
  },
  {
    accessorKey: "category",
    header: () => {
      return (
        <Button variant="ghost" className="px-0 hover:bg-muted/40">
          Category
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as {
        name: string;
        icon: string | null;
      };

      if (!category) {
        return "No category";
      }

      if (category.icon && category.icon.includes("https")) {
        return (
          <div className="flex items-center gap-3">
            <Image
              src={category.icon}
              alt={category.name}
              width={20}
              height={20}
            />
            {category.name}
          </div>
        );
      }

      return `${category.icon} ${category.name}`;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="px-0 hover:bg-muted/40"
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ArrowDownZA className="h-4 w-4" />
          ) : (
            <ArrowUpZA className="h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorFn: (row) => (!!row.name ? row.name : "No name"),
    enableMultiSort: true
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-muted/40"
        >
          Amount
          {column.getIsSorted() === "asc" ? (
            <ArrowDown01 className="h-4 w-4" />
          ) : (
            <ArrowUp10 className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      let formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      if (amount > 0) {
        formatted = `+${formatted}`;
      }

      return (
        <div
          className={cn("font-medium", {
            "text-emerald-500": amount > 0,
            "text-destructive": amount < 0,
          })}
        >
          {formatted}
        </div>
      );
    },
    enableMultiSort: true
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original as EditTransactionSchema;

      return <TransactionMenu transaction={payment} />;
    },
  },
];
