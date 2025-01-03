import { StatusCodes } from "http-status-codes";

import type { Exam } from "@/api/exam/examModel";
import { QuestionRepository } from "@/api/question/questionRepository";
import { CertificationRepository } from "@/api/certification/certificationRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class ExamService {
  private questionRepository: QuestionRepository;
  private certificationRepository: CertificationRepository;

  constructor(repository: QuestionRepository = new QuestionRepository()) {
    this.questionRepository = repository;
    this.certificationRepository = new CertificationRepository();
  }

  // generates an example with the defined number of questions
  async create(
    certificationID: number,
    totalQuestions: number
  ): Promise<ServiceResponse<Exam | null>> {
    try {
      // get certification info
      const certification = await this.certificationRepository.findByIdAsync(
        certificationID
      );

      if (!certification)
        return ServiceResponse.failure(
          `Certification ${certificationID} not found.`,
          null,
          StatusCodes.NOT_FOUND
        );

      // get question info
      if (totalQuestions < 1)
        return ServiceResponse.failure(
          "Total exam questions to generate must be greater than 0.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );

      const questionsForCert =
        await this.questionRepository.findAllByCertificationIdAsync(
          certificationID
        );

      if (!questionsForCert)
        return ServiceResponse.failure(
          `No Questions found for ${certification.name}`,
          null,
          StatusCodes.NOT_FOUND
        );

      if (totalQuestions > questionsForCert.length)
        return ServiceResponse.failure(
          "Total exam questions to generate must be less than the total number of available questions.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );

      // randomize the question retrieved for the certification
      const scrambledQuestions = questionsForCert.sort(
        () => Math.random() - 0.5
      );

      const slicedQuestions = scrambledQuestions.slice(0, totalQuestions);

      // return successfully generated exam
      return ServiceResponse.success<Exam>(
        `Generated exam for ${certification.name}`,
        {
          id: 1,
          certificationID,
          certificationName: certification.name,
          certificationSlug: certification.slug,
          totalQuestions,
          questions: slicedQuestions,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );
    } catch (ex) {
      const errorMessage = `Error finding generating exam: $${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while generating an exam.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const examService = new ExamService();
