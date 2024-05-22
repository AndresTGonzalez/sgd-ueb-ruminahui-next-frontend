"use client";

import { useState, useEffect } from "react";

import { PersonalData } from "@/models/personal";
import { deleteEmployee, getEmployees } from "@/lib/employeeAPIActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable } from "@/components/Personal/DataTable";
import { columns } from "@/components/Personal/columns";
import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";

async function getData(): Promise<PersonalData[]> {
  return await getEmployees();
}

export default function Page() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState<PersonalData[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  const selectRow = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteEmployee(id);
    if (response === 200) {
      setData(data.filter((employee) => employee.id !== id));
      toast.success("Empleado eliminado correctamente");
    } else {
      toast.error("Error al eliminar el empleado");
    }
  };

  const handleEdit = (id: number) => {
    router.push("/dashboard/personal/formulario/" + id);
  };

  const handleView = (id: number) => {
    router.push("/dashboard/personal/visualizar/" + id);
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
          selectRow={selectRow}
          handleEdit={handleEdit}
          handleView={handleView}
        />
      </div>
      <DeleteAlertDialog
        open={open}
        id={id}
        handleCancel={() => {
          setOpen(false);
        }}
        handleDelete={async () => {
          handleDelete(id);
          setOpen(false);
        }}
        title="Eliminar empleado"
        message="¿Está seguro que desea eliminar este empleado?"
      />
    </>
  );
}
