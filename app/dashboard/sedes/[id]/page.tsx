"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import CampusForm from "@/components/Campus/CampusForm";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto py-10">
      <div className="flex flex-col space-y-3">
        {/* Titulo */}
        <div className="flex flex-row space-x-3 px-8">
          <BuildingOfficeIcon className="w-8 h-8 text-gray-900" />
          {params.id === "0" ? (
            <h2 className="text-2xl">Agregar un nuevo campus</h2>
          ) : (
            <h2 className="text-2xl">Editar campus</h2>
          )}
        </div>
        <Separator />
        {/* Inicia la parte del formulario */}
        <ScrollArea>
          <CampusForm campusId={parseInt(params.id)} />
        </ScrollArea>
      </div>
    </div>
  );
}
