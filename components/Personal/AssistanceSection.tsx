import { Separator } from "../ui/separator";
import { DataTable as AssistanceCodesTable } from "./AssistanceCodes/DataTable";
import { columns as AssistanceCodesColumns } from "./AssistanceCodes/columns";
import { DataTable as SchedulesTable } from "./Schedules/DataTable";
import { columns as SchedulesColumns } from "./Schedules/columns";

export default function AssistanceSection() {
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
        <AssistanceCodesTable columns={AssistanceCodesColumns} data={[]} />
      </div>
    </div>
  );
}
