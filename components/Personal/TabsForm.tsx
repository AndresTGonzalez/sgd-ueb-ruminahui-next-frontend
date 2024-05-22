"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDataForm from "./PersonalDataForm";
import MedicalDataForm from "./MedicalDataForm";
import InstitutionalDataForm from "./InstitutionalDataForm";

export default function TabsForm() {
  const [tab, setTab] = useState("personalData");

  const handleChangeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <Tabs value={tab}>
      <TabsList>
        <TabsTrigger
          value="personalData"
          onClick={() => {
            handleChangeTab("personalData");
          }}
        >
          Datos personales
        </TabsTrigger>
        <TabsTrigger
          value="medicalData"
          onClick={() => {
            handleChangeTab("medicalData");
          }}
        >
          Datos médicos
        </TabsTrigger>
        <TabsTrigger
          value="institutionalData"
          onClick={() => {
            handleChangeTab("institutionalData");
          }}
        >
          Datos institucionales
        </TabsTrigger>
        <TabsTrigger
          value="assistance"
          onClick={() => {
            handleChangeTab("assistance");
          }}
        >
          Horarios y asistencia
        </TabsTrigger>
        <TabsTrigger
          value="cv"
          onClick={() => {
            handleChangeTab("cv");
          }}
        >
          Hoja de vida
        </TabsTrigger>
      </TabsList>
      <TabsContent value="personalData">
        <PersonalDataForm />
      </TabsContent>
      <TabsContent value="medicalData">
        {/* <PersonalDataForm /> */}
        <MedicalDataForm />
      </TabsContent>
      <TabsContent value="institutionalData">
        <InstitutionalDataForm />
      </TabsContent>
      <TabsContent value="assistance">
        {/* <EmployeeForm /> */}
        <p>Assistance data</p>
      </TabsContent>
      <TabsContent value="cv">
        <p>CV data</p>
      </TabsContent>
    </Tabs>
  );
}
