import { Employee } from "./personal";

export type Assistance = {
  id?: number;
  identificationCard: string;
  names: string;
  lastNames: string;
  clockCheck: string;
  onTime: boolean;
};
