import { z } from "zod";

export type Assistance = {
  id?: number;
  identificationCard: string;
  names: string;
  lastNames: string;
  clockCheck: string;
  assistanceStatusId: number;
  assistanceStatusTag: string;
};

// Para registro de asistencia manuak
export type ManualAssistance = {
  personalId: number;
  date: Date;
  time: string;
};

export const ManualAssistance = z.object({
  personalId: z.number().int().min(1, "Seleccione un empleado"),
  date: z.date(),
  time: z.string().nonempty("Ingrese una hora"),
});
