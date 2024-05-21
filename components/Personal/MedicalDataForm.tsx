"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFormField from "../Misc/InputFormField";
import SelectFormField from "../Misc/SelectFormField";
import TextAreaFormField from "../Misc/TextAreaFormField";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  getProvinces,
  getCitiesByProvince,
  getGenders,
  getCivilStatus,
  getFunctions,
  getLaboralRegimes,
  getLaboralRelations,
  getCategories,
  getJournals,
} from "@/lib/selectOptionsAPI";
import { createEmployee, getEmployee } from "@/lib/employeeAPIActions";

import { City } from "@/models/selectorOption";
import { Employee, employeeSchema } from "@/models/personal";
import { toast } from "sonner";

export default function MedicalDataForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (formData: z.infer<typeof employeeSchema>) => {
    const newEmployee: Employee = {
      identificationCard: formData.identificationCard,
      names: formData.names,
      lastNames: formData.lastNames,
      phone: formData.phone,
      email: formData.email,
      birthdate: formData.birthdate,
      childrens: formData.childrens,
      address: formData.address,
      genderId: formData.genderId,
      maritalStatusId: formData.maritalStatusId,
      cityId: formData.cityId,
    };

    const response = await createEmployee(newEmployee);
    if (response === 201) {
      toast.success("Empleado registrado exitosamente");
      router.push("/dashboard/personal");
    } else {
      toast.error("Error al registrar el empleado");
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-7 w-full grid grid-cols-1 gap-5">
            <h3 className="text-lg font-light">Datos médicos:</h3>
            <div className="w-full grid grid-cols-1 gap-20">
              {/* Tipo de sangre */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="functionId"
                formLabel="Tipo de sangre"
                fetchItems={getFunctions}
                placeholder="Tipo de sangre"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
