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
import { SelectorOption } from "@/models/selectorOption";

export default function SelectFormField({
  control,
  name,
  formLabel,
  placeholder = "",
  fetchItems,
  handleChange,
  options,
  optionStartLabel = "",
  defaultValue = 0,
}: {
  control: Control<FieldValues>;
  name: string;
  formLabel: string;
  placeholder?: string;
  fetchItems?: () => Promise<SelectorOption[]>;
  handleChange?: (value: string) => void;
  options?: SelectorOption[];
  optionStartLabel?: string;
  defaultValue?: number;
}) {
  const [items, setItems] = useState<SelectorOption[]>([]);
  const [initialValue, setInitialValue] = useState<number>(0);
  useEffect(() => {
    if (options) {
      setItems(options);
      // setInitialValue(options[0].id);
    } else if (fetchItems) {
      fetchItems().then((data) => {
        setItems(data);
        // setInitialValue(data[0].id);
      });
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
            // defaultValue={value.toString()}
            // value={initialValue.toString()}
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
                  {optionStartLabel + " " + items.name}
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
