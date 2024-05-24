"use server";

import { getSessionData } from "@/auth/getSession";
import { titlesEndpoint } from "./constants";
import { PersonalTitles } from "@/models/personal";

// Find titles by personal id
export async function getTitles(personalId: number): Promise<PersonalTitles[]> {
  const session = getSessionData();
  const response = await fetch(`${titlesEndpoint}/personal/${personalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

// Create new title
export async function createTitle(
  data: PersonalTitles
): Promise<{ personalTitles: PersonalTitles; statusCode: Number }> {
  const session = getSessionData();
  const response = await fetch(`${titlesEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  // return responseData;
  return { personalTitles: responseData, statusCode: response.status };
}

// Delete title
export async function deleteTitle(id: number) {
  const session = getSessionData();
  const response = await fetch(`${titlesEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}
