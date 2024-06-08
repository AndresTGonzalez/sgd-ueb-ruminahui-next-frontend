"use server";

import { getSessionData } from "@/auth/getSession";
import { assistanceEndpoint } from "./constants";
import { Assistance } from "@/models/assistance";

export async function getAssistance() {
  const session = await getSessionData();
  const response = await fetch(assistanceEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
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
