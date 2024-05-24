"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { PersonalCertifications, PersonalTitles } from "@/models/personal";
import { createTitle, deleteTitle, getTitles } from "@/lib/titleAPIActions";
import { toast } from "sonner";
import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";
import {
  createCertification,
  deleteCertification,
  getCertifications,
} from "@/lib/certificationAPIActions";

export default function CertificationsSection({
  personalId,
}: {
  personalId: number;
}) {
  const [certifications, setCertifications] = useState<
    PersonalCertifications[]
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);

  useEffect(() => {
    getCertifications(personalId).then((data) => {
      setCertifications(data);
    });
  }, []);

  const handleNew = async (data: PersonalCertifications) => {
    // const response = await createTitle(data);
    console.log(data);
    const response = await createCertification(data);

    if (response.statusCode === 201) {
      const newData: PersonalCertifications = {
        id: response.personalCertifications.id,
        certification: response.personalCertifications.certification,
        institution: response.personalCertifications.institution,
        completitionYear: response.personalCertifications.completitionYear,
        personalId: response.personalCertifications.personalId,
      };

      setCertifications([...certifications, newData]);

      toast.success("Certificado creado exitosamente");
    } else {
      toast.error("Error al crear el certificado");
    }
  };

  const handleDelete = async (id: number) => {
    // const response = await deleteTitle(id);
    const response = await deleteCertification(id);

    if (response === 200) {
      // setTitles(titles.filter((title) => title.id !== id));
      setCertifications(certifications.filter((certification) => certification.id !== id));
      toast.success("Certificado eliminado exitosamente");
    } else {
      toast.error("Error al eliminar el certificado");
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
        data={certifications}
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
        title="Eliminar certificado"
        message="¿Está seguro que desea eliminar este certificado?"
      />
    </div>
  );
}
