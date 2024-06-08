import { z } from "zod";
import { validateEcuadorianID } from "@/utils/identificationCardValidation";
import {
  BloodType,
  Category,
  City,
  Gender,
  Journal,
  LaboralRegime,
  LaboralRelationship,
  MaritalStatus,
} from "./selectorOption";

// Personal data

export interface PersonalData {
  id?: number;
  identificationCard: string;
  names: string;
  lastNames: string;
  phone: string;
  email: string;
  birthdate: Date;
  // childrens: number;
  address: string;
  genderId: number;
  gender?: Gender;
  maritalStatusId: number;
  maritalStatus?: MaritalStatus;
  cityId: number;
  city?: City;
  provinceId?: number;
}

export const PersonalDataSchema = z.object({
  identificationCard: z.string().refine(validateEcuadorianID, {
    message: "Ingrese un número de cédula válido",
  }),
  names: z.string().min(3, "Ingrese un nombre válido"),
  lastNames: z.string().min(3, "Ingrese un apellido válido"),
  phone: z.string().min(8, "Ingrese un número de teléfono válido"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  birthdate: z.date(),
  // childrens: z.number().int().min(0, "Ingrese un número válido"),
  address: z.string().min(5, "Ingrese una dirección válida"),
  genderId: z.number().int().min(1, "Seleccione un género"),
  maritalStatusId: z.number().int().min(1, "Seleccione un estado civil"),
  cityId: z.number().int().min(1, "Seleccione una ciudad"),
  provinceId: z.number().int().optional(),
});

// Institutional data
export interface InstitutionalPersonalData {
  id?: number;
  personalId: number;
  PersonalData?: PersonalData;
  functionId: number;
  Function?: Function;
  laboralRegimeId: number;
  LaboralRegime?: LaboralRegime;
  laboralRelationshipId: number;
  LaboralRelationship?: LaboralRelationship;
  categoryId: number;
  Category?: Category;
  journalId: number;
  Journal?: Journal;
  campus?: number[];
}

export const InstitutionalPersonalDataSchema = z.object({
  functionId: z.number().int().min(1, "Seleccione una función"),
  laboralRegimeId: z.number().int().min(1, "Seleccione un régimen laboral"),
  laboralRelationshipId: z
    .number()
    .int()
    .min(1, "Seleccione una relación laboral"),
  categoryId: z.number().int().min(1, "Seleccione una categoría"),
  journalId: z.number().int().min(1, "Seleccione un diario"),
  // Campus es opcional
  campus: z.array(z.number().int()).optional(),
});

// Medical data

export interface MedicalPersonalData {
  id?: number;
  personalId: number;
  PersonalData?: PersonalData;
  bloodTypeId?: number;
  BloodType?: BloodType;
  personalMedication?: string;
  personalDisease?: string;
  personalAllergy?: string;
}

export const MedicalPersonalDataSchema = z.object({
  // personalId: z.number().int().optional(),
  bloodTypeId: z.number().int().optional(),
  personalMedication: z.string().optional(),
  personalDisease: z.string().optional(),
  personalAllergy: z.string().optional(),
});

// Schedule
export interface PersonalSchedule {
  id?: number;
  personalId: number;
  Personal?: PersonalData;
  dayOfWeek: number;
  start: string;
  end: string;
}

export const PersonalScheduleSchema = z.object({
  // id: z.number().int().optional(),
  dayOfWeek: z.number().int().min(1, "Seleccione un día de la semana"),
  start: z.string().min(5, "Ingrese una hora de inicio"),
  end: z.string().min(5, "Ingrese una hora de fin"),
});

// CV
// Titles
export interface PersonalTitles {
  id?: number;
  personalId: number;
  Personal?: PersonalData;
  title: string;
  institution: string;
  completitionYear: number;
}

export const PersonalTitlesSchema = z.object({
  // id: z.number().int().optional(),
  title: z.string().min(3, "Ingrese un título válido"),
  institution: z.string().min(3, "Ingrese una institución válida"),
  completitionYear: z.number().int().min(1900, "Ingrese un año válido"),
});

// Certifications
export interface PersonalCertifications {
  id?: number;
  personalId: number;
  Personal?: PersonalData;
  certification: string;
  institution: string;
  completitionYear: number;
}

export const PersonalCertificationsSchema = z.object({
  // id: z.number().int().optional(),
  certification: z.string().min(3, "Ingrese un certificado válido"),
  institution: z.string().min(3, "Ingrese una institución válida"),
  completitionYear: z.number().int().min(1900, "Ingrese un año válido"),
});
