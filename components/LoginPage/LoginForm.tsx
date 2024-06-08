"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { encrypt } from "@/utils/crypto";
import { User, userSchema } from "@/models/user";

import { signIn } from "@/auth/signIn";
import { getSessionData } from "@/auth/getSession";
import InputFormField from "../Misc/InputFormField";

const onSubmit = async (formData: z.infer<typeof userSchema>) => {
  const user: User = {
    email: formData.email,
    password: encrypt(formData.password),
  };

  const response = await signIn(user);
  await getSessionData();
};

export default function LoginForm() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="px-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputFormField
            control={form.control as unknown as Control<FieldValues>}
            name="email"
            formLabel="Email"
            type="email"
            placeholder="usuario@mail.com"
          />
          <InputFormField
            control={form.control as unknown as Control<FieldValues>}
            name="password"
            formLabel="Contraseña"
            type="password"
            placeholder="********"
          />
          <Button variant={"default"} type="submit" className="lg:w-96 w-80">
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
