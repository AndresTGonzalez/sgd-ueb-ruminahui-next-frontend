"use client";

import { useRouter } from "next/navigation";
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
import { Campus } from "@/models/campus";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: number) => void;
    viewData: (id: number) => void;
    editData: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<Campus>> = {
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
            <DropdownMenuItem onClick={handleEdit}>Modificar</DropdownMenuItem>
            <DropdownMenuItem onClick={selectRow}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  },
};

export const columns: ColumnDef<Campus>[] = [
  {
    accessorKey: "name",
    size: 20,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Dirección",
    size: 500,
  },
  // {
  //   accessorKey: "actions",
  //   header: "",

  //   cell: ({ row }) => {
  //     const router = useRouter();

  //     const handleEdit = () => {
  //       router.push(`/dashboard/sedes/${row.original.id}`);
  //     };
  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant={"secondary"} size={"icon"}>
  //               <EllipsisVerticalIcon width={20} />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent>
  //             <DropdownMenuItem onClick={handleEdit}>
  //               Modificar
  //             </DropdownMenuItem>
  //             <DropdownMenuItem>Eliminar</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </>
  //     );
  //   },
  // },
  {
    accessorKey: "id",
    header: "",
    ...ActionColumn,
  },
];
