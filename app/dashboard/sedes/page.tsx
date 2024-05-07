"use client";

import { useState, useEffect } from "react";

import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { Campus } from "@/models/campus";
import { getCampus } from "@/lib/campusAPIActions";

async function getData(): Promise<Campus[]> {
  return await getCampus();
}

export default function Page() {
  const [data, setData] = useState<Campus[]>([]);
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
