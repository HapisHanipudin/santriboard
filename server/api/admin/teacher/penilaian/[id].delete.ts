import { defineEventHandler, readBody } from "h3";
import { deleteassessment } from "../../../../db/assessment";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  if (id == null) {
    event.res.statusCode = 400;
    return { error: "id is required" };
  }
  return await deleteassessment(id);
});
