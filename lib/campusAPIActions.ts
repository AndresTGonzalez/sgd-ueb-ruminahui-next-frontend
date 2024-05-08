"use server";

import { getSessionData } from "@/auth/getSession";
import { campusEndpoint } from "./constants";
import { Campus, CreateCampus } from "@/models/campus";

export async function getCampus() {
  const session = await getSessionData();
  const response = await fetch(campusEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getCampusById(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${campusEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function createCampus(campus: CreateCampus) {
  const session = await getSessionData();
  const response = await fetch(campusEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(campus),
  });
  const data = await response.json();
  console.log(response.status);
  const statusCode = response.status;
  return statusCode;
}
