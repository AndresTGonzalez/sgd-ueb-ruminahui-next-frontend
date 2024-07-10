"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PersonalChildrens } from "@/models/personal";
import { calculateAge, formatDateToEcuadorian } from "@/utils/misc";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: number) => void;
    viewData: (id: number) => void;
    editData: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<PersonalChildrens>> = {
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
        <div className="flex flex-row gap-3">
          <Button variant={"secondary"} size={"icon"} onClick={selectRow}>
            <TrashIcon width={20} />
          </Button>
        </div>
      </>
    );
  },
};

export const columns: ColumnDef<PersonalChildrens>[] = [
  {
    accessorKey: "names",
    header: "Nombres",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "lastNames",
    header: "Apellidos",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "birthdate",
    header: "Cumpleaños",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      const age = calculateAge(date);
      return formatDateToEcuadorian(date) + ` (${age} años)`;
    },
  },
  {
    accessorKey: "id",
    header: "",
    ...ActionColumn,
  },
];
