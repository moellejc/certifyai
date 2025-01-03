import type { Request, RequestHandler, Response } from "express";

import { examService } from "@/api/exam/examService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { logger } from "@/server";

class ExamController {
  public createExam: RequestHandler = async (req: Request, res: Response) => {
    const certificationID = Number.parseInt(
      req.body.certificationID as string,
      10
    );
    const totalQuestions = Number.parseInt(
      req.body.totalQuestions as string,
      10
    );
    const serviceResponse = await examService.create(
      certificationID,
      totalQuestions
    );
    return handleServiceResponse(serviceResponse, res);
  };
}

export const examController = new ExamController();
