"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SchedulesFormDialog } from "./SchedulesFormDialog";
import { PersonalSchedule } from "@/models/personal";
import { Label } from "@/components/ui/label";
import { getEmployee } from "@/lib/employeeAPIActions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  personalId: number;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  selectRow?: (id: number) => void;
  handleView?: (id: number) => void;
  handleNew?: (data: PersonalSchedule) => void;
  changeStatus?: (value: boolean) => void;
  defaultStatus?: boolean;
}

async function getStatus(personalId: number): Promise<boolean> {
  const response = await getEmployee(personalId);
  return response.isActived;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleDelete,
  handleEdit,
  selectRow,
  handleView,
  handleNew,
  personalId,
  changeStatus,
  defaultStatus,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [aux, setAux] = React.useState<boolean>();

  React.useEffect(() => {
    const fetchData = async () => {
      const status = await getStatus(personalId);
      setAux(status);
      console.log("status", status);
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      deleteData: (id: number) => {
        handleDelete && handleDelete(id);
      },
      viewData: (id: number) => {
        handleView && handleView(id);
      },
      editData: (id: number) => {
        handleEdit && handleEdit(id);
      },
      selectRow: (id: number) => {
        selectRow && selectRow(id);
      },
      handleDelete: (id: number) => {},
      handleDownload: (id: string) => {},
      handleViewFile: (id: number) => {},
    },
  });

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <SchedulesFormDialog handleNew={handleNew!} personalId={personalId} />
        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode">Habilitar: </Label>
          <Switch
            id="airplane-mode"
            checked={aux}
            onCheckedChange={
              changeStatus
                ? (value) => {
                    changeStatus(value);
                    setAux(value);
                  }
                : undefined
            }
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No existen horarios registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
