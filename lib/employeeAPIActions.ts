import { getSessionData } from "@/auth/getSession";

const host = process.env.HOST || "";

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
