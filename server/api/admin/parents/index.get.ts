import { defineEventHandler } from "h3";
import { listParents } from "~/server/db/parents";
import { Role } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user || user.type !== Role.ADMIN) {
    event.res.statusCode = 403;
    return { error: "Forbidden" };
  }
  return await listParents();
});
