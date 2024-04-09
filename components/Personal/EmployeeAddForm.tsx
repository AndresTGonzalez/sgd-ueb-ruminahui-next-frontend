"use client";

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

export default function EmployeeAddForm() {
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
            {/* <Input type="document" id="document" placeholder="18xxxxxxxx" /> */}
            <Select name="gender">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
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
              <Label htmlFor="civilStatus">Estado civil:</Label>
              <Select>
                <SelectTrigger className="w-full" id="civilStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soltero">Soltero/a</SelectItem>
                  <SelectItem value="casado">Casado/a</SelectItem>
                  <SelectItem value="union">Unión de hecho</SelectItem>
                  <SelectItem value="divorciado">Divorciado/a</SelectItem>
                  <SelectItem value="viudo">Viudo/a</SelectItem>
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
          {/* Terceros campos: Telefono y Correo */}
          {/* Telefono */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="province">Provincia:</Label>
            <Select>
              <SelectTrigger className="w-full" id="province">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soltero">Soltero/a</SelectItem>
                <SelectItem value="casado">Casado/a</SelectItem>
                <SelectItem value="union">Unión de hecho</SelectItem>
                <SelectItem value="divorciado">Divorciado/a</SelectItem>
                <SelectItem value="viudo">Viudo/a</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Correo */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="city">Ciudad:</Label>
            <Select>
              <SelectTrigger className="w-full" id="city">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soltero">Soltero/a</SelectItem>
                <SelectItem value="casado">Casado/a</SelectItem>
                <SelectItem value="union">Unión de hecho</SelectItem>
                <SelectItem value="divorciado">Divorciado/a</SelectItem>
                <SelectItem value="viudo">Viudo/a</SelectItem>
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
