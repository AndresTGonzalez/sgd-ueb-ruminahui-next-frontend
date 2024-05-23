import { z } from "zod";

export interface AssistancePersonalIdentificator {
  id?: number;
  code: string;
  dispositive: string;
}

export interface CreateAssistancePersonalIdentificatorDTO {
  code: string;
  personalId: number;
  assistanceDispositiveId: number;
}

export const AssistancePersonalIdentificatorSchema = z.object({
  code: z.string(),
  dispositiveId: z.number(),
});
