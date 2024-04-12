"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

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
import { Employee } from "@/models/apiModels";

const columnHelper = createColumnHelper<Employee>();

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "identificationCard",
    header: "Cédula",
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
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
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
              <EllipsisVerticalIcon width={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>Opciones</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => {
                console.log("Edit", row.original.id);
              }}
            >
              Modificar
            </DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
