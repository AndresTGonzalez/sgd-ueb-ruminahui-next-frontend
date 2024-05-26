"use server";

import { getSessionData } from "@/auth/getSession";
import { justificationEndpoint } from "./constants";

// Find all justifications
export async function getJustifications() {
  const session = await getSessionData();
  const response = await fetch(justificationEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();
  return data;
}

// Find justifications between two dates
export async function getJustificationsBetweenDates(
  fromDate: Date,
  toDate: Date
) {
  const fromDateISO = fromDate.toISOString();
  const toDateISO = toDate.toISOString();
  const session = await getSessionData();
  const response = await fetch(
    // `${justificationEndpoint}/betweenDates?startDate=${'2024-01-01'}&endDate=${'2025-01-01'}`,
    // `${justificationEndpoint}/between-dates?startDate=2024-01-01&endDate=2025-01-01`,
    `${justificationEndpoint}/between-dates?startDate=${fromDateISO}&endDate=${toDateISO}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
