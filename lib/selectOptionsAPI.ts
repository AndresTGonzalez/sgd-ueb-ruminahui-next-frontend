"use server";

import { getSessionData } from "@/auth/getSession";
import { SelectorOption } from "@/models/selectorOption";
import { host } from "./constants";

export async function getProvinces() {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/provinces`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getCitiesByProvince(provinceId: number) {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/cities/province/${provinceId}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getGenders(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/sexs`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getCivilStatus() {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/marital-statuses`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getFunctions(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/function`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getLaboralRegimes(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/laboral-regime`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getLaboralRelations(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/laboral-relationship`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getCategories(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/categories`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}
