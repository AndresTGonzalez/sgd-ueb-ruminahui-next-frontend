"use client";

import { Badge } from "@/components/ui/badge";

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
import { Employee } from "@/models/personal";
import { Assistance } from "@/models/assistance";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: number) => void;
    viewData: (id: number) => void;
    editData: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<Assistance>> = {
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
            <DropdownMenuItem onClick={handleView}>Visualizar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Modificar</DropdownMenuItem>
            <DropdownMenuItem onClick={selectRow}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  },
};

export const columns: ColumnDef<Assistance>[] = [
  {
    accessorKey: "identificationCard",
    header: "Cédula",
  },
  {
    accessorKey: "names",
    enableResizing: true,
    size: 40,
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <h2>Nombres</h2>
          <Button
            variant="ghost"
            size={"icon"}
            className="ml-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "lastNames",
    enableResizing: true,
    size: 40,
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <h2>Apellidos</h2>
          <Button
            variant="ghost"
            size={"icon"}
            className="ml-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "clockCheck",
    header: "Registro de reloj",
  },
  {
    accessorKey: "onTime",
    header: "A tiempo",
    cell: ({ getValue }) => {
      // return getValue() ? "Sí" : "No";
      return (
        <Badge variant={getValue() ? "success" : "destructive"}>
          {getValue() ? "A tiempo" : "Atraso o inconsistencia"}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "id",
  //   header: "",
  //   ...ActionColumn,
  // },
];
