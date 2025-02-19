import { defineEventHandler, getQuery, createError } from "h3";
import { getStudents } from "../../db/student";

export default defineEventHandler(async (event) => {
  try {
    // Ambil parameter ID dari query string
    const query = getQuery(event);
    const id = query.id ? query.id.toString() : null;

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "ID is required" });
    }

    // Ambil data student dari database dengan hanya field yang dibutuhkan
    // const student = await getStudents(id);
    const student = await getStudents(id);

    if (!student) {
      throw createError({
        statusCode: 404,
        statusMessage: "Student not found",
      });
    }

    return {
      success: true,
      data: student,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
});
