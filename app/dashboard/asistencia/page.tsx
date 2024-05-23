"use client";

import { useState, useEffect } from "react";

import { DataTable } from "@/components/Assistance/DataTable";
import { columns } from "@/components/Assistance/columns";
import {
  getAssistance,
  downloadExcelReport,
  syncAssistance,
} from "@/lib/assistanceAPIActions";
import { Assistance } from "@/models/assistance";
import { assistanceEndpoint } from "@/lib/constants";

async function getData(): Promise<Assistance[]> {
  return await getAssistance();
}

export default function Page() {
  const [data, setData] = useState<Assistance[]>([]);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  const handleSync = async () => {
    const response = await syncAssistance();
    if (response === 201) {
      getData().then((data) => {
        setData(data);
      });
    }
  };

  const handleReport = async () => {
    if (fromDate && toDate) {
      // downloadExcelReport(fromDate, toDate);
      // const session = await getSessionData();
      const response = await fetch(
        `${assistanceEndpoint}?startDate=${fromDate}&endDate=${toDate}`,
        {
          headers: {
            // Authorization: `Bearer ${session}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // link.setAttribute("download", `asistencia-${fromDate}-${toDate}.xlsx`);
      link.setAttribute(
        "download",
        `asistencia-${fromDate!.toISOString().slice(0, 10)}-${toDate!
          .toISOString()
          .slice(0, 10)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
          fromDate={fromDate!}
          toDate={toDate!}
          setFromDate={setFromDate}
          setToDate={setToDate}
          handleReport={handleReport}
          handleSync={handleSync}
        />
      </div>
    </>
  );
}
