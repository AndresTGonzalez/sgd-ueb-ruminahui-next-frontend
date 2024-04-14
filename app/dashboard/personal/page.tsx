"use client";

import { useState, useEffect } from "react";

import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { Employee } from "@/models/apiModels";
import { getEmployees } from "@/lib/employeeAPIActions";

async function getData(): Promise<Employee[]> {
  return await getEmployees();
}

export default function Page() {
  const [data, setData] = useState<Employee[]>([]);
  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
