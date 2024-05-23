"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EllipsisVerticalIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";
import { PersonalData } from "@/models/personal";
import { AssistancePersonalIdentificator } from "@/models/assistancePersonalIdentificator";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: number) => void;
    viewData: (id: number) => void;
    editData: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<AssistancePersonalIdentificator>> = {
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

export const columns: ColumnDef<AssistancePersonalIdentificator>[] = [
  {
    accessorKey: "dispositive",
    header: "Dispositivo",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "code",
    header: "Codigo",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
  },
  {
    accessorKey: "id",
    header: "",
    ...ActionColumn,
  },
];
