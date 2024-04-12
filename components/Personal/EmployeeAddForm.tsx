"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getProvinces,
  getCitiesByProvince,
  getGenders,
  getCivilStatus,
} from "@/lib/selectOptionsAPI";
import {
  City,
  MaritalStatus,
  Gender,
  Province,
  employeeSchema,
} from "@/models/apiModels";
import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import InputFormField from "../Misc/InputFormField";
import SelectFormField from "../Misc/SelectFormField";
import TextAreaFormField from "../Misc/TextAreaFormField";
import { ScrollArea } from "../ui/scroll-area";

export default function EmployeeAddForm() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);

  useEffect(() => {
    getProvinces().then((data) => setProvinces(data));
    getCivilStatus().then((data) => setMaritalStatuses(data));
    getGenders().then((data) => setGenders(data));
  }, []);

  const handleProvinceChange = async (value: string) => {
    const provinceId = parseInt(value);
    getCitiesByProvince(provinceId).then((data) => {
      setCities(data);
    });
  };

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async () => {};

  return (
    <div className="w-full h-full flex flex-col pb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-7 w-full grid grid-cols-1 gap-5">
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
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="birthdate">Fecha de nacimiento:</Label>
                <Input type="date" id="birthdate" placeholder="032505050" />
              </div>
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
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <Button variant={"success"} className="w-52">
              Registrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
