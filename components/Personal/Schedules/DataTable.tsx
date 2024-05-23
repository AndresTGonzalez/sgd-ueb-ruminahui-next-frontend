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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { PlusIcon } from "@heroicons/react/24/solid";
import { SchedulesFormDialog } from "./SchedulesFormDialog";
import { CreateAssistancePersonalIdentificatorDTO } from "@/models/assistancePersonalIdentificator";
import { PersonalSchedule } from "@/models/personal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  personalId: number;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  selectRow?: (id: number) => void;
  handleView?: (id: number) => void;
  handleNew?: (data: PersonalSchedule) => void;
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
    },
  });

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <SchedulesFormDialog handleNew={handleNew!} personalId={personalId} />
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

// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   SortingState,
//   getSortedRowModel,
//   ColumnFiltersState,
//   getFilteredRowModel,
// } from "@tanstack/react-table";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// import { PlusIcon } from "@heroicons/react/24/solid";
// import { SchedulesFormDialog } from "./SchedulesFormDialog";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   handleDelete?: (id: number) => void;
//   handleEdit?: (id: number) => void;
//   selectRow?: (id: number) => void;
//   handleView?: (id: number) => void;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   handleDelete,
//   handleEdit,
//   selectRow,
//   handleView,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const router = useRouter();

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//     },
//     meta: {
//       deleteData: (id: number) => {
//         handleDelete && handleDelete(id);
//       },
//       viewData: (id: number) => {
//         handleView && handleView(id);
//       },
//       editData: (id: number) => {
//         handleEdit && handleEdit(id);
//       },
//       selectRow: (id: number) => {
//         selectRow && selectRow(id);
//       },
//     },
//   });

//   const handleNew = () => {
//     router.push("/dashboard/personal/formulario/0");
//   };

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-between py-4">
//         <SchedulesFormDialog />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No existen horarios registrados
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
