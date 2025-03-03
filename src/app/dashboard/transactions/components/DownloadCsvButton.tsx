import { Row } from "@tanstack/react-table";
import { Transaction } from "./Columns";
import { useMemo, useRef } from "react";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type DownloadCsvButtonProps = {
  selectedRows: Row<Transaction>[];
};

const DownloadCsvButton = ({ selectedRows }: DownloadCsvButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const data = useMemo(
    () => selectedRows.map((row) => row.original),
    [selectedRows]
  );

  const handleClick = () => {
    ref.current?.link.click();
  };

  return (
    <>
      <Button variant="outline" onClick={handleClick}>
        <Download />
        Export CSV
      </Button>
      <CSVLink
        data={data}
        filename="transactions.csv"
        className="hidden"
        target="_blank"
        ref={(value: any) => {
          ref.current = value;
        }}
      />
    </>
  );
};

export default DownloadCsvButton;
