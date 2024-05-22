"use server";

import { getSessionData } from "@/auth/getSession";
import { SelectorOption } from "@/models/selectorOption";
import { host } from "./constants";

export async function getProvinces() {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/province`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getCitiesByProvince(provinceId: number) {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/city/province/${provinceId}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getGenders(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/gender`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getCivilStatus() {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/marital-status`, {
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
  const response = await fetch(`${host}/api/category`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getJournals(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/journal`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getBloodTypes(): Promise<SelectorOption[]> {
  const session = await getSessionData();
  const response = await fetch(`${host}/api/blood-type`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}
