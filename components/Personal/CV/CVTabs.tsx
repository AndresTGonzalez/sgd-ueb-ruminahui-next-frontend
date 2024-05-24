"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitlesSection from "./Titles/TitlesSection";
import CertificationsSection from "./Certifications/CertificationsSection";

export default function CVTabs({ personalId }: { personalId: number }) {
  const [tab, setTab] = useState("titles");

  const handleChangeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <Tabs value={tab}>
      <TabsList>
        <TabsTrigger
          value="titles"
          onClick={() => {
            handleChangeTab("titles");
          }}
        >
          Títulos
        </TabsTrigger>
        <TabsTrigger
          value="certifications"
          onClick={() => {
            handleChangeTab("certifications");
          }}
        >
          Certificados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="titles">
        <TitlesSection personalId={personalId} />
      </TabsContent>
      <TabsContent value="certifications">
        <CertificationsSection personalId={personalId} />
      </TabsContent>
    </Tabs>
  );
}
