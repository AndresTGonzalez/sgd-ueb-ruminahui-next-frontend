"use server";

import { getSessionData } from "@/auth/getSession";
import { PersonalData } from "@/models/personal";
import { personalEndpoint } from "./constants";

export async function getEmployees() {
  const session = await getSessionData();
  const response = await fetch(personalEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getEmployee(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function createEmployee(employee: PersonalData) {
  const session = await getSessionData();
  const response = await fetch(personalEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(employee),
  });
  const data = await response.json();
  const statusCode = response.status;
  return statusCode;
}

export async function updateEmployee(employee: PersonalData) {
  const session = await getSessionData();
  const response = await fetch(`${personalEndpoint}/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(employee),
  });
  const data = await response.json();
  return data;
}

export async function deleteEmployee(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return response.status;
}

