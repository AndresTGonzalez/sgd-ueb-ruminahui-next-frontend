"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SelectFormField from "../Misc/SelectFormField";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

import {
  getFunctions,
  getLaboralRegimes,
  getLaboralRelations,
  getCategories,
  getJournals,
  getCampus,
} from "@/lib/selectOptionsAPI";

import {
  InstitutionalPersonalData,
  InstitutionalPersonalDataSchema,
  PersonalData,
  PersonalDataSchema,
} from "@/models/personal";
import { toast } from "sonner";
import {
  createInstitutionalPersonalData,
  getInstitutionalPersonalData,
  getPersonalCampus,
  updateInstitutionalPersonalData,
  updatePersonalCampus,
} from "@/lib/institutionalPersonalDataAPIAction";
import MultipleSelectorField from "../Misc/MultipleSelectorField";
import CheckBoxMultiSelectField from "../Misc/CheckBoxMultiSelectField";

export default function InstitutionalDataForm({
  personalId,
}: {
  personalId: number;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [institutionalData, setInstitutionalData] =
    useState<InstitutionalPersonalData | null>(null);

  const [initialFunction, setInitialFunction] = useState();
  const [initialLaboralRegime, setInitialLaboralRegime] = useState();
  const [initialLaboralRelationship, setInitialLaboralRelationship] =
    useState();
  const [initialCategory, setInitialCategory] = useState();
  const [initialJournal, setInitialJournal] = useState();

  const [campus, setCampus] = useState<number[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof InstitutionalPersonalDataSchema>>({
    resolver: zodResolver(InstitutionalPersonalDataSchema),
  });

  useEffect(() => {
    const fetchInstitutionalData = async () => {
      if (personalId === 0) return;
      const institutionalData = await getInstitutionalPersonalData(personalId);
      const campusData = await getPersonalCampus(personalId);

      if (campusData) {
        setCampus(campusData);
      }

      const data = institutionalData[0];

      // setCampus([2]);

      if (data) {
        form.reset(data);
        setIsEdit(true);
        // form.setValue("campus", [1]);
        setInstitutionalData(data);
        setIsEdit(true);
        setInitialFunction(data.functionId);
        setInitialLaboralRegime(data.laboralRegimeId);
        setInitialLaboralRelationship(data.laboralRelationshipId);
        setInitialCategory(data.categoryId);
        setInitialJournal(data.journalId);
      } else return;
    };

    fetchInstitutionalData();
  }, []);

  const submitInstitutionalData = async (data: InstitutionalPersonalData) => {
    const response = await createInstitutionalPersonalData(data);
    return response;
  };

  const submitCampusPersonalData = async (data: number[]) => {
    // const response = await (personalId, data);
    const response = await updatePersonalCampus(personalId, data);
    return response;
  };

  const onSubmit = async (
    formData: z.infer<typeof InstitutionalPersonalDataSchema>
  ) => {
    const newData: InstitutionalPersonalData = {
      personalId: Number(personalId),
      functionId: formData.functionId,
      laboralRegimeId: formData.laboralRegimeId,
      laboralRelationshipId: formData.laboralRelationshipId,
      categoryId: formData.categoryId,
      journalId: formData.journalId,
    };

    formData.campus = campus;
    // Primero hacer la peticion para crear los institutional
    const responseInstitutionalData = await submitInstitutionalData(newData);

    if (responseInstitutionalData === 201) {
      toast.success("Datos institucionales guardados con éxito");
      const responseCampusData = await submitCampusPersonalData(campus);
      if (responseCampusData === 201) {
        toast.success("Sedes institucionales guardadas con éxito");
      } else {
        toast.error("Error al guardar las sedes institucionales");
        return;
      }
    } else {
      toast.error("Error al guardar los datos institucionales");
    }

    // Luego hacer la peticion para crear los campus
  };

  return (
    <div className="w-full h-full flex flex-col px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-7 w-full grid grid-cols-1 gap-5">
            <h3 className="text-lg font-light">Datos institucionales:</h3>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Función */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="functionId"
                formLabel="Función"
                fetchItems={getFunctions}
                placeholder="Función"
                defaultValue={initialFunction}
              />
              {/* Regimén Laboral */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="laboralRegimeId"
                formLabel="Régimen laboral"
                fetchItems={getLaboralRegimes}
                placeholder="Régimen laboral"
                defaultValue={initialLaboralRegime}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Relacion laboral */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="laboralRelationshipId"
                formLabel="Relación laboral"
                fetchItems={getLaboralRelations}
                placeholder="Relación laboral"
                defaultValue={initialLaboralRelationship}
              />
              {/* Categorias */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="categoryId"
                formLabel="Categoría"
                fetchItems={getCategories}
                placeholder="Categoría"
                optionStartLabel="Categoría"
                defaultValue={initialCategory}
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-20">
              {/* Jornada */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="journalId"
                formLabel="Jornada"
                fetchItems={getJournals}
                placeholder="Jornada"
                defaultValue={initialJournal}
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-20">
              <CheckBoxMultiSelectField
                control={form.control as unknown as Control<FieldValues>}
                name="campus"
                formLabel="Sedes institucionales"
                placeholder="Campus"
                fetchItems={getCampus}
                defaultValue={campus}
                handleChange={setCampus}
              />
            </div>
            <div className="w-full flex flex-row justify-end">
              <Button type="submit" variant={"success"}>
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
