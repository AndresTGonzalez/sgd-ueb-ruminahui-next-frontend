"use client";

import { useState, useEffect } from "react";
import { Justification, JustificationStatus } from "@/models/justification";
import InfoItem from "./InfoItem";
import {
  changeJustificationStatus,
  getJustification,
  getJustificationStatus,
} from "@/lib/justificationAPIActions";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/utils/misc";
import { toast } from "sonner";

export default function InformationSection({
  personalId,
}: {
  personalId: number;
}) {
  const [justification, setJustification] = useState<Justification | null>(
    null
  );
  const [justificationStatus, setJustificationStatus] = useState<
    JustificationStatus[]
  >([]);

  const [selectedStatus, setSelectedStatus] = useState<JustificationStatus>();

  useEffect(() => {
    const fetchJustificationStatus = async () => {
      if (personalId === 0) return;
      const justificationStatus = await getJustificationStatus();
      setJustificationStatus(justificationStatus);
    };

    const fetchJustification = async () => {
      if (personalId === 0) return;
      const justification = await getJustification(personalId);
      setJustification(justification);
    };

    fetchJustification();
    fetchJustificationStatus();
  }, [personalId]);

  if (!justification) {
    return <div>Loading...</div>;
  }

  const handleChange = async (value: string) => {
    const status = justificationStatus.find(
      (status) => status.id === Number(value)
    );

    console.log(status?.id);

    const response = await changeJustificationStatus(justification.id, status!.id);

    if (response === 200) {
      toast.success("Estado de la justificación actualizado");
    } else {
      toast.error("Error al actualizar el estado de la justificación");
    }

  };

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <div className="w-full grid grid-cols-1">
        <InfoItem title="Cedula: " value={justification.identificationCard} />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Nombre: " value={justification.names.toUpperCase()} />
        <InfoItem
          title="Apellido: "
          value={justification.lastNames.toUpperCase()}
        />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem
          title="Tipo de justificación: "
          value={justification.type.toUpperCase()}
        />
        <InfoItem title="Asunto: " value={justification.affair.toUpperCase()} />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Fecha de salida: " value={justification.fromDate} />
        <InfoItem title="Fecha de retorno: " value={justification.toDate} />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Hora de salida: " value={justification.exitHour} />
        <InfoItem title="Hora de retorno: " value={justification.returnHour} />
      </div>
      {/* Si es que hay extraInfo se muestra */}
      {justification.extraInfo && (
        <div className="w-full grid grid-cols-1 gap-3">
          <InfoItem
            title="Área: "
            value={justification.extraInfo.departament.toUpperCase()}
          />
          <InfoItem
            title="Explicación: "
            value={justification.extraInfo.explanation.toUpperCase()}
          />
        </div>
      )}
      <Separator />
      {/* El select para aprobar */}
      <div className="flex flex-row items-center gap-6">
        <span>
          <strong>Estado de la justificación: </strong>
        </span>
        <Select
          defaultValue={justification.justificationStatusId.toString()}
          onValueChange={(value) => {
            handleChange(value);
          }}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* Iterar sobre la lista de estados */}
              {justificationStatus &&
                justificationStatus.map((status) => (
                  <SelectItem
                    key={status.id}
                    value={status.id.toString()}
                    // onClick={() => handleChange(status)}
                  >
                    <SelectLabel>
                      {capitalizeFirstLetter(status.name)}
                    </SelectLabel>
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
