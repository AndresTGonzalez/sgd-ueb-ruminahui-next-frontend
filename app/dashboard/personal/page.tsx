import { EmployeeListItem } from "@/models/uiModels";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { Employee } from "@/models/apiModels";
import { getEmployees } from "@/lib/employeeAPIActions";

async function getData(): Promise<Employee[]> {
  // Fetch data from your API here.
  // return [{ id: 1, identificationCard: "123456789", name: "Andres Patricio Tapia Gonzalez" }];
  // return [];
  return await getEmployees();
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
