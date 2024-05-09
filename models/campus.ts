import { z } from "zod";

export interface Campus {
  id: number;
  name: string;
  secondaryName: string;
  address: string;
}

export interface CreateCampus {
  name: string;
  secondaryName: string;
  address: string;
}

export interface UpdateCampus {
  id: number;
  name: string;
  secondaryName: string;
  address: string;
}

export const campusSchema = z.object({
  name: z.string().min(5, "Ingrese un nombre válido"),
  secondaryName: z.string().min(5, "Ingrese un nombre válido"),
  address: z.string().min(5, "Ingrese una dirección válida")
});
