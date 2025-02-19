import { defineEventHandler, readBody } from "h3";
import { createStudent } from "../../db/student";

export default defineEventHandler(async (event) => {
  try {
    // Membaca data dari request body
    const body = await readBody(event);
    const { name, nickname, gender, birth_date, birth_place, nis, nik, is_active, is_graduated, familiesId } = body;

    // Menggunakan fungsi modular createStudent
    const student = await createStudent({
      name,
      nickname,
      gender,
      birth_date,
      birth_place,
      nis,
      nik,
      is_active,
      is_graduated,
      familiesId,
    });

    return {
      message: "Student created successfully",
      student,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});