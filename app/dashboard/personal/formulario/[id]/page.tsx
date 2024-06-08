"use client";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { UserIcon } from "@heroicons/react/24/solid";

import { ScrollArea } from "@/components/ui/scroll-area";
import PersonalDataForm from "@/components/Personal/PersonalDataForm";
import TabsForm from "@/components/Personal/TabsForm";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto py-10">
      <div className="flex flex-col space-y-3">
        {/* Titulo */}
        <div className="flex flex-row space-x-3 px-8">
          <UserIcon className="w-8 h-8 text-gray-900" />
          {params.id == 0 ? (
            <h2 className="text-2xl">Agregar un nuevo empleado</h2>
          ) : (
            <h2 className="text-2xl">Editar empleado</h2>
          )}
        </div>
        <Separator />
        {/* <ScrollArea className="px-20 py-4"> */}
        <div className="px-20 py-4">
          {params.id == 0 ? (
            <PersonalDataForm personalId={Number(params.id)} />
          ) : (
            <TabsForm personalId={params.id} />
          )}
        </div>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
