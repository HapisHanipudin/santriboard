import { defineEventHandler, readBody } from "h3";
import { updateassessment } from "../../../../db/assessment";

export default defineEventHandler(async (event) => {
  const { id, score, note } = await readBody(event);
  if (id == null || score == null) {
    event.res.statusCode = 400;
    return { error: "id and score are required" };
  }
  return await updateassessment(id, score, note);
});
