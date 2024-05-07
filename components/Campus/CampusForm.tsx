"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";

import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFormField from "../Misc/InputFormField";
import { Campus, CreateCampus, campusSchema } from "@/models/campus";
import { createCampus } from "@/lib/campusAPIActions";
import { toast } from "sonner";

export default function CampusForm() {
  const router = useRouter();

  const handleCancel = () => {
    router.replace("/dashboard/sedes");
  };

  const onSubmit = async (formData: z.infer<typeof campusSchema>) => {
    const newCampus: CreateCampus = {
      name: formData.name,
      secondaryName: formData.secondaryName,
      address: formData.address,
    };

    const response = await createCampus(newCampus);

    if (response === 201) {
      toast.success("Campus registrado exitosamente");
      router.push("/dashboard/sedes");
    } else {
    }
  };

  const form = useForm<z.infer<typeof campusSchema>>({
    resolver: zodResolver(campusSchema),
  });

  return (
    <div className="w-full h-full flex flex-col px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-7 w-full grid grid-cols-1 gap-5">
            <div className="w-full grid grid-cols-1 gap-20">
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="name"
                formLabel="Nombre"
                placeholder="Campus principal"
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-20">
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="secondaryName"
                formLabel="Nombre secundario"
                placeholder="Unidad Educativa Rumiñahui"
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-20">
              <InputFormField
                control={form.control as unknown as Control<FieldValues>}
                name="address"
                formLabel="Dirección"
                placeholder="Av. Rodrigo Pachano"
              />
            </div>
            <div className="w-full flex flex-row space-x-4 justify-end mt-10">
              <Button
                className="w-36"
                variant="destructive"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button type="submit" variant={"success"} className="w-36">
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
