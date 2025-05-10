import { defineEventHandler, getRouterParam, readBody } from "h3";
import { updateStudent } from "../../../db/student";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) throw new Error("ID not provided");

    const body = await readBody(event);

    const updated = await updateStudent(id, {
      ...body,
      birth_date: body.birth_date ? new Date(body.birth_date) : undefined,
    });

    return {
      message: "Student updated successfully",
      updated,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
