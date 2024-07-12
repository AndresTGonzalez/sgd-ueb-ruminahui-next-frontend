"use server";

import { getSessionData } from "@/auth/getSession";
import { PersonalData } from "@/models/personal";
import {
  personalCampusEndpoint,
  personalChildrenEndpoint,
  personalDocumentsEndpoint,
  personalEndpoint,
} from "./constants";
import { SelectorOption } from "@/models/selectorOption";

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

export async function getEmployeesForSelect(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(personalEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  const forReturn = data.map((employee: PersonalData) => ({
    id: employee.id,
    name: `${employee.names} ${employee.lastNames}`,
  }));

  console.log(forReturn);

  return forReturn;
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

// Get personalDocuments
export async function getPersonalDocuments(personalId: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalDocumentsEndpoint}/${personalId}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

// Eliminar documento personal
export async function deletePersonalDocument(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalDocumentsEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}

// Obtener hijos del empleado en base al id del empleado
export async function getPersonalChildrens(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalChildrenEndpoint}/personal/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

// Crear un nuevo hijo
export async function createPersonalChildren(children: any) {
  const session = await getSessionData();
  const response = await fetch(personalChildrenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(children),
  });
  const data = await response.json();
  return data;
}

// Eliminar hijo
export async function deletePersonalChildren(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${personalChildrenEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return response.status;
}

// Cambiar el estado
export async function changeStatus(id: number, status: boolean) {
  const session = await getSessionData();
  const response = await fetch(`${personalEndpoint}/change-status/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json", // Aquí se corrige contentType por Content-Type
    },
    body: JSON.stringify({
      status: status,
    }),
  });
  console.log(response);
  return response.status;
}
