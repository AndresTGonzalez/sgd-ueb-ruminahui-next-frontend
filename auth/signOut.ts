"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function signOut(): Promise<boolean> {
  cookies().set("session", "", {
    path: "/",
  });
  redirect("/");
  return true;
}
