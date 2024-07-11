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
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import SelectFormField from "@/components/Misc/SelectFormField";
import InputFormField from "@/components/Misc/InputFormField";

import { getEmployeesForSelect } from "@/lib/employeeAPIActions";
import { ManualAssistance } from "@/models/assistance";

export function AssistanceForm({
  handleNew,
  open,
  setOpen,
}: {
  handleNew: (data: ManualAssistance) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof ManualAssistance>>({
    resolver: zodResolver(ManualAssistance),
  });

  const onSubmit = (data: z.infer<typeof ManualAssistance>) => {
    // Construyo el objeto a enviar
    const manualAssistance = {
      personalId: data.personalId,
      date: data.date,
      time: data.time,
    };

    // Llamo a la función que me pasaron por props
    handleNew(manualAssistance);

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar asistencia de forma manual</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Empleado:"
                name="personalId"
                // options={daysOfTheWeekOptions}
                fetchItems={getEmployeesForSelect}
                placeholder="Empleado"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Fecha:"
                name="date"
                type="date"
              />
              {/* Hora de picado */}
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Hora de picado:"
                name="time"
                type="time"
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
