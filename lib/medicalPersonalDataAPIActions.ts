"use server";

import { getSessionData } from "@/auth/getSession";
import { MedicalPersonalData } from "@/models/personal";
import { medicalPersonalDataEndpoint } from "./constants";

// Get medical personal data by personal id
export async function getMedicalPersonalData(id: number) {
  const session = await getSessionData();
  const response = await fetch(
    `${medicalPersonalDataEndpoint}/personal/${id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

// Create medical personal data
export async function createMedicalPersonalData(
  medicalPersonalData: MedicalPersonalData
) {
  const session = await getSessionData();
  const response = await fetch(medicalPersonalDataEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(medicalPersonalData),
  });
  console.log(response);
  const data = await response.json();
  const statusCode = response.status;
  return statusCode;
}

// Update medical personal data
export async function updateMedicalPersonalData(
  medicalPersonalData: MedicalPersonalData
) {
  const session = await getSessionData();
  const response = await fetch(
    `${medicalPersonalDataEndpoint}/${medicalPersonalData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(medicalPersonalData),
    }
  );
  const data = await response.json();
  const statusCode = response.status;
  return statusCode;
}
