"use server";

import { getSessionData } from "@/auth/getSession";
import { assistancePersonalIdentificatorEndpoint } from "./constants";
import {
  AssistancePersonalIdentificator,
  CreateAssistancePersonalIdentificatorDTO,
} from "@/models/assistancePersonalIdentificator";

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
