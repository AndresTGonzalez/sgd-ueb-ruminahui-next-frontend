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
import { SelectorOption } from "@/models/apiModels";

export default function SelectFormField({
  control,
  name,
  formLabel,
  placeholder = "",
  fetchItems,
  handleChange,
  options,
}: {
  control: Control<FieldValues>;
  name: string;
  formLabel: string;
  placeholder?: string;
  fetchItems?: () => Promise<SelectorOption[]>;
  handleChange?: (value: string) => void;
  options?: SelectorOption[];
}) {
  const [items, setItems] = useState<SelectorOption[]>([]);

  useEffect(() => {
    if (options) {
      setItems(options);
    } else if (fetchItems) {
      fetchItems().then((data) => setItems(data));
    }
  }, [options, fetchItems]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <Select
            onValueChange={
              handleChange
                ? (value) => handleChange(value)
                : (value) => field.onChange(parseInt(value))
            }
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((items) => (
                <SelectItem key={items.id} value={items.id.toString()}>
                  {items.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
