// "use client";

// import { useEffect, useState } from "react";

// import { Control, FieldValues } from "react-hook-form";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Checkbox } from "@/components/ui/checkbox";
// import { SelectorOption } from "@/models/selectorOption";

// export default function CheckBoxMultiSelectField({
//   control,
//   name,
//   formLabel,
//   placeholder = "",
//   fetchItems,
//   handleChange,
//   options,
//   optionStartLabel = "",
//   defaultValue = 0,
// }: {
//   control: Control<FieldValues>;
//   name: string;
//   formLabel: string;
//   placeholder?: string;
//   fetchItems?: () => Promise<SelectorOption[]>;
//   handleChange?: (value: string) => void;
//   options?: SelectorOption[];
//   optionStartLabel?: string;
//   defaultValue?: number;
// }) {
//   const [items, setItems] = useState<SelectorOption[]>([]);
//   const [initialValue, setInitialValue] = useState("");
//   useEffect(() => {
//     if (options) {
//       setItems(options);
//     } else if (fetchItems) {
//       fetchItems().then((data) => {
//         setItems(data);
//       });
//     }
//   }, [options, fetchItems]);

//   // Usar el placeHolder para mostrar el valor inicial
//   useEffect(() => {
//     if (defaultValue) {
//       const item = items.find((item) => item.id === defaultValue);
//       if (item) {
//         setInitialValue(optionStartLabel + " " + item.name);
//       }
//     } else {
//       setInitialValue(placeholder);
//     }
//   }, [items, defaultValue]);

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <div className="mb-4">
//             <FormLabel className="text-base">{formLabel}</FormLabel>
//           </div>
//           {items.map((item) => (
//             <FormField
//               key={item.id}
//               control={control}
//               name={name}
//               render={({ field }) => {
//                 return (
//                   <FormItem
//                     key={item.id}
//                     className="flex flex-row items-start space-x-3 space-y-0"
//                   >
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value?.includes(item.id)}
//                         defaultChecked={field.value?.includes(item.id)}
//                         onCheckedChange={(checked) => {
//                           return checked
//                             ? field.onChange([...field.name, item.id])
//                             : field.onChange(
//                                 field.value?.filter(
//                                   (value: any) => value !== item.id
//                                 )
//                               );
//                         }}
//                       />
//                     </FormControl>
//                     <FormLabel className="font-normal">{item.name}</FormLabel>
//                   </FormItem>
//                 );
//               }}
//             />
//           ))}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Control, FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectorOption } from "@/models/selectorOption";

export default function CheckBoxMultiSelectField({
  control,
  name,
  formLabel,
  placeholder = "",
  fetchItems,
  handleChange,
  options,
  optionStartLabel = "",
  defaultValue = [],
}: {
  control: Control<FieldValues>;
  name: string;
  formLabel: string;
  placeholder?: string;
  fetchItems?: () => Promise<SelectorOption[]>;
  handleChange?: (value: string) => void;
  options?: SelectorOption[];
  optionStartLabel?: string;
  defaultValue?: number[];
}) {
  const [items, setItems] = useState<SelectorOption[]>([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (options) {
      setItems(options);
    } else if (fetchItems) {
      fetchItems().then((data) => {
        setItems(data);
      });
    }
  }, [options, fetchItems]);

  useEffect(() => {
    // Set the default values in the form
    setValue(name, defaultValue);
  }, [defaultValue, setValue, name]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{formLabel}</FormLabel>
          </div>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name={name}
              render={({ field }) => {
                const valueArray = Array.isArray(field.value)
                  ? field.value
                  : [];
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={valueArray.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...valueArray, item.id])
                            : field.onChange(
                                valueArray.filter((value) => value !== item.id)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.name}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
