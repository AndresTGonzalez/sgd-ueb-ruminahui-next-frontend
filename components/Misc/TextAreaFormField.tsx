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
import { Textarea } from "../ui/textarea";

export default function TextAreaFormField({
  control,
  name,
  formLabel,
  placeholder = "",
  defaultValue = "",
}: {
  control: Control<FieldValues>;
  name: string;
  formLabel: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
