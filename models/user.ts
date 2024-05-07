import { z } from "zod";

export interface User {
  email: string;
  password: string;
}

export const userSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z.string().min(5, "Ingrese una contraseña válida"),
});
