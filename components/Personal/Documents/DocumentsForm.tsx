"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { host, personalDocumentsEndpoint } from "@/lib/constants";
import { deletePersonalDocument, getPersonalDocuments } from "@/lib/employeeAPIActions";
import { PersonalDocument } from "@/models/personal";
import { columns } from "./columns";
import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";
import { toast } from "sonner";

async function getData(personalId: number): Promise<PersonalDocument[]> {
  return await getPersonalDocuments(personalId);
}

export default function DocumentsForm({ id }: { id: number }) {
  const [data, setData] = useState<PersonalDocument[]>([]);
  // Archivo
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleView = async (id: number) => {
    console.log("Se ejecuta");
    // Obtengo la ruita del archivo
    const response = await fetch(`${personalDocumentsEndpoint}/file/${id}`);
    const data = await response.json();
    if (response.ok) {
      const url = `${host}${data.documentRoute}`;
      window.open(url, "_blank");
    } else {
      console.error(response);
    }
  };

  const handleUploadSingle = async (file: File) => {
    console.log(file);

    if (!file) {
      setError("Debe seleccionar un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${personalDocumentsEndpoint}/${id}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const newFile = await response.json();
      // setData([...data, newFile]);
      const actualData = data;
      setData(data.concat(newFile));
      setError(null);
    } else {
      setError("Error al subir el archivo");
      console.error(response);
    }
  };

  const handleUpload = async () => {
    files.forEach((file) => {
      handleUploadSingle(file);
    });
  };

  const setFilesFromChild = (files: File[]) => {
    setFiles(files);
  };

  const handleDelete = async (id: number) => {
    const response = await deletePersonalDocument(selectedRow!);
    if (response === 200) {
      setData(data.filter((campus) => campus.id !== id));
      toast.success("Documento eliminado correctamente");
    } else {
      toast.error("Error al eliminar el documento");
    }
    // Actualizar la tabla
    getData(id).then((data) => {
      setData(data);
    });
  };

  const selectRow = (id: number) => {
    setSelectedRow(id);
    setOpen(true);
  };

  useEffect(() => {
    getData(id).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        handleViewFile={handleView}
        handleDelete={handleDelete}
        handleUpload={handleUpload}
        setFilesFromChild={setFilesFromChild}
        selectRow={selectRow}
        personalId={id}
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
        title="Eliminar documento"
        message="¿Está seguro que desea eliminar este documento?"
      />
    </>
  );
}
