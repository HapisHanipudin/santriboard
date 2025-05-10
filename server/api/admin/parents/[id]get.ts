import { defineEventHandler } from "h3";
import { getParentById } from "~/server/db/parents";
import { Role } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const { id } = event.context.params as { id: string };

  const isOwner = user?.type === Role.PARENT && user.parent?.id === id;
  if (!user || (user.type !== Role.ADMIN && !isOwner)) {
    event.res.statusCode = 403;
    return { error: "Forbidden" };
  }

  const parent = await getParentById(id);
  if (!parent) {
    event.res.statusCode = 404;
    return { error: "Not Found" };
  }
  return parent;
});
