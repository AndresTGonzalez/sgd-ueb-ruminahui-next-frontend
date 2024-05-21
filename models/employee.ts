import { z } from "zod";
import { validateEcuadorianID } from "@/utils/identificationCardValidation";
import {
  Category,
  City,
  FunctionEmployee,
  Gender,
  Journal,
  LaboralRegime,
  LaboralRelationship,
  MaritalStatus,
} from "./selectorOption";

export interface Employee {
  id?: number;
  identificationCard: string;
  names: string;
  lastNames: string;
  phone: string;
  email: string;
  birthdate: Date;
  childrens: number;
  address: string;
  genderId: number;
  gender?: Gender;
  maritalStatusId: number;
  maritalStatus?: MaritalStatus;
  cityId: number;
  city?: City;
  functionId: number;
  function?: FunctionEmployee;
  laboralRegimeId: number;
  laboralRegime?: LaboralRegime;
  laboralRelationshipId: number;
  laboralRelationship?: LaboralRelationship;
  journalId: number;
  journal?: Journal;
  categoryId: number;
  category?: Category;
}

export const employeeSchema = z.object({
  identificationCard: z.string().refine(validateEcuadorianID, {
    message: "Ingrese un número de cédula válido",
  }),
  names: z.string().min(3, "Ingrese un nombre válido"),
  lastNames: z.string().min(3, "Ingrese un apellido válido"),
  phone: z.string().min(8, "Ingrese un número de teléfono válido"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  birthdate: z.date(),
  childrens: z.number().int().min(0, "Ingrese un número válido"),
  address: z.string().min(5, "Ingrese una dirección válida"),
  genderId: z.number().int().min(1, "Seleccione un género"),
  maritalStatusId: z.number().int().min(1, "Seleccione un estado civil"),
  cityId: z.number().int().min(1, "Seleccione una ciudad"),
  functionId: z.number().int().min(1, "Seleccione una función"),
  laboralRegimeId: z.number().int().min(1, "Seleccione un régimen laboral"),
  laboralRelationshipId: z
    .number()
    .int()
    .min(1, "Seleccione una relación laboral"),
  journalId: z.number().int().min(1, "Seleccione una jornada"),
  categoryId: z.number().int().min(1, "Seleccione una categoría"),
});

// For UI only
export interface EmployeeListItem {
  id: number;
  identificationCard: string;
  name: string;
}
