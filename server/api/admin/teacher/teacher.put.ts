import { defineEventHandler, readBody } from "h3";
import { updateTeacher } from "../../../db/teacher";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id, name, divisions } = body;

    if (!id) {
      throw new Error("Teacher ID is required");
    }

    const teacher = await updateTeacher(id, name, divisions);

    return {
      message: "Teacher updated successfully",
      teacher,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
