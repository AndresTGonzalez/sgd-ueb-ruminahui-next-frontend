"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { PersonalCertifications, PersonalTitles } from "@/models/personal";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: number) => void;
    viewData: (id: number) => void;
    editData: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<PersonalCertifications>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue() as number;

    const handleView = () => {
      table.options.meta?.viewData(initialValue);
    };
    const handleDelete = () => {
      table.options.meta?.deleteData(initialValue);
    };
    const handleEdit = () => {
      table.options.meta?.editData(initialValue);
    };
    const selectRow = () => {
      table.options.meta?.selectRow(initialValue);
    };

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
              <EllipsisVerticalIcon width={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuItem onClick={handleView}>Visualizar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Modificar</DropdownMenuItem> */}
            <DropdownMenuItem onClick={selectRow}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  },
};

export const columns: ColumnDef<PersonalCertifications>[] = [
  {
    accessorKey: "certification",
    header: "Certificado o curso",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "institution",
    header: "Institución",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "completitionYear",
    header: "Año de finalización",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "id",
    header: "",
    ...ActionColumn,
  },
];
