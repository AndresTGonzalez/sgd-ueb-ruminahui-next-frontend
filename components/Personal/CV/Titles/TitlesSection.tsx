"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { PersonalTitles } from "@/models/personal";
import { createTitle, deleteTitle, getTitles } from "@/lib/titleAPIActions";
import { toast } from "sonner";
import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";

export default function TitlesSection({ personalId }: { personalId: number }) {
  const [titles, setTitles] = useState<PersonalTitles[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);

  useEffect(() => {
    getTitles(personalId).then((data) => {
      setTitles(data);
    });
  }, []);

  const handleNew = async (data: PersonalTitles) => {
    const response = await createTitle(data);

    if (response.statusCode === 201) {
      const newData: PersonalTitles = {
        id: response.personalTitles.id,
        title: response.personalTitles.title,
        institution: response.personalTitles.institution,
        completitionYear: response.personalTitles.completitionYear,
        personalId: response.personalTitles.personalId,
      };

      setTitles([...titles, newData]);

      toast.success("Título creado exitosamente");
    } else {
      toast.error("Error al crear el título");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deleteTitle(id);

    if (response === 200) {
      setTitles(titles.filter((title) => title.id !== id));
      toast.success("Título eliminado exitosamente");
    } else {
      toast.error("Error al eliminar el título");
    }
  };

  const selectRow = (id: number) => {
    setSelectedRow(id);
    setOpen(true);
  };

  return (
    <div className="w-full h-fit flex flex-col py-2">
      <DataTable
        personalId={Number(personalId)}
        columns={columns}
        data={titles}
        handleNew={handleNew}
        selectRow={selectRow}
      />
      <DeleteAlertDialog
        open={open}
        id={selectedRow}
        handleCancel={() => {
          setOpen(false);
        }}
        handleDelete={async () => {
          handleDelete(selectedRow);
          setOpen(false);
        }}
        title="Eliminar título"
        message="¿Está seguro que desea eliminar este título?"
      />
    </div>
  );
}
