import { z } from "zod";

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
