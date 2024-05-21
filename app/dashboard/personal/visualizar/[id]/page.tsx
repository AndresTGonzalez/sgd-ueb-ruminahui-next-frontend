"use client";

import { useState, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ItemViewPersonal } from "@/components/Personal/ItemViewPersonal";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto py-10">
      <div className="flex flex-col space-y-3">
        {/* Titulo */}
        <div className="flex flex-row space-x-3 px-8">
          <h2 className="uppercase text-2xl">ANDRES PATRICIO TAPIA GONZALEZ</h2>
        </div>
        <Separator />
        <ScrollArea className="px-8">
          <div className="w-full h-fit py-2">
            <h3 className="text-xl mb-5">Datos personales:</h3>
            <div className="w-full grid grid-cols-2">
              {/* Cedula */}
              <ItemViewPersonal label="Cédula:" value="1720012345" />
              {/* Sexo */}
              <ItemViewPersonal label="Género:" value="Masculino" />
              {/* Nombres y apellidos */}
              <ItemViewPersonal
                label="Nombres:"
                value="Andres Patricio Tapia Gonzalez"
              />
              {/* Fecha de nacimiento */}
              <ItemViewPersonal
                label="Fecha de nacimiento:"
                value="01/01/2000"
              />
              {/* Telefono */}
              <ItemViewPersonal label="Teléfono:" value="0987654321" />
              {/* Correo electronico */}
              <ItemViewPersonal
                label="Correo electrónico:"
                value="andres@gmail.com"
              />
              {/* Estado civil */}
              <ItemViewPersonal label="Estado civil:" value="Soltero" />
              {/* Numero de hijos */}
              <div className="grid grid-cols-2">
                <ItemViewPersonal label="Hijos:" value="0" />
                <ItemViewPersonal label="Hijos menores de edad:" value="0" />
              </div>
              {/* Direccion */}
              <ItemViewPersonal
                label="Dirección:"
                value="Ambato. Av. 10 de Agosto y Naciones Unidas"
              />
            </div>
          </div>
          <div className="w-full h-fit py-2">
            <h3 className="text-xl mb-5">Datos institucionales:</h3>
            <div className="w-full grid grid-cols-2">
              {/* Sedes */}
              <ItemViewPersonal label="Sede:" value="Quito" />
              {/* Funcion */}
              <ItemViewPersonal
                label="Función:"
                value="Desarrollador de software"
              />
              {/* Relacion laboral */}
              <ItemViewPersonal label="Relación laboral:" value="Empleado" />
              {/* Regimen laboral */}
              <ItemViewPersonal
                label="Régimen laboral:"
                value="Contrato indefinido"
              />
              {/* Categoria */}
              <ItemViewPersonal label="Categoría:" value="Profesional" />
              {/* Jornada */}
              <ItemViewPersonal label="Jornada:" value="Completa" />
              {/* Fecha de ingreso al magisterio */}
              <ItemViewPersonal
                label="Fecha de ingreso al magisterio:"
                value="01/01/2020"
              />
              {/* Fecha de ingreso a la institucion */}
              <ItemViewPersonal
                label="Fecha de ingreso a la institución:"
                value="01/01/2020"
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="w-full h-fit py-2">
              <h3 className="text-xl mb-2">Horarios asignados:</h3>
              <div className="w-full h-fit py-3 rounded-xl grid grid-cols-1">
                {/* Horarios de lunes a viernes */}
                <ItemViewPersonal label="Lunes:" value="08:00 - 17:00" />
                <ItemViewPersonal label="Martes:" value="08:00 - 17:00" />
                <ItemViewPersonal label="Miércoles:" value="08:00 - 17:00" />
                <ItemViewPersonal label="Jueves:" value="08:00 - 17:00" />
                <ItemViewPersonal label="Viernes:" value="08:00 - 17:00" />
              </div>
            </div>
            <div className="w-full h-fit py-2">
              <h3 className="text-xl mb-5">Códigos de asistencia:</h3>
              <div className="w-full grid grid-cols-1">
                {/* Codigo de asistencia */}
                <ItemViewPersonal label="Código de asistencia:" value="123456" />
                <ItemViewPersonal label="Código de asistencia:" value="123456" />
                <ItemViewPersonal label="Código de asistencia:" value="123456" />
                <ItemViewPersonal label="Código de asistencia:" value="123456" />

              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
