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
  getAssistancePersonalIdentificatorByPersonalId,
} from "@/lib/assistancePersonalIdentificatorAPIActions";
import { toast } from "sonner";
import { DeleteAlertDialog } from "../Misc/DeleteAlertDialog";
import { PersonalSchedule } from "@/models/personal";
import {
  createPersonalSchedule,
  deletePersonalSchedule,
  getPersonalSchedules,
} from "@/lib/personalSchedulesAPIActions";
import { changeStatus, getEmployee } from "@/lib/employeeAPIActions";

async function getAssistanceIdentificator(
  personalId: number
): Promise<AssistancePersonalIdentificator[]> {
  return await getAssistancePersonalIdentificatorByPersonalId(personalId);
}

async function getStatus(personalId: number): Promise<boolean> {
  const response = await getEmployee(personalId);
  return response.isActived;
}

export default function AssistanceSection({
  personalId,
}: {
  personalId: number;
}) {
  const [assistanceIdentificator, setAssistanceIdentificator] = useState<
    AssistancePersonalIdentificator[]
  >([]);
  const [personalSchedules, setPersonalSchedules] = useState<
    PersonalSchedule[]
  >([]);

  const [openCodeDelete, setOpenCodeDelete] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);

  const [scheduleId, setScheduleId] = useState(0);
  const [codeId, setCodeId] = useState(0);

  const [isActived, setIsActived] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [assistanceData, schedulesData, status] = await Promise.all([
          getAssistanceIdentificator(Number(personalId)),
          getPersonalSchedules(personalId),
          getStatus(personalId),
        ]);
        setAssistanceIdentificator(assistanceData);
        setPersonalSchedules(schedulesData);
        setIsActived(status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [personalId]);

  useEffect(() => {
    console.log("isActived changed:", isActived);
    setIsActived(isActived);
    console.log("isActived:", isActived);
  }, [isActived]);

  const selectRowCode = (id: number) => {
    setCodeId(id);
    setOpenCodeDelete(true);
  };

  const selectRowSchedule = (id: number) => {
    setScheduleId(id);
    setOpenScheduleDelete(true);
  };

  const handleNewSchedule = async (formData: PersonalSchedule) => {
    // console.log(formData);
    const response = await createPersonalSchedule(formData);
    // Si se ejecuta correctamente, se debe agregar el registro a la tabla
    if (response) {
      // personalSchedules.push(response);
      const newData: PersonalSchedule = {
        personalId: response.personalId,
        id: response.id,
        dayOfWeek: response.dayOfWeek,
        start: response.start,
        end: response.end,
      };
      setPersonalSchedules([...personalSchedules, newData]);
      toast.success("Horario creado correctamente");
    } else {
      toast.error("Error al crear el horario");
    }
  };

  const handleNewCode = async (
    formData: CreateAssistancePersonalIdentificatorDTO
  ) => {
    const response = await createAssistancePersonalIdentificator(formData);
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

  const handleDeleteCode = async (id: number) => {
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

  const handleDeleteSchedule = async (id: number) => {
    const response = await deletePersonalSchedule(id);
    if (response === 200) {
      setPersonalSchedules(personalSchedules.filter((item) => item.id !== id));
      toast.success("Horario eliminado correctamente");
    } else {
      toast.error("Error al eliminar el horario");
    }
  };

  const handleChangeStatus = async (value: boolean) => {
    const response = await changeStatus(personalId, value);
    if (response === 200) {
      toast.success("Estado actualizado correctamente");
    } else {
      toast.error("Error al actualizar el estado");
    }
  };

  return (
    <div className="w-full h-fit flex flex-row">
      <div className="w-1/2 h-96 p-8">
        <h3>Horarios:</h3>
        <Separator />
        <SchedulesTable
          columns={SchedulesColumns}
          data={personalSchedules}
          personalId={personalId}
          handleNew={handleNewSchedule}
          selectRow={selectRowSchedule}
          changeStatus={handleChangeStatus}
          defaultStatus={isActived}
        />
        <DeleteAlertDialog
          open={openScheduleDelete}
          id={scheduleId}
          handleCancel={() => {
            setOpenScheduleDelete(false);
          }}
          handleDelete={async () => {
            handleDeleteSchedule(scheduleId);
            setOpenScheduleDelete(false);
          }}
          title="Eliminar horario"
          message="¿Está seguro que desea eliminar este horario?"
        />
      </div>
      <div className="w-1/2 h-96 p-8">
        <h3>Códigos de asistencia:</h3>
        <Separator />
        <AssistanceCodesTable
          columns={AssistanceCodesColumns}
          data={assistanceIdentificator}
          personalId={personalId}
          handleNew={handleNewCode}
          selectRow={selectRowCode}
        />
        <DeleteAlertDialog
          open={openCodeDelete}
          id={codeId}
          handleCancel={() => {
            setOpenCodeDelete(false);
          }}
          handleDelete={async () => {
            handleDeleteCode(codeId);
            setOpenCodeDelete(false);
          }}
          title="Eliminar código de asistencia"
          message="¿Está seguro que desea eliminar este código de asistencia?"
        />
      </div>
    </div>
  );
}
