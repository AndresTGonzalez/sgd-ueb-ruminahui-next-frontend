"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProvinces,
  getCitiesByProvince,
  getGenders,
  getCivilStatus,
} from "@/lib/selectOptions";
import { City, CivilStatus, Gender, Province } from "@/models/apiModels";

export default function EmployeeAddForm() {
  // Provincias
  const [provinces, setProvinces] = useState<Province[]>([]);
  // Ciudades
  const [cities, setCities] = useState<City[]>([]);
  // Generos
  const [genders, setGenders] = useState<Gender[]>([]);
  // Estados civiles
  const [maritalStatuses, setMaritalStatuses] = useState<CivilStatus[]>([]);

  // Precargar provincias, generos y estados civiles
  useEffect(() => {
    getProvinces().then((data) => setProvinces(data));
    getCivilStatus().then((data) => setMaritalStatuses(data));
    getGenders().then((data) => setGenders(data));
  }, []);

  // Manejar cambio de provincia
  const handleProvinceChange = async (value: string) => {
    const provinceId = parseInt(value);
    const cities = await getCitiesByProvince(provinceId);
    setCities(cities);
  };

  return (
    <div>
      <div className="py-7 w-full grid grid-cols-1 gap-5">
        <div className="w-full grid grid-cols-2 gap-20">
          {/* Primeros campos: Cedula y genero */}
          {/* Cedula */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="document">Cédula:</Label>
            <Input type="text" id="document" placeholder="18xxxxxxxx" />
          </div>
          {/* Genero */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="gender">Género:</Label>
            <Select name="gender" onValueChange={handleProvinceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((genders) => (
                  <SelectItem key={genders.id} value={genders.id.toString()}>
                    {genders.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-20">
          {/* Segundos campos: Nombres y apellidos */}
          {/* Nombres */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="names">Nombres:</Label>
            <Input type="text" id="names" placeholder="Juan Carlos" />
          </div>
          {/* Apellidos */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lastnames">Apellidos:</Label>
            <Input type="text" id="lastnames" placeholder="Pérez Pérez" />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-20">
          {/* Terceros campos: Telefono y Correo */}
          {/* Telefono */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phone">Teléfono:</Label>
            <Input type="phone" id="phone" placeholder="032505050" />
          </div>
          {/* Correo */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Correo electrónico:</Label>
            <Input type="email" id="email" placeholder="jcarlos@mail.com" />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-20">
          {/* Cuartos campos: Nacimiento, estado civil e hijos*/}
          {/* Fecha de nacimiento */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="birthdate">Fecha de nacimiento:</Label>
            <Input type="date" id="birthdate" placeholder="032505050" />
          </div>
          {/* Estado civil e hijos */}
          <div className="w-full grid grid-cols-2 gap-5">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="maritalStatus">Estado civil:</Label>
              <Select name="maritalStatus" onValueChange={handleProvinceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estado civil" />
                </SelectTrigger>
                <SelectContent>
                  {maritalStatuses.map((maritalStatus) => (
                    <SelectItem
                      key={maritalStatus.id}
                      value={maritalStatus.id.toString()}
                    >
                      {maritalStatus.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="childrens">Número de hijos:</Label>
              <Input type="number" id="childrens" placeholder="0" />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-20">
          {/* Provincia */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="province">Provincia:</Label>
            <Select name="province" onValueChange={handleProvinceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Provincia" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Ciudades */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="city">Ciudad:</Label>
            <Select name="city">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ciudad" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full grid grid-cols-1">
          {/* Segundos campos: Nombres y apellidos */}
          {/* Nombres */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="address">Dirección:</Label>
            {/* <Input type="text" id="address" placeholder="Juan Carlos" /> */}
            <Textarea id="address" placeholder="Dirección" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-end">
        <Button variant={"success"} className="w-52">
          Registrar
        </Button>
      </div>
    </div>
  );
}
