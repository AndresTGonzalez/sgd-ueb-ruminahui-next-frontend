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
import { PersonalSchedule, PersonalScheduleSchema } from "@/models/personal";
import { PlusIcon } from "@radix-ui/react-icons";
import SelectFormField from "@/components/Misc/SelectFormField";
import InputFormField from "@/components/Misc/InputFormField";
import { daysOfTheWeekOptions } from "@/utils/constantsOptions";
import { getAssistanceDispisitve } from "@/lib/selectOptionsAPI";
import {
  AssistancePersonalIdentificatorSchema,
  CreateAssistancePersonalIdentificatorDTO,
} from "@/models/assistancePersonalIdentificator";

export function SchedulesFormDialog({
  handleNew,
  personalId,
}: {
  handleNew: (data: PersonalSchedule) => void;
  personalId: number;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof PersonalScheduleSchema>>({
    resolver: zodResolver(PersonalScheduleSchema),
  });

  const onSubmit = (data: z.infer<typeof PersonalScheduleSchema>) => {
    // console.log(data);
    // const newCode: CreateAssistancePersonalIdentificatorDTO = {
    //   code: data.code,
    //   assistanceDispositiveId: data.dispositiveId,
    //   personalId: Number(personalId),
    // };
    // handleNew(newCode);
    const newSchedule: PersonalSchedule = {
      dayOfWeek: data.dayOfWeek,
      start: data.start,
      end: data.end,
      personalId: Number(personalId),
    };
    handleNew(newSchedule);
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
          Nuevo horario
          <PlusIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar horario</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <SelectFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Día"
                name="dayOfWeek"
                options={daysOfTheWeekOptions}
                placeholder="Día de la semana"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Hora de entrada"
                name="start"
                type="time"
              />
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                formLabel="Hora de salida"
                name="end"
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

// "use client";

// import { Control, FieldValues, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { PersonalScheduleSchema } from "@/models/personal";
// import { PlusIcon } from "@radix-ui/react-icons";
// import SelectFormField from "@/components/Misc/SelectFormField";
// import InputFormField from "@/components/Misc/InputFormField";
// import { daysOfTheWeekOptions } from "@/utils/constantsOptions";

// const onSubmit = (data: z.infer<typeof PersonalScheduleSchema>) => {
//   console.log(data);
// };

// export function SchedulesFormDialog() {
//   const form = useForm<z.infer<typeof PersonalScheduleSchema>>({
//     resolver: zodResolver(PersonalScheduleSchema),
//   });

//   return (
//     <Dialog
//       onOpenChange={(isOpen) => {
//         if (!isOpen) {
//           form.reset();
//         }
//       }}
//     >
//       <DialogTrigger asChild>
//         <Button
//           className="w-36 flex flex-row items-center justify-between"
//           variant={"success"}
//           size={"sm"}
//         >
//           Nuevo horario
//           <PlusIcon className="h-5 w-5" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Agregar horario</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="grid gap-4 py-4">
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 formLabel="Día"
//                 name="dayOfWeek"
//                 options={daysOfTheWeekOptions}
//                 placeholder="Día de la semana"
//               />
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 formLabel="Hora de entrada"
//                 name="start"
//                 type="time"
//               />
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 formLabel="Hora de salida"
//                 name="end"
//                 type="time"
//               />
//               <Button type="submit" variant={"success"}>
//                 Guardar cambios
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
