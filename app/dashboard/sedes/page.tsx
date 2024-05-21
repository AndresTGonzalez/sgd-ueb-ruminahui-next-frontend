"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Campus } from "@/models/campus";
import { deleteCampus, getCampus } from "@/lib/campusAPIActions";
import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";
import { toast } from "sonner";
import { DataTable } from "@/components/Campus/DataTable";
import { columns } from "@/components/Campus/columns";

async function getData(): Promise<Campus[]> {
  return await getCampus();
}

export default function Page() {
  const router = useRouter();

  const [data, setData] = useState<Campus[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

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
    const response = await deleteCampus(id);
    if (response === 200) {
      setData(data.filter((campus) => campus.id !== id));
      toast.success("Campus eliminado correctamente");
    } else {
      toast.error("Error al eliminar el campus");
    }
  };

  const handleEdit = (id: number) => {
    router.push("/dashboard/sedes/" + id);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        selectRow={selectRow}
        handleEdit={handleEdit}
      />
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
        title="Eliminar campus"
        message="¿Está seguro que desea eliminar este campus?"
      />
    </div>
  );
}
