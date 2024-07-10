"use server";

import { getSessionData } from "@/auth/getSession";
import { InstitutionalPersonalData } from "@/models/personal";
import {
  institutionalPersonalDataEndpoint,
  personalCampusEndpoint,
} from "@/lib/constants";

export async function getInstitutionalPersonalData(personalId: number) {
  const session = await getSessionData();
  const response = await fetch(
    `${institutionalPersonalDataEndpoint}/personal/${personalId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function createInstitutionalPersonalData(
  institutionalPersonalData: InstitutionalPersonalData
) {
  const session = await getSessionData();
  const response = await fetch(institutionalPersonalDataEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(institutionalPersonalData),
  });
  const data = await response.json();
  const statusCode = response.status;
  return statusCode;
}

export async function updateInstitutionalPersonalData(
  institutionalPersonalData: InstitutionalPersonalData
) {
  const session = await getSessionData();
  const response = await fetch(
    `${institutionalPersonalDataEndpoint}/${institutionalPersonalData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(institutionalPersonalData),
    }
  );
  const data = await response.json();
  const statusCode = response.status;
  return statusCode;
}

const deleteInstitutionalPersonalData = async (id: number) => {
  const session = await getSessionData();
  const response = await fetch(`${institutionalPersonalDataEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const statusCode = response.status;
  return statusCode;
};

// Obtener el array de campus del empleado
export async function getPersonalCampus(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalCampusEndpoint}/personal/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

// Enviar el array de campus del empleado
export async function updatePersonalCampus(id: number, campusIds: number[]) {
  const session = await getSessionData();
  const response = await fetch(`${personalCampusEndpoint}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify({
      campusIds: campusIds,
    }),
  });
  const data = await response.json();
  console.log(response);
  return response.status;
}
