"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteTransactionButton from "./DeleteTransactionButton";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { Row } from "@tanstack/react-table";
import { Transaction } from "./Columns";

type DeleteTransactionsDialogProps<TData> = {
  selectedRows: Row<TData>[];
  onDelete: () => void;
};

const DeleteTransactionsDialog = ({
  selectedRows,
  onDelete,
}: DeleteTransactionsDialogProps<Transaction>) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleClose = () => {
    handleOpenChange(false);
    onDelete();
  };

  const count = selectedRows.length;

  const ids = useMemo(
    () => selectedRows.map((row) => row.original.id),
    [selectedRows]
  );

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
          Delete {count} rows
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {count}{" "}
            transactions and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteTransactionButton
            transactionIds={ids}
            onClose={handleClose}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionsDialog;
