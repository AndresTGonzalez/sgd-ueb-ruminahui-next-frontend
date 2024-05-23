"use client";

import { useState, useEffect } from "react";

import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SelectFormField from "../Misc/SelectFormField";
import TextAreaFormField from "../Misc/TextAreaFormField";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { getBloodTypes } from "@/lib/selectOptionsAPI";

import { toast } from "sonner";
import {
  MedicalPersonalData,
  MedicalPersonalDataSchema,
} from "@/models/personal";
import {
  createMedicalPersonalData,
  getMedicalPersonalData,
  updateMedicalPersonalData,
} from "@/lib/medicalPersonalDataAPIActions";

export default function MedicalDataForm({
  personalId,
}: {
  personalId: number;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [initialBloodType, setInitialBloodType] = useState(0);
  const [medicalData, setMedicalData] = useState<MedicalPersonalData | null>(
    null
  );

  const form = useForm<z.infer<typeof MedicalPersonalDataSchema>>({
    resolver: zodResolver(MedicalPersonalDataSchema),
  });

  useEffect(() => {
    const fetchMedicalData = async () => {
      if (personalId === 0) return;
      const medicalData = await getMedicalPersonalData(personalId);
      const data = medicalData[0];
      if (data) {
        form.reset(data);
        setMedicalData(data);
        setIsEdit(true);
        setInitialBloodType(data.bloodTypeId);
      } else return;
    };

    fetchMedicalData();
  }, []);

  const onSubmit = async (
    formData: z.infer<typeof MedicalPersonalDataSchema>
  ) => {
    const newData: MedicalPersonalData = {
      personalId: Number(personalId),
      bloodTypeId: formData.bloodTypeId,
      personalMedication: formData.personalMedication,
      personalDisease: formData.personalDisease,
      personalAllergy: formData.personalAllergy,
    };

    if (!isEdit) {
      const response = await createMedicalPersonalData(newData);
      if (response === 201) {
        toast.success("Datos médicos registrados exitosamente");
      } else {
        toast.error("Error al registrar los datos médicos");
      }
    } else {
      // newData.id = Number(form.getValues("id"));
      newData.id = medicalData?.id as number;
      const response = await updateMedicalPersonalData(newData);
      if (response === 200) {
        toast.success("Datos médicos actualizados exitosamente");
      } else {
        toast.error("Error al actualizar los datos médicos");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-7 w-full grid grid-cols-1 gap-5">
            <h3 className="text-lg font-light">Datos médicos:</h3>
            <div className="w-full grid grid-cols-1 gap-4">
              {/* Tipo de sangre */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="bloodTypeId"
                formLabel="Tipo de sangre"
                fetchItems={getBloodTypes}
                placeholder="Tipo de sangre"
                defaultValue={initialBloodType}
              />
              {/* Alergias */}
              <TextAreaFormField
                control={form.control as unknown as Control<FieldValues>}
                name="personalAllergy"
                formLabel="Alergias"
                placeholder="Alergias"
                // defaultValue={medicalData?.personalAllergy}
                defaultValue={"Test"}
              />
              {/* Enfermedades */}
              <TextAreaFormField
                control={form.control as unknown as Control<FieldValues>}
                name="personalDisease"
                formLabel="Enfermedades"
                placeholder="Enfermedades"
              />
              {/* Medicamentos */}
              <TextAreaFormField
                control={form.control as unknown as Control<FieldValues>}
                name="personalMedication"
                formLabel="Medicamentos"
                placeholder="Medicamentos"
              />
              {/* Boton de enviar */}
              <div className="flex flex-row w-full justify-end">
                <Button type="submit" className="w-fit" variant={"success"}>
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
