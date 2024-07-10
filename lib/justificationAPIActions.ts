"use server";

import { getSessionData } from "@/auth/getSession";
import { justificationEndpoint, justificationFilesEndpoint } from "./constants";
import { formatDateToEcuadorian } from "@/utils/misc";

// Find all justifications
export async function getJustifications() {
  const session = await getSessionData();
  const response = await fetch(justificationEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();

  const justifications = data.map((justification: any) => {
    justification.applicationDate = formatDateToEcuadorian(
      justification.applicationDate
    );
    return justification;
  });

  console.log(justifications);

  return justifications;
}

// Find justifications between two dates
export async function getJustificationsBetweenDates(
  fromDate: Date,
  toDate: Date
) {
  const fromDateISO = fromDate.toISOString();
  const toDateISO = toDate.toISOString();
  const session = await getSessionData();
  const response = await fetch(
    `${justificationEndpoint}/between-dates?startDate=${fromDateISO}&endDate=${toDateISO}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();

  data.forEach((justification: any) => {
    justification.date = formatDateToEcuadorian(justification.date);
  });

  return data;
}

// Sync justifications
export async function syncJustifications() {
  const session = await getSessionData();
  const response = await fetch(`${justificationEndpoint}/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}

// Find a justification by id
export async function getJustification(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${justificationEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  data.date = formatDateToEcuadorian(data.date);
  return data;
}

// Get justification files
export async function getJustificationFiles(justificationId: number) {
  const session = await getSessionData();
  const response = await fetch(
    `${justificationFilesEndpoint}/${justificationId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

// Eliminar documento
export async function deleteJustificationFile(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${justificationFilesEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}

// Obtener los estados de las justificaciones
export async function getJustificationStatus() {
  const session = await getSessionData();
  const response = await fetch(`${justificationEndpoint}/status`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

// Cambiar el estado de una justificacion
export async function changeJustificationStatus(
  justificationId: number,
  statusId: number
) {
  console.log(justificationId, statusId);
  const session = await getSessionData();
  const response = await fetch(
    `${justificationEndpoint}/${justificationId}/status`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        statusId: statusId,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  return response.status;
}
