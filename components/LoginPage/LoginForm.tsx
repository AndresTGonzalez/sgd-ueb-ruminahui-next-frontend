// TODO: Agregar validaciones al formulario de inicio de sesión

"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    // TODO: Implementar la lógica de inicio de sesión
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
        <Input
          className="w-96"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="w-96"
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-96 mt-4 bg-blue-950 hover:bg-blue-800"
          size={"lg"}
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
