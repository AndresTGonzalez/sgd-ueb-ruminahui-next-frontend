"use client";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { DocumentIcon } from "@heroicons/react/24/solid";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InformationSection from "@/components/Justification/InformationSection/InformationSection";

export default function Page({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState("information");

  const handleChangeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto py-10">
      <div className="flex flex-col space-y-3">
        {/* Titulo */}
        <div className="flex flex-row space-x-3 px-8">
          <DocumentIcon className="w-8 h-8 text-gray-900" />
          {params.id === "0" ? (
            <h2 className="text-2xl">Agregar un nuevo campus</h2>
          ) : (
            <h2 className="text-2xl">Justificación de inasistencia</h2>
          )}
        </div>
        <Separator />
        <div className="px-10">
          <Tabs value={tab}>
            <TabsList>
              <TabsTrigger
                value="information"
                onClick={() => {
                  handleChangeTab("information");
                }}
              >
                Justificación
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                onClick={() => {
                  handleChangeTab("documents");
                }}
              >
                Documentos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="information">
              <InformationSection personalId={Number(params.id)} />
            </TabsContent>
            <TabsContent value="documents"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
