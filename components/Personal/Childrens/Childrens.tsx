"use client";

import { useState, useEffect } from "react";

import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { PersonalChildrens } from "@/models/personal";
import {
  createPersonalChildren,
  deletePersonalChildren,
  getPersonalChildrens,
} from "@/lib/employeeAPIActions";
import { toast } from "sonner";

async function getData(personalId: number): Promise<PersonalChildrens[]> {
  return await getPersonalChildrens(personalId);
}

export default function Childrens({ personalId }: { personalId: number }) {
  const [data, setData] = useState<PersonalChildrens[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const selectRow = (id: number) => {
    setOpen(true);
    setSelectedRow(id);
  };

  const handleNew = async (formData: PersonalChildrens) => {
    const response = await createPersonalChildren(formData);
    // Si se ejecuta correctamente, se debe agregar el registro a la tabla
    if (response) {
      const newData: PersonalChildrens = response;
      setData([...data, newData]);

      toast.success("Hijo creado correctamente");
    } else {
      toast.error("Error al crear el hijo del empleado");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deletePersonalChildren(id);

    if (response === 200) {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      toast.success("Hijo eliminado correctamente");
    } else {
      toast.error("Error al eliminar el hijo del empleado");
    }
  };

  useEffect(() => {
    getData(personalId).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
          selectRow={selectRow}
          personalId={personalId}
          handleNew={handleNew}
        />
      </div>
      <DeleteAlertDialog
        open={open}
        id={selectedRow!}
        handleCancel={() => {
          setOpen(false);
        }}
        handleDelete={async () => {
          await handleDelete(selectedRow!);
          setOpen(false);
        }}
        title="Eliminar empleado"
        message="¿Está seguro que desea eliminar este empleado?"
      />
    </>
  );
}
