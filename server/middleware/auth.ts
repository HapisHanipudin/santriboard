import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { sendError, H3Event } from "h3";
import { getUserById } from "../db/users";
import { getTeacherByUserId } from "../db/teacher";
import { userTransformer } from "../transformers/user";
import { teacherTransformer } from "../transformers/teacher";
import { isAdmin, isTeacher, isKadiv } from "../utils/checkRoles";

interface Endpoint {
  method: string;
  endpoint: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const endpoints: Endpoint[] = [
    { method: "GET", endpoint: "/api/auth/user" },
    { method: "PUT", endpoint: "/api/auth/user" },
    { method: "PUT", endpoint: "/api/auth/user/profile" },
    { method: "GET", endpoint: "/api/classes" },
  ];

  const needTeacher: Endpoint[] = [
    { method: "POST", endpoint: "/api/teacher/*" },
    { method: "PUT", endpoint: "/api/teacher/*" },
    { method: "GET", endpoint: "/api/admin/teacher/class" },
  ];

  // Tambahan: endpoint yang butuh role admin
  const needAdmin: Endpoint[] = [
    { method: "DELETE", endpoint: "/api/admin/*" },
  ];

  const needKadiv: Endpoint[] = [
    { method: "POST", endpoint: "/api/kadiv/*" },
    { method: "PUT", endpoint: "/api/kadiv/*" },
  ];

  const allSecuredEndpoints = [
    ...endpoints,
    ...needTeacher,
    ...needAdmin,
    ...needKadiv,
  ];

  const isSecured = allSecuredEndpoints.some(({ method, endpoint }) => {
    const pattern = new UrlPattern(endpoint);
    return (
      pattern.match(event.node.req.url || "") &&
      event.node.req.method === method
    );
  });

  if (!isSecured) return;

  try {
    const token = event.node.req.headers["authorization"]?.split(" ")[1];
    if (!token) throw new Error("Token tidak ditemukan");

    const decoded = decodeAccessToken(token);
    if (!decoded) throw new Error("Token tidak valid");

    const user = await getUserById(decoded.userId);
    if (!user) throw new Error("User tidak ditemukan");

    const transformed = userTransformer(user);
    // console.log(transformed);

    let teacherState = false;

    if (isTeacher(transformed)) {
      const teacher = await getTeacherByUserId(transformed.id); // pastikan string
      if (teacher) {
        teacherState = true;
        event.context.auth = {
          ...transformed,
          teacher: teacherTransformer(teacher),
        };
      } else {
        event.context.auth = transformed;
      }
    } else {
      event.context.auth = transformed;
    }
    const { method, url } = event.node.req;


    const match = (rules: Endpoint[]) => {
      return rules.some(
        ({ method: m, endpoint }) =>
          new UrlPattern(endpoint).match(url || "") && m === method
      );
    };


    if (match(needAdmin) && !isAdmin(transformed)) {
      throw new Error("Hanya admin yang boleh mengakses endpoint ini");
    }

    if (match(needTeacher) && !isTeacher(transformed) && !teacherState) {
      throw new Error(
        "Hanya guru dengan data lengkap yang boleh mengakses endpoint ini"
      );
    }


    if (match(needKadiv) && !isKadiv(transformed)) {
      throw new Error("Hanya Kadiv yang boleh mengakses endpoint ini");
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
