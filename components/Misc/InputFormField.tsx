"use client";

import { Control, FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function InputFormField({
  control,
  name,
  formLabel,
  type = "text",
  placeholder = "",
}: {
  control: Control<FieldValues>;
  name: string;
  formLabel: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            {type === "date" ? ( // Verifica si el tipo es "date"
              <Input
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                  // Convierte el valor del input a un objeto Date
                  const dateValue = new Date(e.target.value);
                  // Llama a field.onChange con el valor actualizado
                  field.onChange(dateValue);
                }}
              />
            ) : (
              // Si no es "date", muestra el input normalmente
              <Input
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                  // Si el tipo es "number", convierte el valor a un número
                  const value =
                    type === "number"
                      ? parseFloat(e.target.value)
                      : e.target.value;
                  // Llama a field.onChange con el valor actualizado
                  field.onChange(value);
                }}
              />
            )}
          </FormControl>
          {/* <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              onChange={(e) => {
                // Si el tipo es "number", convierte el valor a un número
                const value =
                  type === "number"
                    ? parseFloat(e.target.value)
                    : e.target.value;
                // Llama a field.onChange con el valor actualizado
                field.onChange(value);
              }}
            />
          </FormControl> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
