import { z } from "zod";
import { validateEcuadorianID } from "@/utils/identificationCardValidation";

export type SelectorOption = {
  id: number;
  name: string;
};

export type Province = SelectorOption;

export type City = SelectorOption & {
  provinceId: number;
};

export type functionType = SelectorOption;
export type laboralRegime = SelectorOption;
export type laboralRelation = SelectorOption;
export type Gender = SelectorOption;
export type category = SelectorOption;

export type MaritalStatus = {
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
}

// Implementación del método getName
export function getName(this: Employee): string {
  return `${this.names} ${this.lastNames}`;
}

// Esquema de validación
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
});
