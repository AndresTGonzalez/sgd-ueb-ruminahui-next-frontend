"use server";

import { getSessionData } from "@/auth/getSession";
import { certificationsEndpoint } from "./constants";
import { PersonalCertifications } from "@/models/personal";

// Find certifications by personal id
export async function getCertifications(
  personalId: number
): Promise<PersonalCertifications[]> {
  const session = getSessionData();
  const response = await fetch(
    `${certificationsEndpoint}/personal/${personalId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// Create new certification
export async function createCertification(
  data: PersonalCertifications
): Promise<{
  personalCertifications: PersonalCertifications;
  statusCode: Number;
}> {
  const session = getSessionData();
  const response = await fetch(`${certificationsEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  // return responseData;
  return { personalCertifications: responseData, statusCode: response.status };
}

// Delete certification
export async function deleteCertification(id: number) {
  const session = getSessionData();
  const response = await fetch(`${certificationsEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}
