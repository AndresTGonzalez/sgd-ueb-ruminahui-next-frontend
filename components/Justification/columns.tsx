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
  EyeIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";
import { Campus } from "@/models/campus";
import { Justification } from "@/models/justification";
import { capitalizeFirstLetter } from "@/utils/misc";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: number) => void;
    viewData: (id: number) => void;
    editData: (id: number) => void;
    selectRow: (id: number) => void;
  }
}

const ActionColumn: Partial<ColumnDef<Justification>> = {
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
        <Button variant={"secondary"} size={"icon"} onClick={handleView}>
          <EyeIcon width={20} />
        </Button>
      </>
    );
  },
};

export const columns: ColumnDef<Justification>[] = [
  {
    accessorKey: "names",
    header: "Nombres",
    size: 500,
  },
  {
    accessorKey: "lastNames",
    header: "Apellidos",
    size: 500,
  },
  {
    accessorKey: "applicationDate",
    header: "Fecha de aplicación",
    size: 100,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    size: 100,
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return <span>{capitalizeFirstLetter(type)}</span>;
    },
  },
  {
    accessorKey: "justificationStatus",
    header: "Estado",
    size: 100,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return <span>{capitalizeFirstLetter(status)}</span>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    ...ActionColumn,
  },
];
