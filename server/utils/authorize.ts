import { defineEventHandler, createError } from "h3";
import { getUserFromEvent, UserPayload } from "./auth";

export function withAuth(allowedRoles: UserPayload["type"][], handler: any) {
  return defineEventHandler(async (event) => {
    const user = await getUserFromEvent(event);
    if (!allowedRoles.includes(user.type))
      throw createError({ statusCode: 403, message: "Forbidden" });
    // bisa attach user ke context jika perlu:
    event.context.user = user;
    return handler(event);
  });
}
