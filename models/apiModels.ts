import { z } from "zod";

export type Province = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  provinceId: number;
};

export type Gender = {
  id: number;
  name: string;
};

export type CivilStatus = {
  id: number;
  name: string;
};

// Usuario
// Esquema base
export type User = {
  email: string;
  password: string;
};

// Esquema de validación
export const userSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z.string().min(5, "Ingrese una contraseña válida"),
});
