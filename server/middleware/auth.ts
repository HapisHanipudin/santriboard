import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { sendError } from "h3";
import { getUserById } from "../db/users";
import { userTransformer } from "../transformers/user";

interface Endpoint {
  method: string;
  endpoint: string;
}

export default defineEventHandler(async (event: any) => {
  // Daftar endpoint yang memerlukan autentikasi (bisa kosong kalau mau handle semua pakai pattern)
  const endpoints: Endpoint[] = [
    // { method: "GET", endpoint: "/api/some-endpoint" }
  ];

  // Daftar endpoint yang butuh role teacher
  const needTeacher: Endpoint[] = [
    { method: "POST", endpoint: "/api/teacher/*" },
    { method: "PUT", endpoint: "/api/teacher/*" },
  ];

  // Tambahan: endpoint yang butuh role admin
  const needAdmin: Endpoint[] = [
    { method: "DELETE", endpoint: "/api/admin/*" },
  ];

  const allSecuredEndpoints = [...endpoints, ...needTeacher, ...needAdmin];

  const isSecured = allSecuredEndpoints.some(({ method, endpoint }) => {
    const pattern = new UrlPattern(endpoint);
    return (
      pattern.match(event.node.req.url) && event.node.req.method === method
    );
  });

  if (!isSecured) {
    return;
  }

  try {
    const token = event.node.req.headers["authorization"]?.split(" ")[1];

    const decoded = decodeAccessToken(token);

    if (!decoded) {
      throw new Error("Token tidak valid");
    }

    const user = await getUserById(decoded.userId);

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const transformed = userTransformer(user);
    event.context.auth = transformed;

    const isNeedTeacher = needTeacher.some(({ method, endpoint }) => {
      const pattern = new UrlPattern(endpoint);
      return (
        pattern.match(event.node.req.url) && event.node.req.method === method
      );
    });

    if (isNeedTeacher && transformed.role !== "teacher") {
      throw new Error("Hanya guru yang boleh mengakses endpoint ini");
    }

    const isNeedAdmin = needAdmin.some(({ method, endpoint }) => {
      const pattern = new UrlPattern(endpoint);
      return (
        pattern.match(event.node.req.url) && event.node.req.method === method
      );
    });

    if (isNeedAdmin && transformed.role !== "ADMIN") {
      throw new Error("Hanya admin yang boleh mengakses endpoint ini");
    }
  } catch (error: any) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: error.message || "Unauthorized",
      })
    );
  }
});
