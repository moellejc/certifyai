import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  GetCertificationSchema,
  CertificationSchema,
} from "@/api/certification/certificationModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { certificationController } from "./certificationController";

export const certificationRegistry = new OpenAPIRegistry();
export const certificationRouter: Router = express.Router();

certificationRegistry.register("Certification", CertificationSchema);

certificationRegistry.registerPath({
  method: "get",
  path: "/certifications",
  tags: ["Certification"],
  responses: createApiResponse(z.array(CertificationSchema), "Success"),
});

certificationRouter.get("/", certificationController.getCertifications);

certificationRegistry.registerPath({
  method: "get",
  path: "/certifications/{id}",
  tags: ["Certification"],
  request: { params: GetCertificationSchema.shape.params },
  responses: createApiResponse(CertificationSchema, "Success"),
});

certificationRouter.get("/:id", certificationController.getCertification);

// TODO: fix validation request
// certificationRouter.get(
//     "/:id",
//     validateRequest(CertificationSchema),
//     certificationController.getCertification
//   );
