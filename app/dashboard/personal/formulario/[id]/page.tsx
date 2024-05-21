"use client";

import { Separator } from "@/components/ui/separator";
import { UserIcon } from "@heroicons/react/24/solid";
import EmployeeForm from "@/components/Personal/EmployeeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ScrollArea } from "@/components/ui/scroll-area";

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
        <ScrollArea>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Datos personales</TabsTrigger>
              <TabsTrigger value="password">Datos institucionales</TabsTrigger>
              <TabsTrigger value="assistance">
                Horarios y asistencia
              </TabsTrigger>
              <TabsTrigger value="cv">Hoja de vida</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="assistance">
              {/* <EmployeeForm /> */}
              <p>Assistance data</p>
            </TabsContent>
            <TabsContent value="cv">
              <p>CV data</p>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}
