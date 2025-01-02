import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Certification = z.infer<typeof CertificationSchema>;
export const CertificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  short_description: z.string(),
  level: z.string(),
  role: z.string(),
  product: z.string(),
  url: z.string(),
});

// Input Validation for 'GET certification/:id' endpoint
export const GetCertificationSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
