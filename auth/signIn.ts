"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { User } from "@/models/user";

export async function signIn(user: User): Promise<boolean> {
  const host: string = process.env.HOST || "http://localhost:8000";
  const url = `${host}/api/auth/signIn`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return false;
  } else {
    const data = await response.json();
    cookies().set("session", data.access_token, {
      path: "/",
    });
    redirect("/dashboard/asistencia");
    return true;
  }
}
