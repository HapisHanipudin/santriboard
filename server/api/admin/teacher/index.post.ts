import { defineEventHandler, readBody } from "h3";
import { createTeacher } from "../../../db/teacher";

export default defineEventHandler(async (event) => {
  try {
    // Membaca data dari request body
    const data = await readBody(event);

    // Menggunakan fungsi modular createTeacher
    const teacher = await createTeacher(data);

    return {
      message: "Teacher created successfully",
      teacher,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
