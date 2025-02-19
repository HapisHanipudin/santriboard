import { defineEventHandler, getQuery } from "h3";
import { deleteTeacher } from "../../db/teacher";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = String(query.id); // Konversi ke string

    if (!id) {
      throw new Error("Teacher ID is required");
    }

    await deleteTeacher(id);

    return { message: "Teacher deleted successfully" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
