import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type QuestionOption = z.infer<typeof QuestionOptionSchema>;
export const QuestionOptionSchema = z.record(z.string(), z.string());

export type Question = z.infer<typeof QuestionSchema>;
export const QuestionSchema = z.object({
  id: z.number(),
  certificationID: z.number(),
  question: z.string(),
  category: z.string(),
  type: z.string(),
  options: z.array(QuestionOptionSchema),
  answer: QuestionOptionSchema,
  explanation: z.string(),
  citation: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetQuestionSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
