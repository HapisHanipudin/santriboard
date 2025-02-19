import { defineEventHandler, readBody } from "h3";
import { createTeacher } from "../../db/teacher";

export default defineEventHandler(async (event) => {
  try {
    // Membaca data dari request body
    const body = await readBody(event);
    const { name, divisions } = body;

    // Menggunakan fungsi modular createTeacher
    const teacher = await createTeacher(name, divisions);

    return {
      message: "Teacher created successfully",
      teacher,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
