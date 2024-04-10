"use server";

import { cookies } from "next/headers";

export async function getSessionData(): Promise<string | null> {
  const data = cookies().get("session")?.value;
  return data ? data : null;
}
