"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { UserIcon } from "@heroicons/react/24/solid";
import EmployeeAddForm from "@/components/Personal/EmployeeAddForm";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleCancel = () => {
    router.replace("/dashboard/personal");
  };

  return (
    <div className="w-full h-full container flex flex-col justify-between mx-auto py-10">
      <div>
        {/* Contenido superior o util */}
        <div className="flex flex-col space-y-3">
          {/* Titulo */}
          <div className="flex flex-row space-x-3">
            <UserIcon className="w-8 h-8 text-gray-900" />
            {params.id === "0" ? (
              <h2 className="text-2xl">Agregar un nuevo empleado</h2>
            ) : (
              <h2 className="text-2xl">Editar empleado</h2>
            )}
          </div>
          <Separator />
          {/* Inicia la parte del formulario */}
          <EmployeeAddForm />
        </div>
      </div>
    </div>
  );
}
