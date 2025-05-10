import { defineEventHandler, readBody } from "h3";
import { updateParent } from "~/server/db/parents";
import { Role } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const { id } = event.context.params as { id: string };

  const isOwner = user?.type === Role.PARENT && user.parent?.id === id;
  if (!user || (user.type !== Role.ADMIN && !isOwner)) {
    event.res.statusCode = 403;
    return { error: "Forbidden" };
  }

  const payload = await readBody(event);
  const updated = await updateParent(id, payload);
  return {
    message: "Updated successfully",
    parent: updated,
  };
});
