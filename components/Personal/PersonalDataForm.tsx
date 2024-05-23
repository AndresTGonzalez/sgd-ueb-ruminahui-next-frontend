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
} from "@/lib/selectOptionsAPI";
import { createEmployee, getEmployee } from "@/lib/employeeAPIActions";

import { City, SelectorOption } from "@/models/selectorOption";
import { PersonalData, PersonalDataSchema } from "@/models/personal";
import { toast } from "sonner";

export default function PersonalDataForm({
  personalId,
}: {
  personalId: number;
}) {
  const router = useRouter();

  // const [provinceId, setProvinceId] = useState<number>();
  const [initialProvinceId, setInitialProvinceId] = useState<number>();
  const [initialCityId, setInitialCityId] = useState<number>();
  const [initialGenderId, setInitialGenderId] = useState<number>();
  const [initialMaritalStatusId, setInitialMaritalStatusId] =
    useState<number>();

  const form = useForm<z.infer<typeof PersonalDataSchema>>({
    resolver: zodResolver(PersonalDataSchema),
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      if (personalId === 0) return;
      const employee = await getEmployee(personalId);
      const data = employee
      console.log(data);
      if (data) {
        form.reset(data);
        setInitialProvinceId(data.provinceId);
        setInitialCityId(data.cityId);
        setInitialGenderId(data.genderId);
        setInitialMaritalStatusId(data.maritalStatusId);
      } else return;
    };
    fetchEmployee();  

    // const fetchMedicalData = async () => {
    //   if (personalId === 0) return;
    //   const medicalData = await getMedicalPersonalData(personalId);
    //   const data = medicalData[0];
    //   if (data) {
    //     form.reset(data);
    //     setMedicalData(data);
    //     setIsEdit(true);
    //     setInitialBloodType(data.bloodTypeId);
    //   } else return;
    // };
    // fetchMedicalData();
  }, []);

  const onSubmit = async (formData: z.infer<typeof PersonalDataSchema>) => {
    const newEmployee: PersonalData = {
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
            <h3 className="text-lg font-light">Datos personales:</h3>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Cedula */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="identificationCard"
                formLabel="Cédula"
                placeholder="18xxxxxxxx"
              />
              {/* Genero */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="genderId"
                formLabel="Género"
                fetchItems={getGenders}
                placeholder="Género"
                defaultValue={initialGenderId}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Nombres */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="names"
                formLabel="Nombres"
                placeholder="Juan Carlos"
              />
              {/* Apellidos */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="lastNames"
                formLabel="Apellidos"
                placeholder="Pérez Pérez"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Telefono */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="phone"
                formLabel="Teléfono"
                placeholder="032505050"
              />
              {/* Correo */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="email"
                formLabel="Correo electrónico"
                placeholder="jcarlos@mail.com"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Fecha de nacimiento */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="birthdate"
                formLabel="Fecha de nacimiento"
                type="date"
                placeholder="032505050"
              />
              {/* Estado civil e hijos*/}
              <div className="w-full grid grid-cols-3 gap-5">
                <SelectFormField
                  control={form.control as unknown as Control<FieldValues>}
                  name="maritalStatusId"
                  formLabel="Estado civil"
                  fetchItems={getCivilStatus}
                  placeholder="Estado civil"
                  defaultValue={initialMaritalStatusId}
                />
                {/* Numero de hijos */}
                <InputFormField
                  control={form.control as unknown as Control<FieldValues>}
                  name="childrens"
                  formLabel="Número de hijos"
                  type="number"
                  placeholder="0"
                />
                {/* Tiej de hijos menores */}
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Provincia */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="provinceId"
                formLabel="Provincia"
                fetchItems={getProvinces}
                placeholder="Provincia"
                defaultValue={initialProvinceId}
              />
              {/* Ciudades */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="cityId"
                formLabel="Ciudad"
                placeholder="Ciudad"
                defaultValue={initialCityId}
                fetchItems={async () => {
                  const provinceId = form.getValues("provinceId");
                  if (provinceId) {
                    return getCitiesByProvince(provinceId as number);
                  } else {
                    return [];
                  }
                }}
              />
            </div>
            <div className="w-full grid grid-cols-1">
              <TextAreaFormField
                control={form.control as unknown as Control<FieldValues>}
                name="address"
                formLabel="Dirección"
                placeholder="Dirección"
              />
            </div>
          </div>
          <div className="w-full h-fit flex flex-row justify-end">
            <Button type="submit" variant={"success"}>
              Registrar empleado
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
