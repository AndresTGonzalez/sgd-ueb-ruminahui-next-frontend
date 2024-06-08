"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Campus } from "@/models/campus";
import { deleteCampus, getCampus } from "@/lib/campusAPIActions";
import { DeleteAlertDialog } from "@/components/Misc/DeleteAlertDialog";
import { toast } from "sonner";
import { DataTable } from "@/components/Justification/DataTable";
import { columns } from "@/components/Justification/columns";
import {
  getJustifications,
  getJustificationsBetweenDates,
} from "@/lib/justificationAPIActions";
import { Justification } from "@/models/justification";
import { getEmployeesForSelect } from "@/lib/employeeAPIActions";

async function getData(): Promise<Justification[]> {
  return await getJustifications();
}

async function getPersonalOptions(): Promise<any> {
  return await getEmployeesForSelect();
}

export default function Page() {
  const router = useRouter();

  const [data, setData] = useState<Justification[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const [personalOptions, setPersonalOptions] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
    getPersonalOptions().then((data) => {
      setPersonalOptions(data);
    });
  }, []);

  const handleFilter = async () => {
    if (fromDate && toDate) {
      const data = await getJustificationsBetweenDates(
        new Date(fromDate),
        new Date(toDate)
      );
      setData(data);
    } else {
      toast.error("Debe seleccionar una fecha de inicio y una fecha de fin");
    }
  };

  const handleView = (id: number) => {
    router.push("/dashboard/justificaciones/" + id);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        handleView={handleView}
        setToDate={setToDate}
        setFromDate={setFromDate}
        handleFilter={handleFilter}
        personalOptions={personalOptions}
      />
    </div>
  );
}
