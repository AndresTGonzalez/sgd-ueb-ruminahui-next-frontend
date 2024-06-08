"use client";

import InfoItem from "./InfoItem";

export default function InformationSection({
  personalId,
}: {
  personalId: number;
}) {
  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <div className="w-full grid grid-cols-1">
        <InfoItem title="Cedula: " value="1803857646" />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Nombre: " value="Juan Carlos" />
        <InfoItem title="Apellido: " value="Perez" />
      </div>
      <div className="w-full grid grid-cols-1">
        <InfoItem title="Teléfonp: " value="0983987145" />
      </div>
      <div className="w-full grid grid-cols-1">
        <InfoItem title="Dirección: " value="Calle 1" />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Tipo de justificación: " value="Temporal" />
        <InfoItem title="Asunto: " value="Enfermedad" />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Fecha de salida: " value="12/12/2021" />
        <InfoItem title="Fecha de retorno: " value="12/12/2021" />
      </div>
      <div className="w-full grid grid-cols-2">
        <InfoItem title="Hora de salida: " value="12/12/2021" />
        <InfoItem title="Hora de retorno: " value="12/12/2021" />
      </div>
      <div className="w-full grid grid-cols-1">
        <InfoItem title="Observaciones: " value="Ninguna" />
      </div>
    </div>
  );
}
