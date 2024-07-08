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
import { Input } from "@/components/ui/input";

export function UploadDocument({
  handleUpload,
  justificationId,
  setFile,
}: {
  handleUpload: () => void;
  justificationId: number;
  setFile: (file: File) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAction = async () => {};

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // if (!isOpen) {
        //   form.reset();
        // }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-36 flex flex-row items-center justify-between"
          variant={"success"}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          Subir archivo
          <PlusIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar código de asistencia</DialogTitle>
        </DialogHeader>
        <Input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <div className="w-full grid grid-cols-2 gap-10">
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => {
              setOpen(false);
              // form.reset();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant={"success"}
            onClick={ async () => {
              await handleUpload();
              setOpen(false);
            }}
          >
            Subir archivo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
