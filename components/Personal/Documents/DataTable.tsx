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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UploadDocument } from "./UploadDocument";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  selectRow?: (id: number) => void;
  handleDownload?: (id: number) => void;
  handleViewFile?: (id: number) => void
  handleUpload?: () => Promise<void>;
  personalId: number;
  setFilesFromChild: (files: File[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleViewFile,
  selectRow,
  handleUpload,
  handleDelete,
  setFilesFromChild,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const router = useRouter();

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
      handleViewFile: (id: number) => {
        handleViewFile && handleViewFile(id);
        console.log('Component DataTable: Viewing document with id: ', id);
      },
      handleDownload: (id: string) => {
        // handleDownload && handleDownload(id);
      },
      deleteData: (id: number) => {
        // handleDelete && handleDelete(id);
      },
      viewData: (id: number) => {
        // handleView && handleView(id);
      },
      editData: (id: number) => {
        // handleEdit && handleEdit(id);
      },
      selectRow: (id: number) => {
        selectRow && selectRow(id);
      },
      handleDelete: (id: number) => {
        handleDelete && handleDelete(id);
      },
    },
  });

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <UploadDocument
          handleUpload={handleUpload!}
          setFilesFromChild={setFilesFromChild}
        />
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
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
