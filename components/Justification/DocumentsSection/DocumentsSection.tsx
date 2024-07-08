"use client";

import { getJustificationFiles } from "@/lib/justificationAPIActions";
import { JustificationFile } from "@/models/justification";
import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { host, justificationFilesEndpoint } from "@/lib/constants";

async function getData(justificationId: number): Promise<JustificationFile[]> {
  return await getJustificationFiles(justificationId);
}

export default function DocumentsSection({ id }: { id: number }) {
  const [data, setData] = useState<JustificationFile[]>([]);
  // Archivo
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = (documentRoute: string) => {
    const url = `${host}${documentRoute}`;
    window.open(url, "_blank");
  };

  const handleUpload = async () => {
    console.log(file);

    if (!file) {
      setError("Debe seleccionar un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${justificationFilesEndpoint}/${id}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const newFile = await response.json();
      setData([...data, newFile]);
      setFile(null);
      setError(null);
    } else {
      setError("Error al subir el archivo");
      console.error(response);
    }

  };

  useEffect(() => {
    getData(id).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      handleDownload={handleDownload}
      justificationId={id}
      handleUpload={handleUpload}
      setFile={setFile}
    />
  );
}
