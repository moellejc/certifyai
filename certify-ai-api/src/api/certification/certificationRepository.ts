import type { Certification } from "@/api/certification/certificationModel";
import certificationData from "@/common/data/certifications/certifications.json";

const certs: Certification[] = certificationData.certifications.map((cert) => ({
  id: cert.id,
  name: cert.name,
  slug: cert.slug,
  short_description: cert.short_description,
  level: cert.level,
  role: cert.role,
  product: cert.product,
  url: cert.url,
}));

export class CertificationRepository {
  async findAllAsync(): Promise<Certification[]> {
    return certs;
  }

  async findByIdAsync(id: number): Promise<Certification | null> {
    console.log(id);
    return certs.find((cert) => cert.id === id) || null;
  }
}
