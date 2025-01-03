import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { QuestionSchema } from "@/api/question/questionModel";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Exam = z.infer<typeof ExamSchema>;
export const ExamSchema = z.object({
  id: z.number(),
  certificationID: z.number(),
  certificationName: z.string(),
  certificationSlug: z.string(),
  totalQuestions: z.number(),
  questions: z.array(QuestionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input body Validation for 'POST exams/create/' endpoint
export const CreateExamSchema = z.object({
  body: z.object({
    certificationID: z.number(),
    totalQuestions: z.number(),
  }),
});
