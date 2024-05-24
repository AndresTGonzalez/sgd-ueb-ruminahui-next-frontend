"use client";

import { useState } from "react";

import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { PlusIcon } from "@radix-ui/react-icons";
import SelectFormField from "@/components/Misc/SelectFormField";
import InputFormField from "@/components/Misc/InputFormField";
import { getAssistanceDispisitve } from "@/lib/selectOptionsAPI";
import {
  AssistancePersonalIdentificatorSchema,
  CreateAssistancePersonalIdentificatorDTO,
} from "@/models/assistancePersonalIdentificator";
import {
  PersonalCertifications,
  PersonalCertificationsSchema,
  PersonalTitles,
  PersonalTitlesSchema,
} from "@/models/personal";
import { getLast100Years } from "@/utils/constantsOptions";

export function CertificationsForm({
  handleNew,
  personalId,
}: {
  handleNew: (data: PersonalCertifications) => void;
  personalId: number;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof PersonalCertificationsSchema>>({
    resolver: zodResolver(PersonalCertificationsSchema),
  });

  const onSubmit = (data: z.infer<typeof PersonalCertificationsSchema>) => {
    const newCertification: PersonalCertifications = {
      certification: data.certification,
      institution: data.institution,
      completitionYear: data.completitionYear,
      personalId: personalId,
    };
    handleNew(newCertification);
    form.setValue("certification", "");
    form.setValue("institution", "");
    //cerrar modal
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-36 flex flex-row items-center justify-between"
          variant={"success"}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          Nuevo certificado
          <PlusIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar título</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Certificación"
                name="certification"
                type="text"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Institución"
                name="institution"
                type="text"
              />
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Año de finalización"
                name="completitionYear"
                options={getLast100Years()}
                placeholder="Año de finalización"
              />
              <div className="w-full grid grid-cols-2 gap-10">
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant={"success"}>
                  Guardar cambios
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
