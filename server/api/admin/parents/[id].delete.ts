import { defineEventHandler } from "h3";
import { deleteParent } from "~/server/db/parents";
import { Role } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const { id } = event.context.params as { id: string };

  // hanya ADMIN yang boleh hapus
  if (!user || user.type !== Role.ADMIN) {
    event.res.statusCode = 403;
    return { error: "Forbidden" };
  }

  await deleteParent(id);
  return { message: "Deleted successfully" };
});
