"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { encrypt } from "@/utils/crypto";
import { User, userSchema } from "@/models/userModel";

import { signIn } from "@/auth/signIn";
import { getSessionData } from "@/auth/getSession";


const onSubmit = async (formData: z.infer<typeof userSchema>) => {
  const user: User = {
    email: formData.email,
    password: encrypt(formData.password),
  };

  const response = await signIn(user);
  console.log(response);
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="usuario@mail.com"
                    className="lg:w-96 w-80"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Ingrese su correo electrónico</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    className="lg:w-96 w-80"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Ingrese su contraseña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"default"} type="submit" className="lg:w-96 w-80">
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
