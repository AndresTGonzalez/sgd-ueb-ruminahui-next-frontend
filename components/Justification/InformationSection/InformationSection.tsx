"use client";

import { useState, useEffect } from "react";
import { Justification } from "@/models/justification";
import InfoItem from "./InfoItem";
import { getJustification } from "@/lib/justificationAPIActions";

export default function InformationSection({
  personalId,
}: {
  personalId: number;
}) {
  const [justification, setJustification] = useState<Justification | null>(null);

  useEffect(() => {
    const fetchJustification = async () => {
      if (personalId === 0) return;
      const justification = await getJustification(personalId);
      setJustification(justification);
    };

    fetchJustification();
  }, [personalId]);

  if (!justification) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <div className="w-full grid grid-cols-1">
        <InfoItem title="Cedula: " value={justification.identificationCard} />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Nombre: " value={justification.names.toUpperCase()} />
        <InfoItem title="Apellido: " value={justification.lastNames.toUpperCase()} />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Tipo de justificación: " value={justification.type.toUpperCase()} />
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
          <InfoItem title="Área: " value={justification.extraInfo.departament.toUpperCase()} />
          <InfoItem title="Explicación: " value={justification.extraInfo.explanation.toUpperCase()} />
        </div>
        
      )}
    </div>
  );
}
