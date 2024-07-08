"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { JustificationFile } from "@/models/justification";
import { DownloadIcon } from "lucide-react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    handleDownload: (id: string) => void;
  }
}

const ActionColumn: Partial<ColumnDef<JustificationFile>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue() as string;

    const handleDownload = () => {
      table.options.meta?.handleDownload(initialValue);
    };

    return (
      <>
        <Button variant={"secondary"} size={"icon"} onClick={handleDownload}>
          <DownloadIcon width={20} />
        </Button>
      </>
    );
  },
};

export const columns: ColumnDef<JustificationFile>[] = [
  {
    accessorKey: "documentName",
    header: "Nombre del archivo",
    size: 500,
  },
  {
    accessorKey: "documentRoute",
    header: "",
    ...ActionColumn,
  },
];
