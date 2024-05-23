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
  deleteAssistancePersonalIdentificator,
  getAssistancePersonalIdentificator,
} from "@/lib/assistancePersonalIdentificatorAPIActions";
import { toast } from "sonner";
import { DeleteAlertDialog } from "../Misc/DeleteAlertDialog";

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

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    getAssistanceIdentificator().then((data) => {
      setAssistanceIdentificator(data);
    });
  }, []);

  const selectRow = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const handleNew = async (
    formData: CreateAssistancePersonalIdentificatorDTO
  ) => {
    const response = await createAssistancePersonalIdentificator(formData);
    console.log(response);
    // Si se ejecuta correctamente, se debe agregar el registro a la tabla
    if (response) {
      // assistanceIdentificator.push(response);
      const newData: AssistancePersonalIdentificator = {
        id: response.id,
        code: response.code,
        dispositive: response.AssistanceDispositive.name,
      };
      setAssistanceIdentificator([...assistanceIdentificator, newData]);

      toast.success("Código de asistencia creado correctamente");
    } else {
      toast.error("Error al crear el código de asistencia");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deleteAssistancePersonalIdentificator(id);
    if (response === 200) {
      setAssistanceIdentificator(
        assistanceIdentificator.filter((item) => item.id !== id)
      );
      toast.success("Código de asistencia eliminado correctamente");
    } else {
      toast.error("Error al eliminar el código de asistencia");
    }
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
          selectRow={selectRow}
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
    </div>
  );
}
