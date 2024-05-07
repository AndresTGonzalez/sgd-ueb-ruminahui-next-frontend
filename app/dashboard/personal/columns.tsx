"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteEmployee } from "@/lib/employeeAPIActions";

import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";

import { ColumnDef } from "@tanstack/react-table";

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
import { Employee } from "@/models/employee";

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
      const [open, setOpen] = useState(false);
      const router = useRouter();
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"} size={"icon"}>
                <EllipsisVerticalIcon width={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  // console.log("Edit", row.original.id);
                  router.push(`/dashboard/personal/${row.original.id}`);
                }}
              >
                Modificar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                }}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteAlertDialog
            open={open}
            handleEliminate={async () => {
              await deleteEmployee(row.original.id!);
              setOpen(false);
            }}
            title="Eliminar empleado"
            message="¿Está seguro que desea eliminar este empleado?"
          />
        </>
      );
    },
  },
];
