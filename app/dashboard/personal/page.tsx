import { Campus, columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<Campus[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Sede 1asdfasdfsadfasdfdasfadsfsdafsvdsafadsfasdfadsfsadfadsfsadfsdafasd",
      address: "Calle 1",
    },
    { id: "2", name: "Sede 2", address: "Calle 2asdfasdfadsfadsfasdfadsfadsf" },
    { id: "3", name: "Sede 3", address: "Calle 3" },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
