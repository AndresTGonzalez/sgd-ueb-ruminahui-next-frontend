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
import { getGenders } from "@/lib/selectOptionsAPI";
import { PersonalChildrens, PersonalChildrensSchema } from "@/models/personal";

export function ChildrensForm({
  handleNew,
  personalId,
}: {
  handleNew: (data: PersonalChildrens) => void;
  personalId: number;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof PersonalChildrensSchema>>({
    resolver: zodResolver(PersonalChildrensSchema),
  });

  const onSubmit = (data: z.infer<typeof PersonalChildrensSchema>) => {
    // console.log(data);
    const newChildren = {
      ...data,
      personalId: Number(personalId),
    };

    handleNew(newChildren);
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
          className="w-fit flex flex-row gap-3 items-center justify-between"
          variant={"success"}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          Agregar hijo
          <PlusIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar hijo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Nombres:"
                name="names"
                type="text"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Apellidos:"
                name="lastNames"
                type="text"
              />
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                name="genderId"
                formLabel="Género"
                fetchItems={getGenders}
                placeholder="Género"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Fecha de nacimiento:"
                name="birthdate"
                type="date"
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
