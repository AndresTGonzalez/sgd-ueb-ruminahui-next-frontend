"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DeleteIcon, DownloadIcon, TrashIcon } from "lucide-react";
import { PersonalDocument } from "@/models/personal";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    handleDelete: (id: number) => void;
    handleViewFile: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<PersonalDocument>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue() as number;

    const handleDelete = () => {
      table.options.meta?.handleDelete(initialValue);
    }

    const handleViewFile = () => {
      console.log("Se ejecuta con id: ", initialValue);
      table.options.meta?.handleViewFile(initialValue);
    }

    const selectRow = () => {
      table.options.meta?.selectRow(initialValue);
    }

    return (
      <>
        <div className="flex flex-row gap-3">
          <Button variant={"secondary"} size={"icon"} onClick={handleViewFile}>
            <DownloadIcon width={20} />
          </Button>
          <Button variant={"secondary"} size={"icon"} onClick={selectRow}>
            <TrashIcon width={20} />
          </Button>
        </div>
      </>
    );
  },
};

export const columns: ColumnDef<PersonalDocument>[] = [
  {
    accessorKey: "documentName",
    header: "Nombre del archivo",
    size: 500,
  },
  {
    accessorKey: "id",
    header: "",
    ...ActionColumn,
  },
];
