"use client";

import { useEffect, useState } from "react";

import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import MultipleSelector from "../ui/multiple-selector";

export default function MultipleSelectorField({
  control,
  name,
  formLabel,
  handleChange,
  items,
  optionStartLabel = "",
  initialValue = "",
  options,
}: {
  control: Control<FieldValues>;
  name: string;
  formLabel: string;
  handleChange?: (value: string) => void;
  items: { id: number; name: string }[];
  optionStartLabel?: string;
  initialValue?: string;
  options?: { label: string; value: string }[];
}) {
  return (
    <FormField
      control={control}
      name="frameworks"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Frameworks</FormLabel>
          <FormControl>
            <MultipleSelector
              {...field}
              defaultOptions={options}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
