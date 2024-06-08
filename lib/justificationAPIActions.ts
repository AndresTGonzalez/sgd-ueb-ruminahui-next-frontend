"use server";

import { getSessionData } from "@/auth/getSession";
import { justificationEndpoint } from "./constants";
import { formatDateToEcuadorian } from "@/utils/misc";

// Find all justifications
export async function getJustifications() {
  const session = await getSessionData();
  const response = await fetch(justificationEndpoint, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const data = await response.json();

  const justifications = data.map((justification: any) => {
    justification.applicationDate = formatDateToEcuadorian(justification.applicationDate);
    return justification;
  });

  console.log(justifications);

  return justifications;
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
    `${justificationEndpoint}/between-dates?startDate=${fromDateISO}&endDate=${toDateISO}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const data = await response.json();

  data.forEach((justification: any) => {
    justification.date = formatDateToEcuadorian(justification.date);
  });

  return data;
}
