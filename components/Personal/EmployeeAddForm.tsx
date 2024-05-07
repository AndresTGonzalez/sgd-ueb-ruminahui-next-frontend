"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";

import {
  getProvinces,
  getCitiesByProvince,
  getGenders,
  getCivilStatus,
  getFunctions,
  getLaboralRegimes,
  getLaboralRelations,
  getCategories,
} from "@/lib/selectOptionsAPI";

// import { City, employeeSchema, Employee } from "@/models/apiModels";

import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFormField from "../Misc/InputFormField";
import SelectFormField from "../Misc/SelectFormField";
import TextAreaFormField from "../Misc/TextAreaFormField";

import { createEmployee } from "@/lib/employeeAPIActions";
import { City } from "@/models/selectorOption";
import { Employee, employeeSchema } from "@/models/employee";

export default function EmployeeAddForm() {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);

  const handleProvinceChange = async (value: string) => {
    const provinceId = parseInt(value);
    getCitiesByProvince(provinceId).then((data) => {
      setCities(data);
    });
  };

  const handleCancel = () => {
    router.replace("/dashboard/personal");
  };

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      // identificationCard: employee!.identificationCard,
    },
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
    if (response) {
      toast.success("Empleado registrado exitosamente");
      router.push("/dashboard/personal");
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
              {/* Estado civil*/}
              <div className="w-full grid grid-cols-2 gap-5">
                <SelectFormField
                  control={form.control as unknown as Control<FieldValues>}
                  name="maritalStatusId"
                  formLabel="Estado civil"
                  fetchItems={getCivilStatus}
                  placeholder="Estado civil"
                />
                {/* Numero de hijos */}
                <InputFormField
                  control={form.control as unknown as Control<FieldValues>}
                  name="childrens"
                  formLabel="Número de hijos"
                  type="number"
                  placeholder="0"
                />
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
                handleChange={handleProvinceChange}
              />
              {/* Ciudades */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="cityId"
                formLabel="Ciudad"
                options={cities}
                placeholder="Ciudad"
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
            <h3 className="text-lg font-light">Datos institucionales:</h3>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Funcion */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="functionId"
                formLabel="Función"
                fetchItems={getFunctions}
                placeholder="Función"
              />
              {/* Ciudades */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="laboralRegimeId"
                formLabel="Régimen laboral"
                fetchItems={getLaboralRegimes}
                placeholder="Régimen laboral"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-20">
              {/* Relacion laboral */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="functionId"
                formLabel="Relación laboral"
                fetchItems={getLaboralRelations}
                placeholder="Relación laboral"
              />
              {/* Categorias */}
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="categoryId"
                formLabel="Categoría"
                fetchItems={getCategories}
                placeholder="Categoría"
                optionStartLabel="Categoría"
              />
            </div>
            {/* <div className="w-full flex flex-row items-center justify-end mt-8">
              
            </div> */}
            <div className="w-full flex flex-row space-x-4 justify-end mt-10">
              <Button
                className="w-36"
                variant="destructive"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button type="submit" variant={"success"} className="w-36">
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
