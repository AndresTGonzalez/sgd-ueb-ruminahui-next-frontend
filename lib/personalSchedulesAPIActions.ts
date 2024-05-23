"use server";

import { getSessionData } from "@/auth/getSession";
import { personalSchedulesEndpoint } from "./constants";
import { PersonalSchedule } from "@/models/personal";

// Find by personalId
export async function getPersonalSchedules(personalId: number) {
  const session = await getSessionData();
  const response = await fetch(
    `${personalSchedulesEndpoint}/by-personal-id/${personalId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function createPersonalSchedule(data: PersonalSchedule) {
  const session = await getSessionData();
  const response = await fetch(personalSchedulesEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function deletePersonalSchedule(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalSchedulesEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}
