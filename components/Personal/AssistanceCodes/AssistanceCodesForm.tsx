"use client";

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
import { PersonalScheduleSchema } from "@/models/personal";
import { PlusIcon } from "@radix-ui/react-icons";
import SelectFormField from "@/components/Misc/SelectFormField";
import InputFormField from "@/components/Misc/InputFormField";
import { daysOfTheWeekOptions } from "@/utils/constantsOptions";
import { getAssistanceDispisitve } from "@/lib/selectOptionsAPI";
import {
  AssistancePersonalIdentificatorSchema,
  CreateAssistancePersonalIdentificatorDTO,
} from "@/models/assistancePersonalIdentificator";

export function AssistanceCodesForm({
  handleNew,
  personalId,
}: {
  handleNew: (data: CreateAssistancePersonalIdentificatorDTO) => void;
  personalId: number;
}) {
  const form = useForm<z.infer<typeof AssistancePersonalIdentificatorSchema>>({
    resolver: zodResolver(AssistancePersonalIdentificatorSchema),
  });

  const onSubmit = (
    data: z.infer<typeof AssistancePersonalIdentificatorSchema>
  ) => {
    // console.log(data);
    const newCode: CreateAssistancePersonalIdentificatorDTO = {
      code: data.code,
      assistanceDispositiveId: data.dispositiveId,
      personalId: Number(personalId),
    };
    handleNew(newCode);
    //cerrar modal
  };
  return (
    <Dialog
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
        >
          Nuevo código
          <PlusIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar código de asistencia</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Dispositivo"
                name="dispositiveId"
                // options={daysOfTheWeekOptions}
                fetchItems={getAssistanceDispisitve}
                placeholder="Dispositivo de asistencia"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Código de asistencia"
                name="code"
                type="text"
              />
              <Button type="submit" variant={"success"}>
                Guardar cambios
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
