import { getSessionData } from "@/auth/getSession";
import { Employee } from "@/models/apiModels";
import { host } from "./constants";

export async function getEmployees() {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/employees`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getEmployee(id: number) {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function createEmployee(employee: Employee) {
  console.log("Host" + host);
  console.log("se ejecuta");
  const session = await getSessionData();
  const response = await fetch(`${host}/api/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(employee),
  });
  const data = await response.json();
  return data;
}

export async function updateEmployee(employee: Employee) {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/employees/${employee.id}`, {
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
  const response = await fetch(`${host}/api/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}
