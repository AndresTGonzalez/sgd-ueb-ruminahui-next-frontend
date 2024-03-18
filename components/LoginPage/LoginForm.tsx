// TODO: Agregar validaciones al formulario de inicio de sesión

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { User, UserSchema } from "@/models/userModel";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {
    // TODO: Implementar la lógica de inicio de sesión
    const user: User = form.getValues();
    console.log(user);
  };

  return (
    <div className=" flex flex-col justify-between items-center h-96 w-fit px-12 py-8 bg-transparent">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl text-neutral-900 font-bold text-center">
          Bienvenido
        </h2>
        <p className="font-extralight text-lg text-center">
          al Sistema de Gestión Docentes de la Unidad Educativa "Rumiñahui"
        </p>
      </div>

      <div className="flex flex-col space-y-5">
        <p className="font-extralight text-sm text-center">
          Ingrese su usuario y contraseña para continuar
        </p>
        <Form {...form}>
          <form
            className="flex flex-col items-center space-y-3"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-96"
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-96"
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-96 mt-4 bg-blue-950 hover:bg-blue-800"
              size={"lg"}
              type="submit"
            >
              Iniciar sesión
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
