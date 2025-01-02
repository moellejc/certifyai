import { StatusCodes } from "http-status-codes";

import type { Certification } from "@/api/certification/certificationModel";
import { CertificationRepository } from "@/api/certification/certificationRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class CertificationService {
  private certificationRepository: CertificationRepository;
  constructor(
    repository: CertificationRepository = new CertificationRepository()
  ) {
    this.certificationRepository = repository;
  }

  // Retrieves all Certification from the database
  async findAll(): Promise<ServiceResponse<Certification[] | null>> {
    logger.info("start find all certs");
    try {
      const certs = await this.certificationRepository.findAllAsync();
      logger.info("certs found");
      logger.info(certs);
      if (!certs || certs.length === 0) {
        return ServiceResponse.failure(
          "No Certifications found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Certification[]>(
        "Certifications found",
        certs
      );
    } catch (ex) {
      const errorMessage = `Error finding all certifications: $${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving certifications.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Retrieves a single user by their ID
  async findById(id: number): Promise<ServiceResponse<Certification | null>> {
    try {
      const cert = await this.certificationRepository.findByIdAsync(id);
      if (!cert) {
        return ServiceResponse.failure(
          "Certification not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Certification>(
        "Certification found",
        cert
      );
    } catch (ex) {
      const errorMessage = `Error finding certification with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding certification.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const certificationService = new CertificationService();
