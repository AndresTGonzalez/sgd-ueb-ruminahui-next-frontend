// "use client";

// import { useEffect } from "react";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Form } from "../ui/form";

// import {
//   getProvinces,
//   getCitiesByProvince,
//   getGenders,
//   getCivilStatus,
//   getFunctions,
//   getLaboralRegimes,
//   getLaboralRelations,
//   getCategories,
//   getJournals,
// } from "@/lib/selectOptionsAPI";

// import { Control, FieldValues, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import InputFormField from "../Misc/InputFormField";
// import SelectFormField from "../Misc/SelectFormField";
// import TextAreaFormField from "../Misc/TextAreaFormField";

// import { createEmployee, getEmployee } from "@/lib/employeeAPIActions";
// import { City } from "@/models/selectorOption";
// import { Employee, employeeSchema } from "@/models/employee";

// export default function EmployeeForm({ employeeId }: { employeeId: number }) {
//   const router = useRouter();

//   const [cities, setCities] = useState<City[]>([]);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       if (employeeId == 0) return;
//       const employee = await getEmployee(employeeId);
//       form.reset(employee);
//     };

//     fetchEmployee();
//   }, [employeeId]);

//   const handleProvinceChange = async (value: string) => {
//     const provinceId = parseInt(value);
//     getCitiesByProvince(provinceId).then((data) => {
//       setCities(data);
//     });
//   };

//   const handleCancel = () => {
//     router.replace("/dashboard/personal");
//   };

//   const form = useForm<z.infer<typeof employeeSchema>>({
//     resolver: zodResolver(employeeSchema),
//   });

//   const onSubmit = async (formData: z.infer<typeof employeeSchema>) => {
//     const newEmployee: Employee = {
//       identificationCard: formData.identificationCard,
//       names: formData.names,
//       lastNames: formData.lastNames,
//       phone: formData.phone,
//       email: formData.email,
//       birthdate: formData.birthdate,
//       childrens: formData.childrens,
//       address: formData.address,
//       genderId: formData.genderId,
//       maritalStatusId: formData.maritalStatusId,
//       cityId: formData.cityId,
//       functionId: formData.functionId,
//       laboralRegimeId: formData.laboralRegimeId,
//       laboralRelationshipId: formData.laboralRelationshipId,
//       journalId: formData.journalId,
//       categoryId: formData.categoryId,
//     };

//     const response = await createEmployee(newEmployee);
//     if (response === 201) {
//       toast.success("Empleado registrado exitosamente");
//       router.push("/dashboard/personal");
//     } else {
//       toast.error("Error al registrar el empleado");
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col px-8">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="py-7 w-full grid grid-cols-1 gap-5">
//             <h3 className="text-lg font-light">Datos personales:</h3>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Cedula */}
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="identificationCard"
//                 formLabel="Cédula"
//                 placeholder="18xxxxxxxx"
//               />
//               {/* Genero */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="genderId"
//                 formLabel="Género"
//                 fetchItems={getGenders}
//                 placeholder="Género"
//               />
//             </div>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Nombres */}
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="names"
//                 formLabel="Nombres"
//                 placeholder="Juan Carlos"
//               />
//               {/* Apellidos */}
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="lastNames"
//                 formLabel="Apellidos"
//                 placeholder="Pérez Pérez"
//               />
//             </div>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Telefono */}
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="phone"
//                 formLabel="Teléfono"
//                 placeholder="032505050"
//               />
//               {/* Correo */}
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="email"
//                 formLabel="Correo electrónico"
//                 placeholder="jcarlos@mail.com"
//               />
//             </div>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Fecha de nacimiento */}
//               <InputFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="birthdate"
//                 formLabel="Fecha de nacimiento"
//                 type="date"
//                 placeholder="032505050"
//               />
//               {/* Estado civil*/}
//               <div className="w-full grid grid-cols-2 gap-5">
//                 <SelectFormField
//                   control={form.control as unknown as Control<FieldValues>}
//                   name="maritalStatusId"
//                   formLabel="Estado civil"
//                   fetchItems={getCivilStatus}
//                   placeholder="Estado civil"
//                 />
//                 {/* Numero de hijos */}
//                 <InputFormField
//                   control={form.control as unknown as Control<FieldValues>}
//                   name="childrens"
//                   formLabel="Número de hijos"
//                   type="number"
//                   placeholder="0"
//                 />
//               </div>
//             </div>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Provincia */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="provinceId"
//                 formLabel="Provincia"
//                 fetchItems={getProvinces}
//                 placeholder="Provincia"
//                 handleChange={handleProvinceChange}
//               />
//               {/* Ciudades */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="cityId"
//                 formLabel="Ciudad"
//                 options={cities}
//                 placeholder="Ciudad"
//               />
//             </div>
//             <div className="w-full grid grid-cols-1">
//               <TextAreaFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="address"
//                 formLabel="Dirección"
//                 placeholder="Dirección"
//               />
//             </div>
//             <h3 className="text-lg font-light">Datos institucionales:</h3>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Función */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="functionId"
//                 formLabel="Función"
//                 fetchItems={getFunctions}
//                 placeholder="Función"
//               />
//               {/* Regimén Laboral */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="laboralRegimeId"
//                 formLabel="Régimen laboral"
//                 fetchItems={getLaboralRegimes}
//                 placeholder="Régimen laboral"
//               />
//             </div>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Relacion laboral */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="laboralRelationshipId"
//                 formLabel="Relación laboral"
//                 fetchItems={getLaboralRelations}
//                 placeholder="Relación laboral"
//               />
//               {/* Categorias */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="categoryId"
//                 formLabel="Categoría"
//                 fetchItems={getCategories}
//                 placeholder="Categoría"
//                 optionStartLabel="Categoría"
//               />
//             </div>
//             <div className="w-full grid grid-cols-2 gap-20">
//               {/* Jornada */}
//               <SelectFormField
//                 control={form.control as unknown as Control<FieldValues>}
//                 name="journalId"
//                 formLabel="Jornada"
//                 fetchItems={getJournals}
//                 placeholder="Jornada"
//               />
//             </div>
//             <h3 className="text-lg font-light">Datos de asistencia:</h3>
//             <div className="grid grid-cols-2">
//               <div>
//                 <h4>Códigos de asistencia:</h4>
//                 <div className="w-full grid grid-cols-1 gap-5 pr-10">
//                   {/* Codigo de asistencia */}
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="attendanceCode"
//                     formLabel="Sede principal"
//                     placeholder="123456"
//                   />
//                   {/* Codigo de asistencia */}
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="attendanceCode"
//                     formLabel="Sede secundaria"
//                     placeholder="123456"
//                   />
//                   {/* Codigo de asistencia */}
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="attendanceCode"
//                     formLabel="Sede terciaria"
//                     placeholder="123456"
//                   />
//                 </div>
//               </div>
//               <div className="w-full h-fit">
//                 <h4>Horarios asignados:</h4>
//                 {/* Lunes */}
//                 <span>Lunes:</span>
//                 <div className="w-full grid grid-cols-2 gap-5">
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="mondayStart"
//                     formLabel="Inicio"
//                     type="time"
//                   />
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="mondayEnd"
//                     formLabel="Fin"
//                     type="time"
//                   />
//                 </div>
//                 {/* Martes */}
//                 <span>Martes:</span>
//                 <div className="w-full grid grid-cols-2 gap-5">
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="tuesdayStart"
//                     formLabel="Inicio"
//                     type="time"
//                   />
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="tuesdayEnd"
//                     formLabel="Fin"
//                     type="time"
//                   />
//                 </div>
//                 {/* Miercoles */}
//                 <span>Miércoles:</span>
//                 <div className="w-full grid grid-cols-2 gap-5">
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="wednesdayStart"
//                     formLabel="Inicio"
//                     type="time"
//                   />
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="wednesdayEnd"
//                     formLabel="Fin"
//                     type="time"
//                   />
//                 </div>
//                 {/* Jueves */}
//                 <span>Jueves:</span>
//                 <div className="w-full grid grid-cols-2 gap-5">
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="thursdayStart"
//                     formLabel="Inicio"
//                     type="time"
//                   />
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="thursdayEnd"
//                     formLabel="Fin"
//                     type="time"
//                   />
//                 </div>
//                 {/* Viernes */}
//                 <span>Viernes:</span>
//                 <div className="w-full grid grid-cols-2 gap-5">
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="fridayStart"
//                     formLabel="Inicio"
//                     type="time"
//                   />
//                   <InputFormField
//                     control={form.control as unknown as Control<FieldValues>}
//                     name="fridayEnd"
//                     formLabel="Fin"
//                     type="time"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="w-full flex flex-row space-x-4 justify-end mt-10">
//               <Button
//                 className="w-36"
//                 variant="destructive"
//                 onClick={handleCancel}
//               >
//                 Cancelar
//               </Button>
//               <Button type="submit" variant={"success"} className="w-36">
//                 Guardar
//               </Button>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }
