import { defineEventHandler, readBody } from "h3";
import { createParent } from "~/server/db/parents";
import { Role } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user || user.type !== Role.ADMIN) {
    event.res.statusCode = 403;
    return { error: "Forbidden" };
  }

  const { name, userId, familyId, nik } = await readBody(event);
  const newParent = await createParent({ name, userId, familyId, nik });
  return {
    message: "Parent created",
    parent: newParent,
  };
});
