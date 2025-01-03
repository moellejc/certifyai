import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ExamSchema, CreateExamSchema } from "@/api/exam/examModel";
import { examController } from "@/api/exam/examController";
import { validateRequest } from "@/common/utils/httpHandlers";

export const examRegistry = new OpenAPIRegistry();
export const examRouter: Router = express.Router();

examRegistry.register("Exam", ExamSchema);

examRegistry.registerPath({
  method: "post",
  path: "/exams/create",
  tags: ["Exam"],
  request: {
    body: {
      description:
        "Create an exam given the Certification ID and total number of questions",
      content: {
        "application/json": { schema: CreateExamSchema },
      },
    },
  },
  responses: createApiResponse(z.array(ExamSchema), "Success"),
});

examRouter.post("/create", examController.createExam);
