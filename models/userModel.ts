import { z } from "zod";

// Esquema base
export type User = {
  email: string;
  password: string;
};

// Esquema de validación
export const UserSchema = z.object({
  email: z.string().email("Por favor, ingrese un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
