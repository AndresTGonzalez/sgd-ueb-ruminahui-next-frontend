"use server";

import { getSessionData } from "@/auth/getSession";
import { assistanceEndpoint } from "./constants";
import { Assistance } from "@/models/assistance";
import { formatDateToEcuadorian } from "@/utils/misc";

export async function getAssistance() {
  const session = await getSessionData();
  const response = await fetch(assistanceEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();

  data.forEach((assistance: any) => {
    assistance.date = formatDateToEcuadorian(assistance.clockCheck);
    assistance.hour = assistance.clockCheck.split("T")[1].split(".")[0];
    assistance.clockCheck = assistance.date + " " + assistance.hour;
    console.log(assistance);
  });

  return data;
}

// Find justifications between two dates
export async function getAssistanceBetweenDates(
  fromDate: string,
  toDate: string
) {
  const session = await getSessionData();
  const response = await fetch(
    `${assistanceEndpoint}/between-dates?startDate=${fromDate}&endDate=${toDate}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();

  data.forEach((assistance: any) => {
    assistance.date = formatDateToEcuadorian(assistance.clockCheck);
    assistance.hour = assistance.clockCheck.split("T")[1].split(".")[0];
    assistance.clockCheck = assistance.date + " " + assistance.hour;
    console.log(assistance);
  });

  return data;
}

export async function downloadExcelReport(startDate: Date, endDate: Date) {
  // const session = await getSessionData();
  const response = await fetch(
    `${assistanceEndpoint}?startDate=${startDate}&endDate=${endDate}`,
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
  link.setAttribute("download", `asistencia-${startDate}-${endDate}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function syncAssistance() {
  const session = await getSessionData();
  const response = await fetch(`${assistanceEndpoint}/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}
