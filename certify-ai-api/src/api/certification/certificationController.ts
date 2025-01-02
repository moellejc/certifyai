import type { Request, RequestHandler, Response } from "express";

import { certificationService } from "@/api/certification/certificationService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class CertificationController {
  public getCertifications: RequestHandler = async (
    _req: Request,
    res: Response
  ) => {
    const serviceResponse = await certificationService.findAll();
    console.log("All Certifcations");
    console.log(serviceResponse.message);
    return handleServiceResponse(serviceResponse, res);
  };

  public getCertification: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await certificationService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const certificationController = new CertificationController();
