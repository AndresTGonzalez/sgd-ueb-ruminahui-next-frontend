"use server";

import { getSessionData } from "@/auth/getSession";
import { assistancePersonalIdentificatorEndpoint } from "./constants";
import { CreateAssistancePersonalIdentificatorDTO } from "@/models/assistancePersonalIdentificator";

export async function getAssistancePersonalIdentificator() {
  const session = await getSessionData();
  const response = await fetch(assistancePersonalIdentificatorEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

// Get by personalId
export async function getAssistancePersonalIdentificatorByPersonalId(
  personalId: number
) {
  const session = await getSessionData();
  const response = await fetch(
    `${assistancePersonalIdentificatorEndpoint}/personal/${personalId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function createAssistancePersonalIdentificator(
  data: CreateAssistancePersonalIdentificatorDTO
) {
  const session = await getSessionData();
  const response = await fetch(assistancePersonalIdentificatorEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
  return await response.json();
}

export async function deleteAssistancePersonalIdentificator(id: number) {
  const session = await getSessionData();
  const response = await fetch(
    `${assistancePersonalIdentificatorEndpoint}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  console.log(response);
  return response.status;
}
