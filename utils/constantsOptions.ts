import { Hour, SelectorOption } from "@/models/selectorOption";

export const hoursOptions: Hour[] = [
  // Desde las 7 am hasta las 7 pm con medias horas
  { id: "07:00", name: "07:00" },
  { id: "07:30", name: "07:30" },
  { id: "08:00", name: "08:00" },
  { id: "08:30", name: "08:30" },
  { id: "09:00", name: "09:00" },
  { id: "09:30", name: "09:30" },
  { id: "10:00", name: "10:00" },
  { id: "10:30", name: "10:30" },
  { id: "11:00", name: "11:00" },
  { id: "11:30", name: "11:30" },
  { id: "12:00", name: "12:00" },
  { id: "12:30", name: "12:30" },
  { id: "13:00", name: "13:00" },
  { id: "13:30", name: "13:30" },
  { id: "14:00", name: "14:00" },
  { id: "14:30", name: "14:30" },
  { id: "15:00", name: "15:00" },
  { id: "15:30", name: "15:30" },
  { id: "16:00", name: "16:00" },
  { id: "16:30", name: "16:30" },
  { id: "17:00", name: "17:00" },
  { id: "17:30", name: "17:30" },
  { id: "18:00", name: "18:00" },
  { id: "18:30", name: "18:30" },
  { id: "19:00", name: "19:00" },
];

export const daysOfTheWeekOptions: SelectorOption[] = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 7, name: "Domingo" },
];

// Years
export function getLast100Years(): { id: number; name: string }[] {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < 100; i++) {
    const year = currentYear - i;
    years.push({ id: year, name: year.toString() });
  }

  return years;
}
