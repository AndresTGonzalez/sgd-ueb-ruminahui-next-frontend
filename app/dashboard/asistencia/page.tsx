"use client";

import { useState, useEffect } from "react";

import { DataTable } from "@/components/Assistance/DataTable";
import { columns } from "@/components/Assistance/columns";
import {
  syncAssistance,
  getAssistanceBetweenDates,
} from "@/lib/assistanceAPIActions";
import { Assistance } from "@/models/assistance";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";

// async function getData(): Promise<Assistance[]> {
//   return await getAssistance();
// }

export default function Page() {
  const [data, setData] = useState<Assistance[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [date, setDate] = useState<DateRange | undefined>();

  const getAssistances = async () => {
    const { firstDay, lastDay } = getDefaultDates();

    const formattedFromDate = formatDate(date?.from || firstDay);
    const formattedToDate = formatDate(date?.to || lastDay);
    // const data = await getAssistanceBetweenDates(firstDay, lastDay);

    const data = await getAssistanceBetweenDates(
      formattedFromDate,
      formattedToDate
    );

    return data;
  };

  useEffect(() => {
    getAssistances().then((data) => {
      setData(data);
    });
  }, []);

  const handleSync = async () => {
    const response = await syncAssistance();
    if (response === 201) {
      toast.success("Sincronización exitosa");

      getAssistances().then((data) => {
        setData(data);
      });
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDefaultDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { firstDay, lastDay };
  };

  const handleReport = async () => {
    const { firstDay, lastDay } = getDefaultDates();

    const formattedFromDate = formatDate(date?.from || firstDay);
    const formattedToDate = formatDate(date?.to || lastDay);

    const url = `http://localhost:8000/api/assistance/generate-excel-report?startDate=${formattedFromDate}&endDate=${formattedToDate}`;

    // Crear un enlace y simular el clic para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilter = async () => {
    if (date?.from && date?.to) {
      console.log(date?.from, date?.to);
      const data = await getAssistanceBetweenDates(
        formatDate(date.from),
        formatDate(date.to)
      );
      setData(data);
    } else {
      toast.error(
        "No se ha seleccionado una fecha de inicio y una fecha de fin"
      );
    }
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
          handleReport={handleReport}
          handleSync={handleSync}
          handleFilter={handleFilter}
          setDate={setDate}
          date={date}
        />
      </div>
    </>
  );
}
