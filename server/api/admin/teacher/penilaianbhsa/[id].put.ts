import { defineEventHandler, readBody } from "h3";
import { updateAssessment } from "../../../../db/assessment";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (isNaN(id)) {
    event.res.statusCode = 400;
    return { error: "Valid numeric id is required" };
  }

  const body = await readBody(event);

  try {
    const updated = await updateAssessment(id, body);
    return { success: true, data: updated };
  } catch (err: any) {
    event.res.statusCode = 500;
    return {
      error: "Failed to update assessment",
      detail: err?.message || err,
    };
  }
});
