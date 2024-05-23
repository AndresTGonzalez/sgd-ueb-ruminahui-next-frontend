"use client";

import { useState, useEffect } from "react";

import {
  AssistancePersonalIdentificator,
  CreateAssistancePersonalIdentificatorDTO,
} from "@/models/assistancePersonalIdentificator";
import { Separator } from "../ui/separator";
import { DataTable as AssistanceCodesTable } from "./AssistanceCodes/DataTable";
import { columns as AssistanceCodesColumns } from "./AssistanceCodes/columns";
import { DataTable as SchedulesTable } from "./Schedules/DataTable";
import { columns as SchedulesColumns } from "./Schedules/columns";
import {
  createAssistancePersonalIdentificator,
  getAssistancePersonalIdentificator,
} from "@/lib/assistancePersonalIdentificatorAPIActions";

async function getAssistanceIdentificator(): Promise<
  AssistancePersonalIdentificator[]
> {
  return await getAssistancePersonalIdentificator();
}

// Agregar para horarios

export default function AssistanceSection({
  personalId,
}: {
  personalId: number;
}) {
  const [assistanceIdentificator, setAssistanceIdentificator] = useState<
    AssistancePersonalIdentificator[]
  >([]);

  useEffect(() => {
    getAssistanceIdentificator().then((data) => {
      setAssistanceIdentificator(data);
    });
  }, []);

  const handleNew = async (
    formData: CreateAssistancePersonalIdentificatorDTO
  ) => {
    console.log("Datos del formulario recibidos en el abuelo:", formData);
    // Aquí puedes ejecutar cualquier lógica adicional con los datos
    const response = await createAssistancePersonalIdentificator(formData);
  };

  return (
    <div className="w-full h-fit flex flex-row">
      <div className="w-1/2 h-96 p-8">
        <h3>Horarios:</h3>
        <Separator />
        <SchedulesTable columns={SchedulesColumns} data={[]} />
      </div>
      <div className="w-1/2 h-96 p-8">
        <h3>Códigos de asistencia:</h3>
        <Separator />
        <AssistanceCodesTable
          columns={AssistanceCodesColumns}
          data={assistanceIdentificator}
          personalId={personalId}
          handleNew={handleNew}
        />
      </div>
    </div>
  );
}
